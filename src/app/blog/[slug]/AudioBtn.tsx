"use client";

import { useState, useEffect } from "react";

export default function AudioBtn({ voice }: { voice: any }) {
  const [audioElement] = useState(new Audio(voice));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const playAudio = () => {
    audioElement.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioElement.pause();
    setIsPlaying(false);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  useEffect(() => {
    audioElement.addEventListener("ended", handleAudioEnd);

    return () => {
      pauseAudio();
      audioElement.removeEventListener("ended", handleAudioEnd);
    };
  }, [audioElement]);

  useEffect(() => {
    if (isEnded) {
      setIsPlaying(false);
    }
  }, [isEnded]);

  return (
    <div>
      {isPlaying ? (
        <Button onClick={pauseAudio}>Stop Audio</Button>
      ) : (
        <>
          {isEnded ? (
            <Button onClick={playAudio}>Replay Audio</Button>
          ) : (
            <Button onClick={playAudio}>Play Audio</Button>
          )}
        </>
      )}
    </div>
  );
}

const Button = ({ onClick, children }: { onClick: any; children: any }) => {
  return (
    <button onClick={onClick} className="py-2 px-4 border-2 border-gray-400 text-gray-700 my-5">
      {children}
    </button>
  );
};
