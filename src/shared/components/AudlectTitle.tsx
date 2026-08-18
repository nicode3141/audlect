import React from "react";

export default function AudlectTitle() {
	return (
		<div className="flex gap-2 items-center">
			<img src={"/app-logo.svg"} alt="Audlect Logo" width={35} />
			<div className="text-company font-nunito font-extrabold text-3xl text-shadow-md leading-[.9]">Audlect</div>
		</div>
	);
}
