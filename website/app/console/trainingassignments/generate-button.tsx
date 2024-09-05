"use client"

import { Button } from "@/components/ui/button"
import { GenerateRequest, putApiV1Schedule } from "@/lib/api/training-assignments-api"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { format, formatDate } from "date-fns"

async function GenerateTrainingSchedules(date: Date) {
	const generateRequest: GenerateRequest = {
		date: format(date, "yyyy-MM-dd"),
		capacities: {}
	}
	const data = await putApiV1Schedule(generateRequest)
	return data
}

interface GenerateButtonProps {
	date: Date,
}

export default function GenerateButton({date}: GenerateButtonProps) {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (date: Date) => {
			return GenerateTrainingSchedules(date)
		},
		onSuccess: (response) => queryClient.setQueryData(["TrainingAssignmentsApi", "Schedule", formatDate(date, "yyyy-MM-dd")], response.data)
	})

	return (
		<Button onClick={() => {
			mutation.mutate(date)
		}}>Generate</Button>
	)
}