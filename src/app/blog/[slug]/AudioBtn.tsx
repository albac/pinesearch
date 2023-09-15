"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export default function AudioButton({ voice }: { voice: string }) {
  const { isAuth } = useAuth();

  return isAuth ? <GenerateAudio voice={voice} /> : <div></div>;
}

const GenerateAudio = ({ voice }: { voice: string }) => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const playAudio = () => {
    if (audioElement) {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioElement) {
      audioElement.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(voice);
      setAudioElement(audio);
      audio.addEventListener("ended", handleAudioEnd);

      return () => {
        pauseAudio();
        audio.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, [voice]);

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
};

const Button = ({ onClick, children }: { onClick: any; children: any }) => {
  return (
    <button onClick={onClick} className="py-2 px-4 border-2 border-gray-400 text-gray-700 my-5">
      {children}
    </button>
  );
};
