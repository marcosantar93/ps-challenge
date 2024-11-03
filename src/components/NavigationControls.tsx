import React from "react";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

interface NavigationControlsProps {
  controlsRef: React.RefObject<any>;
}

export const NavigationControls = ({
  controlsRef,
}: NavigationControlsProps) => {
  const { camera } = useThree();

  const moveCamera = (direction: string) => {
    const moveDistance = 10;

    switch (direction) {
      case "up":
        camera.position.y += moveDistance;
        break;
      case "down":
        camera.position.y -= moveDistance;
        break;
      case "left":
        camera.position.x -= moveDistance;
        break;
      case "right":
        camera.position.x += moveDistance;
        break;
      case "forward":
        camera.position.z -= moveDistance;
        break;
      case "backward":
        camera.position.z += moveDistance;
        break;
      case "reset":
        camera.position.set(0, -100, 100);
        camera.lookAt(0, 0, 0);
        break;
      default:
        break;
    }

    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.update();
    }
  };

  return (
    <Html
      style={{
        position: "absolute",
        top: -350,
        right: -550,
        color: "white",
        userSelect: "none",
      }}
    >
      <div className="navigation-controls">
        <button onClick={() => moveCamera("up")} aria-label="Move Up">
          ▲
        </button>
        <div className="horizontal-buttons">
          <button onClick={() => moveCamera("left")} aria-label="Move Left">
            ◀
          </button>
          <button onClick={() => moveCamera("reset")} aria-label="Reset View">
            ⟳
          </button>
          <button onClick={() => moveCamera("right")} aria-label="Move Right">
            ▶
          </button>
        </div>
        <button onClick={() => moveCamera("down")} aria-label="Move Down">
          ▼
        </button>
        <div className="depth-buttons">
          <button onClick={() => moveCamera("forward")} aria-label="Zoom In">
            +
          </button>
          <button onClick={() => moveCamera("backward")} aria-label="Zoom Out">
            -
          </button>
        </div>
      </div>
    </Html>
  );
};
