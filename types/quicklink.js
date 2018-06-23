// @flow
/* eslint no-undef: 0 */
declare type QuicklinkConfiguration = {
  id: string,
  settings: { key: string, value: string }[],
};

declare type Quicklink = {
  accountId: string,
  approvals: QuicklinkApproval[],
  assetIds: string[],
  configuration: QuicklinkConfiguration,
  created: number,
  description: string,
  expires: number,
  id: string,
  modified: number,
  ownerId: string,
  password: boolean,
  private: boolean,
  public: boolean,
  signed: boolean,
  shareId: string,
  thumbnail: string,
  title: string,
  url: string,
  watermarked: boolean,
  shares: ?QuicklinkShare[],
};

declare type Contact = {
  id: string,
  firstName: string,
  lastName: string,
  company: string,
  email: string,
  lastLogin: number,
  unreadCount: number,
}

declare type QuicklinkShare = {
  created: number,
  emailShare: QuicklinkEmailShare,
  id: string,
  notifyByEmail: boolean,
  sharedBy: string,
  sharedByEmail: string,
  sharedByFirstName: string,
  sharedByLastName: string,
  targetObjectId: string,
}

declare type QuicklinkEmailShare = {
  audience: QuicklinkEmailShareAudience[],
  message: string,
  subject: string,
}

declare type QuicklinkEmailShareAudience = {
  firstName: string,
  lastName: string,
  email: string,
  inbox: boolean,
  recipientType: ?string,
  userId: ?string,
}

declare type QuicklinkApproval = {
  assetId: string,
  dateCreated: number,
  userId: string,
}
