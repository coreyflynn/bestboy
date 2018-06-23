// @flow
/* eslint no-undef: 0 */

declare type Action = {
  type: string,
  payload?: { [key: string]: any } | Error,
  meta?: { [key: string]: any },
  error?: boolean,
};
