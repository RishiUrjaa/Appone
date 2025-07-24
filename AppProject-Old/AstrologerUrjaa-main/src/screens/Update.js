import React, {useContext, useEffect, useState} from 'react';

import {
  Dimensions,
  Image,
  PermissionsAndroid,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Linking,
  View,
  Alert,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';
import style from './Style';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Update = ({navigation}) => {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const onPress = () => navigation.navigate('Register');
  const onPressLogin = () => {
    Linking.openURL(
      Platform.OS == 'ios'
        ? 'https://apps.apple.com/us/app/astrourjaa-astrologer/id6483210112'
        : 'https://play.google.com/store/apps/details?id=com.astrourzaaa',
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {state.loading && <Loader />}
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{}}>
        <View style={{flex: 1}}>
          <View style={{marginTop: 30}} />

          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 22,
              fontFamily: 'AvenirLTStd-Medium',
              width: '90%',
              margin: 10,
            }}>
            Update Recommended
          </Text>

          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Medium',
              width: '90%',
              margin: 10,
            }}>
            A new version of the App is now available, we are always working to
            make Astrourjaa mobile App even better for you.
          </Text>

          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'AvenirLTStd-Medium',
              width: '90%',
              margin: 10,
            }}>
            Please be with us always.
          </Text>

          <View style={{marginTop: 40}} />

          <View style={style.button}>
            <Button
              onPress={onPressLogin}
              color="#F5C525"
              title={'Update App'}
            />
          </View>

          {/* <Pressable onPress={() =>Linking.openURL('https://play.google.com/store/apps/details?id=com.AstroUrjaa')}>

          <LinearGradient colors={[GLOBAL.primarycolor, GLOBAL.secondarycolor]} style={{
            marginLeft: 28,
            marginTop: 30,
            height: 50,
            width: window.width - 56,
            borderRadius: 4,
          }}>
            <Text style={  {marginTop:12,width:'100%',textAlign:'center',color:GLOBAL.textcolor,fontFamily:'AvenirLTStd-Medium',fontSize:20}}>
              Update
            </Text>

          </LinearGradient>
          </Pressable> */}

          {/*<Button*/}
          {/* */}
          {/*  styleDisabled={{color: 'red'}}*/}
          {/*  onPress={() => onPressLogin()}>*/}
          {/*  LOG IN*/}
          {/*</Button>*/}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Update;
