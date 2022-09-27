export type RolesType = {
  ADMIN: string;
  EMPLOYEE: string;
  USER: string;
};

const ROLES_LIST: RolesType = {
  // adding layer of obscurity by storing roles as number strings
  ADMIN: "6677",
  EMPLOYEE: "9999",
  USER: "1212",
};

export default ROLES_LIST;
