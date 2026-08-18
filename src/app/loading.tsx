import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className={"font-inter text-center text-2xl items-center flex justify-center h-screen w-screen"}>
			<div className="flex items-center justify-center flex-col gap-3">
				<div className="flex gap-2 items-center">
					<img src={"/app-logo.svg"} alt="Audlect Logo" width={35} />
					<div className="text-company font-nunito font-extrabold text-3xl text-shadow-md leading-[.9]">Audlect</div>
				</div>
				<Loader2 className="animate-spin" />
			</div>
		</div>
	);
}
