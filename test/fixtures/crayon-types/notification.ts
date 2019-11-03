import { AppImage } from './app-image';

// @TG:path .notification
export class NotificationConfig {
  /**
   * お知らせBotのアイコン
   */
  icon?: AppImage;
  /**
   * メッセージタブの有無
   */
  hasMessageTab?: boolean;
}

export const defaultNotificationConfig: NotificationConfig = {
  hasMessageTab: true,
};
