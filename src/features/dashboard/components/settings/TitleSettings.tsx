import React from "react";
import InputSettings from "../InputSettings";

export default function TitleSettings() {
	function changeTitle() {
		return null;
	}

	return (
		<>
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
		</>
	);
}
