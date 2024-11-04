import { Vector3 } from "three";
import { INITIAL_CAMERA_POSITION } from "../App";
import { useMedia } from "react-use";

export const NavigationControls = ({
  currentPosition,
  updatePosition,
}: {
  currentPosition: Vector3;
  updatePosition: (position: Vector3) => void;
}) => {
  const isMobile = useMedia("(max-width: 1000px)");

  const moveCamera = (direction: string) => {
    const moveDistance = 10;
    const position = currentPosition.clone();

    switch (direction) {
      case "up":
        position.y += moveDistance;
        break;
      case "down":
        position.y -= moveDistance;
        break;
      case "left":
        position.x -= moveDistance;
        break;
      case "right":
        position.x += moveDistance;
        break;
      case "forward":
        position.z -= moveDistance;
        break;
      case "backward":
        position.z += moveDistance;
        break;
      case "reset":
        position.copy(INITIAL_CAMERA_POSITION);
        break;

      default:
        break;
    }

    updatePosition(position);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        color: "white",
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 2,
        transform: isMobile ? "scale(2) translate(100%, 100%)" : "scale(1)",
        touchAction: "none",
      }}
    >
      <div
        className="navigation-controls"
        style={{
          pointerEvents: "auto",
        }}
      >
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
    </div>
  );
};
