export enum EModule {
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
  SALES = 'sales',
  FINANCIAL = 'financial',
  USERS = 'users',
  TRACKING = 'tracking',
  STORES = 'stores'
}

export enum EPermissionAction {
  CREATE = 'create',
  SHOW = 'show',
  UPDATE = 'update',
  DESTROY = 'destrow',
  MANAGE = 'manage'
}

export const Roles = {
  // rol por defecto al registrar un usuario por api o plataforma web
  client: {},
  // rol asignado al dueno del market por defecto super_admin
  owner: {},
  // rol por debajo del owner, solo puede modificar no eliminar
  manager: {},
  // rol por defecto para soporte
  support: {}
}
