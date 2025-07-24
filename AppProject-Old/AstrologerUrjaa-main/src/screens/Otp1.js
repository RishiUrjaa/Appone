import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  SafeAreaView,
  Alert,
  Platform,
  NativeSyntheticEvent,
} from 'react-native';
import RnOtpTimer from 'rn-otp-timer';
import Button from 'react-native-button';

import Loader from '../utils/Loader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as actions from '../redux/actions';
import style from './Style';
import stringsoflanguages from './Language';

import {MobileLogin, VerifyLogin} from '../service/Api';
import store from '../redux/store';

const Otp1 = ({navigation, route}) => {
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  let [optfill, setotpfill] = useState('');
  const [hashFromMethod, setHashFromMethod] = React.useState('');
  const [otpFromMethod, setOtpFromMethod] = React.useState('');
  const [hint, setHint] = React.useState('');

  const [email, onChangeEmail] = React.useState('');

  useEffect(() => {
    // alert(JSON.stringify(route.params));
  }, []);

  // const otpHandler = message => {
  //   console.log(JSON.stringify(message));
  //   // const otp = /(\d{4})/g.exec(message)[1];
  //   // console.log(otp);
  //   // alert(otp);
  //   // this.setState({ otp });
  //   RNOtpVerify.removeListener();
  //   // Keyboard.dismiss();
  // };

  const otphabdler = message => {
    alert(message);
  };

  const otp2 = () => {
    toggleLoading(true);
    MobileLogin({
      mobile: route.params.mobile,
    })
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          route.params.oto = data.oto;
          alert(stringsoflanguages.verificationsendonmobile);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  };

  const onPressLogin = () => {
    if (email == '') {
      alert(stringsoflanguages.pleaseenterver);
      return;
    }

    if (email != route.params.oto) {
      alert('Otp no Match');
      return;
    }

    toggleLoading(true);
    let e = {
      mobile: route.params.mobile,
      id: store.getState().user.user_id,
    };
    console.log(JSON.stringify(e));
    VerifyLogin(e)
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          alert('Your Mobile Updated Successfully');
          navigation.goBack();
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const onPressLoginAuto = email => {
    if (email == '') {
      alert(stringsoflanguages.pleaseenterver);
      return;
    }
    toggleLoading(true);
    let e = {
      otp: email,
      type: parseInt(route.params.type),
      device_id: DeviceInfo.getUniqueId().toString(),
      device_type: Platform.OS,
      device_token: GLOBAL.firebaseToken,
      model_name: '',
      phone: route.params.phone,
      country_code: route.params.country_code.replace('+', ''),
      email: route.params.email,
    };
    console.log(JSON.stringify(e));
    VerifyLogin(e)
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          actions.Token(data.token);
          storeUserSession(data.token, data.data);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  // const handleComplete = ({
  //   nativeEvent: {code},
  // }: NativeSyntheticEvent<{code: string}>) => {
  //   // onPressLoginAuto(code);
  //   // onChangeEmail(code);
  //   //console('OTP Code Received!', code);
  // };

  const handleComplete = code => {
    // console.log(JSON.stringify(code));
  };

  // This is only needed once to get the Android Signature key for SMS body
  const handleOnAndroidSignature = ({
    nativeEvent: {code},
  }: NativeSyntheticEvent<{code: string}>) => {
    setHint(code);
    console.log(code);
    // console.log('Android Signature Key for SMS body:', code);
  };

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
          OTP Verification
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
          Enter the Code We sent you
        </Text>

        <OTPInputView
          style={{
            width: '80%',
            height: 100,
            alignSelf: 'center',
            color: 'black',
          }}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={[
            style.underlineStyleBase,
            {width: Dimensions.get('window').width / 6.5},
          ]}
          codeInputHighlightStyle={style.underlineStyleHighLighted}
          onCodeFilled={code => {
            // alert(code);
            onChangeEmail(code);
          }}
        />

        <Text style={style.didnt}>{stringsoflanguages.didnt}</Text>
        <RnOtpTimer
          minutes={0}
          seconds={40}
          resendButtonStyle={{}}
          resendButtonText={stringsoflanguages.resendagain}
          resendButtonTextStyle={style.resend}
          resendButtonAction={() => {
            otp2();
          }}
        />
        <View style={style.button}>
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
            SUBMIT
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Otp1;
