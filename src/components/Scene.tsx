import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { fetchFramesData, getFrameData } from "../data/fetchData";
import { CuboidData } from "../types/FrameData";
import { Cuboid } from "./Cuboid";
import { CuboidType } from "../types/Cuboid";
import { useMedia } from "react-use";

interface SceneProps {
  currentFrame: number;
  totalFrames: number;
}

export const Scene = ({ currentFrame, totalFrames }: SceneProps) => {
  const tooltipRef = useRef(null);
  const [pointsPositions, setPointsPositions] = useState<Float32Array | null>(
    null
  );
  const [pointsColors, setPointsColors] = useState<Float32Array | null>(null);
  const [cuboids, setCuboids] = useState<CuboidType[]>([]);
  const [hoveredCuboidInfo, setHoveredCuboidInfo] = useState<CuboidType | null>(
    null
  );

  useEffect(() => {
    getFrameData(currentFrame).then((data) => {
      const points = data.points as number[][];
      const positions = new Float32Array(points.length * 3);
      const colors = new Float32Array(points.length * 3);

      let minZ = Infinity;
      let maxZ = -Infinity;

      points.forEach((point, i) => {
        const [x, y, z] = point;
        positions.set([x, y, z], i * 3);
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      });

      points.forEach((point, i) => {
        const z = point[2];
        const color = getColorByHeight(z, minZ, maxZ);
        colors.set(color, i * 3);
      });

      setPointsPositions(positions);
      setPointsColors(colors);

      const cuboidsData = data.cuboids.map((cuboid: CuboidData) => ({
        position: [
          cuboid["position.x"],
          cuboid["position.y"],
          cuboid["position.z"],
        ] as [number, number, number],
        dimensions: [
          cuboid["dimensions.x"],
          cuboid["dimensions.y"],
          cuboid["dimensions.z"],
        ] as [number, number, number],
        yaw: cuboid.yaw,
        info: cuboid,
      }));
      setCuboids(cuboidsData);
    });
  }, [currentFrame]);

  const fetchFramesDataCallback = useCallback(async () => {
    await fetchFramesData(totalFrames);
  }, []);

  useEffect(() => {
    fetchFramesDataCallback();
  }, []);

  const isMobile = useMedia("(max-width: 600px)");
  const pointSize = isMobile ? 0.05 : 0.1;

  const getColorByHeight = (
    z: number,
    minZ: number,
    maxZ: number
  ): [number, number, number] => {
    const normalizedZ = (z - minZ) / (maxZ - minZ);
    const color = new THREE.Color();
    color.setHSL((1 - normalizedZ) * 0.7, 1, 0.5);
    return [color.r, color.g, color.b];
  };

  const pointsGeometry = useMemo(() => {
    if (pointsPositions && pointsColors) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(pointsPositions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(pointsColors, 3)
      );
      return geometry;
    }
  }, [pointsPositions, pointsColors]);

  // Depending of the tooltip position, transform it so that it renders within the screen
  useEffect(() => {
    if (tooltipRef.current) {
      const tooltip = tooltipRef.current as HTMLDivElement;
      const rect = tooltip.getBoundingClientRect();

      const x = rect.x + rect.width / 2;
      const y = rect.y + rect.height / 2;
      let transformX = "0";
      let transformY = "0";

      if (x > window.innerWidth / 2) {
        tooltip.style.left = "auto";
        tooltip.style.right = "0";
        transformX = "-100%";
      } else {
        tooltip.style.left = "0";
        tooltip.style.right = "auto";
      }

      if (y > window.innerHeight / 2) {
        tooltip.style.top = "auto";
        tooltip.style.bottom = "0";
        transformY = "-100%";
      } else {
        tooltip.style.top = "0";
        tooltip.style.bottom = "auto";
      }
      tooltip.style.transform = `translate(${transformX}, ${transformY})`;
    }
  }, [hoveredCuboidInfo]);

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} />

      {pointsGeometry && (
        <points geometry={pointsGeometry}>
          <pointsMaterial
            vertexColors
            size={pointSize}
            transparent
            opacity={1}
            depthWrite={false}
          />
        </points>
      )}

      {cuboids.map((cuboid, index) => (
        <Cuboid
          key={index}
          cuboid={cuboid}
          onHover={() => setHoveredCuboidInfo(cuboid)}
          onUnHover={() => setHoveredCuboidInfo(null)}
        />
      ))}

      {hoveredCuboidInfo && (
        <Html position={hoveredCuboidInfo.position}>
          <div ref={tooltipRef} className="cuboid-tooltip">
            <pre>{JSON.stringify(hoveredCuboidInfo.info, null, 2)}</pre>
          </div>
        </Html>
      )}
    </>
  );
};
