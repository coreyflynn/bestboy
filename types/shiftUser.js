// @flow
/* eslint no-undef: 0 */

type Alias = {
  firstName: string,
  lastName: string,
  company: string,
  email: string,
};

type Metadata = {
  shows: string[],
};

type Screeners = {
  accentColor: string,
  brandedLogo: string,
  bodyBackgroundColor: string,
  bodyTextColor: string,
  footerBackgroundColor: string,
  footerTextColor: string,
  headerBackgroundColor: string,
  headerTextColor: string,
  imagePlaceholderColor: string,
  popoutColor: string,
  progressBarColor: string,
  spacerColor: string,
};

type DomainMetadata = {
  companyUrl: string,
  logoUrl: string,
  screeners: Screeners,
  preroll: string,
};

type Domain = {
  id: string,
  applicationId: string,
  role: string,
  alias: Alias,
  tags: string[],
  metadata: Metadata,
  lastActivity: number,
  createdOn?: number,
  domainName: string,
  domainId: string,
  domainMetadata: DomainMetadata,
};

declare type ShiftUser = {
  id: string,
  email: string,
  emailVerified: boolean,
  clientId: string,
  apiKey: string,
  createdOn: number,
  name: string,
  domains: Domain[],
};
