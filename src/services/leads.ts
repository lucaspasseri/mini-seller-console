import leads from "@/data/leads.json";
import type { Lead } from "@/types/lead";

export async function getLeads(): Promise<Lead[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(leads as Lead[]);
		}, 1000);
	});
}
