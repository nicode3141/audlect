import React from "react";

export default function StatsCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
	return (
		<div className="border flex p-4 rounded-2xl items-center gap-5 border-neutral-300 px-5 shadow-sm shadow-neutral-60 transition-colors duration-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer">
			<div className="p-2 bg-company rounded-lg transition-colors duration-200">{icon}</div>
			<div className="flex flex-col">
				<div className="text-3xl font-semibold">{value.toLocaleString()}</div>
				<div className="text-sm">{label}</div>
			</div>
		</div>
	);
}
