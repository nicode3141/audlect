import Image from "next/image";
import HomeButton from "~/shared/components/HomeButton";
import { Gray } from "~/shared/utils/generics";

export default function HeroSection() {
	return (
		<main className="h-[180vw]">
			<video autoPlay muted loop playsInline preload="metadata" className="object-cover w-full h-[60vh]">
				<source src="/videos/hero-video.webm" type="video/webm" />
				<source src="/videos/hero-video.mp4" type="video/mp4" />
			</video>
			<div className="relative bottom-[38vw] w-full flex justify-center flex-col md:static">
				<div className="text-left w-full pl-3">
					<div className="text-white text-[12vw] font-extrabold text-shadow-lg leading-[1.2]">
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
