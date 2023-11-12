import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {AppbarHeaderProps} from './type';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLOR, ICON} from '../../constants/Theme';
const AppHeader = ({
  title,
  onPressRight,
  iconLeft,
  icon,
  backgroundColor = COLOR.background,
  tintColor = '#424242',
  iconRightColor = 'black',
  notLeft = false,
}: AppbarHeaderProps) => {
  const navigation = useNavigation();

  const iconMap = {
    add: ICON.Add,
    dustBin: ICON.Ban,
    calendar: ICON.Calendar,
    download: ICON.Download,
  };
  const getIcon = (icon, onPressRight) => {
    if (icon === '') {
      return <Text> </Text>;
    } else if (iconMap.hasOwnProperty(icon)) {
      return (
        <TouchableOpacity onPress={onPressRight}>
          <FastImage
            style={{width: 24, height: 24}}
            tintColor={icon === 'dustBin' ? 'red' : iconRightColor}
            source={iconMap[icon]}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={onPressRight}>
          <FastImage style={{width: 24, height: 24}} source={icon} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <View
        style={[
          styles.shadow,
          {
            backgroundColor: backgroundColor,
          },
        ]}>
        {!notLeft ? (
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.goBack();
            }}>
            {iconLeft == null ? (
              <FastImage
                source={ICON.Back}
                style={{width: 20, height: 20}}
                tintColor={tintColor}
              />
            ) : iconLeft == 'close' ? (
              <Icon name="close" size={22} color={tintColor} />
            ) : (
              <FastImage
                source={ICON.Back}
                style={{width: 20, height: 20}}
                tintColor={tintColor}
              />
            )}
          </TouchableOpacity>
        ) : (
          <Text>        </Text>
        )}

        <Text
          style={{
            fontSize: 20,
            lineHeight: 55,
            fontWeight: '600',
            color: tintColor,
          }}>
          {title}
        </Text>
        {getIcon(icon, onPressRight)}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  shadow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 2,
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 3.05,
    // elevation: 5,
  },
});
