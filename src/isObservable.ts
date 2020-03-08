export const isObservable = (obj: any): boolean =>
  !!obj && typeof obj.subscribe === 'function';
