import type { Lead, LeadStatus } from "@/types/lead";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useState } from "react";
import TableActions from "./TableActions";

const tableHeaders = ["Name", "Company", "Email", "Source", "Score", "Status"];

export default function LeadTable({
	leads,
	isLoading,
	hasError,
	openDrawer,
}: {
	leads: Lead[];
	isLoading: boolean;
	hasError: string | null;
	openDrawer: (leadId: string) => void;
}) {
	const [searchInput, setSearchInput] = useState<string>("");
	const [selectedStatus, setSelectedStatus] = useState<LeadStatus | "all">(
		"all"
	);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

	function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchInput(e.target.value);
	}

	function handleSelectedStatus(value: string) {
		setSelectedStatus(value as LeadStatus | "all");
	}

	function handleSortOrder() {
		setSortOrder(prevState => (prevState === "desc" ? "asc" : "desc"));
	}

	return (
		<div className='border border-[#fdfdfd]rounded p-2'>
			<h3 className='mx-2 mb-4'>Leads({`${filteredLeads.length})`}</h3>
			<TableActions
				searchInput={searchInput}
				handleSearchInput={handleSearchInput}
				selectedStatus={selectedStatus}
				handleSelectedStatus={handleSelectedStatus}
				handleSortOrder={handleSortOrder}
			/>
			<Table>
				<TableHeader>
					<TableRow>
						{tableHeaders.map(header => (
							<TableHead key={header}>{header}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{isLoading ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								Loading...
							</TableCell>
						</TableRow>
					) : filteredLeads.length === 0 ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								No leads found
							</TableCell>
						</TableRow>
					) : hasError ? (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								{hasError}
							</TableCell>
						</TableRow>
					) : (
						filteredLeads.map(lead => (
							<TableRow key={lead.id} onClick={() => openDrawer(`${lead.id}`)}>
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
