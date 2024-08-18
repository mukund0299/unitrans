"use client"

import TrainingRequestsTable, { TrainingRequest } from "./training-requests-table";
import { DatePicker } from "@/components/ui/datepicker";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddTrainingRequest from "./add-training-request";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function Page() {
	const [data, setData] = useState(() => new Array<TrainingRequest>())
	const [selectedDay, setSelectedDay] = useState(new Date())
	const [isDialogOpen, setDialogOpen] = useState(false)

	return (
		<div className="container">
			<div className="flex justify-between mx-auto">
				<DatePicker setTodayAsDefault={true} />
				<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button>Add Training Request</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New Training Request</DialogTitle>
						</DialogHeader>
						<AddTrainingRequest addTrainingRequest={(request: TrainingRequest) => {
							setData([...data, request])
							setDialogOpen(false)
							}} />
					</DialogContent>
				</Dialog>
			</div>
			<div className="mx-auto py-5">
				<TrainingRequestsTable data={data} />
			</div>
			<div className="flex flex-row-reverse">
				<Button>Generate</Button>
			</div>
		</div>
	)
}
