"use client"

import { useState, useEffect } from "react"
import MainLand from "@/components/home/main-land"
import InitialLoadingWrapper from "@/components/InitialLoadingWrapper"
import { LoadingHome } from "@/components/LoadingHome"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust this time as needed

    return () => clearTimeout(timer)
  }, [])

  return (
    <InitialLoadingWrapper>
      {isLoading ? <LoadingHome /> : <MainLand />}
    </InitialLoadingWrapper>
  )
}
