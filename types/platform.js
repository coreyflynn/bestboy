// @flow
import type { LocationShape } from 'react-router-dom';

declare type TrackingLevel = 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly';

declare type FeedItemLocation = {
  pathname: string,
  state: {
    backPath: string,
  },
};

declare type DesktopFile = {
  path: string,
  webkitRelativePath: string,
};

declare type PlatformUtils = {
  resize(type: 'login' | 'app'): void,
  showWindow(): void,
  hideWindow(): void,
  uploadAsset(
    o: {
      description: string,
      file: File & { path: string },
      fileName: string,
      id: string,
      parentId: string,
      projectId: string,
      title: string,
      versionAssetId: string,
    },
    emit: (input: any) => void,
  ): () => void,
  initAllTracking(user: string): void,
  initTracking(): void,
  initLocationTracking(): void,
  initErrorTracking(): void,
  addTouchBarButton(spec: TouchBarButtonSpec): { remove: () => void, control: any },
  trackUser(user: string): void,
  trackEvent(event: string, level: TrackingLevel, details?: { [key: string]: any }): void,
  handleOpenFeedItemRequests((event: any, location: FeedItemLocation) => void): void,
  makeOpenFeedItemRequest(location: LocationShape): void,
  getFileListFromFolderInput(files: DesktopFile[]): DesktopFile[],
  reloadChildWindow(): void,
};

declare module 'platform' {
  declare module.exports: PlatformUtils;
}
