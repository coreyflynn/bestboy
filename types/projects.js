// @flow
/* eslint no-undef: 0 */
import {
  USER_ACTIONS,
  USER_PROJECT_PERMISSIONS,
  getUserProjectPermissionsMap,
} from 'src/utils/projectPermissions';

declare type ProjectAggregates = {
  averageDuration: number,
  averageFileSize: number,
  totalAssets: number,
  totalDuration: number,
  totalFileSize: number,
  totalFolders: number,
  totalUsers: number,
};

declare type Project = {
  aggregates: ProjectAggregates,
  banner: string,
  dateCreated: number,
  description: string,
  favorite: boolean,
  folderCount: number,
  id: string,
  isWatermarked: boolean,
  name: string,
  numericId: number,
  ownerId: string,
  poster: string,
  quickSite: boolean,
  type: string,
  users: User[],
  owners: User[],
};

declare type UserAction =
  USER_ACTIONS.CAN_CLONE_PROJECT
  | USER_ACTIONS.CAN_COMMENT_ON_ASSET
  | USER_ACTIONS.CAN_CREATE_FOLDER
  | USER_ACTIONS.CAN_DELETE_ASSET
  | USER_ACTIONS.CAN_DELETE_FOLDER
  | USER_ACTIONS.CAN_DELETE_PROJECT
  | USER_ACTIONS.CAN_DOWNLOAD_ASSET
  | USER_ACTIONS.CAN_EDIT_ASSET
  | USER_ACTIONS.CAN_EDIT_FOLDER
  | USER_ACTIONS.CAN_EDIT_PROJECT
  | USER_ACTIONS.CAN_EXPORT_ASSET_REPORTING
  | USER_ACTIONS.CAN_MANAGE_PROJECT_USERS
  | USER_ACTIONS.CAN_MANAGE_TRANSCRIPT
  | USER_ACTIONS.CAN_MANAGE_WATERMARK
  | USER_ACTIONS.CAN_MOVE_ASSET_FROM_PROJECT
  | USER_ACTIONS.CAN_MOVE_ASSET_TO_PROJECT
  | USER_ACTIONS.CAN_MOVE_ASSET_WITHIN_PROJECT
  | USER_ACTIONS.CAN_MOVE_FOLDER_FROM_PROJECT
  | USER_ACTIONS.CAN_MOVE_FOLDER_TO_PROJECT
  | USER_ACTIONS.CAN_MOVE_FOLDER_WITHIN_PROJECT
  | USER_ACTIONS.CAN_RATE_ASSET
  | USER_ACTIONS.CAN_REQUEST_APPROVAL
  | USER_ACTIONS.CAN_SHARE_ASSET
  | USER_ACTIONS.CAN_SHARE_ASSET_EXTERNAL
  | USER_ACTIONS.CAN_SHARE_ASSET_INTERNAL
  | USER_ACTIONS.CAN_UPLOAD_ASSET
  | USER_ACTIONS.CAN_VIEW_ASSET
  | USER_ACTIONS.CAN_VIEW_FOLDE
  | USER_ACTIONS.CAN_VIEW_PROJECT
;

declare type UserProjectPermission =
  USER_PROJECT_PERMISSIONS.ASSET_CREATE
  | USER_PROJECT_PERMISSIONS.ASSET_DELETE
  | USER_PROJECT_PERMISSIONS.ASSET_READ
  | USER_PROJECT_PERMISSIONS.ASSET_SOURCE
  | USER_PROJECT_PERMISSIONS.ASSET_UPDATE
  | USER_PROJECT_PERMISSIONS.COLLABORATION_COMMENT
  | USER_PROJECT_PERMISSIONS.COLLABORATION_RATE
  | USER_PROJECT_PERMISSIONS.COLLABORATION_REQUEST_APPROVAL
  | USER_PROJECT_PERMISSIONS.DOMAIN_ADMINISTRATOR
  | USER_PROJECT_PERMISSIONS.DOMAIN_MANAGER
  | USER_PROJECT_PERMISSIONS.PROJECT_OWNER
  | USER_PROJECT_PERMISSIONS.REPORTING_EXPORT
  | USER_PROJECT_PERMISSIONS.SERVICE_TRANSCRIPT
  | USER_PROJECT_PERMISSIONS.SHARING_EXTERNAL
  | USER_PROJECT_PERMISSIONS.SHARING_INTERNAL
;

declare type UserProjectPermissionsMap = {
  [key: UserAction]: getUserProjectPermissionsMap
};

declare type ProjectInvite = {
  accepted: boolean,
  accountId: number,
  created: number,
  hostname: string,
  id: string,
  invitedby: string,
  invitedByName: string,
  projectId: string,
  projectName: string,
  recipientEmail: string,
  recipientIsNewUser: boolean,
  roleTemplateId: string,
};
