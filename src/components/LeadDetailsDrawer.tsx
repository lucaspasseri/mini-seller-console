import type { Lead } from "@/types/lead";
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
import type { Dispatch, SetStateAction } from "react";

export default function LeadDetailsDrawer({
	lead,
	isOpen,
	setIsOpen,
}: {
	lead: Lead | undefined;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
			<DrawerContent className='right-0 top-0 h-full w-[400px] max-w-full border-l'>
				<DrawerHeader className='relative'>
					<DrawerTitle>Lead Details</DrawerTitle>
					<DrawerClose className='absolute top-4 right-4'>Close</DrawerClose>
				</DrawerHeader>

				<div className='px-4 flex flex-col gap-6'>
					<div>
						<DrawerDescription>Contact information</DrawerDescription>
						<div>
							<div>Name: {`${lead?.name}`}</div>
							<div>Company: {`${lead?.company}`}</div>
							<div>Email: {`${lead?.email}`}</div>
						</div>
					</div>
					<div>
						<DrawerDescription>Lead metrics</DrawerDescription>
						<div>
							<div>Source: {`${lead?.source}`}</div>
							<div className='flex justify-between flex-wrap'>
								<div>Score: {`${lead?.score}`}</div>
								<div>Status: {`${lead?.status}`}</div>
							</div>
						</div>
					</div>
				</div>
				<DrawerFooter>
					<Button>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
