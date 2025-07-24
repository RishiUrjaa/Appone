import React, {useState} from 'react';
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
import {SubmitButton} from '../utils/Button';
import {useDispatch, useStore} from 'react-redux';
import {
  AstrologerRegis,
  AsyncStorageSetUserId,
  CheckStatusApi,
  GetProfileApi,
  SignInApi,
} from '../service/Api';
import * as actions from '../redux/actions';
import Loader from '../utils/Loader';

import {TextField} from 'react-native-material-textfield-plus';

import CheckBox from '@react-native-community/checkbox';
const {width, height} = Dimensions.get('window');
const Register = ({navigation}) => {
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [mobile, onChangeMobile] = React.useState('');
  const [state, setState] = useState({
    password: '',
    isLoading: false,
    check: false,
  });
  const dispatch = useDispatch();
  const store = useStore();
  const setLoading = isLoading => setState({...state, isLoading});
  const forgotHandler = () => navigation.navigate('ForgotPassword');

  const loginHandler = async () => {
    //navigation.navigate('Otp');
    // const alertMessage = msg =>
    //   alert(msg || 'Something went wrong Please try again');
    // console.log('loginhandler');
    // if (!state.check) {
    //   alertMessage('Please accept terms & condition');
    //   return;
    // }

    if (name === '') {
      alert('Please enter Name');
      return;
    }
    if (mobile === '') {
      alert('Please enter mobile number ');
      return;
    }
    if (email === '') {
      alert('Please enter email id');
      return;
    }
    setLoading(true);
    const body = {
      name: name,
      phone: mobile,
      email: email,
      country_code: '91',
    };
    fetch('https://astrourjaa.com/dev/admin/api/astrologer_regestrion', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: mobile,
        email: email,
        country_code: '91',
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);

        if (data.status) {
          navigation.navigate('Otp', data);
        } else {
          alert(data.msg);
        }

        // console.log(JSON.stringify(json.result.docs));
      })
      .catch(error => {
        console.error(error);
      });

    // console.log(JSON.stringify(body));
    // //https://astrourjaa.com/dev/admin/api/
    // let data = await AstrologerRegis(body);
    // alert(JSON.stringify(data));
    // setLoading(false);
    // if (status && Object.keys(user_detail).length !== 0) {
    //   const user_id = +user_detail.user_id;
    //   if (user_id !== 0) {
    //     AsyncStorageSetUserId(user_id.toString());
    //     const {status = false, user_details = {}} = await GetProfileApi({
    //       user_id: user_id,
    //     });
    //     if (status && Object.keys(user_details).length !== 0) {
    //       const {app_status = '0', approved = '0'} = await CheckStatusApi({
    //         user_id,
    //       });
    //       dispatch(
    //         actions.Login({
    //           ...user_details,
    //           app_status: app_status === '1',
    //           approved: approved === '1',
    //         }),
    //       );
    //       setLoading(false);
    //       navigation.replace('HomeScreen');
    //     } else {
    //       setLoading(false);
    //     }
    //   } else {
    //     setLoading(false);
    //     alertMessage('Invalid Account');
    //   }
    // } else {
    //   setLoading(false);
    //   alertMessage(msg);
    // }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      <KeyboardAwareScrollView>
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
            textAlign: 'center',
            fontFamily: 'Avenir-Medium',
            textAlign: 'center',
            fontSize: 17,
            marginTop: -30,
          }}>
          {' '}
          Registration
        </Text>

        <View style={style.srow}>
          <View style={style.signupcode}>
            <Image
              source={require('../assets/user.png')}
              style={style.facebookimage}
            />
          </View>
          <View style={style.signupmobile}>
            <TextInput
              style={style.input}
              onChangeText={onChangeName}
              value={name}
              placeholderTextColor="#204768"
              placeholder={'Name'}
            />
          </View>
        </View>
        <View style={style.srow1}>
          <View style={style.signupcode}>
            <Image
              source={require('../assets/mail.png')}
              style={style.facebookimage}
            />
          </View>
          <View style={style.signupmobile}>
            <TextInput
              style={style.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholderTextColor="#204768"
              placeholder={'Mail ID'}
            />
          </View>
        </View>

        <View style={style.srow1}>
          <View style={style.signupcode}>
            <Image
              source={require('../assets/mail.png')}
              style={style.facebookimage}
            />
          </View>
          <View style={style.signupmobile}>
            <TextInput
              style={style.input}
              onChangeText={onChangeMobile}
              value={mobile}
              placeholderTextColor="#204768"
              keyboardType="number-pad"
              placeholder={'Mobile Number'}
            />
          </View>
        </View>

        {SubmitButton('GET OTP', loginHandler)}
      </KeyboardAwareScrollView>
      <Text
        style={{
          fontFamily: 'AvenirLTStd-Medium',
          fontSize: 12,
          color: '#204768',
          position: 'absolute',
          bottom: 10,
          textAlign: 'center',
          alignSelf: 'center',
        }}>
        {`Already have a account?`}
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontFamily: 'AvenirLTStd-Medium',
            fontSize: 12,
            color: '#FFC613',
          }}>
          &nbsp;{`Login`}
        </Text>
      </Text>
    </SafeAreaProvider>
  );
};

export default Register;

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
