import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import SessionProvider from "../components/SessionProvider";
import NavMenu from "../components/NavMenu";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fuse - connect and inspire",
  description: "explore and connect with the world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="sm:ml-56">
            {children}
            <NavMenu />
          </div>       
           </SessionProvider>
      </body>
    </html>
  );
}
