import React, { useRef, useState } from "react";
import { MeshProps } from "@react-three/fiber";
import * as THREE from "three";
import { CuboidType } from "../types/Cuboid";

interface CuboidProps extends MeshProps {
  cuboid: CuboidType;
  onHover: () => void;
  onUnHover: () => void;
}

export const Cuboid = ({
  cuboid,
  onHover,
  onUnHover,
  ...props
}: CuboidProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={cuboid.position}
      rotation={[0, cuboid.yaw, 0]}
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover();
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onUnHover();
      }}
    >
      <boxGeometry args={cuboid.dimensions} />
      <meshStandardMaterial
        color={hovered ? "yellow" : "orange"}
        transparent
        opacity={0.5}
      />
      <lineSegments>
        <edgesGeometry
          attach="geometry"
          args={[new THREE.BoxGeometry(...cuboid.dimensions)]}
        />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </mesh>
  );
};