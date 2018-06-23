// @flow
/* eslint no-undef: 0 */
type PermissionGroup = {
  displayName: string,
  groupIdentifier: string,
  permissions: string[],
};

declare type Role = {
  id: string,
  displayName: string,
  description: string,
  context: string,
  level: string,
  visible: boolean,
  default: boolean,
  permissionGroups: PermissionGroup[],
  roleTemplateId: string,
};

declare type RoleTemplate = {
  default: boolean,
  deleted: boolean,
  description: string,
  displayName: string,
  id: string,
  permissionGroups: PermissionGroup[],
  visible: boolean,
};

declare type User = {
  id: string,
  userName: string,
  firstName: string,
  lastName: string,
  roles: Role[],
  email: string
};

declare type UserDomainPermissionsMap = {
  [key: string]: boolean
};
