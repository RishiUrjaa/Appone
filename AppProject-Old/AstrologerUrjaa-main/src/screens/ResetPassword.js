import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {SubmitButton} from '../utils/Button';
import {StatusBarLight} from '../utils/CustomStatusBar';
import Loader from '../utils/Loader';
import {ResetPasswordApi} from '../service/Api';
const ResetPassword = ({navigation, route}) => {
  const [state, setState] = useState({
    isLoading: false,
    password: '',
    confirmPassword: '',
  });
  useEffect(() => {
    console.log(route.params);
  }, []);
  const resetHandler = async () => {
    const {password, confirmPassword} = state;
    if (password === confirmPassword) {
      const body = {
        password: state.password,
        id: route.params.id,
      };
      console.log(body);
      setState({...state, isLoading: true});
      const {status = false} = await ResetPasswordApi(body);
      setState({...state, isLoading: false});
      if (status) {
        Alert.alert('Password Reset', 'Your Password Reset Successfully', [
          {
            text: 'OK',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
          },
        ]);
      } else {
        alert('Something went wrong please try again');
      }
    } else {
      alert('Password does not match');
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      <Image
        style={{
          height: 110,
          width: 145,
          marginTop: 35,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        source={require('../assets/splogo.png')}
      />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 72,
          marginTop: 37,
          color: '#F7F7FB',
        }}>
        Reset
      </Text>

      <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Password"
            keyboardType="default"
            value={state.password}
            onChangeText={(password) => setState({...state, password})}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Confirm Password"
            keyboardType="default"
            value={state.confirmPassword}
            onChangeText={(confirmPassword) =>
              setState({...state, confirmPassword})
            }
          />
        </View>
        <View style={styles.btn}>{SubmitButton('Reset', resetHandler)}</View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ResetPassword;
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 32,
    marginHorizontal: 35,
    borderRadius: 6,
    backgroundColor: '#F7F7FB',
    height: 54,
  },
  textInput: {
    marginHorizontal: 15,
  },
  btn: {
    marginBottom: 50,
    marginTop: 50,
  },
});
