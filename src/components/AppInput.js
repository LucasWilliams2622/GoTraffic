import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../constants/Theme'
import FastImage from 'react-native-fast-image'

const AppInput = (props) => {
    const { backgroundColor, borderWidth, borderColor, borderRadius, paddingVertical, paddingHorizontal,
        placeholder, textColor, placeholderTextColor, keyboardAppearance, returnKeyType, autoCapitalize,
        width, keyboardType, marginTop,
        editable, autoCorrect, multiline, fontSize,
        onChangeText, value, onBlur,

        isPassword } = props

    //=====================| CHANGE BOORDER COLOR |================
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };

    // =======================| SHOW HIDE PASSWORD |==================
    const [isHidden, setIsHidden] = useState(true);
    const [iconSource, setIconSource] = useState(require('../assets/icon/ic_invisible.png'));

    const handleToggleVisibility = () => {
        setIsHidden(!isHidden);
        setIconSource(isHidden ? require('../assets/icon/ic_visible.png') : require('../assets/icon/ic_invisible.png'));
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
            marginTop: marginTop == null ? 0 : marginTop
        }]}>
            <TextInput
                style={[styles.textInput,  {
                    color: textColor ? '#000000' : textColor,
                    maxWidth: '90%',
                    fontSize: fontSize == null ? 16 : fontSize,
                }]}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType == 'phone-pad' ? 'phone-pad'
                    : keyboardType == 'visible-password' ? 'visible-password'
                        : keyboardType == 'number-pad' ? 'number-pad'
                            : keyboardType == 'numbers-and-punctuation' ? 'numbers-and-punctuation'
                                : keyboardType == 'numeric' ? 'numeric'
                                    : keyboardType == 'email-address' ? 'email-address'
                                        : keyboardType == 'url' ? 'url'
                                            : 'default'}
                placeholder={placeholder == null ? 'Nhập placeholder đi má' : placeholder}
                placeholderTextColor={placeholderTextColor == null ? COLOR.placeholder : placeholderTextColor}
                keyboardAppearance={keyboardAppearance ? 'light' : 'dark'}
                returnKeyType={returnKeyType == 'next' ? 'next' : returnKeyType == 'done' ? "done" : returnKeyType == 'search' ? "search" : 'done'}
                onFocus={() => handleFocus()}
                onBlur={onBlur}
                editable={editable}
                autoCorrect={autoCorrect}
                passwordRules={'string'}
                multiline={multiline}
                secureTextEntry={isPassword ? isHidden : false}
                autoCapitalize={autoCapitalize == 'characters' ? 'characters' : autoCapitalize == 'sentences' ? 'sentences' : 'none'}
            />
            {
                isPassword == null ? (<></>)
                    : (<TouchableOpacity style={{}} onPress={handleToggleVisibility}>
                        <FastImage style={{ width: 20, height: 20, marginRight: 6 }} source={iconSource} />
                    </TouchableOpacity>)
            }
        </View>
    )
}

export default AppInput

const styles = StyleSheet.create({
    boxInput: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 5
    },
    textInput: {
        paddingVertical: 0,
    },
});
