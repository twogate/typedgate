import { AppImage } from './app-image';

// @TG:path .official
export interface OfficialConfig {
  menuType: OfficialMenuType;
  menuItems: OfficialMenuItem[];

  officialLinks: OfficialLinkItem[];
}

export type OfficialMenuType = 'panel' | 'list';
export interface OfficialMenuItem {
  name: string;
  icon?: AppImage;
  text?: string;
  link: {
    type: 'internal' | 'external';
    url: string;
  };
}
export interface OfficialLinkItem {
  name: 'youtube' | 'twitter' | 'instagram' | 'line-blog' | 'facebook';
  url?: string;
  order: number;
}

// 初期値
export const defaultOfficialConfig: OfficialConfig = {
  menuType: 'list',
  menuItems: [],

  officialLinks: [
    {
      name: 'youtube',
      url: '',
      order: 1,
    },
    {
      name: 'twitter',
      url: '',
      order: 2,
    },
    {
      name: 'instagram',
      url: '',
      order: 3,
    },
    {
      name: 'line-blog',
      url: '',
      order: 4,
    },
    {
      name: 'facebook',
      url: '',
      order: 5,
    },
  ],
};
