import Image from "next/image";
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
export default async function Home() {
	return (
		<div className="bg-white overflow-x-clip flex flex-col items-center w-full md:pt-4">
			<LandingNav />
			<HeroSection />
			<ProductSection />
			<ReferencesSection />
			<DemoSection />
			<CreateVotingSection />
			<DeadlineFeature />
			<ShareFeature />
			<AdditionalFeature />
			<LandingFooter />
		</div>
	);
}
