import { useRef } from "react";
import { MeshProps } from "@react-three/fiber";
import * as THREE from "three";
import { CuboidType } from "../types/Cuboid";

interface CuboidProps extends MeshProps {
  cuboid: CuboidType;
  hoveredCuboidId: string | null;
  setHoveredCuboidId: (id: string | null) => void;
}

export const Cuboid = ({
  cuboid,
  hoveredCuboidId,
  setHoveredCuboidId,
  ...props
}: CuboidProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const hovered = cuboid.info.uuid === hoveredCuboidId;

  return (
    <mesh
      ref={meshRef}
      position={cuboid.position}
      rotation={[0, 0, cuboid.yaw]}
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredCuboidId(cuboid.info.uuid);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredCuboidId(null);
      }}
    >
      <boxGeometry args={cuboid.dimensions} />
      <meshStandardMaterial
        color={hovered ? "#FFD700" : "#00CED1"}
        transparent
        opacity={0.4}
        roughness={0.5}
      />
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(...cuboid.dimensions)]}
        />
        <lineBasicMaterial color="#FFFFFF" />
      </lineSegments>
    </mesh>
  );
};
