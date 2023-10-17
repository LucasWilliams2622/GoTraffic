import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constants/Theme';
import { Dropdown } from 'react-native-element-dropdown';
import { windowHeight, windowWidth } from '../constants/AppStyle';


const AppDropdown = (props) => {
    const { onChange, value, onBlur,
        fontSize, width, backgroundColor, borderWidth, borderRadius, paddingVertical, paddingHorizontal, borderColor,
        placeholder, placeholderStyle, searchPlaceholder, placeholderTextColor,
        data, labelField, valueField } = props;

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <View style={[styles.boxInput, {
            width: width == null ? '100%' : width,
            backgroundColor: backgroundColor == null ? COLOR.background : backgroundColor,
            borderWidth: borderWidth == null ? .8 : borderWidth,
            borderColor: isFocused ? COLOR.primary : (borderColor == null ? COLOR.borderColor : borderColor),
            borderRadius: borderRadius == null ? 6 : borderRadius,
            paddingVertical: paddingVertical == null ? 8 : paddingVertical,
            paddingHorizontal: paddingHorizontal == null ? 8 : paddingHorizontal,
        }]}>
            <Dropdown
                style={styles.dropdown}
                selectedTextStyle={[styles.selectedTextStyle]}
                inputSearchStyle={styles.inputSearchStyle}
                data={data}
                search
                mode='modal'
                maxHeight={300}
                containerStyle={{
                    width: windowWidth,
                    height: windowHeight *.5,
                    marginTop: windowHeight * 0.5,
                    borderTopRightRadius:16,
                    borderTopLeftRadius:16
                }}
                labelField={labelField}
                valueField={valueField}
                placeholder={placeholder == null ? 'Nhập placeholder đi má' : placeholder}
                placeholderTextColor={placeholderTextColor == null ? COLOR.placeholder : placeholderTextColor}
                searchPlaceholder={searchPlaceholder == null ? 'Tìm kiếm' : searchPlaceholder}
                value={value}
                onFocus={() => handleFocus()}
                onBlur={onBlur}
                onChange={onChange}
                placeholderStyle={placeholderStyle}
            />
        </View>
    )
}

export default AppDropdown

const styles = StyleSheet.create({
    boxInput: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5,
        height: 46
    },
    dropdown: {
        color: '#000000',
        height: 35,
        width: windowWidth,
        fontSize: 14
    },

    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})