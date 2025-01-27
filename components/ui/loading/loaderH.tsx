import React from "react"

interface LoaderProps {
  size?: number
  color?: string
  speed?: number
  className?: string
}

export function LoaderH({ size = 40, color = "#000000", speed = 1.6, className = "" }: LoaderProps) {
  return (
    <div className={`loader-container ${className}`}>
      <div className="container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
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
          position: relative;
          top: 8%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: var(--uib-size);
          width: var(--uib-size);
        }

        .dot {
          position: absolute;
          top: 13.5%;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          width: 100%;
          animation: swing var(--uib-speed) linear infinite;
        }

        .dot::before {
          content: '';
          height: 25%;
          width: 25%;
          border-radius: 50%;
          background-color: var(--uib-color);
          transition: background-color 0.3s ease;
        }

        .dot:nth-child(1) {
          animation-delay: calc(var(--uib-speed) * -0.36);
        }

        .dot:nth-child(2) {
          animation-delay: calc(var(--uib-speed) * -0.27);
          opacity: 0.8;
        }

        .dot:nth-child(2)::before {
          transform: scale(0.9);
        }

        .dot:nth-child(3) {
          animation-delay: calc(var(--uib-speed) * -0.18);
          opacity: 0.6;
        }

        .dot:nth-child(3)::before {
          transform: scale(0.8);
        }

        .dot:nth-child(4) {
          animation-delay: calc(var(--uib-speed) * -0.09);
          opacity: 0.4;
        }

        .dot:nth-child(4)::before {
          transform: scale(0.7);
        }

        @keyframes swing {
          0% {
            transform: rotate(0deg);
          }

          15% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(180deg);
          }

          65% {
            transform: rotate(180deg);
          }

          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  )
}

