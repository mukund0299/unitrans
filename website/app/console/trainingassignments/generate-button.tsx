"use client"

import { Button } from "@/components/ui/button"
import { GetApiV1PreferencesParams, getApiV1Preferences, GenerateRequest, putApiV1Schedule } from "@/lib/api/TrainingAssignmentsApi"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { format, formatDate } from "date-fns"

async function GetPreferences(date: Date) {
	const preferencesRequest: GetApiV1PreferencesParams = {
		date: format(date, "yyyy-MM-dd")
	}
	const data = await getApiV1Preferences(preferencesRequest)
	return data.data
}

async function GenerateTrainingSchedules(date: Date) {
	const generateRequest: GenerateRequest = {
		date: format(date, "yyyy-MM-dd"),
		capacities: {}
	}
	const data = await putApiV1Schedule(generateRequest)
	console.log(data)
	return data
}

interface GenerateButtonProps {
	date: Date,
}

export default function GenerateButton({date}: GenerateButtonProps) {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (date: Date) => {
			console.log("In mutation")
			return GenerateTrainingSchedules(date)
		},
		onSuccess: (response) => queryClient.setQueryData(["TrainingAssignmentsApi", "Schedule", formatDate(date, "yyyy-MM-dd")], response.data)
	})

	return (
		<Button onClick={() => {
			console.log("Button clicked!")
			mutation.mutate(date)
		}}>Generate</Button>
	)
}