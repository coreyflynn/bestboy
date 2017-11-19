declare module 'recast'
declare module 'flow-parser'
declare module 'vorpal'
declare interface FileWriterOutput {
  message: string;
  color: string;
}

declare module 'vorpal-autocomplete-fs'
declare module 'chalk'

interface VorpalArgs {
  featurePath: string;
  dir: string;
  type: string;
}

declare interface VorpalAnswers {
  featurePath: string;
  parts?: string[];
}

declare interface Vorpal {
  command(s: string): Vorpal;
  autocomplete(f: (args?: any) => any): Vorpal;
  action(f: (args: VorpalArgs, callback: (args?: any) => any) => Promise<void>): Vorpal;
  prompt(a: any): Promise<VorpalAnswers>;
  delimiter(s: string): Vorpal;
  chalk: {
    [key: string]: (s: string) => string;
  };
  log(s:string): void;
  show(): Vorpal;
}

declare type BaseGeneratorFunction = (featurePath: string) => FileWriterOutput
declare type NameGeneratorFunction = (featurePath: string, name: string) => FileWriterOutput