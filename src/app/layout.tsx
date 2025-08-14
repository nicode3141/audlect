import "~/styles/globals.css";
import { interFont, montserratFont } from "~/app/styles/fonts/font";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";


export const metadata: Metadata = {
  title: 'Audlect - Vote Music',
  description: 'Vote Music with your Friends, Guests and Artists',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

        <TRPCReactProvider>
      <html lang="en">
        <body className={`${interFont.variable} ${montserratFont.variable} antialiased`}>
          {children}
        </body>
      </html>
    </TRPCReactProvider>

  );
}