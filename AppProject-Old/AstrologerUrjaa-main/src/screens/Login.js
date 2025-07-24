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
  ImageBackground,
  Linking,
} from 'react-native';
import Button from 'react-native-button';

import stringsoflanguages from './Language';


import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../utils/Loader';
import {MobileLogin} from '../service/Api';
const Login = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [mobile, onChangeMobile] = React.useState('');
  const [show, setShow] = useState(false);
  const [accept, setAccept] = useState(false);

  const [flag, setFlag] = useState('🇮🇳');
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

  const onPressAutoFill = async (countryCode, mobile) => {
    toggleLoading(true);
    MobileLogin({country_code: countryCode.replace('+', ''), phone: mobile})
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          data.type = '1';
          data.country_code = countryCode;
          data.phone = mobile;
          data.email = '';
          navigation.navigate('Otp', data);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  };

  const handleTextChange = inputText => {
    // Remove any non-numeric characters from the input value
    const numericText = inputText.replace(/[^0-9]/g, '');
    onChangeMobile(numericText);
  };
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
    MobileLogin({phone: mobile})
      .then(data => {
        toggleLoading(false);
        if (data.status) {
          data.type = '1';
          data.country_code = '91';
          data.phone = mobile;
          data.email = '';
          navigation.navigate('Otp', data);
        } else {
          console.log(data.msg);
          if (
            data.msg == 'Mobile number already registered, please use another'
          ) {
            alert('You are not a registered astrologer.Please signup first!');
          } else {
            alert(data.msg);
          }
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  };

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

      

      <ImageBackground
        source={require('../assets/background.png')}
        style={{height: '100%', width: '100%'}}>
        <KeyboardAwareScrollView>
          <View style={{marginTop: 30}} />

          <Image
            style={{
              width: 300,
              height: 120,
              alignSelf: 'center',
              marginTop: 30,
              resizeMode: 'contain',
            }}
            source={require('../assets/logo.png')}
          />
          <Text
            style={{
              fontSize: 14,
              marginTop: 14,
              fontFamily: 'AvenirLTStd-Medium',
              marginBottom: 12,
              color: '#A6A7A9',
              textAlign: 'center',
            }}>
            100% Privacy Celebrity Astrologers Trusted!
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
            <View
              style={{
                borderWidth: 1.5,
                borderColor: '#00000010',
                borderRadius: 8,
                height: 50,
                backgroundColor: 'white',
                marginHorizontal: 15,
                marginTop: 20,
                flexDirection: 'row',
                marginLeft: 0,
              }}>
              <View style={{flexDirection: 'row'}}>
                {/* <Image
                  style={{width: 20, height: 20, marginTop: 14, marginLeft: 12}}
                  source={require('../assets/flag.png')}
                /> */}
                <TextInput
                  pointerEvents={'none'}
                  style={{
                    fontSize: 14,
                    fontFamily: 'AvenirLTStd-Medium',
                    // fontWeight: '600',
                    marginLeft: 5,
                    color: '#242A37',
                    borderRightWidth: 1,
                    borderRightColor: '#00000010',
                    paddingRight: 12,
                  }}
                  value={`${flag} + 91`}
                  editable={false}
                />

                <TextInput
                  style={style.input}
                  onChangeText={handleTextChange}
                  value={mobile}
                  placeholderTextColor="#A6A7A9"
                  placeholder={stringsoflanguages.enter}
                  keyboardType={'numeric'}
                  maxLength={10}
                />
              </View>
            </View>
            
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      <View style={[style.button, {position: 'absolute', bottom: 72}]}>
        <Button
          style={{
            fontSize: 17,
            padding: 8,
            color: '#1E1F20',
            backgroundColor: '#FFC629',
            height: 40,
            borderRadius: 8,
          }}
          onPress={onPressLogin}>
          SIGN IN
        </Button>
        <Button
          style={{
            fontSize: 17,
            padding: 8,
            color: '#1E1F20',
            backgroundColor: '#FFC629',
            height: 40,
            borderRadius: 8,
            marginTop: 12,
          }}
          onPress={() => {
            Linking.openURL('https://astrourjaa.com/astrologer-registration');
          }}>
          SIGN UP
        </Button>
        {/* <Text
          style={[
            style.didnt,
            {
              color: '#000521',
              fontSize: 14,
              fontFamily: 'AvenirLTStd-Medium',
              marginTop: 14,
            },
          ]}>
          Don’t have an account? &nbsp;
          <Text
            onPress={() => {
              Linking.openURL('https://astrourjaa.com/astrologer-registration');
            }}
            style={[
              style.didnt,
              {
                color: '#FFC629',
                fontSize: 14,
                fontFamily: 'AvenirLTStd-Medium',
                marginTop: 8,
              },
            ]}>
            Signup Now
          </Text>
        </Text> */}
      </View>
      {/* <CountryPicker
        show={show}
        pickerButtonOnPress={item => {
          if (item == 'close') {
            setShow(false);
          } else {
            setCountryCode(item.dial_code);
            setShow(false);
          }
        }}
      /> */}
    </SafeAreaView>
  );
};
export default Login;
