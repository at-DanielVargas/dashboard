export const arrayCssToRecordBoolean = (classes: string[]): Record<string, boolean> => {
  if (!classes) return {}
  return classes.reduce((a, c) => ({ ...a, [c]: true }), {})
}
