"use client"

import React, { useEffect, useState } from "react"
import { LoaderContent } from "./ui/loading/loaderContent"
import { gsap } from "gsap"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Call onLoadingComplete only after the progress bar and fade-out animations are done
        onLoadingComplete()
      },
    })

    // Animate loading progress from 0 to 100%
    tl.to(
      {},
      {
        duration: 2,
        onUpdate: () => {
          setLoadingProgress((prev) => Math.min(prev + 1, 100))
        },
      }
    )

    // Fade out loading screen after progress reaches 100%
    tl.to(".loading-screen", {
      opacity: 0,
      duration: 1,
      delay: 0.5, // Ensure a small delay so users can see the completed progress bar
    })

    return () => {
      tl.kill()
    }
  }, [onLoadingComplete])

  return (
    <div className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-50 dark:bg-gray-900">
      {/* Animated Loader */}
      <LoaderContent size={50} color="#3B82F6" speed={2} />

      {/* Loading Text */}
      <p className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Loading World Tour
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-[150px] mt-6 h-1 bg-gray-300 rounded-md dark:bg-gray-700">
        <div
          className="h-full bg-blue-500 rounded-md transition-all duration-300 ease-linear"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
    </div>
  )
}
