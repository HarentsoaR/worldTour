"use client"

import { useState, useEffect } from "react"
import { LoadingScreen } from "@/components/LoadingScreen"
import { usePathname } from "next/navigation"

export default function InitialLoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (!hasVisited && (pathname === "/" || pathname === "/home")) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem("hasVisited", "true")
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
    }
  }, [pathname])

  if (isLoading && (pathname === "/" || pathname === "/home")) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return <>{children}</>
}

