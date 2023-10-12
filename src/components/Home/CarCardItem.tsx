import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {COLOR} from '../../constants/Theme';
import {appStyle} from '../../constants/AppStyle';
import {Column, Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import ShieldIcon from '../../assets/icon/ic_shield_verified';
import SuitcaseIcon from '../../assets/icon/ic_suitcase';
import {formatPrice, getTotalPrice, calculateDiscount} from '../../utils/utils';

interface CarCardItemProps {
  id: number;
  title: string;
  image: string;
  location: string;
  benefit?: string;
  type: string;
  originalPrice?: number;
  price: number;
  rating: number;
  totalRide: number;
  onPress: () => void;
}

const CarCardItem = ({
  title,
  image,
  location,
  type,
  benefit,
  originalPrice,
  price,
  rating,
  totalRide,
  onPress,
}: CarCardItemProps) => {
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const formattedPrice = useMemo(() => formatPrice(price), [price]);
  const formattedOriginalPrice = useMemo(
    () => formatPrice(originalPrice ?? 0),
    [price],
  );
  const totalPrice = useMemo(() => getTotalPrice(price), [price]);
  const discountPercent = useMemo(
    () => calculateDiscount(originalPrice ?? 0, price),
    [originalPrice, price],
  );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage source={{uri: image}} style={styles.image} />
      {originalPrice && (
        <View style={styles.discount}>
          <Text style={[appStyle.text10, {color: COLOR.white, padding: 10}]}>
            Giảm {discountPercent}%
          </Text>
        </View>
      )}
      <Pressable
        style={styles.pressable}
        onPress={() => setIsFavorite(!isFavorite)}>
        <Icon
          name="heart"
          color={isFavorite ? COLOR.fifth : COLOR.white}
          size={20}
          solid={isFavorite}
        />
      </Pressable>

      <Row style={styles.row}>
        <View style={styles.typeView}>
          <Text style={appStyle.text12}>{type}</Text>
        </View>

        {benefit && (
          <View style={styles.benefitView}>
            <Text style={appStyle.text12}>{benefit}</Text>
          </View>
        )}
      </Row>

      <Row style={styles.row}>
        <Text style={[appStyle.text16Bold, styles.title]}>
          {title.toUpperCase()}
        </Text>
        <ShieldIcon color={COLOR.fifth} />
      </Row>

      <Row style={styles.locationRow}>
        <Icon name="location-dot" color={COLOR.borderColor} size={15} />
        <Text style={styles.locationText}>{location}</Text>
      </Row>

      <View style={styles.separator} />

      <Row style={styles.priceRow}>
        <Row style={{alignItems: 'center'}}>
          <Icon name="star" color={COLOR.third} size={12} solid />
          <Text style={[styles.ratingText, {marginLeft: 5}]}>{rating}</Text>
          <Text style={[styles.dot, {marginLeft: 5, marginRight: 5}]}>·</Text>
          <SuitcaseIcon color={COLOR.fifth} />
          <Text style={[styles.ratingText, {marginLeft: 5}]}>
            {totalRide} chuyến
          </Text>
        </Row>

        <Column style={{alignItems: 'flex-end'}}>
          <Row style={{alignItems: 'baseline'}}>
            {originalPrice && (
              <Text style={styles.originalPrice}>{formattedOriginalPrice}</Text>
            )}

            <Text style={{color: COLOR.fifth, fontSize: 18}}>
              {formattedPrice}
            </Text>

            <Text style={{color: COLOR.borderColor, fontSize: 12}}>/ngày</Text>
          </Row>

          <Text style={{color: COLOR.borderColor, fontSize: 12, marginTop: 5}}>
            Giá tổng{' '}
            <Text style={{fontWeight: 'bold'}}>{formatPrice(totalPrice)}</Text>
          </Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );
};

export default CarCardItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 20,
    width: 330,
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: 10,
  },
  image: {
    height: 220,
    borderRadius: 15,
  },
  discount: {
    position: 'absolute',
    top: 215,
    right: 30,
    backgroundColor: COLOR.eighth,
    borderRadius: 50,
  },
  pressable: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    position: 'absolute',
    borderRadius: 50,
    top: 20,
    right: 20,
  },
  row: {
    alignItems: 'center',
    marginTop: 10,
  },
  typeView: {
    backgroundColor: COLOR.sixth,
    padding: 8,
    alignSelf: 'flex-start',
    borderRadius: 15,
    marginRight: 10,
  },
  benefitView: {
    backgroundColor: COLOR.seventh,
    padding: 8,
    alignSelf: 'flex-start',
    borderRadius: 15,
  },
  title: {
    marginRight: 10,
  },
  originalPrice: {
    color: COLOR.borderColor,
    opacity: 0.5,
    fontSize: 18,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginRight: 5,
  },
  locationRow: {
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: COLOR.borderColor,
    marginLeft: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: COLOR.borderColor,
    opacity: 0.3,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  priceRow: {
    alignItems: 'baseline',
    flex: 1,
    justifyContent: 'space-between',
  },
  ratingText: {
    color: COLOR.borderColor,
    fontSize: 12,
  },
  dot: {
    fontSize: 15,
  },
});
