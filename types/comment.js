// @flow
/* eslint no-undef: 0 */

declare type Comment = {
  id: string,
  localId?: string,
  inResponseTo?: string,
  context?: string,
  startTimeCode?: number,
  endTimeCode?: number,
  dateCreated?: number,
  body: string,
  drawings: ?Drawing[],
  user: $Shape<User>,
  done?: boolean,
  responses?: Comment[],
  status: string,
};

declare type PostCommentPayload = {
  quicklinkId: string,
  assetId: string,
  comment: $Shape<Comment>,
};
