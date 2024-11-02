export interface FrameData {
  frame_id: number;
  points: number[][];
  cuboids: CuboidData[];
}

export interface CuboidData {
  uuid: string;
  label: string;
  yaw: number;
  stationary: boolean;
  camera_used: number;
  "position.x": number;
  "position.y": number;
  "position.z": number;
  "dimensions.x": number;
  "dimensions.y": number;
  "dimensions.z": number;
  "cuboids.sibling_id": string;
  "cuboids.sensor_id": number;
}

