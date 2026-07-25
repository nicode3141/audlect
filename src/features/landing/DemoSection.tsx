import React from "react";

export default function DemoSection() {
	return (
		<section
			className="flex flex-col items-center gap-10 p-5 pt-15 w-full
				bg-[url('/images/backgrounds/mesh-background2.avif')] bg-cover bg-center"
		>
			<div className="flex flex-col gap-1 items-center text-center">
				<div className="font-inter font-bold text-black text-4xl">Your turn!</div>
				<p className="text-neutral-500 text-2xl font-medium font-montserrat">Which song is best?</p>
			</div>
			<p>
				TLorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
				clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
			</p>
		</section>
	);
}
