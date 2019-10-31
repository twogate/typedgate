import { AppImage } from './app-image';

// @TG:path .timeline
export interface TimelineConfig {
  /**
   * 無料時に投稿を見せるかどうかのフラグ
   */
  isShowFreePosts: boolean;
  /**
   * 無料時の投稿を見せない場合の画像
   */
  samplePageImage: AppImage;
  showFreePostsCount: number;
  canComment: boolean;
  canLike: boolean;
}

// 初期値
export const defaultTimelineConfig: TimelineConfig = {
  isShowFreePosts: true,
  samplePageImage: null,
  showFreePostsCount: 3,
  canComment: true,
  canLike: true,
};
