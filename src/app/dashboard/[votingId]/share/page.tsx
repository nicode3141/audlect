"use client";

import { Cog, ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import LinkCard from "~/features/dashboard/components/LinkCard";
import QRCodeCard from "~/features/dashboard/components/QRCodeCard";
import QRCode from "~/features/dashboard/components/QRCodeCard";
import { useAnalytics, useSettings } from "~/features/dashboard/hooks/useDashboard";
import { Badge } from "~/shared/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/shared/ui/card";
import { Separator } from "~/shared/ui/separator";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);

	if (!settings) return null;

	return (
		<div className="px-4 pb-6">
			<div className="px-6 py-4 pb-10">
				<span className="font-montserrat font-semibold text-xl">Share</span>
				<div className="font-montserrat text-sm">Invite your friends to the next party.</div>
			</div>
			<Card className="md:w-[75%] md:mx-auto md:p-4">
				<div className="flex flex-col p-2 dark:text-white">
					<CardHeader className="gap-0">
						<CardTitle>
							<div className="flex gap-2">
								<div className="font-montserrat text-xl md:text-2xl">{settings?.name ?? "Loading..."}</div>
								{settings?.active ? (
									<Badge className="bg-success/15 text-success hover:bg-success/20 border-0 font-montserrat">
										active
									</Badge>
								) : (
									<Badge className="bg-neutral-700 text-gray-200 hover:bg-neutral-300 border-0 font-montserrat">
										inactive
									</Badge>
								)}
							</div>
						</CardTitle>
						<CardDescription>
							<span className="font-montserrat md:text-lg">{settings?.description}</span>
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-5 pt-2">
						<LinkCard shortId={votingId} />
						<Separator />
						<QRCodeCard settings={settings} />
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
