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

export default function LeadDetailsDrawer({
	lead,
	isOpen,
	setIsOpen,
}: {
	lead: Lead | undefined;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const [isEditActive, setIsEditActive] = useState<boolean>(false);
	const [email, setEmail] = useState<string | undefined>(lead?.email);
	const [status, setStatus] = useState<string | undefined>(lead?.status);

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
	function handleSave(e: any) {
		e.preventDefault();
		setIsEditActive(false);
	}

	function handleOnOpenChange() {
		setIsOpen(false);
		setIsEditActive(false);
	}

	return (
		<Drawer open={isOpen} onOpenChange={handleOnOpenChange} direction='right'>
			<DrawerContent className='right-0 top-0 h-full w-[400px] max-w-full border-l'>
				<DrawerHeader className='relative'>
					<DrawerTitle>Lead Details</DrawerTitle>
					<DrawerClose className='absolute top-4 right-4'>Close</DrawerClose>
				</DrawerHeader>

				<form className='px-4 flex flex-col gap-6' onSubmit={handleSave}>
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
								<div className='flex items-center h-8'>
									<Label htmlFor='emailInput' className='text-[16px]'>
										Email:
									</Label>
									<Input
										id='emailInput'
										name='emailInput'
										type='email'
										value={email}
										onChange={e => setEmail(e.currentTarget.value)}
									/>
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

							{isEditActive ? (
								<div className='flex items-center h-8'>
									<Label id='statusSelect' className='text-[16px]'>
										Status:
									</Label>
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
							) : (
								<div className='flex items-center h-8'>
									<p className='font-medium'>Status: {`${status ?? ""}`}</p>
								</div>
							)}
						</div>
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
									<Button type='submit'>Save</Button>
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
					<Button type='submit'>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
