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
import type { LeadStatus } from "@/types/lead";

export default function TableActions({
	searchInput,
	handleSearchInput,
	selectedStatus,
	handleSelectedStatus,
	handleSortOrder,
}: {
	searchInput: string;
	handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedStatus: LeadStatus | "all";
	handleSelectedStatus: (value: string) => void;
	handleSortOrder: () => void;
}) {
	return (
		<div className='flex pb-4 gap-4'>
			<Input
				placeholder='Search by name or company...'
				value={searchInput}
				onChange={handleSearchInput}
			/>
			<Select value={selectedStatus} onValueChange={handleSelectedStatus}>
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
			<Button variant='outline' onClick={handleSortOrder}>
				Sort Leads
			</Button>
		</div>
	);
}
