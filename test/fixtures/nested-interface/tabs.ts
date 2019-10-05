export type TabKind = 'home' | 'timeline' | 'contents' | 'blog'  | 'video' | 'schedule' | 'official';

export interface Tab {
  name: TabKind;
  text: string;
}

// @TG:path .tabs
export interface TabsConfig {
  tabs: Tab[];
}
