import { AppImage } from './app-image';

export interface LoadingAnimationConfig {
  src: AppImage | null;
  /**
   * アニメーションの横幅(px)、縦横比を維持して描画する
   */
  size: number;
}

// @TG:path .loading
export class LoadingConfig {
  /**
   * ローディングアニメーション
   */
  loadingAnimation: LoadingAnimationConfig;
  /**
   * 黒背景のローディングアニメーション
   */
  loadingDarkBgAnimation?: LoadingAnimationConfig;
}

export const defaultLoadingConfig: LoadingConfig = {
  loadingAnimation: {
    src: null,
    size: 32,
  },
};
