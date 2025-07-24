import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  AsyncStorageSetUserId,
  ForgotPasswordApi,
  OtpApi,
  SignUpApi,
} from '../service/Api';
import * as actions from '../redux/actions';
import {useDispatch, useStore} from 'react-redux';
import Loader from '../utils/Loader';

const OtpScreen = ({navigation, route}) => {
  const store = useStore();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    code: '',
    isLoading: false,
  });

  const toggleLoading = (isLoading) => setState({...state, isLoading});
  const otpVerifyHandler = async (code) => {
    const {params} = route;
    if (code === params.otp) {
      console.log(route.params);
      navigation.navigate('ResetPassword', route.params);
    } else {
      alert('Please enter correct OTP');
      setState({...state, code: ''});
    }
  };

  const resendOtpHandler = async () => {
    const {mobile} = route.params;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const body = {
      email_phone: mobile,
      otp: otp,
    };
    console.log(body);
    toggleLoading(true);
    const {status = false, id = 0} = await ForgotPasswordApi(body);
    toggleLoading(false);
    if (status) {
      route.params.otp = otp;
      setState({...state, code: ''});
      alert('OTP Send Successfully');
    } else {
      alert(msg);
    }
  };

  useEffect(() => {
    console.log(route.params);
  }, []);
  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <StatusBar backgroundColor="orange" />
      {state.isLoading && <Loader />}
      <Text
        style={{marginLeft: 10, fontSize: 72, marginTop: 74, color: '#F7F7FB'}}>
        OTP
      </Text>

      <View style={{width: '70%', marginLeft: 32}}>
        <Text
          style={{
            fontSize: 24,
            marginTop: -35,
            marginLeft: 10,
            color: '#1D1E2C',
            fontWeight: 'bold',
          }}>
          Phone Verification!
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          lineHeight: 22,
          marginLeft: 33,
          marginRight: 37,
          marginTop: 10,
          color: '#687080',
          fontWeight: 'normal',
        }}>
        Please enter code that we’ve sent to your mobile number
      </Text>
      <View
        style={{width: '100%', justifyContent: 'center', alignSelf: 'center'}}>
        <Image
          style={{height: 194, width: '50%', alignSelf: 'center'}}
          source={require('../assets/phnimg.png')}
        />
      </View>

      <View>
        <OTPInputView
          autoFocusOnLoad
          style={{
            width: '80%',
            height: 5,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          pinCount={4}
          //   code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          //   onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => otpVerifyHandler(code)}
          code={state.code}
          onCodeChanged={(code) => setState({...state, code})}
        />
      </View>

      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Avenir',
          width: '60%',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 50,
          color: '#687080',
          fontWeight: 'normal',
        }}>
        Didn’t you received any code?
      </Text>
      <TouchableOpacity onPress={resendOtpHandler}>
        <Text
          style={{
            fontSize: 14,
            width: '27%',
            justifyContent: 'center',
            alignSelf: 'center',
            fontFamily: 'Avenir',
            marginTop: 5,
            color: '#F97012',
            fontWeight: 'normal',
          }}>
          Resend Code
        </Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderRadius: 22,
    backgroundColor: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
  },
});
