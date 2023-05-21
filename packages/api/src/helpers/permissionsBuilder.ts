import { EPermissionAction } from '../constants/app'

export interface ICustomPermissionItem {
  name: string
  actions: string[]
}

export const buildPermissions = (
  modules: Array<string | ICustomPermissionItem>,
  actions: EPermissionAction[] = [
    EPermissionAction.CREATE,
    EPermissionAction.DESTROY,
    EPermissionAction.SHOW,
    EPermissionAction.UPDATE,
    EPermissionAction.MANAGE
  ],
  superadmin = false
): string[] => {
  return modules.reduce(
    (acc, current) => {
      if (typeof current === 'string' && current !== '') {
        return [...acc, ...actions.map((a) => `${a}_${current}`)]
      } else {
        if (typeof current === 'object' && 'actions' in current && Array.isArray(current.actions)) {
          return [...acc, ...current.actions.map((a) => `${current.name}_${a}`)]
        } else {
          return []
        }
      }
    },
    superadmin ? ['super_admin'] : []
  )
}
