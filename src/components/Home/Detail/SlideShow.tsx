import React, {useMemo, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLOR} from '../../../constants/Theme';
import Carousel from 'react-native-snap-carousel';
import {ImageViewComponent} from './ImageViewComponent';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {PressableIconProps, SlideShowProps} from '../../../types';

const ICON_SIZE = 20;

const renderItem = ({item, setModalVisible, scale}: any) => (
  <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
    <Animated.Image
      source={{uri: item}}
      style={[styles.carouselImage, {transform: [{scale}]}]}
    />
  </TouchableWithoutFeedback>
);

const PressableIcon = ({
  name,
  color,
  size = ICON_SIZE,
  solid,
  onPress,
}: PressableIconProps) => (
  <Pressable style={styles.pressable} onPress={onPress}>
    <Icon name={name} color={color} size={size} solid={solid} />
  </Pressable>
);

export const SlideShow = ({images, close, scrollY}: SlideShowProps) => {
  const [index, setIndex] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const itemWidth = Dimensions.get('window').width;

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this car!',
      });
    } catch (error) {
      const message = (error as Error).message;
      Alert.alert(message);
    }
  };

  const scale = scrollY.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [2, 1, 1],
    extrapolate: 'clamp',
  });

  const handleClose = () => {
    setModalVisible(false);
  };

  const imageUris = useMemo(
    () => images.map((image: string) => ({uri: image})),
    [images],
  );

  return (
    <View>
      <View style={styles.topContainer}>
        <PressableIcon name="x" color={COLOR.white} size={20} onPress={close} />
        <View style={styles.row}>
          <PressableIcon
            name="share-nodes"
            color={COLOR.white}
            size={24}
            onPress={handleShare}
          />
          <PressableIcon
            name="heart"
            color={isFavorite ? COLOR.fifth : COLOR.white}
            size={20}
            solid={isFavorite}
            onPress={() => setIsFavorite(!isFavorite)}
          />
        </View>
      </View>

      <Carousel
        data={images}
        renderItem={({item}) => renderItem({item, setModalVisible, scale})}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={itemWidth}
        snapToInterval={itemWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        onSnapToItem={(index: number) => setIndex(index)}
        removeClippedSubviews={false}
      />
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{`${index + 1}/${images.length}`}</Text>
      </View>

      {images.length > 0 && (
        <ImageViewComponent
          images={imageUris}
          imageIndex={index}
          modalVisible={modalVisible}
          handleClose={handleClose}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 40,
  },
  row: {
    flexDirection: 'row',
  },
  indexContainer: {
    position: 'absolute',
    top: 265,
    right: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  indexText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  carouselImage: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  pressable: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
