import React from "react"

interface LoaderProps {
  size?: number
  color?: string
  speed?: number
  className?: string
}

export function Loader({ size = 35, color = "#000000", speed = 1.2, className = "" }: LoaderProps) {
  return (
    <div className={`loader-container ${className}`}>
      <svg className="container pl-2" viewBox="0 0 35 35" height={size} width={size}>
        <rect className="track" x="2.5" y="2.5" fill="none" strokeWidth="5px" width="32.5" height="32.5" />
        <rect
          className="car"
          x="2.5"
          y="2.5"
          fill="none"
          strokeWidth="5px"
          width="32.5"
          height="32.5"
          pathLength="100"
        />
      </svg>
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          --uib-size: ${size}px;
          --uib-color: ${color};
          --uib-speed: ${speed}s;
          --uib-bg-opacity: .1;
          height: var(--uib-size);
          width: var(--uib-size);
          transform-origin: center;
          will-change: transform;
          overflow: visible;
        }

        .car {
          fill: none;
          stroke: var(--uib-color);
          stroke-dasharray: 25, 75;
          stroke-dashoffset: 0;
          animation: travel var(--uib-speed) linear infinite;
          will-change: stroke-dasharray, stroke-dashoffset;
          transition: stroke 0.5s ease;
        }

        .track {
          fill: none;
          stroke: var(--uib-color);
          opacity: var(--uib-bg-opacity);
          transition: stroke 0.5s ease;
        }

        @keyframes travel {
          0% {
            stroke-dashoffset: 0;
          }

          100% {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  )
}

