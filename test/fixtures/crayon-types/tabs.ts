import { AppImage } from './app-image';

export type TabKind = 'home' | 'timeline' | 'contents' | 'blog' | 'video' | 'schedule' | 'official';

export interface Tab {
  name: TabKind;
  icon?: AppImage;
  text: string;
}

// @TG:path .tabs
export interface TabsConfig {
  tabs: Tab[];
}

export const defaultTabsConfig: TabsConfig = {
  tabs: [
    {
      name: 'home',
      icon: null,
      text: 'ホーム',
    },
    {
      name: 'official',
      icon: null,
      text: '公式情報',
    },
  ],
};
