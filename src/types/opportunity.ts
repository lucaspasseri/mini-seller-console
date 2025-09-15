export type OpportunityStage =
	| "prospecting"
	| "qualification"
	| "proposal"
	| "negotiation"
	| "closedWon"
	| "closedLost";

export interface Opportunity {
	id: number;
	name: string;
	accountName: string;
	stage: OpportunityStage;
	amount?: number;
}
