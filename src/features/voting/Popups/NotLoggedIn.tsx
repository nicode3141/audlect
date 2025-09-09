import { SignInButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "~/components/ui/@shadcn/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/@shadcn/dialog";
import { useLoginWarning } from "~/context/LoginWarningContext";

export default function NotLoggedIn() {
	const { showWarning, hideLoginWarning } = useLoginWarning();

	return (
		<Dialog open={showWarning} onOpenChange={hideLoginWarning}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="font-inter">Log In To Vote</DialogTitle>
					<DialogDescription className="font-inter">
						You&apos;re viewing the <b>Read-Only Version</b> of nicodenetworks! Please Log In to Vote!
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<SignInButton>
						<Button variant="default">Sign In</Button>
					</SignInButton>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
