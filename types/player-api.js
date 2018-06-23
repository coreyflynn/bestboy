// @flow
/* eslint no-undef: 0 */
declare type PlayerApi = {
  addEventListener(type: string, method: () => {}): void,
  getDuration(): number,
  getFullscreen(): boolean,
  getPlaying(): boolean,
  getPosition(): number,
  getSource(): string,
  getSpeed(): number,
  getStatus(): string,
  getVersion(): string,
  getVolume(): number,
  pause(): void,
  play(): void,
  removeEventListener(type: string, method: () => {}): void,
  setFullscreen(fullscreen: boolean): void,
  setPosition(position: number): void,
  setSpeed(speed: number): void,
  setVolume(volume: number): void,
  toggle(): void,
};

