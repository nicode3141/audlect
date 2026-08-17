import CreateVotingSection from "~/features/landing/CreateVotingSection";
import DeadlineFeature from "~/features/landing/DeadlineFeature";
import DemoSection from "~/features/landing/DemoSection";
import HeroSection from "~/features/landing/HeroSection";
import LandingNav from "~/features/landing/LandingNav";
import AdditionalFeature from "~/features/landing/AdditionalFeature";
import ProductSection from "~/features/landing/ProductSection";
import ReferencesSection from "~/features/landing/ReferencesSection";
import ShareFeature from "~/features/landing/ShareFeature";
import LandingFooter from "~/features/landing/LandingFooter";
import { TextFade } from "~/shared/animations/TextFade";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Audlect — Collaborative Music Voting for Events & Parties",
	description:
		"Let your guests vote songs into a shared playlist in real time. Free music voting app for parties, weddings, bars, and live events.",
	alternates: {
		canonical: "https://audlect.nicodenetworks.com",
	},
};

const softwareSchema = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "Audlect",
	applicationCategory: "MusicApplication",
	operatingSystem: "Web",
	description:
		"Collaborative music voting app for events, parties, and venues. Let guests vote songs into a shared playlist.",
	url: "https://audlect.nicodenetworks.com",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
};

export default async function Home() {
	return (
		<div className="bg-white flex flex-col items-center w-full md:pt-4">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
			/>
			<LandingNav />
			<HeroSection />
			<ProductSection />
			<ReferencesSection />
			<DemoSection />
			<CreateVotingSection />
			<TextFade direction={"up"}>
				<h1 className="hidden md:block text-black font-inter text-6xl font-bold max-w-90 text-center pb-10 pt-25">
					Fits <span className="text-[#415FFF]">all use cases</span>
				</h1>
			</TextFade>
			<div className="md:flex flex-col" id="features">
				<div className="md:flex">
					<DeadlineFeature />
					<ShareFeature />
				</div>
				<AdditionalFeature />
			</div>
			<LandingFooter />
		</div>
	);
}
