import { useEffect, useState } from "react";
import LeadTable from "./components/LeadTable";

import { getLeads } from "./services/leads";
import type { Lead } from "./types/lead";
import LeadDetailsDrawer from "./components/LeadDetailsDrawer";

export default function App() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedLeadId, setSelectedLeadId] = useState<string>("");

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
		setIsOpen(true);
	}
	const selectedLead: Lead | undefined = leads.find(
		lead => `${lead.id}` === selectedLeadId
	);

	return (
		<>
			<h1>Mini Seller Console</h1>
			<LeadDetailsDrawer
				lead={selectedLead}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<LeadTable
				leads={leads}
				isLoading={loading}
				hasError={error}
				openDrawer={openDrawer}
			/>
		</>
	);
}
