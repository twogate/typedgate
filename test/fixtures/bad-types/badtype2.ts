export type TabKind = 'home' | 'timeline' | 'contents' | 'blog'  | 'video' | 'schedule' | 'official';

export interface Tab {
  name: TabKind;
  text: string;
}

// @TG:path .badpath
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
