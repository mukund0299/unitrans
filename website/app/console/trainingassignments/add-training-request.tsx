"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multipleselector";
import { formatDate, isAfter, parse } from "date-fns";
import { BusType, postApiV1Preferences, TrainingRequest } from "@/lib/api/TrainingAssignmentsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const OPTIONS: Option[] = [
	{ label: "Electric Bus", value: BusType.ElectricBus },
	{ label: "New Dennis", value: BusType.NewDennis },
	{ label: "Old Dennis", value: BusType.OldDennis },
	{ label: "Xcelsior", value: BusType.Xcelsior },
	{ label: "NewFlyer", value: BusType.NewFlyer },
];

const optionSchema = z.object({
	label: z.string(),
	value: z.string(),
	disable: z.boolean().optional(),
});

const addRequestFormSchema = z.object({
	requestor: z.string().min(2, {message: "Must be at least two characters"}).max(30, {message: "Must be less than thirty characters"}),
	startTime: z.string(),
	endTime: z.string(),
	busTypes: z.array(optionSchema).min(1)
})

function createTime(time: string, date: Date): Date {
	return parse(time, "k:m", date)
}

interface AddTrainingRequestProps {
	date: Date,
	closeDialogOnSubmit: () => void
}

export default function AddTrainingRequest({date, closeDialogOnSubmit}: AddTrainingRequestProps) {
	const form = useForm<z.infer<typeof addRequestFormSchema>>({
		resolver: zodResolver(addRequestFormSchema)
	})

	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: (trainingRequest: TrainingRequest) => {
			return postApiV1Preferences(trainingRequest)
		},
		onSuccess: (response) => queryClient.setQueryData(["TrainingAssignmentsApi", "Preferences", formatDate(date, "yyyy-MM-dd")], response.data),
		onSettled: closeDialogOnSubmit
	})

	function onSubmit(values: z.infer<typeof addRequestFormSchema>) {
		const trainingRequest: TrainingRequest = {
			requestor: values.requestor,
			startTime: createTime(values.startTime, date).toISOString(),
			endTime: createTime(values.endTime, date).toISOString(),
			busTypes: values.busTypes.map(x => x.value as BusType)
		}
		console.log(trainingRequest)
		mutation.mutate(trainingRequest)
	}

	return (
		<Form {...form}>
		 	<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
		 		<FormField
					control={form.control}
					name="requestor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Requestor</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="startTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Start Time</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>End Time</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="busTypes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bus Types</FormLabel>
							<FormControl>
								<MultipleSelector 
									{...field} 
									onChange={field.onChange} 
									defaultOptions={OPTIONS} 
									placeholder="Select Bus Types" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Add Request</Button>
			</form>
		</Form>
	)
}