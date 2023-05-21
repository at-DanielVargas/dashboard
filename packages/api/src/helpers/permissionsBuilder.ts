export const buildPermissions = (
  modules: Array<string>,
  actions: string[] = ['create', 'update', 'show', 'destroy', 'manage']
): string[] => {
  return modules.reduce((acc, current) => {
    return [...acc, ...actions.map((a) => `${a}_${current}`)]
  }, [])
}
