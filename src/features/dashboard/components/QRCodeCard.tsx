"use client";

import { QrCode } from "lucide-react";
import React from "react";
import type { SettingsData } from "~/features/dashboard/hooks/useDashboard";

interface QRCodeProps {
	settings: SettingsData;
}

export default function QRCodeCard({ settings }: QRCodeProps) {
	return (
		<div className="flex items-center gap-2 font-montserrat font-semibold">
			<QrCode /> QR Code
		</div>
	);
}
