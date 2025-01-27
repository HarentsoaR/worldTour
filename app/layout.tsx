import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Link from "next/link"
import "./globals.css"
import { Navigation } from "@/components/home/Navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { metadata } from "./metadata"

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
})

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-sky-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen flex flex-col">
            <Navigation />
            <div className="flex-grow">{children}</div>

            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                      About Us
                    </h3>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                      World Tour offers virtual travel experiences to destinations around the globe.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                      Quick Links
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/about"
                          className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/faq"
                          className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                      Legal
                    </h3>
                    <ul className="mt-4 space-y-4">
                      <li>
                        <Link
                          href="/privacy"
                          className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/terms"
                          className="text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          Terms of Service
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
                  <p className="text-base text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                    &copy; {new Date().getFullYear()} World Tour. All rights reserved.
                  </p>
                  <div className="flex items-center">
                    <p className="text-base text-gray-500 dark:text-gray-400 mr-4">
                      Powered by{" "}
                      <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline text-blue-600 dark:text-blue-400"
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
  )
}

