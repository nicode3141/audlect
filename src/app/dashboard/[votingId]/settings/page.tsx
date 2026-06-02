"use client";

import { useParams } from "next/navigation";
import React from "react";
import InputSettings from "~/features/dashboard/components/InputSettings";
import { useAnalytics, useSettings } from "~/features/dashboard/hooks/useDashboard";
import { Button } from "~/shared/ui/button";
import { Card, CardContent } from "~/shared/ui/card";
import { Checkbox } from "~/shared/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/shared/ui/dialog";
import { Field } from "~/shared/ui/field";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";

export default function Page() {
	const { votingId } = useParams<{ votingId: string }>();
	const { data: settings } = useSettings(votingId);
	const { data: stats } = useAnalytics(votingId);

	return (
		<div>
			<div className="px-6 py-4 pb-10">
				<span className="font-montserrat font-semibold text-xl">Settings</span>
				<div className="font-montserrat text-sm">Customize your own voting to fit your needs.</div>
			</div>
			<Card>
				<CardContent className="flex flex-col gap-2 p-3 px-4">
					<div className="dark:text-white">
						<div className="font-semibold">Voting Title</div>
						<InputSettings
							currentValue={"Audlect Top Songs"}
							action={"Change Title"}
							actionDesc={"Customize the name of your voting!"}
							onChange={function (): void {
								throw new Error("Function not implemented.");
							}}
							loading={false}
						/>
					</div>
					<div className="dark:text-white">
						<div className="font-semibold">Voting Description</div>
						<InputSettings
							currentValue={"Best songs from this month"}
							action={"Change Description"}
							actionDesc={"Customize the description of your voting!"}
							onChange={function (): void {
								throw new Error("Function not implemented.");
							}}
							loading={false}
						/>
					</div>
					<div className="flex items-center gap-4 dark:text-white">
						Private
						<Checkbox checked={true} />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
