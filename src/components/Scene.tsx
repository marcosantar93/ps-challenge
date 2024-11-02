import { useEffect, useState, useMemo } from "react";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { fetchFrameData } from "../data/fetchData";
import { CuboidData } from "../types/FrameData";
import { Cuboid } from "./Cuboid";
import { CuboidType } from "../types/Cuboid";

interface SceneProps {
  currentFrame: number;
}

export const Scene = ({ currentFrame }: SceneProps) => {
  const [pointsPositions, setPointsPositions] = useState<Float32Array | null>(
    null
  );
  const [pointsColors, setPointsColors] = useState<Float32Array | null>(null);
  const [cuboids, setCuboids] = useState<CuboidType[]>([]);
  const [hoveredCuboidInfo, setHoveredCuboidInfo] = useState<CuboidType | null>(
    null
  );

  useEffect(() => {
    fetchFrameData(currentFrame).then((data) => {
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

  return (
    <>
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight intensity={0.5} />
      <pointLight position={[50, 50, 50]} />

      {pointsGeometry && (
        <points geometry={pointsGeometry}>
          <pointsMaterial
            vertexColors
            size={0.05}
            transparent
            opacity={0.8}
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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              padding: 10,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "black",
              border: "1px solid black",
              borderRadius: 5,
            }}
          >
            <pre>{JSON.stringify(hoveredCuboidInfo.info, null, 2)}</pre>
          </div>
        </Html>
      )}
    </>
  );
};
