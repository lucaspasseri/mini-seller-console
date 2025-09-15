import { useEffect, useState } from "react";
import LeadTable from "./components/LeadTable";

import { getLeads } from "./services/leads";
import type { Lead } from "./types/lead";
import LeadDetailsDrawer from "./components/LeadDetailsDrawer";
import Header from "./components/Header";
import { OpportunityDialog } from "./components/OpportunityDialog";
import OpportunityTable from "./components/OpportunityTable";
import type { Opportunity } from "./types/opportunity";

export const opportunitiesExamples: Opportunity[] = [
	{
		id: 1,
		name: "Website Redesign",
		accountName: "Acme Corp",
		stage: "prospecting",
		amount: 5000,
	},
	{
		id: 2,
		name: "CRM Migration",
		accountName: "TechNova",
		stage: "qualification",
		amount: 12000,
	},
	{
		id: 3,
		name: "Mobile App Development",
		accountName: "StartUpX",
		stage: "proposal",
		amount: 25000,
	},
	{
		id: 4,
		name: "Cloud Infrastructure",
		accountName: "DataWorks",
		stage: "negotiation",
		amount: 40000,
	},
	{
		id: 5,
		name: "SEO Optimization",
		accountName: "Bright Marketing",
		stage: "closedWon",
		amount: 8000,
	},
	{
		id: 6,
		name: "ERP Implementation",
		accountName: "Global Industries",
		stage: "closedLost",
		amount: 60000,
	},
];

export default function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
	const [selectedLeadId, setSelectedLeadId] = useState<string>("");
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
	const [opportunities, setOpportunities] = useState<Opportunity[]>(
		opportunitiesExamples
	);

	async function loadLeads() {
		try {
			setLoading(true);
			setError(null);
			const currLeads = await getLeads();
			setLeads(currLeads);
		} catch (err) {
			setError(`Get leads failed: Refresh to try again.`);
			console.error(`Get leads failed: ${err}`);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadLeads();
	}, []);

	function openDrawer(leadId: string) {
		setSelectedLeadId(leadId);
		setIsOpenDrawer(true);
	}
	const selectedLead: Lead | undefined = leads.find(
		lead => `${lead.id}` === selectedLeadId
	);

	return (
		<div className='px-2 md:px-8 '>
			<Header />
			<div className='grid gap-8'>
				<LeadTable
					leads={leads}
					isLoading={loading}
					hasError={error}
					openDrawer={openDrawer}
				/>
				<OpportunityTable opportunities={opportunities} />
			</div>
			<LeadDetailsDrawer
				lead={selectedLead}
				isOpen={isOpenDrawer}
				setIsOpen={setIsOpenDrawer}
				openDialog={setIsOpenDialog}
			/>
			<OpportunityDialog
				isOpen={isOpenDialog}
				setIsOpen={setIsOpenDialog}
				lead={selectedLead}
			/>
		</div>
	);
}
