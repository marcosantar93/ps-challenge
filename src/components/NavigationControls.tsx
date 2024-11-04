import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export const NavigationControls = () => {
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
  };

  return (
    <Html
      style={{
        position: "fixed",
        top: -350,
        right: -700,
        color: "white",
        userSelect: "none",
        pointerEvents: "none",
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
    </Html>
  );
};
