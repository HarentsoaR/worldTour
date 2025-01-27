import React from "react"

interface LoaderProps {
  size?: number
  color?: string
  speed?: number
  className?: string
}

export function LoaderContent({ size = 28, color = "#000000", speed = 3.5, className = "" }: LoaderProps) {
  return (
    <div className={`loader-container ${className}`}>
      <div className="container">
        <div className="line"></div>
      </div>
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          --uib-size: ${size};
          --uib-color: ${color};
          --uib-speed: ${speed}s;
          --uib-stroke: 4;
          --uib-mult: calc(var(--uib-size) / var(--uib-stroke));
          --uib-stroke-px: calc(var(--uib-stroke) * 1px);
          --uib-size-px: calc(var(--uib-size) * 1px);
          position: relative;
          height: var(--uib-size-px);
          width: var(--uib-size-px);
        }

        .line {
          position: absolute;
          top: calc(50% - var(--uib-stroke-px) / 2);
          left: calc(50% - var(--uib-stroke-px) / 2);
          width: var(--uib-stroke-px);
          height: var(--uib-stroke-px);
          background-color: var(--uib-color);
          animation: center-line var(--uib-speed) ease infinite;
          transition: background-color 0.3s ease;
        }

        .container::before,
        .container::after {
          content: '';
          position: absolute;
          width: var(--uib-stroke-px);
          height: var(--uib-stroke-px);
          background-color: var(--uib-color);
          animation: explore var(--uib-speed) ease infinite;
          transition: background-color 0.3s ease;
        }

        .container::after {
          animation-delay: calc(var(--uib-speed) * -0.5);
        }

        @keyframes center-line {
          0%,
          25%,
          50%,
          75%,
          100% {
            transform: scaleX(1) scaleY(1);
          }
          12.5%,
          62.5% {
            transform: scaleX(var(--uib-mult)) scaleY(1);
          }
          37.5%,
          87.5% {
            transform: scaleX(1) scaleY(var(--uib-mult));
          }
        }

        @keyframes explore {
          0%,
          100% {
            transform: scaleX(1) scaleY(1) translate(0%, 0%);
            transform-origin: top left;
            top: 0;
            left: 0;
          }

          12.5% {
            transform: scaleX(var(--uib-mult)) scaleY(1) translate(0%, 0%);
            transform-origin: top left;
            top: 0;
            left: 0;
          }

          12.50001% {
            transform: scaleX(var(--uib-mult)) scaleY(1) translate(0%, 0%);
            transform-origin: top right;
            top: 0;
            left: initial;
            right: 0;
          }

          25% {
            transform: scaleX(1) scaleY(1) translate(0%, 0%);
            transform-origin: top right;
            top: 0;
            left: initial;
            right: 0;
          }

          37.5% {
            transform: scaleX(1) scaleY(var(--uib-mult)) translate(0%, 0%);
            transform-origin: top right;
            top: 0;
            left: initial;
            right: 0;
          }

          37.5001% {
            transform: scaleX(1) scaleY(var(--uib-mult)) translate(0%, 0%);
            transform-origin: bottom right;
            top: initial;
            bottom: 0;
            left: initial;
            right: 0;
          }

          50% {
            transform: scaleX(1) scaleY(1) translate(0%, 0%);
            transform-origin: bottom right;
            top: initial;
            bottom: 0;
            left: initial;
            right: 0;
          }

          62.5% {
            transform: scaleX(var(--uib-mult)) scaleY(1) translate(0%, 0%);
            transform-origin: bottom right;
            top: initial;
            bottom: 0;
            left: initial;
            right: 0;
          }

          62.5001% {
            transform: scaleX(var(--uib-mult)) scaleY(1) translate(0%, 0%);
            transform-origin: bottom left;
            top: initial;
            bottom: 0;
            left: 0;
          }

          75% {
            transform: scaleX(1) scaleY(1) translate(0%, 0%);
            transform-origin: bottom left;
            top: initial;
            bottom: 0;
            left: 0;
          }

          87.5% {
            transform: scaleX(1) scaleY(var(--uib-mult)) translate(0%, 0%);
            transform-origin: bottom left;
            top: initial;
            bottom: 0;
            left: 0;
          }

          87.5001% {
            transform: scaleX(1) scaleY(var(--uib-mult)) translate(0%, 0%);
            transform-origin: top left;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  )
}

