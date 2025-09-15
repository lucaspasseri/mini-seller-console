import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Lead } from "@/types/lead";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import type { Opportunity, OpportunityStage } from "@/types/opportunity";
import { opportunityFormSchema } from "@/schemas/opportunity.schema";
export function OpportunityDialog({
	isOpen,
	setIsOpen,
	setIsOpenDrawer,
	lead,
	setOpportunities,
}: {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	setIsOpenDrawer: Dispatch<SetStateAction<boolean>>;
	lead: Lead | undefined;
	setOpportunities: Dispatch<SetStateAction<Opportunity[]>>;
}) {
	const [name, setName] = useState<string | undefined>("");
	const [account, setAccount] = useState<string | undefined>("");
	const [stage, setStage] = useState<OpportunityStage>("prospecting");
	const [amount, setAmount] = useState<string>("");
	const [formError, setFormError] = useState<Record<string, string> | null>(
		null
	);

	useEffect(() => {
		setName(`${lead?.company} - ${lead?.name}`);
		setAccount(lead?.company);
	}, [lead]);

	function handleStage(value: string) {
		setStage(value as OpportunityStage);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const entry = {
			name,
			accountName: account,
			stage,
			amount,
		};

		const result = opportunityFormSchema.safeParse(entry);

		const errorObj: Record<string, string> = {};
		if (!result.success) {
			result.error.issues.forEach(issue => {
				const key = issue.path[0] as string;
				const message = issue.message;
				errorObj[key] = message;
			});

			setFormError(errorObj);
			return;
		}
		setFormError(null);

		const newOpportunity: Opportunity = {
			id: Date.now(),
			name: result.data.name,
			accountName: result.data.accountName,
			stage: result.data.stage,
			amount: result.data.amount,
			createdAt: new Date(),
		};

		setOpportunities(prev => [...prev, newOpportunity]);
		setIsOpen(false);
		setName("");
		setAccount("");
		setStage("prospecting");
		setAmount("");
		setIsOpenDrawer(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form onSubmit={handleSubmit} id='convertOpportunity'>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Convert to Opportunity</DialogTitle>
						<DialogDescription>
							{`Convert ${lead?.name} from ${lead?.company} into a sales opportunity.`}
						</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 mt-8'>
						<div className='grid gap-3'>
							<Label htmlFor='name'>Opportunity Name</Label>
							<div>
								<Input
									id='name'
									name='name'
									value={name}
									onChange={e => setName(e.target.value)}
								/>
								{formError?.name ? (
									<p className='text-red-400'>{formError.name}</p>
								) : null}
							</div>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='account'>Account Name</Label>
							<div>
								<Input
									id='account'
									name='account'
									value={account}
									onChange={e => setAccount(e.target.value)}
								/>
								{formError?.accountName ? (
									<p className='text-red-400'>{formError.accountName}</p>
								) : null}
							</div>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='stage'>Stage</Label>
							<div>
								<Select
									name='stageSelect'
									value={stage}
									onValueChange={handleStage}
								>
									<SelectTrigger className='w-[200px]' aria-labelledby='stage'>
										<SelectValue placeholder='Select a Status' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Stage</SelectLabel>
											<SelectItem value='Broke'>Broke</SelectItem>
											<SelectItem value='prospecting'>Prospecting</SelectItem>
											<SelectItem value='qualification'>
												Qualification
											</SelectItem>
											<SelectItem value='proposal'>Proposal</SelectItem>
											<SelectItem value='negotiation'>Negotiation</SelectItem>
											<SelectItem value='closedWon'>Closed Won</SelectItem>
											<SelectItem value='closeLost'>Close Lost</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								{formError?.stage ? (
									<p className='text-red-400'>{formError.stage}</p>
								) : null}
							</div>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='amount'>Amount (Optional)</Label>
							<Input
								id='amount'
								name='amount'
								placeholder='0.00'
								value={amount}
								type='number'
								step={0.01}
								min={0}
								onChange={e => setAmount(e.target.value)}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button type='submit' form='convertOpportunity'>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
