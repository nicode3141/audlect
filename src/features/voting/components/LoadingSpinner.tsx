import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Loader2 className="animate-spin" />
		</div>
	);
}
