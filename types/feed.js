// @floW
/* eslint-disable no-undef */
declare type FeedItemPreview = {
  commentCount: number,
  id: string,
  thumbnailUrl: string,
  title: string,
  type: string,
};

declare type Originator = {
  company: string,
  firstName: string,
  email: string,
  lastName: string,
  id: string,
  lastLogin: number,
  tags: string[],
};

declare type FeedItem = {
  context: string,
  dateCreated: number,
  dateModified: number,
  favorite: boolean,
  id: string,
  originator: Originator,
  targetObjectId: string,
  payload: {
    assetCount?: number,
    authenticationType: 'Public' | 'Private' | 'Password' | 'Signed',
    commentCount?: number,
    configuration?: QuicklinkConfiguration,
    data: FeedItemPreview[],
    expires: string,
    hostname: string,
    id: string,
    message: string,
    title: string,
    token: string,
    type: 'QUICKLINK',
  },
  read: boolean,
  audience: Originator[],
};
