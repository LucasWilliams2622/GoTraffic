import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import SwitchToggle from 'react-native-switch-toggle'
import { COLOR } from '../constants/Theme';

const Switch = (props) => {
   const {switchOn, onPress} =props;
   const [onSwitch, setonSwitch] = useState(false);


   const handleSwitchToggle = () => {
    setonSwitch(!onSwitch);
};

    return (
        <View>
            <SwitchToggle
                switchOn={onSwitch}
                onPress={()=> handleSwitchToggle()}
                circleColorOff={COLOR.background}
                circleColorOn={COLOR.background}
                backgroundColorOn={COLOR.primary}
                backgroundColorOff='#C4C4C4'
                containerStyle={{
                    width: 42,
                    height: 24,
                    borderRadius: 25,
                    padding: 2,
                }}
                circleStyle={{
                    width: 21,
                    height: 20,
                    borderRadius: 20,
                }}
            />
        </View>
    )
}

export default Switch

const styles = StyleSheet.create({})