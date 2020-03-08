import React, { useRef, useEffect } from 'react';
import { Observable, isObservable } from 'rxjs';

type ValueOrObservable<V> = V | Observable<V>;

type RxProps<Props extends Object, deepKeys> = {
  [key in keyof Props]: key extends keyof deepKeys ?
    RxProps<Props[key], []> :
    ValueOrObservable<Props[key]>
};

const partitionObjectDeep = (entries: any, rule: (value: any) => boolean, deepKeys: any[] = ['style']) =>
  Object.keys(entries).reduce(
    (result, key) => {
      if (deepKeys.indexOf(key) !== -1) {
        const [observables, normal] = partitionObjectDeep(entries[key], rule);
        result[0][key] = observables;
        result[1][key] = normal;
      } else {
        result[rule(entries[key]) ? 0 : 1][key] = entries[key];
      }
      return result;
    },
    [{} as any, {} as any]
  );

const mergeDeep = (base: any, override: any, deepKeys: any[]) => {
  const deepOverride = deepKeys.reduce(
    (acc, nextKey) => {
      acc[nextKey] = {
        ...base[nextKey],
        ...override[nextKey],
      };
      return acc;
    },
    {},
  );
  return {
    ...base,
    ...override,
    ...deepOverride,
  }
};

type DeepObservable = { [key: string]: Observable<any> | DeepObservable };

const useRxUpdate = (observableProps: DeepObservable) => {
  const componentRef = useRef<any>();
  const formerObservableProps = useRef<any>({});
  const observableValues = useRef<any>({});
  const subscriptions = useRef<any>({});
  useEffect(() => {
    const invalidateSubscriptions = (props: any, formerProps: any, prefix: string = '') => {
      for (const key in props) {
        const subscriptionKey = `${prefix}:${key}`;
        if (props[key] === formerProps[key]) {
          continue;    
        }
        if (subscriptions.current[subscriptionKey]) {
          subscriptions.current[subscriptionKey].unsubscribe();
        }
        formerProps[subscriptionKey] = props[key];
        if (isObservable(props[key])) {
          subscriptions.current[subscriptionKey] = (props[key] as Observable<any>).subscribe((value) => {
            if (prefix) {
              if (!observableValues.current[prefix]) {
                observableValues.current[prefix] = {};
              }
              observableValues.current[prefix][key] = value;
              componentRef.current![prefix][key] = value;
            } else {
              observableValues.current[key] = value;
              componentRef.current![key] = value;
            }
          });
        } else {
          if (!formerProps[key]) {
            formerProps[key] = {};
          }
          invalidateSubscriptions(props[key], formerProps[key], key);
        }
      }
    }
    invalidateSubscriptions(observableProps, formerObservableProps.current);
    return () => {
      for (const key in subscriptions.current) {
        subscriptions.current[key].unsubscribe();
      }
    }
  });
  return {
    componentRef,
    observableValues,
  };
};

const createRxComponent = <
  Props extends Object,
  DeepKeys = { [key: string]: boolean } 
>(
  Comp: React.ComponentType<Props>,
  deepKeys: DeepKeys
) => (props: RxProps<Props, DeepKeys>) => {
  const [observableProps, normalProps] = partitionObjectDeep(
    props,
    isObservable,
    Object.keys(deepKeys),
  );

  const { componentRef, observableValues } = useRxUpdate(observableProps);

  const mergedProps = mergeDeep(normalProps, observableValues, Object.keys(deepKeys));

  return (
    <Comp ref={componentRef} {...mergedProps} />
  )
};

export { createRxComponent };