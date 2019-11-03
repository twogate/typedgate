export interface AppImageParams {
  originalName: string;
  contentType: string;
  url: string;
}

export interface AppImage {
  assetManagerReferenceImageId: string;
  defaultContent: AppImageParams;
  content2x: AppImageParams | null;
  content3x: AppImageParams | null;
}
