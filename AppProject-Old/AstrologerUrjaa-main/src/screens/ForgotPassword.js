import React from 'react';
import {useState} from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ForgotPasswordApi} from '../service/Api';
import {globStyle} from '../styles/style';
import {SubmitButton} from '../utils/Button';
import {StatusBarLight} from '../utils/CustomStatusBar';
import Loader from '../utils/Loader';

const ForgotPassword = ({navigation}) => {
  const [state, setState] = useState({
    isLoading: false,
    mobile: '',
    otp: Math.floor(1000 + Math.random() * 9000).toString(),
  });
  const toggleLoading = isLoading => setState({...state, isLoading});
  const submitHandler = async () => {
    if (state.mobile !== '') {
      const {mobile, otp} = state;

      if (mobile == '') {
        alert('Please enter Email id');
        return;
      }
      const body = {
        email: mobile,
      };
      console.log(body);
      toggleLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
      };

      try {
        await fetch(
          'https://www.devvaani.com/admin/devvaani_admin/api/forget_password_astrologer',
          requestOptions,
        ).then(response => {
          response.json().then(data => {
            toggleLoading(false);
            // alert(JSON.stringify(data));
            if (data.status == true) {
              alert('Password send on your email id');
              //  setSlot(data.slot);
            } else {
              alert(data.msg);
              // setSlot([]);
            }
            // alert(JSON.stringify(data));
          });
        });
        //   const data = await ForgotPasswordApi(body);
        //   //  alert(JSON.stringify(data));
        //   toggleLoading(false);
        //   if (data.status) {
        //     alert('Password send on your email id');
        //   } else {
        //     alert(data.message);
        //   }
      } catch (e) {}
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      <Image
        source={require('../assets/logo.png')}
        style={{
          width: 200,
          height: 150,
          alignSelf: 'center',
          marginTop: 70,
          resizeMode: 'contain',
        }}
      />

      <Text
        style={{
          marginLeft: 10,
          fontSize: 30,
          marginTop: 37,
          color: 'black',
        }}>
        Forgot Password
      </Text>

      <KeyboardAwareScrollView>
        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Email"
              keyboardType="default"
              value={state.mobile}
              onChangeText={mobile => setState({...state, mobile})}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: '70%',
          }}>
          {SubmitButton('Submit', submitHandler)}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
