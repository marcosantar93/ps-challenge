import { FrameData } from "../types/FrameData";

export async function fetchFrameData(frameNumber: number): Promise<FrameData> {
  const frameString = frameNumber.toString().padStart(2, '0');
  const url = `https://static.scale.com/uploads/pandaset-challenge/frame_${frameString}.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch frame data for frame ${frameNumber}`);
  }
  return response.json();
}