# Aquedux
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

Try example on [this code sandbox](https://codesandbox.io/s/aquedux-mouse-move-example-799s5)

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
  const $color = useMemo(() => new BehaviorSubject(0xFFFFFF), []);
  const $coordinates = useMemo(() => new BehaviorSubject({ x: 0, y: 0 }), []);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const red = Math.floor(e.pageX / window.innerWidth * 255);
    const green = Math.floor(e.pageY / window.innerHeight * 255);
    const blue = Math.floor((window.innerWidth - e.pageX) / window.innerWidth * 255);
    // write new value to the subject
    $color.next(red << 16 | green << 8 | blue);
    $coordinates.next({ x: e.pageX, y: e.pageY });
  }, [$color, $coordinates]);

  // use Aquedux component, to accept observable value.
  return <Aquedux.div
    onMouseMove={onMouseMove}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      // assign observable to any style, and that's it :)
      backgroundColor: $color.pipe(map(toRgb))
    }}
  >
    <Aquedux.span
      style={{
        color: "black",
        fontSize: 200,
        fontFamily: "Arial",
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {/* You can also set directly children to html components */}
      {$coordinates.pipe(map(({ x, y }) => `${x}:${y}`))}
    </Aquedux.span>
  </Aquedux.div>
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
