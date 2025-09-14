import type { Lead, LeadStatus } from "@/types/lead";
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
import { Input } from "./ui/input";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const tableHeaders = ["Name", "Company", "Email", "Source", "Score", "Status"];

export default function LeadTable() {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [searchInput, setSearchInput] = useState<string>("");
	const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "all">(
		"all"
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

	function filterBySearchInput(leads: Lead[]) {
		const filtered = leads.filter(lead => {
			if (
				lead.name
					.toLocaleLowerCase()
					.includes(searchInput.toLocaleLowerCase()) ||
				lead.company
					.toLocaleLowerCase()
					.includes(searchInput.toLocaleLowerCase())
			) {
				return true;
			}
		});
		return filtered;
	}

	let filteredLeads = filterBySearchInput(leads);

	function filterByLeadStatus(leads: Lead[]) {
		const filtered = leads.filter(lead => {
			if (selectedStatus === "all" || selectedStatus === lead.status) {
				return true;
			}

			return false;
		});

		return filtered;
	}

	filteredLeads = filterByLeadStatus(filteredLeads);

	function sortLeads(leads: Lead[]) {
		return leads.sort((a, b) =>
			sortOrder === "desc" ? b.score - a.score : a.score - b.score
		);
	}

	filteredLeads = sortLeads(filteredLeads);

	return (
		<div className='border border-black rounded p-2'>
			<div className='flex'>
				<Input
					placeholder='Search...'
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>
				<Select
					value={selectedStatus}
					onValueChange={value =>
						setSelectedStatus(value as LeadStatus | "all")
					}
				>
					<SelectTrigger className='w-[200px]'>
						<SelectValue placeholder='Select a Status' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value='all'>All</SelectItem>
							<SelectItem value='new'>New</SelectItem>
							<SelectItem value='contacted'>Contacted</SelectItem>
							<SelectItem value='qualified'>Qualified</SelectItem>
							<SelectItem value='unqualified'>Unqualified</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button
					variant='outline'
					onClick={() => {
						setSortOrder(prevState => (prevState === "desc" ? "asc" : "desc"));
					}}
				>
					Sort Leads
				</Button>
			</div>
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
						filteredLeads.map(lead => (
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
