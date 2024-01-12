import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  View,
  ScrollView,
  Alert,
  Modal,
  ToastAndroid,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useContext, useCallback, useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
import {BottomSheet} from 'react-native-btr';
import TimerMixin from 'react-timer-mixin';
import {LANG_TAGS} from 'react-native-mlkit-translate-text';
import {COLOR} from '../constants/Theme';
import {appStyle} from '../constants/AppStyle';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import AppButton from '../components/AppButton';

const TestVoice = () => {
  const handleSearch = async keyword => {
    TimerMixin.setTimeout(() => {
      console.log('-====>', keyword);
      //   onSearch(keyword)
    }, 1000);
  };

  // ========================| VOICE |=============================
  const [modalVoice, setModalVoice] = useState(false);
  const [voice, setVoice] = useState('');

  useEffect(() => {
    Voice.isAvailable().then(res => {
      console.log('isAvailable', res);
    });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = () => {
    console.log('====');
    Voice.start(LANG_TAGS.VIETNAMESE);
  };

  const endSpeechToText = () => {
    console.log('===end=');

    Voice.stop();
  };

  Voice.onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e.value);
    setVoice(e.value[0]);
    handleSearch(e.value[0]);
  };

  Voice.onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e.isFinal);
  };

  Voice.onSpeechError = e => {
    console.log('onSpeechError: ', e.error?.message);
  };

  Voice.onSpeechResults = e => {
    console.log('onSpeechResults: ', e.value);
    console.log('onSpeechResults:==================? ', e.value[0]);

    setVoice(e.value[0]);
    handleSearch(e.value[0]);
  };

  Voice.onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e.error);
  };

  return (
    <View>
      <AppButton title="OPEN MIC" onPress={()=>setModalVoice(true)} />
      <BottomSheet
        visible={modalVoice}
        transparent={true}
        animationType="fade"
        onBackButtonPress={() => {
          setModalVoice(false);
        }}
        onBackdropPress={() => {
          setModalVoice(false);
        }}>
        <View
          style={[
            appStyle.modalContentBottom,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Text style={[appStyle.text16, {paddingVertical: 16}]}>
            Nhấn và giữ để nói
          </Text>
          <TouchableOpacity
            style={[
              appStyle.boxCenter,
              {
                backgroundColor: COLOR.primary,
                width: 150,
                height: 150,
                borderRadius: 999,
              },
            ]}
            onPressIn={() => startSpeechToText()}
            onPressOut={endSpeechToText}>
            <View
              style={[
                appStyle.boxCenter,
                {
                  backgroundColor: COLOR.background,
                  width: 147,
                  height: 147,
                  borderRadius: 999,
                },
              ]}>
              <Icon
                name="microphone"
                type={IconType.FontAwesome}
                size={30}
                color={COLOR.primary}
              />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: 'black',
              marginTop: 16,
              maxWidth: '90%',
              textAlign: 'center',
            }}>
            {voice}
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default TestVoice;

const styles = StyleSheet.create({});
