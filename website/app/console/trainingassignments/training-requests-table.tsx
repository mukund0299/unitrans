"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { BusType } from "@/lib/apiclients/TrainingAssignmentsApi"

// Should come from swagger eventually
export type TrainingRequest = {
    requestor: string
    startTime: Date
    endTime: Date
    busTypes: BusType[]
}

const columns : ColumnDef<TrainingRequest>[] = [
	{
		accessorKey: "requestor",
		header: "Requestor"
	},
	{
		accessorKey: "startTime",
		header: "Start Time"
	},
	{
		accessorKey: "endTime",
		header: "End Time"
	},
	{
		accessorKey: "busTypes",
		header: "Bus Types"
	}
]

interface TrainingAssignmentsTableProps {
    data: TrainingRequest[]
}

export default function TrainingRequestsTable({data}: TrainingAssignmentsTableProps) {
	return (
		<DataTable columns={columns} data={data} />
	)
}