export interface SourceObject {
  [key: string]: any;
}

export function createNestedObject(source: SourceObject): SourceObject {
  const result: SourceObject = {};

  for (const key in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(key)) {
      const value = source[key];
      const keys = key.split('.');

      let currentObj = result;
      for (let i = 0; i < keys.length; i++) {
        const currentKey = keys[i];
        if (i === keys.length - 1) {
          currentObj[currentKey] = value;
        } else {
          currentObj[currentKey] = currentObj[currentKey] || {};
          currentObj = currentObj[currentKey];
        }
      }
    }
  }

  return result;
}

export function excludeProperties<
  T extends Record<string, any>,
  K extends keyof T
>(obj: T, exclude: K[]): Omit<T, K> {
  const result = { ...obj };

  exclude.forEach((prop) => {
    delete result[prop];
  });

  return result;
}
