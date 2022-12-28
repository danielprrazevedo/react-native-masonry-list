import type {ForwardedRef, ReactElement} from 'react';
import React, {memo, useState, forwardRef} from 'react';
import type {
  NativeScrollEvent,
  Omit,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Animated, RefreshControl, View} from 'react-native';

interface Props<T> extends Omit<ScrollViewProps, 'refreshControl'> {
  loading?: boolean;
  refreshing?: RefreshControlProps['refreshing'];
  onRefresh?: RefreshControlProps['onRefresh'];
  refreshControl?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  style?: StyleProp<ViewStyle>;
  data: T[];
  renderItem: ({item, i}: {item: T; i: number}) => ReactElement;
  LoadingView?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
  ListHeaderComponentStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  numColumns?: number;
  keyExtractor?: ((item: T | any, index: number) => string) | undefined;
  refreshControlProps?: Omit<RefreshControlProps, 'onRefresh' | 'refreshing'>;
}

const isCloseToBottom = (
  {layoutMeasurement, contentOffset, contentSize}: NativeScrollEvent,
  onEndReachedThreshold: number,
): boolean => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold;

  return (
    Math.ceil(layoutMeasurement.height + contentOffset.y) >=
    contentSize.height - paddingToBottom
  );
};

function MasonryListInner<T>(
  props: Props<T>,
  ref: ForwardedRef<ScrollView>,
): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const {
    refreshing,
    data,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    containerStyle,
    contentContainerStyle,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns = 2,
    horizontal,
    onScroll = Animated.event([], {useNativeDriver: false}),
    removeClippedSubviews = false,
    keyExtractor,
    keyboardShouldPersistTaps = 'handled',
    refreshControl = true,
    refreshControlProps,
  } = props;

  const {style, ...propsWithoutStyle} = props;

  return (
    <Animated.ScrollView
      {...propsWithoutStyle}
      ref={ref}
      style={[{flex: 1, alignSelf: 'stretch'}, containerStyle]}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      removeClippedSubviews={removeClippedSubviews}
      refreshControl={
        refreshControl ? (
          <RefreshControl
            refreshing={!!(refreshing || isRefreshing)}
            onRefresh={() => {
              setIsRefreshing(true);
              onRefresh?.();
              setIsRefreshing(false);
            }}
            {...refreshControlProps}
          />
        ) : null
      }
      scrollEventThrottle={16}
      onScroll={Animated.forkEvent(onScroll, (e) => {
        const nativeEvent: NativeScrollEvent = e.nativeEvent;
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.0)) {
          onEndReached?.();
        }
      })}
    >
      <>
        <View style={ListHeaderComponentStyle}>
          {!!ListEmptyComponent &&
            (React.isValidElement(ListHeaderComponent) ? (
              ListHeaderComponent
            ) : (
              <ListHeaderComponent />
            ))}
        </View>
        {data.length === 0 && ListEmptyComponent ? (
          React.isValidElement(ListEmptyComponent) ? (
            ListEmptyComponent
          ) : (
            <ListEmptyComponent />
          )
        ) : (
          <View
            style={[
              {
                flex: 1,
                flexDirection: horizontal ? 'column' : 'row',
              },
              style,
            ]}
          >
            {Array.from(Array(numColumns), (_, num) => {
              return (
                <View
                  key={`masonry-column-${num}`}
                  style={{
                    flex: 1 / numColumns,
                    flexDirection: horizontal ? 'row' : 'column',
                  }}
                >
                  {data
                    .map((el, i) => {
                      if (i % numColumns === num) {
                        return (
                          <View
                            key={
                              keyExtractor?.(el, i) || `masonry-row-${num}-${i}`
                            }
                          >
                            {renderItem({item: el, i})}
                          </View>
                        );
                      }

                      return null;
                    })
                    .filter((e) => !!e)}
                </View>
              );
            })}
          </View>
        )}
        {loading && LoadingView}
        {ListFooterComponent}
      </>
    </Animated.ScrollView>
  );
}

type MasonryListType = <T>(
  props: Props<T> & {ref?: ForwardedRef<ScrollView>},
) => ReturnType<typeof MasonryListInner>;

const MasonryList: MasonryListType = forwardRef(MasonryListInner);

export default memo(MasonryList);
