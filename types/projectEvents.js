// @flow
/* eslint no-undef: 0 */

declare type ProjectEventName =
  'asset.create' |
  'asset.delete' |
  'asset.download' |
  'asset.update' |
  'asset.view' |
  'asset_comment.create' |
  'asset_comment.delete' |
  'asset_comment.update' |
  'asset_metadata.create' |
  'asset_metadata.delete' |
  'asset_metadata.update' |
  'asset_source.ready' |
  'folder.create' |
  'folder.delete' |
  'folder.update' |
  'project.create' |
  'project.delete' |
  'project.update' |
  'project_invitation.create' |
  'project_invitation.delete' |
  'project_invitation.update' |
  'project_users.create' |
  'project_users.delete' |
  'project_users.update' |
  'quicklink.create' |
  'quicklink.delete' |
  'quicklink.update' |
  'quicklink.view.email';

declare type ProjectInvitation = {
  accepted: boolean,
  accountId: string,
  created: number,
  hostname: string,
  id: string,
  invitedBy: string,
  invitedByName: string,
  projectId: string,
  projectName: string,
  recipientEmail: string,
  recipientIsNewUser: boolean,
  roleTemplateId: string,
};

declare type ProjectEntity = {
  asset: Asset,
  folder: Folder,
  invitation: ProjectInvitation,
  project: Project,
  projectIds: string[],
  project_user: User,
  quickLink: Quicklink,
};

declare type ProjectEvent = {
  accountId: string,
  created: number,
  entity: ProjectEntity,
  eventName: ProjectEventName,
  hostname: string,
  user: User,
};

declare type ProjectEvents = {
  code: number,
  data: ProjectEvent[],
  message: string,
  success: boolean,
  total: number,
};
