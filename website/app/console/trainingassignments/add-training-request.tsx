"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TrainingRequest } from "./training-requests-table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BusType } from "@/lib/apiclients/TrainingAssignmentsApi";
import MultipleSelector, { Option } from "@/components/ui/multipleselector";

const OPTIONS: Option[] = [
	{ label: "Electic Bus", value: BusType.ElectricBus },
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

interface AddTrainingRequestProps {
	date: Date | undefined,
	addTrainingRequest: (request: TrainingRequest) => void
}

export default function AddTrainingRequest({date, addTrainingRequest}: AddTrainingRequestProps) {
	const form = useForm<z.infer<typeof addRequestFormSchema>>({
		resolver: zodResolver(addRequestFormSchema)
	})

	function onSubmit(values: z.infer<typeof addRequestFormSchema>) {
		const startTime = new Date(date ??  new Date());
		startTime.setHours(+values.startTime.split(":")[0], +values.startTime.split(":")[1])

		const endTime = new Date(date ?? new Date());
		endTime.setHours(+values.endTime.split(":")[0], +values.endTime.split(":")[1])
		const trainingRequest: TrainingRequest = {
			requestor: values.requestor,
			startTime: startTime,
			endTime: endTime,
			busTypes: values.busTypes.map(x => x.value as BusType)
		}
		console.log(trainingRequest)
		addTrainingRequest(trainingRequest)
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}