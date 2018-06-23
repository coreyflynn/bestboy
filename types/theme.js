// @flow
/* eslint no-undef: 0 */
declare type ThemePalette = {
  primary: string,
  secondary: string,
  tertiary: string,
  accent: string,
  dark: string,
  light: string,
};

declare type ThemeFocus = {
  unselected: string,
  hovered: string,
  focused: string,
  mutedSelected: string,
  selected: string,
};

declare type ThemeStructure = {
  nav: string,
  navBorder: string,
  secondaryNav: string,
  background: string,
};

declare type ThemeAccents = {
  success: string,
  default: string,
  destructive: string,
  hover: string,
  dark: string,
  dashboardIcon: string,
};

declare type ThemeText = {
  primary: string,
  secondary: string,
  tertiary: string,
  subdued: string,
  dark: string,
  light: string,
};

declare type Theme = {
  [key: string]: string,
  palette: ThemePalette,
  text: ThemeText,
  accents: ThemeAccents,
  focus: ThemeFocus,
  structure: ThemeStructure,
};


declare type GlamTheme = {
  theme: Theme,
}
