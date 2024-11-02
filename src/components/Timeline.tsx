import React from "react";

interface TimelineProps {
  currentFrame: number;
  totalFrames: number;
  onFrameChange: (frame: number) => void;
}

export const Timeline = ({
  currentFrame,
  totalFrames,
  onFrameChange,
}: TimelineProps) => {
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

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        display: "flex",
        alignItems: "center",
      }}
    >
      <button onClick={handlePrev} disabled={currentFrame === 0}>
        Prev
      </button>
      <input
        type="range"
        min={0}
        max={totalFrames - 1}
        value={currentFrame}
        onChange={handleSliderChange}
        style={{ flexGrow: 1, margin: "0 10px" }}
      />
      <button onClick={handleNext} disabled={currentFrame === totalFrames - 1}>
        Next
      </button>
      <span style={{ marginLeft: 10 }}>
        Frame: {currentFrame + 1} / {totalFrames}
      </span>
    </div>
  );
};
