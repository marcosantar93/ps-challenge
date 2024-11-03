import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Timeline } from "./components/Timeline";
import { NavigationControls } from "./components/NavigationControls";

const TOTAL_FRAMES = 50;

export const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const controlsRef = useRef<any>();

  return (
    <>
      <Canvas
        camera={{ position: [0, -100, 100], fov: 30 }}
        style={{ background: "#121212" }}
      >
        <Suspense fallback={null}>
          <Scene currentFrame={currentFrame} totalFrames={TOTAL_FRAMES} />
          <NavigationControls controlsRef={controlsRef} />
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
