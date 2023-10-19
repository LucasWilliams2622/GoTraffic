import React from 'react';
import {Text, View} from 'react-native';
import {COLOR} from '../../../constants/Theme';
import {IconProps} from '../../../assets/icon/ic_engine';

type IconComponentType = React.ComponentType<IconProps>;

type FeatureItemProps = {
  icon: IconComponentType;
  color: string;
  feature: {[key: string]: string};
};

export const FeatureItem = ({icon: Icon, color, feature}: FeatureItemProps) => {
  const featureKey = Object.keys(feature)[0];
  const featureValue = Object.values(feature)[0];

  return (
    <View style={{alignItems: 'center'}}>
      <Icon width={32} height={32} color={color} />
      <Text style={{color: COLOR.borderColor, marginTop: 15}}>
        {featureKey}
      </Text>
      <Text style={{fontWeight: 'bold'}}>{featureValue}</Text>
    </View>
  );
};
