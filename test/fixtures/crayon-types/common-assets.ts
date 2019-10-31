import { AppImage } from './app-image';

// TODO: 他の共通アセットもここへマージしたい
// @TG:path .commonAssets
export interface CommonAssets {
  borderImage: AppImage | null;
}
export const defaultCommonAssets: CommonAssets = {
  borderImage: null,
};
