"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { format, formatDate, parseISO } from "date-fns"
import { TrainingRequest, BusType, GetApiV1PreferencesParams, getApiV1Preferences } from "@/lib/api/training-assignments-api"
import { busTypeDisplayName } from "@/lib/training-assignment-api-utils"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

const columns : ColumnDef<TrainingRequest>[] = [
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
		
	},
	{
		accessorKey: "busTypes",
		header: "Bus Types",
		cell: ({ row }) => {
			const types = row.getValue("busTypes") as BusType[]
			return <div>{types.map(x => busTypeDisplayName(x)).join(", ")}</div>
		  },
	},
	{
		id: "delete",
		cell: ({ row }) => {
			return (
				<Button onClick={() => console.log("Delete is not yet implemented")}><Trash></Trash></Button>
			)
		}
	}
]

interface TrainingRequestsTableProps {
	date: Date,
}

async function GetPreferences(date: Date) {
	const preferencesRequest: GetApiV1PreferencesParams = {
		date: format(date, "yyyy-MM-dd")
	}
	const data = await getApiV1Preferences(preferencesRequest)
	return data.data
}

export default function TrainingRequestsTable({date}: TrainingRequestsTableProps) {
	const {isPending, error, data} = useQuery({
		queryKey: ["TrainingAssignmentsApi", "Preferences", formatDate(date, "yyyy-MM-dd")], 
		queryFn: () => GetPreferences(date)})

	if (isPending) return `Loading Training Requests for: ${formatDate(date, "yyyy-MM-dd")}`
	if (error) return 'An error has occurred: ' + error.message
	return (
		<DataTable columns={columns} data={data} />
	)
}