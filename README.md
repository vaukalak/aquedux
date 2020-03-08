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
