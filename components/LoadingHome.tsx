"use client"

import React, { useEffect, useState } from "react"
import { LoaderH } from "./ui/loading/loaderH"
import { gsap } from "gsap"

export function LoadingHome() {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate loading progress
    tl.to(setLoadingProgress, {
      duration: 2,
      value: 100,
      onUpdate: () => setLoadingProgress(Math.round(tl.progress() * 100)),
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 dark:bg-gray-900">
      <LoaderH size={50} color="#3B82F6" speed={2} />
      <p className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Please wait...</p>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{loadingProgress}%</p>
    </div>
  )
}

