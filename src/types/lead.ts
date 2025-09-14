export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";

export interface Lead {
	id: number;
	name: string;
	company: string;
	email: string;
	source: string;
	score: number;
	status: LeadStatus;
}
