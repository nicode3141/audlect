"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/shared/ui/button";

interface ICopyLinkButtonProps extends Omit<React.ComponentProps<"button">, "children" | "onClick"> {
	url: string;
	copyChildren?: React.ReactNode;
	copiedChildren?: React.ReactNode;
}

export default function CopyLinkButton({ url, copyChildren, copiedChildren, ...props }: ICopyLinkButtonProps) {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);

			setCopied(true);
			toast.success("Saved link to clipboard!");

			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (err) {
			toast.error("Couldn't save link to clipboard!");
		}
	};

	return (
		<Button type="button" onClick={handleCopy} {...props}>
			{copied ? copiedChildren : copyChildren}
		</Button>
	);
}
