import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};

const Itemlist: React.FC<ListItemProps> = React.memo(({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value.some(
      (viewableItem) => viewableItem.isViewable && viewableItem.item.id === item.id,
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.8),
        },
      ],
    };
  }, [item, viewableItems]);

  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: '#78CAD2',
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: 20,
        },
        rStyle,
      ]}
    >
      <Text style={styles.text}>{item.id}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export { Itemlist };
