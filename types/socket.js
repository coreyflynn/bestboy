// @flow
/* eslint no-undef: 0 */
import type { Dispatch } from 'redux';
import type { RouterHistory } from 'react-router';

declare type SocketActor = {
  id: string,
  avatar: string,
  firstName: string,
  lastName: string,
};

declare type SocketData = {
  actor: SocketActor,
  accountId: string,
  entity: {
    project?: Project,
    payload?: {
      type: string,
      id: string,
    },
    asset?: Asset,
    comment?: Comment,
    quickLink?: Quicklink,
  },
  eventName: string,
};

declare type Socket = {
  addListener(name: string, callback: (data: SocketData) => any): void,
  removeListener(name: string, callback: (data: SocketData) => any): void,
  subscribeToChannel(channel: string): void,
  removeAllListeners(): void,
  isSubscribed(): boolean,
};

declare type SocketListener = (data: SocketData) => void;

declare type PendingSocketListener = {
  eventName: string,
  listener: SocketListener,
};

declare type SocketListenerFactory = (
  dispatch: Dispatch<*>,
  history: RouterHistory,
) => PendingSocketListener;
