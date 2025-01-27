"use client"

import { useState, useEffect } from "react"
import MainLand from "@/components/home/main-land"
import InitialLoadingWrapper from "@/components/InitialLoadingWrapper"
import { LoadingPage } from "@/components/LoadingPage"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this time as needed

    return () => clearTimeout(timer)
  }, [])

  return <InitialLoadingWrapper>{isLoading ? <LoadingPage /> : <MainLand />}</InitialLoadingWrapper>
}

