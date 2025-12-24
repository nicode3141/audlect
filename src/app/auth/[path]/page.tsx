import { AuthView } from "~/components/auth/auth-view";
import { authViewPaths } from "~/lib/auth/view-paths";

export const dynamicParams = false;

export function generateStaticParams() {
	return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({
	params,
	searchParams,
}: {
	params: Promise<{ path: string }>;
	searchParams?: Promise<{ redirectTo: string }>;
}) {
	const { path } = await params;

	const redirect = await searchParams;
	const redirectTo = redirect?.redirectTo ?? `/`;

	return (
		<main className="container flex h-screen min-w-screen grow flex-col items-center justify-center self-center p-4 md:p-6">
			<AuthView path={path} redirectTo={redirectTo} socialLayout={"grid"} otpSeparators={1} />
		</main>
	);
}
