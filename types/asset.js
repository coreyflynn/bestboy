// @flow
/* eslint no-undef: 0 */
import {
  USER_ACTIONS,
  USER_ASSET_PERMISSIONS,
  getAssetPermissionsMap,
} from 'src/utils/assetPermissions';

type Strategy = {
  streamer: string,
  type: 'rtmp' | 'rtmpt',
  url: string,
};

declare type Derivative = {
  duration?: number,
  fileSize?: number,
  frameRate?: number,
  height?: number,
  width?: number,
  url?: string,
  strategies?: Strategy[],
  type: 'source' | 'proxy' | 'sprites' | 'webm' | 'waveform' | 'preroll' | 'proxy2m',
  posterFrame?: string,
};

declare type AssetPermission =
  USER_ASSET_PERMISSIONS.ASSET_CREATE
  | USER_ASSET_PERMISSIONS.ASSET_DELETE
  | USER_ASSET_PERMISSIONS.ASSET_SOURCE
  | USER_ASSET_PERMISSIONS.ASSET_READ
  | USER_ASSET_PERMISSIONS.ASSET_UPDATE
  | USER_ASSET_PERMISSIONS.COLLABORATION_COMMENT
  | USER_ASSET_PERMISSIONS.COLLABORATION_RATE
  | USER_ASSET_PERMISSIONS.COLLABORATION_REQUEST_APPROVAL
  | USER_ASSET_PERMISSIONS.REPORTING_EXPORT
  | USER_ASSET_PERMISSIONS.SERVICE_TRANSCRIPT
  | USER_ASSET_PERMISSIONS.SHARING_EXTERNAL
  | USER_ASSET_PERMISSIONS.SHARING_INTERNAL
;

declare type ApprovalStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'complete';
declare type ArchiveStatus = 'n/a' | 'ArchiveRequested' | 'ArchiveQueued' | 'Archived';
declare type AssetType = 'video' | 'image' | 'audio' | 'document' | 'archive';
declare type TranscriptStatus = 'Pending' | 'n/a' | 'Available';

declare type SpriteCoords = {
  x: number,
  y: number,
  w: number,
  h: number,
};

declare type Sprites = {
  timeFetched: moment$Moment,
  image: string,
  coords: SpriteCoords[],
};

declare type UserAction =
  USER_ACTIONS.CAN_COMMENT_ON_ASSET
  | USER_ACTIONS.CAN_DELETE_ASSET
  | USER_ACTIONS.CAN_DELETE_FOLDER
  | USER_ACTIONS.CAN_DOWNLOAD_ASSET
  | USER_ACTIONS.CAN_EDIT_ASSET
  | USER_ACTIONS.CAN_EDIT_FOLDER
  | USER_ACTIONS.CAN_EXPORT_ASSET_REPORTING
  | USER_ACTIONS.CAN_MANAGE_PROJECT_USERS
  | USER_ACTIONS.CAN_MANAGE_TRANSCRIPT
  | USER_ACTIONS.CAN_MANAGE_WATERMARK
  | USER_ACTIONS.CAN_MOVE_ASSET_FROM_PROJECT
  | USER_ACTIONS.CAN_MOVE_ASSET_TO_PROJECT
  | USER_ACTIONS.CAN_MOVE_ASSET_WITHIN_PROJECT
  | USER_ACTIONS.CAN_RATE_ASSET
  | USER_ACTIONS.CAN_REQUEST_APPROVAL
  | USER_ACTIONS.CAN_SHARE_ASSET
  | USER_ACTIONS.CAN_SHARE_ASSET_EXTERNAL
  | USER_ACTIONS.CAN_SHARE_ASSET_INTERNAL
  | USER_ACTIONS.CAN_UPLOAD_ASSET
  | USER_ACTIONS.CAN_VIEW_ASSET
  | USER_ACTIONS.CAN_VIEW_FOLDER
;

declare type AssetPermissionsMap = {
  [key: UserAction]: getAssetPermissionsMap
};

declare type Asset = {
  id: string,
  approvalStatus: ApprovalStatus,
  archiveStatus: ArchiveStatus,
  averageRating: any,
  commentCount: number,
  dateCreated: number,
  dateModified: number,
  derivatives: Derivative[],
  description: string,
  duration: number,
  external: boolean,
  fileName: string,
  folderId?: string,
  myRating: any,
  permissions: AssetPermission[],
  posterFrame: string,
  private: boolean,
  progress: number,
  projectId: string,
  sprites: Sprites,
  tags: string[],
  title: string,
  transcriptStatus: TranscriptStatus,
  type: AssetType,
  uploadedBy: string,
};

declare type AssetQueryParams = {
  index?: number,
};

declare type AssetVersion = {
  versionId: string,
  assetId: string,
  dateCreated: number,
  status: 'ACTIVE' | 'INACTIVE',
  asset: Asset,
};

declare type AssetPlaceholder = {
  localId: string,
  serverId: null | string,
  uploadProgress: number,
  encodeProgress: number,
  status: 'queued' | 'uploading' | 'encoding',
  fileSize: number,
  fileName: string,
};
