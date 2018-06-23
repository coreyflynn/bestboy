declare module 'recast'
declare module 'flow-parser'
declare module 'vorpal'
declare module 'cosmiconfig'

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
  key: string;
  value: any;
}

declare interface VorpalAnswers {
  featurePath: string;
  parts?: string[];
}

declare interface Config {
  [key: string]: any;
  fileExtensions: {
    component: string;
    componentTests: string;
  },
  equalityChecks: {
    actionTests: '.toEqual';
  },
  imports: {
    componentTests: string[];
  },
  wrappers: {
    componentTests: string;
  }
}

declare interface Vorpal {
  command(s: string, desc?: string): Vorpal;
  autocomplete(f: (args?: any) => any): Vorpal;
  action(f: (args: VorpalArgs, callback: (args?: any) => any) => Promise<void>): Vorpal;
  prompt(a: any): Promise<VorpalAnswers>;
  delimiter(s: string): Vorpal;
  chalk: {
    [key: string]: (s: string) => string;
  };
  log(s:string): void;
  show(): Vorpal;
  config: Config;
  configPath: string;
  flowConfigPath: string | null;
  primitiveTypes?: BestBoyTree
}

declare type BaseGeneratorFunction = (featurePath: string) => FileWriterOutput
declare type NameGeneratorFunction = (
  featurePath: string,
  name: string,
  config?: Config,
  vorpla?: Vorpal
) => FileWriterOutput

interface BestBoyNode {
  name: string,
  type: string,
  optional: boolean,
  value: BestBoyNode[] | string,
  genericName?: string,
}

interface BestBoyTree {
  [key: string]: BestBoyNode,
}

interface ESTreeNode {
  type: string,
  optional: boolean,
  value: {
    type: string,
    properties: ESTreeNode[],
    id?: {
      name: string,
    }
    types?: ESTreeNode[],
    elementType?: {
      type: string,
      id? : {
        name: string,
      }
    }
  },
  key: {
    name: string,
  },
  id: {
    name: string,
  },
  right: {
    properties: any,
    type?: string,
  },
}

interface Props {
  [key: string]: any,
}