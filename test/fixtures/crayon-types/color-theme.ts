export interface AppColor {
  type: 'single' | 'step' | 'gradient';
  color: string;
}
// @TG:path .theme
export interface ColorTheme {
  primary: AppColor;
  premium: AppColor;
  textPreimum: AppColor;

  grayscale: AppColor;
  text: AppColor;
  background: AppColor;
  border: AppColor;

  link: AppColor;
  like: AppColor;
  attention: AppColor;
}
export const defaultColorTheme: ColorTheme = {
  primary: {
    type: 'single',
    color: '#e83534',
  },
  premium: {
    type: 'gradient',
    color: 'linear-gradient(45deg, #149dff 0%, #96a0ff 100%)',
  },
  textPreimum: {
    type: 'single',
    color: '#149dff',
  },
  grayscale: {
    type: 'step',
    color: '#333333',
  },
  text: {
    type: 'single',
    color: '#333333',
  },
  background: {
    type: 'single',
    color: '#f7f7f7',
  },
  border: {
    type: 'single',
    color: '#777777',
  },
  link: {
    type: 'single',
    color: '#1e88e5',
  },
  like: {
    type: 'single',
    color: '#ff2e43',
  },
  attention: {
    type: 'single',
    color: '#000000',
  },
};
