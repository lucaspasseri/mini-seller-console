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

	useEffect(() => {
		setName(`${lead?.company} - ${lead?.name}`);
		setAccount(lead?.company);
	}, [lead]);

	function handleStage(value: string) {
		setStage(value as OpportunityStage);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		console.log(amount);

		const newOpportunity: Opportunity = {
			id: Date.now(),
			name: name || "",
			accountName: account || "",
			stage,
			amount: amount ? Number(amount) : undefined,
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
					<div className='grid gap-4'>
						<div className='grid gap-3'>
							<Label htmlFor='name'>Opportunity Name</Label>
							<Input
								id='name'
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='account'>Account Name</Label>
							<Input
								id='account'
								name='account'
								value={account}
								onChange={e => setAccount(e.target.value)}
							/>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='stage'>Stage</Label>
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
										<SelectItem value='prospecting'>Prospecting</SelectItem>
										<SelectItem value='qualification'>Qualification</SelectItem>
										<SelectItem value='proposal'>Proposal</SelectItem>
										<SelectItem value='negotiation'>Negotiation</SelectItem>
										<SelectItem value='closedWon'>Closed Won</SelectItem>
										<SelectItem value='closeLost'>Close Lost</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
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
