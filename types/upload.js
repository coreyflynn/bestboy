// @flow
declare type UploadItemId = string;

declare type UploadItem = {
  localId: UploadItemId,
  serverId: ?UploadItemId,
  uploadProgress: number,
  encodeProgress: number,
  file: any,
  fileName: string,
  fileSize: number,
  projectId: string,
  parentId?: string,
};
