import HomeButton from "~/shared/components/HomeButton";
import { Gray } from "~/shared/utils/generics";

export default function HeroSection() {
	return (
		<main className="h-[180vw] w-full md:h-auto">
			<div className="hidden md:block w-full pl-3 py-4 pt-30 text-center">
				<div className="text-company text-[6vw] font-extrabold leading-[1.2] text-shadow-2xs text-shadow-white/50">
					Music everyone
				</div>
			</div>
			<div className="relative h-[60vh] w-full md:h-auto md:aspect-video">
				<video autoPlay muted loop playsInline preload="metadata" className="object-cover w-full h-full">
					<source src="/videos/hero-video.webm" type="video/webm" />
					<source src="/videos/hero-video.mp4" type="video/mp4" />
				</video>
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%] bg-linear-to-t from-white via-white
						to-transparent md:bg-none md:hidden"
				/>
				<div className="hidden absolute top-0 left-0 w-full pl-3 pt-3 md:flex items-center flex-col gap-2">
					<div
						className="text-white text-[6vw] text-center font-extrabold leading-[1.2] text-shadow-md
							text-shadow-white/40"
					>
						<span className="underline decoration-company decoration-7 underline-offset-6">actually</span>{" "}
						<span className="">wants.</span>
					</div>
					<div className="">
						<div className="text-white font-montserrat text-2xl font-bold w-[45vw]">
							simply <span className="text-company">vote music</span> into one playlist for everyone.
						</div>
						<div className="flex gap-5 pt-5">
							<HomeButton variant={"primary"} href={"/voting/tEN2ZlbH52xZeOvI"}>
								Try it out!
							</HomeButton>
							<HomeButton variant={"blackTransparent"} href={"/voting/new"}>
								Create your event
							</HomeButton>
						</div>
					</div>
				</div>
			</div>
			<div className="relative bottom-[38vw] w-full flex justify-center flex-col md:static md:hidden">
				<div className="text-left w-full pl-3">
					<div className="md:hidden text-white text-[12vw] font-extrabold text-shadow-lg leading-[1.2] md:text-[2vw]">
						Music everyone <br></br>
						<span className="text-company">actually wants.</span>
					</div>
					<div className="text-black font-montserrat text-xl font-medium">
						<b>simply vote music into one playlist</b>{" "}
						<Gray>for everyone. Invite your guests, artists and friends.</Gray>
					</div>
					<div className="flex gap-3 pt-5">
						<HomeButton variant={"primary"} href={"/voting/tEN2ZlbH52xZeOvI"}>
							Try it out!
						</HomeButton>
						<HomeButton variant={"black"} href={"/voting/new"}>
							Create your event
						</HomeButton>
					</div>
				</div>
			</div>
		</main>
	);
}
