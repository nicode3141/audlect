import React from "react";
import { SignIn } from "~/features/auth/components/SignInBtn";
import { Button } from "~/shared/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/shared/ui/dialog";
import { useLoginWarning } from "~/shared/components/LoginWarningContext";

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
					<SignIn />
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
