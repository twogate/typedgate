export type ProviderName = 'twitter' | 'facebook' | 'line';

// providers の Mapped Type はvalidationが難しいのでとりあえず除外
export class LoginConfig {
  /**
   * ログインの種類
   */
  providers: { [key in ProviderName]: ProviderItem };
}

// @TG:path .login.providers.twitter
// @TG:path .login.providers.facebook
// @TG:path .login.providers.line
export interface ProviderItem {
  displayName: string;
  isShow: boolean;
}

export const defaultLoginConfig: LoginConfig = {
  providers: {
    twitter: {
      displayName: 'Twitter',
      isShow: true,
    },
    facebook: {
      displayName: 'Facebook',
      isShow: false,
    },
    line: {
      displayName: 'LINE',
      isShow: true,
    },
  },
};
