# aquedux
react components directly manipulated by streams

## Why?

Sometimes you want to manipulate your object styles / properties directly to prevent re-rendering (for example an effect while scrolling).
This library allows you to pass an `rxjs` like observable to your component, and create a subscrpition, to the value change.
This approach is very similar react-native Animated api.

## Instalation

```
npm i -S aquedux
```

## Usage

```
import React, { useMemo, useCallback } from 'react';
import { Aquedux } from "aquedux";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const toRgb = (v: number) => {
  const hex = v.toString(16);
  return `#${'0'.repeat(6 - hex.length)}${hex}`
};

export const App = () => {
  const subj = useMemo(() => new BehaviorSubject(0x000000), []);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const red = Math.floor(e.pageX / window.innerWidth * 255);
    const green = Math.floor(e.pageY / window.innerHeight * 255);
    const blue = Math.floor((window.innerWidth - e.pageX) / window.innerWidth * 255);
    // write new value to the subject
    subj.next(red << 16 | green << 8 | blue);
  }, [subj]);

  // use Aquedux component, to accept observable value.
  return <Aquedux.div
    onMouseMove={onMouseMove}
    style={{
      width: "100%",
      height: "100vh",
      // assign observable to any style, and that's it :)
      backgroundColor: subj.pipe(map(toRgb))
    }}
  />
};
```

### Enhancing custom components

To create a custom component you can import `createAxComponent` utility and wrap your component with it. By default it will shallowly enhance your properties to accept observable values. If you'd like some property to be deeply enhanced (common scenario `style`), you pass second param with specifying those.

```
import { createAxComponent } from 'aquedux';

const div = createAxComponent(
  Div,
  { style: true }
);
```