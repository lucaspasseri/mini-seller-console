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
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Label } from "./ui/label";

export default function TableActions({
	searchInput,
	handleSearchInput,
	selectedStatus,
	handleSelectedStatus,
	handleSortOrder,
	sortOrder,
}: {
	searchInput: string;
	handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedStatus: LeadStatus | "all";
	handleSelectedStatus: (value: string) => void;
	handleSortOrder: () => void;
	sortOrder: "desc" | "asc";
}) {
	return (
		<form className='flex pb-4 gap-4'>
			<div className='relative w-full max-w-sm'>
				<Input
					id='searchInput'
					name='searchInput'
					placeholder='Search by name or company...'
					value={searchInput}
					onChange={handleSearchInput}
					className='pl-9'
				/>
				<Label htmlFor='searchInput' className='hover:cursor-pointer'>
					<Search
						className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
						size={16}
					/>
				</Label>
			</div>
			<Select
				name='statusSelect'
				value={selectedStatus}
				onValueChange={handleSelectedStatus}
			>
				<SelectTrigger className='w-40'>
					<Filter className='h-4 w-4 mr-2' />
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
			<Button type='button' variant='outline' onClick={handleSortOrder}>
				<ArrowUpDown className='h-4 w-4' />
				Score {sortOrder === "desc" ? "↓" : "↑"}
			</Button>
		</form>
	);
}
