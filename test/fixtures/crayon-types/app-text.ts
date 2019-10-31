export interface AppTextMap {
  applicationName: string;
  copyright: string;
  paidMemberName: string;
  anonymouseMemberName: string;

  policyUrl: string;
  termUrl: string;
  paidServiceTermUrl: string;
  guideUrl: string;
  sharedUseUrl: string;
  lawUrl: string;
  contactUrl: string;

  musicLicenseText: string;
}

export type AppTextMapKey = keyof AppTextMap;

// @TG:path .text
export class AppTextConfig {
  textMap: AppTextMap;
}

export const defaultTextConfig: AppTextConfig = {
  textMap: {
    applicationName: '',
    copyright: '© CRAYON Inc.',
    paidMemberName: '有料会員',
    anonymouseMemberName: 'ゲスト',

    policyUrl: 'https://pages.app.c-rayon.com/terms/',
    termUrl: 'https://pages.app.c-rayon.com/terms/',
    paidServiceTermUrl: 'https://pages.app.c-rayon.com/member-terms/',
    guideUrl: '',
    sharedUseUrl: '',
    lawUrl: 'https://pages.app.c-rayon.com/law/',
    contactUrl: '',

    musicLicenseText: '',
  },
};
