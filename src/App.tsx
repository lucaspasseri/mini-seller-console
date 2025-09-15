import { useEffect, useState } from "react";
import LeadTable from "./components/LeadTable";

import { getLeads } from "./services/leads";
import type { Lead } from "./types/lead";
import LeadDetailsDrawer from "./components/LeadDetailsDrawer";
import Header from "./components/Header";
import { OpportunityDialog } from "./components/OpportunityDialog";

export default function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
	const [selectedLeadId, setSelectedLeadId] = useState<string>("");
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

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
		<div className='px-2 md:px-8'>
			<Header />
			<LeadTable
				leads={leads}
				isLoading={loading}
				hasError={error}
				openDrawer={openDrawer}
			/>
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
