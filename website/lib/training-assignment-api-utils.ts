import { BusType } from "./api/training-assignments-api";

export function busTypeDisplayName(busType: BusType): string {
	switch (busType) {
		case "NewFlyer": return "New Flyer"
		case "Xcelsior": return "Xcelsior"
		case "ElectricBus": return "Electric Bus"
		case "NewDennis": return "New Dennis"
		case "OldDennis": return "Old Dennis"
	}
}