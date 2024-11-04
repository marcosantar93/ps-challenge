import { useEffect, useState, useMemo, useRef } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { FrameData } from "../types/FrameData";
import { Cuboid } from "./Cuboid";
import { CuboidType } from "../types/Cuboid";

interface SceneProps {
  currentFrame: number;
  framesData: FrameData[];
}

export const Scene = ({ currentFrame, framesData }: SceneProps) => {
  const [pointsPositions, setPointsPositions] = useState<Float32Array | null>(
    null
  );
  const [pointsColors, setPointsColors] = useState<Float32Array | null>(null);
  const [cuboids, setCuboids] = useState<CuboidType[]>([]);
  const [hoveredCuboidId, setHoveredCuboidId] = useState<string | null>(null);

  useEffect(() => {
    const data = framesData[currentFrame];
    if (data) {
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

      const colorInstance = new THREE.Color();

      points.forEach((point, i) => {
        const z = point[2];
        const color = getColorByHeight(z, minZ, maxZ, colorInstance);
        colors.set(color, i * 3);
      });

      setPointsPositions(positions);
      setPointsColors(colors);

      const cuboidsData = data.cuboids.map((cuboid) => ({
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
    }
  }, [framesData, currentFrame]);

  const pointSize = 0.1; // Adjust as needed

  const getColorByHeight = (
    z: number,
    minZ: number,
    maxZ: number,
    colorInstance: THREE.Color
  ): [number, number, number] => {
    const normalizedZ = (z - minZ) / (maxZ - minZ);
    colorInstance.setHSL((1 - normalizedZ) * 0.7, 1, 0.5);
    return [colorInstance.r, colorInstance.g, colorInstance.b];
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

  const hoveredCuboidInfo =
    cuboids.find((cuboid) => cuboid.info.uuid === hoveredCuboidId) || null;

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
          hoveredCuboidId={hoveredCuboidId}
          setHoveredCuboidId={setHoveredCuboidId}
        />
      ))}

      {hoveredCuboidInfo && (
        <Html position={hoveredCuboidInfo.position}>
          <div className="cuboid-tooltip">
            <pre>{JSON.stringify(hoveredCuboidInfo.info, null, 2)}</pre>
          </div>
        </Html>
      )}
    </>
  );
};
