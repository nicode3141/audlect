import { Calendar1, Cog, Copy, ExternalLink, Globe, VoteIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "~/shared/ui/badge";
import { Button } from "~/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/shared/ui/card";
import { Progress } from "~/shared/ui/progress";
import { Separator } from "~/shared/ui/separator";

export default function page() {
	return (
		<div className="p-2.5">
			<Card>
				<div className="flex flex-col p-2">
					<CardHeader>
						<CardTitle>
							<div className="flex gap-2">
								<div className="font-montserrat text-xl">Audlect Top Songs</div>
								<Badge className="bg-success/15 text-success hover:bg-success/20 border-0 font-montserrat">
									active
								</Badge>
							</div>
						</CardTitle>
						<CardDescription>
							<span className="font-montserrat">Voting Description</span>
						</CardDescription>
						<CardContent>
							<div className="flex flex-col gap-5">
								<div className="flex font-inter text-sm gap-2.5">
									<Link href={"/settings"} className="px-2 py-1 border rounded-lg flex gap-2 items-center">
										<Cog size={20} />
										Settings
									</Link>
									<Link href={"/settings"} className="px-2 rounded-lg flex gap-2 items-center truncate bg-company">
										<ExternalLink size={20} />
										Open Live
									</Link>
								</div>
								<div className="flex flex-col gap-3 py-2">
									<div className="flex gap-2 items-center">
										<Globe />
										<div className="flex flex-col">
											<div className="text-xs text-neutral-200 font-inter">Public Link</div>
											<div className="flex-wrap text-sm font-mono text-neutral-300 break-all">
												https://audlect.nicodenetworks.com/voting/...
											</div>
										</div>
									</div>
									<Button>
										<Copy /> Copy Link
									</Button>
								</div>
								<Separator />
								<div className="flex flex-col gap-3">
									<div className="font-inter flex text-sm">
										<div className="flex flex-1 gap-2 text-neutral-300 items-center">
											<Calendar1 size={17} />
											Voting Timeline
										</div>
										<div className="font-semibold">51 days remaining</div>
									</div>
									<Progress value={20} />
									<div className="font-inter flex text-xs">
										<div className="flex flex-1 gap-2 text-neutral-300 items-center">May 1, 2025</div>
										<div className="flex flex-1 gap-2 text-neutral-300 items-center text-right justify-end">
											June 21, 2026
										</div>
									</div>
								</div>
								<Separator />
								<div className="flex flex-col pt-10 gap-5">
									<div className="border flex p-4 rounded-2xl items-center gap-5 border-neutral-300 px-5">
										<VoteIcon />
										<div className="flex flex-col">
											<div className="text-3xl font-semibold">14,300</div>
											<div className="text-sm">Total Votes</div>
										</div>
									</div>
									<div className="border flex p-4 rounded-2xl items-center gap-5 border-neutral-300 px-5">
										<VoteIcon />
										<div className="flex flex-col">
											<div className="text-3xl font-semibold">14,300</div>
											<div className="text-sm">Total Votes</div>
										</div>
									</div>
									<div className="border flex p-4 rounded-2xl items-center gap-5 border-neutral-300 px-5">
										<VoteIcon />
										<div className="flex flex-col">
											<div className="text-3xl font-semibold">14,300</div>
											<div className="text-sm">Total Votes</div>
										</div>
									</div>
									<div className="border flex p-4 rounded-2xl items-center gap-5 border-neutral-300 px-5">
										<VoteIcon />
										<div className="flex flex-col">
											<div className="text-3xl font-semibold">14,300</div>
											<div className="text-sm">Total Votes</div>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</CardHeader>
				</div>
			</Card>
		</div>
	);
}
