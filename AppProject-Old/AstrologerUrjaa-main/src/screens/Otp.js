import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import style from './Style';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {SubmitButton} from '../utils/Button';
import {useDispatch, useStore} from 'react-redux';

import * as actions from '../redux/actions';
import Loader from '../utils/Loader';

import {TextField} from 'react-native-material-textfield-plus';

import CheckBox from '@react-native-community/checkbox';
import {
  AsyncStorageSetUserId,
  CheckStatusApi,
  GetProfileApi,
  MobileLogin,
  OtpVerify,
  SignInApi,
} from '../service/Api';
const {width, height} = Dimensions.get('window');
const Otp = ({navigation, route}) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [mobile, onChangeMobile] = React.useState('');
  const [state, setState] = useState({
    mobile: '',
    // mobile: '8010478716',
    password: '',
    isLoading: false,
    check: false,
  });
  const dispatch = useDispatch();
  const store = useStore();
  const setLoading = isLoading => setState({...state, isLoading});
  const forgotHandler = () => navigation.navigate('ForgotPassword');

  useEffect(() => {}, []);
  const loginHandler = async () => {
    if (email == '') {
      alert('Please enter Otp');
      return;
    } else {
      // navigation.navigate('AstrologerRegistration', route.params.user_id);

      // navigation.navigate('AstrologerRegistration');
      // const alertMessage = msg =>
      //   alert(msg || 'Something went wrong Please try again');
      // console.log('loginhandler');
      // if (!state.check) {
      //   alertMessage('Please accept terms & condition');
      //   return;
      // }
      // const {mobile, password} = state;
      // if (mobile === '') {
      //   alert('Please enter mobile number or registered email address');
      //   return;
      // }
      // if (password === '') {
      //   alert('Please enter your password');
      //   return;
      // }
      setLoading(true);
      const {deviceInfo} = store.getState();
      const body = {
        phone: route.params.phone,
        otp: email,
        device_id: deviceInfo.id,
        device_type: deviceInfo.os,
        device_token: deviceInfo.token,
      };
      console.log(JSON.stringify(body));
      const {status = false, user_detail = {}, msg} = await OtpVerify(body);
      // setLoading(false);
      if (status && Object.keys(user_detail).length !== 0) {
        const user_id = +user_detail.user_id;
        if (user_id !== 0) {
          AsyncStorageSetUserId(user_id.toString());
          const {status = false, user_details = {}} = await GetProfileApi({
            user_id: user_id,
          });
          if (status && Object.keys(user_details).length !== 0) {
            const {app_status = '0', approved = '0'} = await CheckStatusApi({
              user_id,
            });
            dispatch(
              actions.Login({
                ...user_details,
                app_status: app_status === '1',
                approved: approved === '1',
              }),
            );
            setLoading(false);
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
          alert('Invalid Account');
        }
      } else {
        setLoading(false);
        alert(msg);
      }
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      <KeyboardAwareScrollView>
        <View style={{marginTop: 60}} />
        {/* <Image
        style={{
          height: 100,
          width: 100,
          margin: 40,
          marginBottom: 20,
          resizeMode:'contain'
        }}
        source={require('../assets/home-logo.png')}
      /> */}
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
            fontFamily: 'AvenirLTStd-Heavy',
            marginBottom: 12,
            color: '#A6A7A9',
            marginLeft: 22,
          }}>
          Enter the 4 digit code sent to
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginTop: -5,
            fontFamily: 'AvenirLTStd-Heavy',
            color: '#A6A7A9',
            marginLeft: 22,
          }}>
          +91-{route.params.phone}
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
        <Text style={style.didnt}>
          Did't receive a Code ?
          <Text
            onPress={() => {
              setLoading(true);
              MobileLogin({phone: route.params.phone})
                .then(data => {
                  setLoading(false);
                  if (data.status) {
                  } else {
                    alert(data.message);
                  }
                })
                .catch(error => {
                  setLoading(false);
                  console.log('error', error);
                });
            }}
            style={[style.didnt, {color: '#1E1F20'}]}>
            {' '}
            Resent Code
          </Text>
        </Text>

        <View style={{marginTop: 20}} />
        {SubmitButton('SUBMIT', loginHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Otp;

const styles = StyleSheet.create({
  phoneView: {
    backgroundColor: '#F7F7FB',
    borderRadius: 4,
    marginTop: 20,
    width: width - 80,
    alignSelf: 'center',
  },
  checkView: {
    marginTop: 10,
    marginBottom: '30%',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  checkView_2: {
    marginLeft: 20,
    marginRight: 30,
  },
  checkText_1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#6F6F7B',
  },
  checkText_2: {
    color: '#7ED321',
  },
});
