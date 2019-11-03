import { AppImage } from './app-image';
import { AppColor } from './color-theme';

export interface MemberCardConfigItem {
  type: 'annual' | 'monthly';
  textColor: string;
  asset: AppImage;
}

// @TG:path .memberCardConfig
export interface MemberCardConfig {
  /**
   * 会員証の表示の情報
   */
  configurations: MemberCardConfigItem[];
  /**
   * 会員証の日付, 誕生日か入会日か
   */
  dateType: 'birthday' | 'registerday';
  /**
   * 会員証の年齢など表示非表示のフラグ
   */
  displayContent: {
    avatar: boolean;
    nickname: boolean;
    memberNumber: boolean;
    date: boolean;
  };
  avatarBorderGradationColor: AppColor;
}

export const defaultMemberCardConfig: MemberCardConfig = {
  configurations: [
    {
      type: 'annual',
      textColor: '',
      asset: null,
    },
    {
      type: 'monthly',
      textColor: '',
      asset: null,
    },
  ],
  dateType: 'registerday',
  displayContent: {
    avatar: true,
    nickname: true,
    memberNumber: true,
    date: true,
  },
  avatarBorderGradationColor: {
    type: 'gradient',
    color: 'linear-gradient(60deg, #91a0ff 0%, #189dff 30%, #3affd2 45%, #26b9f2 60%, #1e9dff 100%)',
  },
};
