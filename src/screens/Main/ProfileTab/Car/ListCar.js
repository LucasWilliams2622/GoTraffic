import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, ICON } from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import TopNav from '../../../../components/TopNav';
import { Car } from '../../../../components/Profile/data/DataCar';
import ItemCar from '../../../../components/Profile/ItemCar';

const ListCar = (props) => {
    const { navigation, route } = props;
    const [hasDisplayed, setHasDisplayed] = useState(false);
    const [carData, setCarData] = useState([]);
    const { updatedCarInfo } = route.params;
    console.log(">>>>>>>>>", updatedCarInfo);

    
    useEffect(() => {
        if (updatedCarInfo && carData.length === 0 && !hasDisplayed) {
            setCarData([updatedCarInfo]);
            setHasDisplayed(true);
        }
    }, [updatedCarInfo, carData, hasDisplayed]);


    return (

        <SafeAreaView style={appStyle.container}>
            <TopNav
                iconLeft={ICON.Back}
                screenLeft="Profile"
                text="Xe của tôi"
                iconRight={ICON.Add}
                screenRight="BasicInfor"
            />
            <FlatList
                style={{ marginBottom: 50 }}
                data={carData}
                renderItem={({ item }) => <ItemCar data={item} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default ListCar

const styles = StyleSheet.create({

})