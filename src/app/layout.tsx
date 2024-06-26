import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import { BsJournalBookmarkFill } from 'react-icons/bs'
import "./globals.css";
import { Toaster } from "../components/ui/toaster";
import { SignIn } from "../components/sign-in";

const ptsans = PT_Sans({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Write It Out",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={ptsans.className}>
        <main className="flex flex-col w-full h-dvh bg-slate-200" >
          <div className="border-b border-black shadow-lg">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex gap-4">
                <BsJournalBookmarkFill className="my-1" />
                Have a handy journaling app c:
              </div>
              <SignIn />
            </div>
          </div>
          {children}
          <Toaster />
        </main >
      </body>
    </html>
  );
}
