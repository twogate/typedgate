import { AppImage } from './app-image';

// @TG:path .emptyAssets
export interface EmptyAssets {
  /**
   * コンテンツのデフォルトの画像
   */
  content: AppImage | null;
  /**
   * 空のためのコンポーネントに使用されるアイコン
   */
  empty: AppImage | null;
  /**
   * newsなどの空の時の画像
   */
  newsDefaultImages: AppImage[];
}

export const defaultEmptyAssets: EmptyAssets = {
  content: null,
  empty: null,
  newsDefaultImages: [],
};
