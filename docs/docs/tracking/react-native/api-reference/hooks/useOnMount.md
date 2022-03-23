# useOnMount

Runs on mount, unaffected by re-renders.

```ts
useOnMount = (effect: EffectCallback) => void
```

## Parameters
|          |            | type           | default value |
|:--------:|:-----------|:---------------|:--------------|
| required | **effect** | EffectCallback |               |

## Usage
```ts
import { useOnMount } from "@objectiv/tracker-react-native";
```

```ts
useOnMount(() => {
  // this effect will trigger whenever the using component gets mounted and not when it re-renders
})
```

<br />

:::info See also
- [useOnUnmount](/tracking/react-native/api-reference/hooks/useOnUnmount.md)
- [useTrackOnMount](/tracking/react-native/api-reference/hooks/useTrackOnMount.md)
- [useTrackOnUnmount](/tracking/react-native/api-reference/hooks/useTrackOnUnmount.md)
- [useOnChange](/tracking/react-native/api-reference/hooks/useOnChange.md)
- [useOnToggle](/tracking/react-native/api-reference/hooks/useOnToggle.md)
- [useTrackOnChange](/tracking/react-native/api-reference/hooks/useTrackOnChange.md)
- [useTrackOnToggle](/tracking/react-native/api-reference/hooks/useTrackOnToggle.md)
:::