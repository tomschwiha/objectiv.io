# LocationContextWrapper

Wraps its children in the given [LocationContext](/taxonomy/reference/location-contexts/overview.md) instance.

```tsx
LocationContextWrapper: (props: { 
  children: ReactNode, 
  locationContext: LocationContext
}) => ReactElement
```

:::caution
`LocationContextWrapper` is a lower-level Component. Unless really needed, it's easier to use specific [Location Wrappers](/tracking/react/api-reference/locationWrappers/overview.md).
:::

## Parameters
|          |                     | type            | default value |
|:--------:|:--------------------|:----------------|:--------------|
| required | **children**        | ReactNode       |               |
| required | **locationContext** | LocationContext |               |

## Returns
ReactElement.

## Usage example

```typescript jsx
import { LocationContextWrapper, makeContentContext } from '@objectiv/tracker-react';
```

```typescript jsx
<LocationContextWrapper locationContext={ makeContentContext({ id: 'content' }) }>
  <div>
    ...
  </div>
  <span>
    ...
  </span>
</LocationContextWrapper>
```

<br />

<br />

:::info See also
- [ContentContextWrapper](/tracking/react/api-reference/locationWrappers/ContentContextWrapper.md)
- [ExpandableContextWrapper](/tracking/react/api-reference/locationWrappers/ExpandableContextWrapper.md)
- [InputContextWrapper](/tracking/react/api-reference/locationWrappers/InputContextWrapper.md)
- [LinkContextWrapper](/tracking/react/api-reference/locationWrappers/LinkContextWrapper.md)
- [MediaPlayerContextWrapper](/tracking/react/api-reference/locationWrappers/MediaPlayerContextWrapper.md)
- [NavigationContextWrapper](/tracking/react/api-reference/locationWrappers/NavigationContextWrapper.md)
- [OverlayContextWrapper](/tracking/react/api-reference/locationWrappers/OverlayContextWrapper.md)
- [PressableContextWrapper](/tracking/react/api-reference/locationWrappers/PressableContextWrapper.md)
- [RootLocationContextWrapper](/tracking/react/api-reference/locationWrappers/RootLocationContextWrapper.md)
:::