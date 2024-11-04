import { FrameData } from "../types/FrameData";

const baseUrl =
  process.env.REACT_APP_BASE_URL ||
  "https://static.scale.com/uploads/pandaset-challenge";

export async function fetchFrameData(frameNumber: number): Promise<FrameData> {
  const frameString = frameNumber.toString().padStart(2, "0");
  const url = `${baseUrl}/frame_${frameString}.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching frame ${frameNumber}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchFramesData(
  frameCount: number
): Promise<FrameData[]> {
  const framePromises = Array.from({ length: frameCount }, (_, i) =>
    fetchFrameData(i)
  );
  return Promise.all(framePromises);
}