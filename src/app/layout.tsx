import "~/styles/globals.css";
import { interFont, montserratFont } from "~/app/styles/fonts/font";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
	title: "Audlect - Vote Music",
	description: "Vote Music with your Friends, Guests and Artists",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<TRPCReactProvider>
			<html lang="en" className="scroll-smooth">
				<body className={`${interFont.variable} ${montserratFont.variable} antialiase bg-white dark:bg-[#161616]`}>
					{children}
				</body>
			</html>
		</TRPCReactProvider>
	);
}
