// @flow
declare var module: {
  hot?: {
    accept(path: string, callback: () => {}): Promise<void>,
  },
};
