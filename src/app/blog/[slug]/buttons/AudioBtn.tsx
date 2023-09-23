import { useState, useEffect } from "react";
import { PlayIcon } from "../../../../../public/icons/PlayIcon";
import { StopIcon } from "../../../../../public/icons/StopIcon";

export function AudioButton({ voice }: { voice: string }) {
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
        <Button onClick={pauseAudio}>
          <StopIcon />
          Stop Audio
        </Button>
      ) : (
        <>
          {isEnded ? (
            <Button onClick={playAudio}>
              <PlayIcon />
              Replay Audio
            </Button>
          ) : (
            <Button onClick={playAudio}>
              <PlayIcon /> Play Audio
            </Button>
          )}
        </>
      )}
    </div>
  );
}

const Button = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 text-fig-gray bg-fig-grey-mint p-[10px] rounded-md mt-6 font-medium justify-center items-center hover:scale-110"
    >
      {children}
    </button>
  );
};
