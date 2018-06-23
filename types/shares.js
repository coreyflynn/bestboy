// @flow
/* eslint no-undef: 0 */
declare type ShareRecipient = {
  email: string,
  firstName: ?string,
  lastName: ?string,
  userId: ?string,
};

declare type EmailShare = {
  subject: string,
  message: string,
  audience: ShareRecipient[],
};

declare type QuicklinkShareData = {
  notifyByEmail: boolean,
  sharedByEmail: string,
  sharedByFirstName: string,
  sharedByLastName: string,
  emailShare: EmailShare,
  title: string,
  description: string,
  configuration: {
    settings: { [key: string]: string }[],
  },
  expires: number,
  thumbnail: string,
  assetIds: string[],
  authorizedUserIds: string[],
};
