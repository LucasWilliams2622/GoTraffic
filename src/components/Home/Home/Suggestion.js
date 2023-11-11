import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { appStyle, windowHeight, windowWidth } from '../../../constants/AppStyle';
import { COLOR } from '../../../constants/Theme';
import { useNavigation } from '@react-navigation/native';


const Suggestion = (props) => {
    const navigation = useNavigation();
    const { data } = props;
    const { display } = data;
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{ height: 42, marginTop: 5, borderBottomWidth: 0.5, borderBottomColor: COLOR.borderColor }}>
            <Text style={appStyle.text14}>{display}</Text>
        </TouchableOpacity>
    )
}

export default Suggestion

const styles = StyleSheet.create({})