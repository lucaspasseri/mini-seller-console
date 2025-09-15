import { z } from "zod";

export const opportunityStageEnum = z.enum(
	[
		"prospecting",
		"qualification",
		"proposal",
		"negotiation",
		"closedWon",
		"closedLost",
	],
	"(Invalid opportunity stage)"
);
export type OpportunityStage = z.infer<typeof opportunityStageEnum>;

export const opportunitySchema = z.object({
	id: z.number(),
	name: z.string().min(1, "(Opportunity name is required)"),
	accountName: z.string().min(1, "(Account name is required)"),
	stage: opportunityStageEnum,
	amount: z.string().optional(),
	createdAt: z.date(),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

export const opportunityFormSchema = opportunitySchema.pick({
	name: true,
	accountName: true,
	stage: true,
	amount: true,
});
