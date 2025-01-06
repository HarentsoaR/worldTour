import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from 'next/font/google';
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { GlobeIcon, MapIcon, HotelIcon } from 'lucide-react';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "World Tour - Virtual Travel Experience",
  description: "Embark on virtual journeys to breathtaking destinations around the globe.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-sky-50 text-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <nav className="bg-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <GlobeIcon className="h-8 w-8 text-blue-600 mr-2" />
                      <span className="font-bold text-xl text-blue-600">World Tour</span>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Link href="/destinations" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Destinations
                    </Link>
                    <Link href="/attractions" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Attractions
                    </Link>
                    <Link href="/hotels" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                      Hotels
                    </Link>
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex-grow">
              {children}
            </div>

            <footer className="bg-white border-t border-gray-200 mt-12">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">About Us</h3>
                    <p className="mt-4 text-base text-gray-600">
                      World Tour offers virtual travel experiences to destinations around the globe.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Quick Links</h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link href="/about" className="text-base text-gray-600 hover:text-blue-600">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-base text-gray-600 hover:text-blue-600">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/faq" className="text-base text-gray-600 hover:text-blue-600">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link href="/privacy" className="text-base text-gray-600 hover:text-blue-600">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms" className="text-base text-gray-600 hover:text-blue-600">
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8 flex items-center justify-between">
                  <p className="text-base text-gray-500">
                    &copy; {new Date().getFullYear()} World Tour. All rights reserved.
                  </p>
                  <div className="flex items-center">
                    <p className="text-base text-gray-500 mr-4">
                      Powered by{" "}
                      <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline text-blue-600"
                        rel="noreferrer"
                      >
                        Supabase
                      </a>
                    </p>
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

