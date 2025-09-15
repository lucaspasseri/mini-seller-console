import type { Lead, LeadStatus } from "@/types/lead";
import { Button } from "./ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "./ui/drawer";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { emailInputSchema, leadFormSchema } from "@/schemas/lead.schema";

export default function LeadDetailsDrawer({
	lead,
	isOpen,
	setIsOpen,
	openDialog,
}: {
	lead: Lead | undefined;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	openDialog: Dispatch<SetStateAction<boolean>>;
}) {
	const [isEditActive, setIsEditActive] = useState<boolean>(false);
	const [email, setEmail] = useState<string | undefined>("");
	const [status, setStatus] = useState<string | undefined>("");
	const [formError, setFormError] = useState<Record<string, string> | null>(
		null
	);

	useEffect(() => {
		setEmail(lead?.email);
		setStatus(lead?.status);
	}, [lead]);

	function handleStatus(value: string) {
		setStatus(value as LeadStatus | "all");
	}

	function handleCancel() {
		setEmail(lead?.email);
		setStatus(lead?.status);
		setIsEditActive(false);
	}
	function handleOpenEdit() {
		setIsEditActive(true);
	}
	function handleSave(e: React.FormEvent) {
		e.preventDefault();

		const entry = {
			email,
			status,
		};

		const result = leadFormSchema.safeParse(entry);
		const errorObj: Record<string, string> = {};
		if (!result.success) {
			result.error.issues.forEach(issue => {
				const key = issue.path[0] as string;
				const message = issue.message;
				errorObj[key] = message;
			});

			setFormError(errorObj);
		} else {
			setFormError(null);
			setIsEditActive(false);
		}
	}

	function handleOnOpenChange() {
		setIsOpen(false);
		setIsEditActive(false);
	}

	function handleEmailInput(e: any) {
		const currValue = e.currentTarget.value;
		setEmail(currValue);
		const result = emailInputSchema.safeParse({ email: currValue });
		const errorObj: Record<string, string> = {};
		if (!result.success) {
			const key = result.error.issues[0].path[0] as string;
			const message = result.error.issues[0].message;
			errorObj[key] = message;
			setFormError(errorObj);
		} else {
			setFormError(null);
		}
	}

	return (
		<Drawer open={isOpen} onOpenChange={handleOnOpenChange} direction='right'>
			<DrawerContent className='right-0 top-0 h-full w-[400px] max-w-full border-l'>
				<DrawerHeader className='relative'>
					<DrawerTitle>Lead Details</DrawerTitle>
					<DrawerClose className='absolute top-4 right-4'>Close</DrawerClose>
				</DrawerHeader>

				<form className='mt-4 px-4 flex flex-col gap-6' onSubmit={handleSave}>
					<div>
						<DrawerDescription>Contact information</DrawerDescription>
						<div className='mt-1'>
							<div className='flex items-center h-8'>
								<p className='font-medium'>Name: {`${lead?.name}`}</p>
							</div>
							<div className='flex items-center h-8'>
								<p className='font-medium'>Company: {`${lead?.company}`}</p>
							</div>

							{isEditActive ? (
								<div>
									<div className='flex items-center h-8'>
										<Label htmlFor='emailInput' className='text-[16px]'>
											Email:
										</Label>
										<Input
											id='emailInput'
											name='emailInput'
											value={email}
											onChange={handleEmailInput}
										/>
									</div>
									{formError?.email ? (
										<p className='text-red-400'> {formError.email}</p>
									) : null}
								</div>
							) : (
								<div className='flex items-center h-8'>
									<p className='font-medium'>Email: {`${email ?? ""}`}</p>
								</div>
							)}
						</div>
					</div>
					<div>
						<DrawerDescription>Lead metrics</DrawerDescription>
						<div className='mt-1 '>
							<div className='flex items-center h-8'>
								<p className='font-medium'>Source: {`${lead?.source}`}</p>
							</div>
							<div className='flex items-center h-8'>
								<p className='font-medium'> Score: {`${lead?.score}`}</p>
							</div>
						</div>
					</div>
					<div>
						<DrawerDescription className='pb-2'>
							<Label id='statusSelect' className='font-normal'>
								Status
							</Label>
						</DrawerDescription>
						{isEditActive ? (
							<div>
								<div className='flex items-center h-8'>
									<Select
										name='statusSelect'
										value={status ?? ""}
										onValueChange={handleStatus}
									>
										<SelectTrigger
											className='w-[200px]'
											aria-labelledby='statusSelect'
										>
											<SelectValue placeholder='Select a Status' />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Status</SelectLabel>
												<SelectItem value='new'>New</SelectItem>
												<SelectItem value='contacted'>Contacted</SelectItem>
												<SelectItem value='qualified'>Qualified</SelectItem>
												<SelectItem value='unqualified'>Unqualified</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								{formError?.status ? (
									<p className='text-red-400'>{formError.status}</p>
								) : null}
							</div>
						) : (
							<div className='flex items-center h-8'>
								<p className='font-medium'> {`${status ?? ""}`}</p>
							</div>
						)}
					</div>
					<div>
						<DrawerDescription>Edit information</DrawerDescription>
						<div className='mt-2 flex gap-4'>
							{isEditActive ? (
								<>
									<Button
										onClick={handleCancel}
										type='button'
										variant='outline'
									>
										Cancel
									</Button>
									<Button type='submit'>Save Changes</Button>
								</>
							) : (
								<Button type='button' onClick={handleOpenEdit}>
									Edit
								</Button>
							)}
						</div>
					</div>
				</form>
				<DrawerFooter>
					<DrawerDescription>Convert to Opportunity</DrawerDescription>
					<Button type='button' onClick={() => openDialog(true)}>
						Convert Lead
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
