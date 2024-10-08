import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DataTable } from "@/components/ui/data-table"
import { TrainingAssignmentResponse, GetApiV1ScheduleParams, getApiV1Schedule, BusType } from "@/lib/api/training-assignments-api"
import { busTypeDisplayName } from "@/lib/training-assignment-api-utils"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { format, formatDate, parseISO } from "date-fns"

const columns : ColumnDef<TrainingAssignmentResponse>[] = [
	{
		accessorKey: "requestor",
		header: "Requestor"
	},
	{
		accessorKey: "startTime",
		header: "Start Time",
		cell: ({ row }) => {
			const date = parseISO(row.getValue("startTime"))
			return <div>{format(date, "HH:mm")}</div>
		  },
	},
	{
		accessorKey: "endTime",
		header: "End Time",
		cell: ({ row }) => {
			const date = parseISO(row.getValue("endTime"))
			return <div>{format(date, "HH:mm")}</div>
		  },
		
	}
]

async function GetSchedule(date: Date) {
	const preferencesRequest: GetApiV1ScheduleParams = {
		date: format(date, "yyyy-MM-dd")
	}
	const data = await getApiV1Schedule(preferencesRequest)
	return data.data
}

interface TrainingScheduleTableProps {
	date: Date,
}

export default function TrainingScheduleTable({date}: TrainingScheduleTableProps) {
	const {isPending, error, data} = useQuery({
		queryKey: ["TrainingAssignmentsApi", "Schedule", formatDate(date, "yyyy-MM-dd")], 
		queryFn: () => GetSchedule(date)})

	if (isPending) return `Loading Training Schedules for: ${formatDate(date, "yyyy-MM-dd")}`
	if (error) return 'An error has occurred: ' + error.message
	return (
		<>
			<div className="text-xl pb-2">{`Currently Assigned Schedule`}</div>
			<Accordion type="multiple">
				{Object.entries(data.groupedAssignments).map(([bustype, groupedAssignments]) => {
					return (
						<AccordionItem value={bustype} key={bustype}>
							<AccordionTrigger>{busTypeDisplayName(bustype as BusType)}</AccordionTrigger>
							<AccordionContent>
								<Accordion type="multiple" className="px-3">
									{Object.entries(groupedAssignments).map(([busNumber, assignments]) => {
										return (
											<AccordionItem value={busNumber} className="container" key={`${bustype}-${busNumber}`}>
												<AccordionTrigger>{`Bus Number: ${busNumber}`}</AccordionTrigger>
												<AccordionContent>
													<DataTable columns={columns} data={assignments} />
												</AccordionContent>
											</AccordionItem>
										)
									})}
								</Accordion>
							</AccordionContent>
						</AccordionItem>
					)
				})}
			</Accordion>
		</>
	)
}