import React, { useEffect, useRef, useState } from "react";
import { useKey, useMedia } from "react-use";

interface TimelineProps {
  currentFrame: number;
  totalFrames: number;
  onFrameChange: (frame: number | ((prevFrame: number) => number)) => void;
}

export const Timeline = ({
  currentFrame,
  totalFrames,
  onFrameChange,
}: TimelineProps) => {
  const isMobile = useMedia("(max-width: 600px)");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(5);
  const intervalRef = useRef<number | null>(null);

  useKey("ArrowLeft", () => handlePrev(), {}, [currentFrame]);
  useKey("ArrowRight", () => handleNext(), {}, [currentFrame]);
  useKey(" ", () => handlePlayPause(), {}, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        onFrameChange((prevFrame: number) => {
          if (prevFrame < totalFrames - 1) {
            return prevFrame + 1;
          } else {
            return 0;
          }
        });
      }, 1000 / playbackSpeed); 
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrev = () => {
    if (currentFrame > 0) {
      onFrameChange(currentFrame - 1);
    }
  };

  const handleNext = () => {
    if (currentFrame < totalFrames - 1) {
      onFrameChange(currentFrame + 1);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFrameChange(Number(e.target.value));
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaybackSpeed(Number(e.target.value));
  };

  return (
    <div className={`timeline-container ${isMobile ? "timeline-mobile" : ""}`}>
      <div className="reproduction-controls">
        <button
          onClick={handlePrev}
          disabled={currentFrame === 0}
          aria-label="Previous Frame"
        >
          &#9664;
        </button>
        <button
          onClick={handlePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "►"}
        </button>
        <button
          onClick={handleNext}
          disabled={currentFrame === totalFrames - 1}
          aria-label="Next Frame"
        >
          &#9654;
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={totalFrames - 1}
        value={currentFrame}
        onChange={handleSliderChange}
        className="frame-slider"
      />

      <span className="frame-indicator">
        Frame: {currentFrame + 1} / {totalFrames}
      </span>

      <div className="speed-control">
        <label htmlFor="speed">Speed:</label>
        <input
          id="speed"
          type="range"
          min={0.5}
          max={10}
          step={0.5}
          value={playbackSpeed}
          onChange={handleSpeedChange}
        />
        <span>{playbackSpeed}x</span>
      </div>
    </div>
  );
};
