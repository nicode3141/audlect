"use client";

import { Check, ExternalLink, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "~/shared/ui/button";
import {
	DialogContent,
	DialogClose,
	DialogDescription,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	Dialog,
} from "~/shared/ui/dialog";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";

interface IShareVotingDialogProps {
	shortId: string | undefined;
}

export default function ShareVotingDialog({ shortId }: IShareVotingDialogProps) {
	const router = useRouter();

	const [copiedLink, setCopiedLink] = React.useState<boolean>(false);
	const [redirecting, setRedirecting] = React.useState<boolean>(false);

	async function copyLinkToClipboard() {
		if (shortId === undefined) {
			toast.error("Invalid voting-id!");
			return;
		}
		try {
			await navigator.clipboard.writeText(`${window?.location.origin}/voting/${shortId}`);
			setCopiedLink(true);
			toast.success("Saved link to clipboard!");
			redirect();
		} catch (err) {
			toast.error("Couldn't save link to clipboard!");
			return;
		}
	}

	function redirect() {
		setRedirecting(true);
		try {
			router.push(`/voting/${shortId}`);
		} catch (err) {
			toast.error("Couldn't redirect to voting");
			setRedirecting(false);
		}
	}

	return (
		<Dialog open={true}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Invite friends</DialogTitle>
					<DialogDescription>Share this voting with your friends!</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input
							id="link"
							defaultValue={
								typeof window !== "undefined"
									? `${window.location.origin}/voting/${shortId}`
									: `https://audlect.nicodenetworks.com/voting/${shortId}`
							}
							readOnly
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<div className="flex flex-row gap-5 justify-center">
						<Button type="button" variant="secondary" disabled={redirecting} onClick={redirect}>
							{!redirecting ? (
								<>
									Open Voting <ExternalLink />
								</>
							) : (
								<>Redirecting...</>
							)}
						</Button>
						<Button type="button" onClick={copyLinkToClipboard}>
							{!copiedLink ? (
								<>
									Copy Link <Link />
								</>
							) : (
								<>
									Copied Link <Check />
								</>
							)}
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
