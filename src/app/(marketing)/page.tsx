import { TextAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HomeButton from "~/shared/components/HomeButton";
import { Gray } from "~/shared/utils/generics";
export default async function Home() {
	return (
		<div className="bg-white overflow-hidden flex flex-col items-center w-full">
			<nav className="flex p-5 bg-black/10 z-2 absolute w-full backdrop-blur-xs">
				<div className="flex items-center gap-2 flex-1">
					<img src={"/app-logo.svg"} alt="Audlect Logo" width={30}></img>
					<span className="font-nunito text-white text-2xl font-extrabold">Audlect</span>
				</div>
				<div className="text-white flex items-center gap-2 font-semibold underline">
					<Link href={"/"}>Sign in</Link>
					<TextAlignJustify />
				</div>
			</nav>
			<main className="h-[180vw]">
				<Image src={"/images/landing/hero.avif"} alt={"hero"} width={1000} height={20} unoptimized />
				<div className="relative bottom-[38vw] w-full flex justify-center flex-col">
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
			<section
				className="flex flex-col items-center gap-10 p-5 bg-[url('/images/backgrounds/mesh-background.avif')] bg-cover
					bg-center"
			>
				<div className="flex flex-col gap-1">
					<div className="font-inter font-bold text-black text-4xl">
						Discover Music <span className="text-company">anyone likes</span>
					</div>
					<p className="text-neutral-500 text-xl font-medium font-montserrat">
						Your guests can vote their own music they like!
					</p>
				</div>
				<Image
					src={"/images/landing/product-shot.avif"}
					alt={""}
					width={270}
					height={100}
					unoptimized
					className="rounded-xl shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)] rotate-359"
				/>
			</section>
			<section className="flex flex-col items-center gap-10 p-5 pt-15">
				<div className="flex flex-col gap-1">
					<div className="font-inter font-bold text-black text-4xl">References</div>
					<p className="text-neutral-500 text-2xl font-bold font-inter">
						Already used by <b className="text-black">200+ guests</b> at live events
					</p>
				</div>
				<Image
					src={"/images/landing/social-proof-1.avif"}
					alt={""}
					width={500}
					height={100}
					unoptimized
					className="rounded-md shadow-[2px_4px_4px_0px_rgba(0,0,0,0.50)]"
				/>
				<div className="text-neutral-700 font-semibold text-md">
					Built from a real problem:<br></br>
					<span className="text-base">
						Choosing music the <span className="text-company">whole event enjoys.</span>
					</span>
				</div>
			</section>
		</div>
	);
}
