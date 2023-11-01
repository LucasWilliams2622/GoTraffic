import React from 'react';
import {Text, View} from 'react-native';
import {amenitiesIconMapping} from '../../../screens/Main/HomeTab/data/data';
import {Row} from 'native-base';
import {COLOR} from '../../../constants/Theme';

export const Amenities = ({amenities}: {amenities: string[]}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {amenities.map((item: string) => {
        const Icon = amenitiesIconMapping[item].icon;
        return (
          <View key={item} style={{width: '50%', padding: 10}}>
            <Row style={{alignItems: 'center', marginTop: 10}}>
              <Icon width={24} height={24} color={COLOR.fifth} />
              <Text style={{marginLeft: 10}}>
                {amenitiesIconMapping[item].name}
              </Text>
            </Row>
          </View>
        );
      })}
    </View>
  );
};
