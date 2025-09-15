import { z } from "zod";

// Runtime + Type-safe enum for status
export const leadStatusEnum = z.enum(
	["new", "contacted", "qualified", "unqualified"],
	"(Invalid lead status)"
);
export type LeadStatus = z.infer<typeof leadStatusEnum>;

export const leadSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "Name is required"),
	company: z.string().min(1, "Company is required"),
	email: z.email({ message: "(Invalid email address)" }), // ✅ updated
	source: z.string().optional(),
	score: z.number().min(0),
	status: leadStatusEnum,
});

// Full Lead type
export type Lead = z.infer<typeof leadSchema>;

// Form schema for Drawer
export const leadFormSchema = leadSchema.pick({
	email: true,
	status: true,
});

export const emailInputSchema = leadSchema.pick({
	email: true,
});
export type LeadFormValues = z.infer<typeof leadFormSchema>;
