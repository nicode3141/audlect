import Image from "next/image";
import CreateVotingSection from "~/features/landing/CreateVotingSection";
import DeadlineFeature from "~/features/landing/DeadlineFeature";
import DemoSection from "~/features/landing/DemoSection";
import HeroSection from "~/features/landing/HeroSection";
import LandingNav from "~/features/landing/LandingNav";
import ProductSection from "~/features/landing/ProductSection";
import ReferencesSection from "~/features/landing/ReferencesSection";
export default async function Home() {
	return (
		<div className="bg-white overflow-hidden flex flex-col items-center w-full">
			<LandingNav />
			<HeroSection />
			<ProductSection />
			<ReferencesSection />
			<DemoSection />
			<CreateVotingSection />
			<DeadlineFeature />
		</div>
	);
}
