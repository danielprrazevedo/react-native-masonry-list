# @danielprr-react-native/animated-scrollview-masonry-list

> Pinterest like listview made in [React Native](https://reactnative.dev). It just behaves like the [FlatList](https://reactnative.dev/docs/next/flatlist) so it is easy to use.

## NOTE

This is a fork of [@react-native-seoul/masonry-list](https://github.com/hyochan/react-native-masonry-list) where we use `Animated.ScrollView` and `forwardRef` to keep the component reference like the scroll view.

My inspiration for updating this package to this was the need to use this in conjunction with [react-native-collapsible-tab-view v2](https://github.com/PedroBern/react-native-collapsible-tab-view/tree/v2) and as it uses references to the `Animated.ScrollView` we are required to implement these animations.

This should help with this [request #53](https://github.com/hyochan/react-native-masonry-list/issues/53)

<!-- [![Npm Version](http://img.shields.io/npm/v/@react-native-seoul/masonry-list.svg?style=flat-square)](https://npmjs.org/package/@react-native-seoul/masonry-list)
[![Downloads](http://img.shields.io/npm/dm/@react-native-seoul/masonry-list.svg?style=flat-square)](https://npmjs.org/package/@react-native-seoul/masonry-list)
[![CI](https://github.com/hyochan/react-native-masonry-list/actions/workflows/ci.yml/badge.svg)](https://github.com/hyochan/react-native-masonry-list/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/hyochan/react-native-masonry-list/branch/main/graph/badge.svg?token=MSQVHOV57A)](https://codecov.io/gh/hyochan/react-native-masonry-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![LICENSE](http://img.shields.io/npm/l/@react-native-seoul/masonry-list.svg?style=flat-square)](https://npmjs.org/package/@react-native-seoul/masonry-list)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)
[![supports iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)](https://itunes.apple.com/app/apple-store/id982107779)
[![supports Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)
[![supports web](https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)](https://docs.expo.io/workflow/web/)
[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat&logo=EXPO&labelColor=ffffff&logoColor=000)](https://github.com/expo/expo) -->

## Notice

If you want [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) version, you may checkout [reanimated-masonry-list](https://github.com/hyochan/reanimated-masonry-list). This repo is created with issue [#14](https://github.com/hyochan/react-native-masonry-list/issues/14).

## Installation

```
npm install @danielprr-react-native/animated-scrollview-masonry-list
```

```tsx
import MasonryList from '@danielprr-react-native/animated-scrollview-masonry-list';
```

## Preview

| 2-columns                                                                                                                    |                                                          3-columns                                                           |                                                          4-columns                                                           |
| ---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/27461460/116809803-f170e680-ab7a-11eb-8f16-e28a3ab0c741.gif" width=200/> | <img src="https://user-images.githubusercontent.com/27461460/116815966-08bfcc00-ab9b-11eb-9b9f-5928484217d9.gif" width=200/> | <img src="https://user-images.githubusercontent.com/27461460/116815949-f6459280-ab9a-11eb-8434-85f3cc834202.gif" width=200/> |

> You can use as many columns as you want. It is flexible!

## YouTube

[See how to use it](https://www.youtube.com/watch?v=QxSKAcKKW_Q)

## Blog

[How it is made](https://dooboolab.medium.com/react-native-masonry-list-a5365647f2c1)

## Description

Current `MasonryList` extends [ScrollView](https://reactnative.dev/docs/next/scrollview) and can pass down its props. Indeed, this looks similar to [FlatList](https://reactnative.dev/docs/next/flatlist) to provide good developer experience. Look how this is used and compare to the `FlatList`.

The `FlatList` won't offer you to draw `MansonryList` because when you provide [numColumns](https://reactnative.dev/docs/next/flatlist#numcolumns) bigger than `1`, the native view will switch to `FlatList` to `GridView` which will render its children with identical height only.

Our `MasonryList` view component is able to render all child views with all different sizes.

## Props

```tsx
loading?: boolean;
refreshing?: RefreshControlProps['refreshing'];
onRefresh?: RefreshControlProps['onRefresh'];
onEndReached?: () => void;
onEndReachedThreshold?: number;
style?: StyleProp<ScrollViewProps>;
data: T[];
renderItem: ({item: T, i: number}) => ReactElement;
LoadingView?: React.ComponentType<any> | React.ReactElement | null;
ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
numColumns?: number;
keyExtractor?: ((item: T | any, index: number) => string) | undefined;
```

**`loading`** - Currently in loading status.

**`refreshing`** - Currently in refreshing status.

**`onRefresh`** - Callback when `refresh` has been triggered.

**`onEndReached`** - Callback when end is reached just like the [onEndReached in FlatList](https://reactnative.dev/docs/flatlist#onendreached)

**`style`** - Style props for [ScrollView](https://reactnative.dev/docs/next/scrollview) which is the container view.

**`data`** - The array of the `data` for the view to render in `renderItem`

**`renderItem`** - Render custom view with the `data` passed down.

**`LoadingView`** - Custom loading view when the view is in `loading` status.

**`ListHeaderComponent`** - Header component

**`ListFooterComponent`** - Footer component

**`ListEmptyComponent`** - Component to render when the `data` is empty.

**`numColumns`** - Number of columns you want to render. `Default to 2`.

## Usage

```tsx
<MasonryList
  data={filteredItems}
  keyExtractor={(item): string => item.id}
  numColumns={2}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => <CardItem />}
  refreshing={isLoadingNext}
  onRefresh={() => refetch({first: ITEM_CNT})}
  onEndReachedThreshold={0.1}
  onEndReached={() => loadNext(ITEM_CNT)}
/>
```

## Run Example

1. Clone the repository.

   ```
   git clone https://github.com/hyochan/react-native-masonry-list.git
   ```

2. Navigate to example project

   ```
   cd RNMasonryExample
   ```

3. Install packages and run it as you do in `react-native` project.

## LICENSE

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fhyochan%2Freact-native-masonry-list.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fhyochan%2Freact-native-masonry-list?ref=badge_large)
