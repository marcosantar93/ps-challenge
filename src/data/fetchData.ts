import { Buffer } from 'buffer';
import { FrameData } from '../types/FrameData';

const frameCache: { [key: number]: FrameData } = {};

export async function getFrameData(frameNumber: number): Promise<FrameData> {
  if (frameCache[frameNumber]) {
    return frameCache[frameNumber];
  }

  const baseUrl = process.env.REACT_APP_BASE_URL || 'https://static.scale.com/uploads/pandaset-challenge';
  const frameString = frameNumber.toString().padStart(2, '0');
  const url = `${baseUrl}/frame_${frameString}.json`;

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const jsonString = buffer.toString('utf-8');
    const data = JSON.parse(jsonString);
    frameCache[frameNumber] = data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchFramesData(frameCount: number): Promise<FrameData[]> {
  const framePromises = Array.from({ length: frameCount }, (_, i) => getFrameData(i));
  return Promise.all(framePromises);
}