export type TabKind = 'home' | 'timeline' | 'contents' | 'blog'  | 'video' | 'schedule' | 'official';

// @TG:path
export interface Tab {
  name: TabKind;
  text: string;
}

export interface TabsConfig {
  tabs: Tab[];
}

export const defaultTabsConfig: TabsConfig = {
  tabs: [
    {
      name: 'home',
      text: 'ホーム',
    },
    {
      name: 'official',
      text: '公式情報',
    },
  ],
};
