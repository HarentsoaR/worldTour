'use client'

import React, { useEffect, useState, useRef } from 'react';

const videoSources = [
  '/bg-video1.mp4',
  '/bg-video2.mp4',
  '/bg-video3.mp4',
  '/bg-video4.mp4',
];

export function HeroVideo() {
  const [currentVideo, setCurrentVideo] = useState(videoSources[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)]);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(error => {
        console.error("Video playback failed:", error);
      });
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)]);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 w-full h-full object-cover"
        onEnded={handleVideoEnd}
        key={currentVideo}
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute z-20 inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">Explore the World</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8 max-w-3xl">Embark on virtual journeys to breathtaking destinations</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition duration-300 text-sm sm:text-base">
          Start Your Adventure
        </button>
      </div>
    </div>
  );
}

export default HeroVideo;

