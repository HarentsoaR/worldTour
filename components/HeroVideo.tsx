import React, { useEffect, useState } from 'react';

const videoSources = [
  '/bg-video1.mp4'
];

export function HeroVideo() {
  const [currentVideo, setCurrentVideo] = useState(videoSources[0]); // Set default video

  useEffect(() => {
    // Set a random video on initial render
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)]);
  }, []);

  const handleVideoEnd = () => {
    // Set a new random video when the current one ends
    setCurrentVideo(videoSources[Math.floor(Math.random() * videoSources.length)]);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        onEnded={handleVideoEnd}
        key={currentVideo} // This key will force the video to reload when it changes
      >
        <source src={currentVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute z-20 top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Explore the World</h1>
        <p className="text-xl md:text-2xl mb-8">Embark on virtual journeys to breathtaking destinations</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
          Start Your Adventure
        </button>
      </div>
    </div>
  );
}

export default HeroVideo;
