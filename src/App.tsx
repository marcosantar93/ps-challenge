import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Timeline } from "./components/Timeline";

export const App: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <>
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <Suspense fallback={null}>
          <Scene currentFrame={currentFrame} />
        </Suspense>
      </Canvas>
      <Timeline
        currentFrame={currentFrame}
        totalFrames={50}
        onFrameChange={(frame) => setCurrentFrame(frame)}
      />
    </>
  );
};
