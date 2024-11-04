import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Timeline } from "./components/Timeline";
import { NavigationControls } from "./components/NavigationControls";
import { useQuery } from "@tanstack/react-query";
import { fetchFramesData } from "./data/fetchData";
import { FrameData } from "./types/FrameData";

const TOTAL_FRAMES = 50;

export const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  const {
    data: framesData,
    isLoading,
    isError,
    error,
  } = useQuery<FrameData[], Error>({
    queryKey: ["framesData"],
    queryFn: () => fetchFramesData(TOTAL_FRAMES),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="loading-indicator">Loading frames, please wait...</div>
    );
  }

  if (isError) {
    return <div>Error loading frames: {error.message}</div>;
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, -100, 100], fov: 30 }}
        style={{ background: "#121212" }}
      >
        <Suspense fallback={null}>
          {framesData && (
            <Scene currentFrame={currentFrame} framesData={framesData} />
          )}
          <NavigationControls />
        </Suspense>
      </Canvas>
      <Timeline
        currentFrame={currentFrame}
        totalFrames={TOTAL_FRAMES}
        onFrameChange={(frame) => {
          setCurrentFrame(frame);
        }}
      />
    </>
  );
};
