"use client"

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TrainingRequest } from "./training-requests-table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BusType } from "@/lib/apiclients/TrainingAssignmentsApi";
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "@/components/ui/multiselector";

interface AddTrainingRequestProps {
	addTrainingRequest: (request: TrainingRequest) => void
}

const addRequestFormSchema = z.object({
	requestor: z.string().min(2, {message: "Must be at least two characters"}).max(30, {message: "Must be less than thirty characters"}),
	startTime: z.string().time(),
	endTime: z.string().time(),
	busTypes: z.array(z.nativeEnum(BusType))
})

export default function AddTrainingRequest({addTrainingRequest}: AddTrainingRequestProps) {
	const form = useForm<z.infer<typeof addRequestFormSchema>>({
		resolver: zodResolver(addRequestFormSchema)
	})

	function onSubmit(values: z.infer<typeof addRequestFormSchema>) {
		console.log(values)
		// const trainingRequest: TrainingRequest = {
		// 	requestor: values.requestor,
		// 	startTime: new Date(values.startTime),
		// 	endTime: new Date(values.endTime),
		// 	busTypes: values.busTypes
		// }
		// addTrainingRequest(trainingRequest)
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
								<MultiSelector onValuesChange={field.onChange} values={field.value}>
								{/* <MultiSelectorTrigger>
        							<MultiSelectorInput placeholder="Select items" />
      							</MultiSelectorTrigger> */}
								<MultiSelectorContent>
									<MultiSelectorList>
										<MultiSelectorItem value={BusType.ElectricBus.toString()}>Electric Bus</MultiSelectorItem>
										<MultiSelectorItem value={BusType.NewDennis.toString()}>New Dennis</MultiSelectorItem>
										<MultiSelectorItem value={BusType.NewFlyer.toString()}>New Flyer</MultiSelectorItem>
										<MultiSelectorItem value={BusType.OldDennis.toString()}>Old Dennis</MultiSelectorItem>
										<MultiSelectorItem value={BusType.Xcelsior.toString()}>Xcelsior</MultiSelectorItem>
									</MultiSelectorList>
								</MultiSelectorContent>
								</MultiSelector>
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