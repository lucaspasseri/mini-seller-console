import type { Opportunity } from "@/types/opportunity";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

const tableHeaders = ["Name", "Account", "Stage", "Amount", "Created at"];

export default function OpportunityTable({
	opportunities,
}: {
	opportunities: Opportunity[];
}) {
	return (
		<div className='border border-[#fdfdfd]rounded p-2'>
			<h3 className='mx-2 mb-4'>Opportunities({`${opportunities.length})`}</h3>
			<Table>
				<TableHeader>
					<TableRow>
						{tableHeaders.map(header => (
							<TableHead key={header}>{header}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{opportunities.length > 0 ? (
						opportunities.map((opportunity: Opportunity) => (
							<TableRow key={opportunity.id}>
								<TableCell>{opportunity.name}</TableCell>
								<TableCell>{opportunity.accountName}</TableCell>
								<TableCell>{opportunity.stage}</TableCell>
								<TableCell>{opportunity.amount || "-"}</TableCell>
								<TableCell>
									{opportunity.createdAt
										? opportunity.createdAt.toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
										  })
										: ""}
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={tableHeaders.length} className='text-center'>
								(No opportunities found)
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
