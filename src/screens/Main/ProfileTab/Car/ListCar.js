import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLOR, ICON } from '../../../../constants/Theme';
import FastImage from 'react-native-fast-image';
import { appStyle, windowHeight, windowWidth } from '../../../../constants/AppStyle';
import TopNav from '../../../../components/TopNav';
import { Car } from '../../../../components/Profile/data/DataCar';
import ItemCar from '../../../../components/Profile/ItemCar';

const ListCar = (props) => {
    const { navigation } = props;
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
            style={{marginBottom:50}}
                data={Car}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemCar
                        name={item.name}
                        status={item.status}
                        trip={item.trip}
                        selfDrivePrice={item.selfDrivePrice}
                        location={item.location}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default ListCar

const styles = StyleSheet.create({

})