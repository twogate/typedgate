import { ColorTheme } from './color-theme';
import { GeneralConfig } from './general';
import { AdvancedConfig } from './advanced';
import { AppTextConfig } from './app-text';
import { TabsConfig } from './tabs';
import { HomeConfig } from './home';
import { ContentsConfig } from './contents';
import { OfficialConfig } from './official';
import { TimelineConfig } from './timeline';
import { MemberCardConfig } from './member-card';
import { PremiumConfig } from './premium';
import { EntranceConfig } from './entrance';
import { LoadingConfig } from './loading';
import { NotificationConfig } from './notification';
import { ManagerConfig } from './manager';
import { EmptyAssets } from './empty-asset';
import { LoginConfig } from './login';
import { CommonAssets } from './common-assets';

// TODO: 実装途中のものに関しては、状態にかかわらず、 optional にしてある
export interface AppConfig {
  theme?: ColorTheme;
  general?: GeneralConfig;
  advanced?: AdvancedConfig;
  text?: AppTextConfig;
  tabs?: TabsConfig;
  timeline?: TimelineConfig;
  home: HomeConfig;
  contents?: ContentsConfig;
  official: OfficialConfig;
  memberCardConfig?: MemberCardConfig;
  premium?: PremiumConfig;
  entrance?: EntranceConfig;
  loading?: LoadingConfig;
  notification?: NotificationConfig;
  manager?: ManagerConfig;
  emptyAssets?: EmptyAssets;
  login?: LoginConfig;
  commonAssets?: CommonAssets;
}
