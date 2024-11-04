import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Timeline } from "./components/Timeline";
import { NavigationControls } from "./components/NavigationControls";
import { useQuery } from "@tanstack/react-query";
import { fetchFramesData } from "./data/fetchData";
import { FrameData } from "./types/FrameData";
import { Vector3 } from "three";

const TOTAL_FRAMES = 50;
export const INITIAL_CAMERA_POSITION = new Vector3(0, -100, 100);

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

  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    INITIAL_CAMERA_POSITION
  );

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
      <NavigationControls
        currentPosition={cameraPosition}
        updatePosition={(position: Vector3) => {
          setCameraPosition(position);
        }}
      />
      <Canvas
        camera={{ position: INITIAL_CAMERA_POSITION, fov: 30 }}
        style={{ background: "#121212" }}
      >
        <Suspense fallback={null}>
          {framesData && (
            <Scene
              currentFrame={currentFrame}
              framesData={framesData}
              cameraPosition={cameraPosition}
            />
          )}
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
