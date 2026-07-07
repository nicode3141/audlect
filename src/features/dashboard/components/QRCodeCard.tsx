"use client";

import { Download, Loader2, QrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";

import QRCodeStyling from "qr-code-styling";

interface QRCodeProps {
	settings: SettingsData;
}

export default function QRCodeCard({ settings }: QRCodeProps) {
	const ref = useRef<HTMLDivElement>(null);
	const qrRef = useRef<QRCodeStyling | null>(null);
	const [isReady, setIsReady] = useState(false);

	const url = settings ? `https://audlect.nicodenetworks.com/voting/${settings.short_id}` : "";

	useEffect(() => {
		if (!url || !ref.current) return;

		setIsReady(false);

		const container = ref.current;
		container.innerHTML = "";

		const qr = new QRCodeStyling({
			width: 600,
			height: 600,
			data: url,
			type: "svg",
			dotsOptions: {
				color: "#000000",
				type: "rounded",
			},
			backgroundOptions: {
				color: "#ffffff",
			},
		});
		qr.append(container);
		qrRef.current = qr;
		setIsReady(true);
	}, [url]);

	const handleDownload = async () => {
		await qrRef.current?.download({ name: "audlect-code", extension: "png" });
	};

	return (
		<div className="pb-5">
			<div className="flex items-center gap-2 px-2 font-montserrat font-semibold">
				<QrCode /> QR Code
			</div>
			<div className="flex flex-col items-center justify-center gap-5 pt-5">
				<div
					className="relative flex size-50 items-center justify-center rounded-lg border-2 border-neutral-300 p-1
						dark:bg-white shadow-xs"
				>
					<div ref={ref} className="flex items-center justify-center size-full [&_svg]:max-w-full [&_svg]:max-h-full" />
					{!isReady && (
						<div className="absolute inset-0 flex items-center justify-center bg-white/80">
							<Loader2 className="size-8 animate-spin text-neutral-400" />
						</div>
					)}
				</div>
				{url && isReady && (
					<button
						onClick={handleDownload}
						className="flex cursor-pointer items-center gap-2 text-sm text-neutral-500 transition-colors
							hover:text-neutral-300"
					>
						<Download className="size-4" /> Download
					</button>
				)}
			</div>
		</div>
	);
}
