import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnimatedBackground } from "@/components/animated-background";
import { Clock } from "@/components/clock";
import { DeviceTracker } from "@/components/device-tracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yoshwa R",
  description: "Backend Software Engineer | Java, Spring Boot, Kafka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#0a0a0a] text-[#ededed] font-sans antialiased relative">
        <DeviceTracker />
        <AnimatedBackground />
        <MacTitlebar />
        <div className="flex pt-8 relative z-10">
          <Sidebar />
          <main className="flex-1 min-h-screen pb-20 md:pb-0">{children}</main>
        </div>
      </body>
    </html>
  );
}

function MacTitlebar() {
  return (
    <div className="mac-titlebar">
      <div className="mac-dots">
        <div className="mac-dot red" />
        <div className="mac-dot yellow" />
        <div className="mac-dot green" />
      </div>
      <Clock />
      <div className="w-[52px]" />
    </div>
  );
}

function Sidebar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/os", label: "Developer Corner" },
  ];

  return (
    <>
      <aside className="hidden md:flex flex-col w-48 min-h-screen p-6 border-r border-[#27272a] gap-6">
        <nav className="flex flex-col gap-1.5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#27272a] py-2 px-2 safe-area-pb">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-0.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 active:text-blue-400 transition-colors px-4 py-2 rounded-lg active:bg-white/5"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
