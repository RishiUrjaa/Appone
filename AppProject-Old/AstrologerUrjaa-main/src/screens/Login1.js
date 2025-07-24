import React, {useState, useEffect} from 'react';
import style from './Style';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  PermissionsAndroid,
  View,
} from 'react-native';
import Button from 'react-native-button';

import stringsoflanguages from './Language';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../utils/Loader';
import store from '../redux/store';
import {MobileLogin} from '../service/Api';
const Login1 = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, onChangeMobile] = React.useState('');
  const [show, setShow] = useState(false);
  const [accept, setAccept] = useState(false);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});

  async function requestReadSmsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'Auto Verification OTP',
          message: 'need access to read sms, to verify OTP',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('sms read permissions granted', granted);
      } else {
        console.log('sms read permissions denied', denied);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const onPressLogin = async () => {
    // try {
    //   const registered = await SmsRetriever.startSmsRetriever();
    //   if (registered) {
    //     SmsRetriever.addSmsListener(event => {
    //       console.log(event.message);
    //       SmsRetriever.removeSmsListener();
    //     });
    //   }
    // } catch (error) {
    //   console.log(JSON.stringify(error));
    // }
    if (mobile == '') {
      alert(stringsoflanguages.pleaseenter);
      return;
    }
    if (mobile.length != 10) {
      alert('Mobile number must be 10 digit long');
      return;
    }
    toggleLoading(true);

    MobileLogin({mobile: mobile})
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          navigation.navigate('Otp1', data);
        } else {
          alert(data.msg);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    // alert(JSON.stringify(store.getState()));
  }, []);
  // useEffect(async () => {
  //   requestReadSmsPermission();
  //   try {
  //     const phoneNumber = await SmsRetriever.requestPhoneNumber();
  //     console.log(phoneNumber);
  //     // setCountryCode(phoneNumber.substring(0, 3));
  //     if (Object.keys(phoneNumber).length > 0) {
  //       let d = phoneNumber;
  //       let cal = phoneNumber.substr(phoneNumber.length - 10);
  //       let code = phoneNumber.replace(cal, '');
  //       //   str.replaceAll('one', '')
  //       setCountryCode(code);
  //       onChangeMobile(cal);
  //       onPressAutoFill(
  //         d.substring(0, 3),
  //         phoneNumber.substr(phoneNumber.length - 10),
  //       );
  //     }
  //   } catch (error) {
  //     console.log(JSON.stringify(error));
  //   }
  // }, []);
  return (
    <SafeAreaView style={style.container}>
      {state.loading && <Loader />}
      <KeyboardAwareScrollView>
        <View style={{marginTop: 30}} />

        <Text
          style={{
            fontSize: 30,
            marginTop: 22,
            fontFamily: 'AvenirLTStd-Heavy',

            color: '#1E1F20',
            marginLeft: 22,
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: 1,
            fontFamily: 'AvenirLTStd-Medium',
            marginBottom: 12,
            color: '#A6A7A9',
            marginLeft: 22,
          }}>
          Welcome to Dev Vaani
        </Text>
        <View style={{marginLeft: 22, marginTop: 42}}>
          <Text
            style={{
              fontSize: 14,
              marginTop: 1,
              fontFamily: 'AvenirLTStd-Medium',
              marginBottom: 12,
              color: '#242A37',
            }}>
            Mobile Number
          </Text>
          <View style={[style.mobile, {width: '90%'}]}>
            <TextInput
              style={style.input}
              onChangeText={onChangeMobile}
              value={mobile}
              placeholderTextColor="#A6A7A9"
              placeholder={stringsoflanguages.enter}
              keyboardType={'numeric'}
              maxLength={10}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={[style.button, {position: 'absolute', bottom: 22}]}>
        <Button
          style={{
            fontSize: 17,
            padding: 8,
            color: '#1E1F20',
            backgroundColor: '#FFC613',
            height: 40,
            borderRadius: 8,
          }}
          onPress={onPressLogin}>
          NEXT
        </Button>
      </View>
    </SafeAreaView>
  );
};
export default Login1;
