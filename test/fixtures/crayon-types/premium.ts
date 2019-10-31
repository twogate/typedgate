import { AppImage } from './app-image';
export interface PremiumText {
  color: string;
  text: string;
}

// @TG:path .premium
export interface PremiumConfig {
  /**
   * 登録用の動画
   */
  promotionalPremiumMovie?: string;
  /**
   * ボタンの配置と「会員になるにはこちら」等の文言
   */
  buttonDecoration: {
    topText?: PremiumText;
    bottomText?: PremiumText;
  };
  /**
   * 年額移行やファンクラブ移行の人たちへ向けた注意
   */
  notes?: {
    title: string;
    description: string;
  };
  /**
   * 会員特典
   */
  benefitImage: AppImage;
}

export const defaultPremiumConfig: PremiumConfig = {
  promotionalPremiumMovie: '',
  buttonDecoration: {
    topText: {
      color: '#111111',
      text: 'プレミアム会員になる',
    },
  },
  notes: {
    title: '',
    description: '',
  },
  benefitImage: null,
};
