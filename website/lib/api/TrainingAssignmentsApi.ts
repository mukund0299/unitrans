import TrainingRequestsTable from "@/app/console/trainingassignments/training-requests-table";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

// Generic Types
export interface TrainingRequest {
	busTypes: BusType[];
	endTime: string;
	requestor: string;
	startTime: string;
}
export type BusType = (typeof BusType)[keyof typeof BusType];

export const BusType = {
	NewFlyer: "NewFlyer",
	Xcelsior: "Xcelsior",
	ElectricBus: "ElectricBus",
	NewDennis: "NewDennis",
	OldDennis: "OldDennis",
} as const;

// Schedule
export type DeleteApiV1ScheduleParams = {
	date: string;
};
  
export type GetApiV1ScheduleParams = {
	date: string;
};


export type GenerateRequestCapacities = { [key: string]: number };

export interface GenerateRequest {
	date: string;
	capacities?: GenerateRequestCapacities;
}

export interface TrainingAssignmentResponse {
	endTime: string;
	requestor: string;
	startTime: string;
}

export type GenerateResponseGroupedAssignments = {
	[key: string]: { [key: string]: TrainingAssignmentResponse[] };
};

export interface GenerateResponse {
	groupedAssignments: GenerateResponseGroupedAssignments;
}

export const putApiV1Schedule = <TData = AxiosResponse<GenerateResponse>>(
	generateRequest: GenerateRequest,
	options?: AxiosRequestConfig,
	): Promise<TData> => {
		return axios.put(`/api/v1/Schedule`, generateRequest, options);
	};

export const getApiV1Schedule = <TData = AxiosResponse<GenerateResponse>>(
	params: GetApiV1ScheduleParams,
	options?: AxiosRequestConfig,
	): Promise<TData> => {
	return axios.get(`/api/v1/Schedule`, {
		...options,
		params: { ...params, ...options?.params },
	});
};
	
export const deleteApiV1Schedule = <TData = AxiosResponse<void>>(
params: DeleteApiV1ScheduleParams,
options?: AxiosRequestConfig,
): Promise<TData> => {
	return axios.delete(`/api/v1/Schedule`, {
		...options,
		params: { ...params, ...options?.params },
	});
};

// Preferences
export type GetApiV1PreferencesParams = {
	date: string;
};

export const putApiV1Preferences = <TData = AxiosResponse<void>>(
	trainingRequest: TrainingRequest[],
	options?: AxiosRequestConfig,
	): Promise<TData> => {
		return axios.put(`/api/v1/Preferences`, trainingRequest, options);
};

export const getApiV1Preferences = <TData = AxiosResponse<TrainingRequest[]>>(
	params: GetApiV1PreferencesParams,
	options?: AxiosRequestConfig,
	): Promise<TData> => {
		return axios.get(`/api/v1/Preferences`, {
			...options,
			params: { ...params, ...options?.params },
		});
};

export const postApiV1Preferences = <TData = AxiosResponse<TrainingRequest[]>>(
	request: TrainingRequest,
	options?: AxiosRequestConfig): Promise<TData> => {
		return axios.post(`/api/v1/Preferences`, request, options)
}

export type PutApiV1PreferencesResult = AxiosResponse<void>;
export type GetApiV1PreferencesResult = AxiosResponse<TrainingRequest[]>;
export type PutApiV1ScheduleResult = AxiosResponse<GenerateResponse>;
export type GetApiV1ScheduleResult = AxiosResponse<GenerateResponse>;
export type DeleteApiV1ScheduleResult = AxiosResponse<void>;
  