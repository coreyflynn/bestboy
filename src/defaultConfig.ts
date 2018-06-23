const defaultConfig: Config = {
  fileExtensions: {
    component: 'jsx',
    componentTests: 'jsx',
  },
  equalityChecks: {
    actionTests: '.toEqual',
  },
  imports: {
    componentTests: [],
  },
  wrappers: {
    componentTests: 'const Wrapper = C => C',
  },
};

export default defaultConfig;
