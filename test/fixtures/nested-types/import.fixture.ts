import { AppImage } from './app-image.fixture';

// @TG:path .entrance
export interface EntranceConfig {
  transfer: boolean;
  transferText: string | null;
  entranceImage: AppImage | null;
}

export const defaultEntranceConfig: EntranceConfig = {
  transfer: false,
  transferText: null,
  entranceImage: null,
};
