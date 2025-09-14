import type { Lead } from "@/types/lead";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { getLeads } from "@/services/leads";

const tableHeaders = ["Name", "Company", "Email", "Source", "Score", "Status"];

export default function LeadTable() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

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

	return (
		<div className='border border-black rounded p-2'>
			<Table>
				<TableHeader>
					<TableRow>
						{tableHeaders.map(header => (
							<TableHead key={header}>{header}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								Loading...
							</TableCell>
						</TableRow>
					) : leads.length === 0 ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								No leads found
							</TableCell>
						</TableRow>
					) : error ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								{error}
							</TableCell>
						</TableRow>
					) : (
						leads.map(lead => (
							<TableRow key={lead.id}>
								<TableCell>{lead.name}</TableCell>
								<TableCell>{lead.company}</TableCell>
								<TableCell>{lead.email}</TableCell>
								<TableCell>{lead.source}</TableCell>
								<TableCell>{lead.score}</TableCell>
								<TableCell>{lead.status}</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
