import { AccountView } from "~/features/auth/components/auth/account/account-view";
import { accountViewPaths } from "~/lib/auth/view-paths";
import type { Metadata } from "next";

export const dynamicParams = false;

export const metadata: Metadata = {
	robots: { index: false, follow: true },
};
export function generateStaticParams() {
	return Object.values(accountViewPaths).map((path) => ({ path }));
}
export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
	const { path } = await params;
	return (
		<main className="container p-4 md:p-6">
			<AccountView path={path} />
		</main>
	);
}
