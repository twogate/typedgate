import { AppImage } from './app-image';

// @TG:path .home
export interface HomeConfig {
  contents: HomeContent[];
}
export type HomeContentName = 'schedule' | 'post' | 'blog' | 'video' | 'news' | 'banner' | 'custom';
export interface HomeContent {
  name: HomeContentName;
  available: boolean;
  meta?:
    | LatestScheduleMeta
    | LatestPostMeta
    | LatestBlogMeta
    | LatestVideoMeta
    | HomeNewsMeta
    | HomeBannerMeta
    | HomeCustomContentMeta;
}
export interface LatestContentHeader {
  type: 'text' | 'image';
  text?: string;
  textSize?: number;
  image?: AppImage;
  imageWidth?: number;
  border: boolean;
}
export interface LatestScheduleMeta {
  type: 'schedule';
  header: LatestContentHeader;
  /**
   * 表示期間(日数)
   */
  term: number;
}
export interface LatestPostMeta {
  type: 'post';
  header: LatestContentHeader;
  /**
   * 表示件数
   */
  itemCount: number;
  /**
   * 公開範囲
   *
   * - premium => 有料会員のみ
   * - free => ユーザー全体
   */
  visibility: 'premium' | 'free';
}
export interface LatestBlogMeta {
  type: 'blog';
  header: LatestContentHeader;
  /**
   * 表示件数
   */
  itemCount: number;
}
export interface LatestVideoMeta {
  type: 'video';
  header: LatestContentHeader;
  /**
   * 表示件数
   */
  itemCount: number;
}
export interface HomeNewsMeta {
  type: 'news';
  header: LatestContentHeader;
  /**
   * 表示件数
   */
  itemCount: number;
  backgroundColor: string;
}
export interface HomeBannerMeta {
  type: 'banner';
  bannerType: 'carousel' | 'stack';
}
export interface HomeCustomContentMeta {
  type: 'custom';
  image?: AppImage;
  /**
   * custom のみ複数なので、 一意を指すID(簡易的)
   */
  uniqueId: string;

  /**
   * 表示状態の依存先
   *
   * 例: schedule が指定されれば、 schedule が0件以上のとき表示
   */
  visibleDependencies: HomeContentName[];
}

// 初期値
export const defaultHomeConfig: HomeConfig = {
  contents: [],
};
