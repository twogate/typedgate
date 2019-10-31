export type ContentsType = 'blog' | 'video';
export interface ContentsCategoryTab {
  category: ContentsType;
  label: string;
  latestTopicTitle: string;
}

// @TG:path .contents
export interface ContentsConfig {
  categoryTabs: ContentsCategoryTab[];
  /**
   * コンテンツにコメントできるか
   */
  canComment: boolean;
}

export const defaultContetnsConfig: ContentsConfig = {
  categoryTabs: [
    {
      category: 'blog',
      label: 'ブログ',
      latestTopicTitle: '新着ブログ',
    },
    {
      category: 'video',
      label: '動画',
      latestTopicTitle: '新着動画',
    },
  ],
  canComment: false,
};
