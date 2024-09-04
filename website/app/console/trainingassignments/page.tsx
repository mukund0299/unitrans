"use client"

import TrainingRequestsTable from "./training-requests-table";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddTrainingRequest from "./add-training-request";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QueryClient, QueryClientProvider, useMutation, useQueryClient } from "@tanstack/react-query";
import TrainingScheduleTable from "./training-schedule-table";
import GenerateButton from "./generate-button";
import { Separator } from "@/components/ui/separator";

const queryClient = new QueryClient()

export default function Page() {
	const [date, setDate] = useState<Date>(new Date())
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	return (
		<QueryClientProvider client={queryClient}>
			<div className="container">
				<div className="flex justify-between mx-auto">
					<DatePicker date={date} onSelect={(date) => setDate(date ?? new Date())} />
					<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
						<DialogTrigger asChild>
							<Button>Add Training Request</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>New Training Request</DialogTitle>
							</DialogHeader>
							<AddTrainingRequest date={date} closeDialogOnSubmit={() => setIsAddDialogOpen(false)} />
						</DialogContent>
					</Dialog>
				</div>
				<div className="mx-auto py-5">
					<TrainingRequestsTable date={date} />
				</div>
				<div className="flex flex-row-reverse">
					<GenerateButton date={date}></GenerateButton>
				</div>
			</div>
			<Separator className="my-4"></Separator>
			<div className="container"> 
				<TrainingScheduleTable date={date} />
			</div>
		</QueryClientProvider>
	)
}