import React, {useRef} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../Splash';
import Login from '../Login';
import Review from '../Review';
import Bank from '../Bank';
import History from '../History';

import Dicount from '../Dicount';
// import BrodcastList from '../BrodcastList';

import Pending from '../Pending';
import Live from '../Live';
import Register from '../Register';

import OtpScreen from '../OtpScreen';
import Update from '../Update';
import Terms from '../Terms';
import SecondRegisterScreen from '../SecondRegisterScreen';
import Otp from '../Otp';

import BankDetails from '../BankDetails';

import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import VideoCall from '../VideoCall';
import EditProfileScreen from '../EditProfileScreen';
import PremiumAstrologer from '../PremiumAstrologer';
import PremiumAstrologerBookingDetail from '../PremiumAstrologerBookingDetail';
import ChatHistory from '../ChatHistory';
import ChatScreen from '../ChatScreen';
import SettingScreen from '../SettingScreen';
import TotalEarning from '../TotalEarning';

import OnlinePuja from '../OnlinePuja';
import VideoCallHistory from '../VideoCallHistory';
import CallHistory from '../CallHistory';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import MyChat from '../MyChat';
import MyChats from '../MyChats';

import Coupon from '../Coupon';
import Notification from '../Notification';
import HtmlScreen from '../HtmlScreen';
// import Brodcast from '../Brodcast';
import Pendingq from '../Pendingq';
import RegisterScreen from '../RegisterScreen';
import Thankyou from '../Thankyou';
import AudioCall from '../AudioCall';
import AstrologerRegistration from '../AstrologerRegistration';
import AstrologerSRegistration from '../AstrologerSRegistration';
import AstrologerTRegistration from '../AstrologerTRegistration';
import Slot from '../Slot';
import AddSlot from '../AddSlot';
import Privacy from '../Privacy';
import GiftHistory from '../GIftHistory';
import BirthHistory from '../BirthHistory';
import Login1 from '../Login1';
import Otp1 from '../Otp1';
import ListVideo from '../ListVideo';
import Dicount1 from '../Dicount1';
import Suppourt from '../Suppourt';
import BasicDetail from '../BasicDetail';
import BankDetail from '../BankDetail';
import Document from '../Document';
import Kundali from '../Kundali';
import Kundli from '../Kundli';
import SelectPlace1 from '../SelectPlace1';
import Kundli1 from '../Kundli1';

const Stack = createStackNavigator();
const StackNavigator = () => {
  const navigationRef = useRef();
  // useReduxDevToolsExtension(navigationRef);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BirthHistory"
          component={BirthHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="GiftHistory"
          component={GiftHistory}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="History"
          component={History}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Otp"
          component={Otp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BasicDetail"
          component={BasicDetail}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Document"
          component={Document}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BankDetail"
          component={BankDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: 'Astrologer Registration',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{
            title: 'Privacy Policy',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={Update}
          options={{
            title: 'Update App',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Kundali"
          component={Kundali}
          options={{
            title: 'Birth Detail',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Kundli"
          component={Kundli}
          options={{
            title: 'Birth Detail',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Kundli1"
          component={Kundli1}
          options={{
            title: 'Birth Detail',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="SelectPlace1"
          component={SelectPlace1}
          options={{
            title: 'Birth Place',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="SecondRegisterScreen"
          component={SecondRegisterScreen}
          options={{
            title: 'Astrologer Registration',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Bank"
          component={Bank}
          options={{
            title: 'Bank Account Details',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Thankyou"
          component={Thankyou}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="BankDetails"
          component={BankDetails}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyChat"
          component={MyChat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyChats"
          component={MyChats}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AudioCall"
          component={AudioCall}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AstrologerRegistration"
          component={AstrologerRegistration}
          options={{
            title: 'Registration',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Slot"
          component={Slot}
          options={{
            title: 'Astrologer Time Slot',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{
            title: 'Terms & Conditions',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        <Stack.Screen
          name="AddSlot"
          component={AddSlot}
          options={{
            title: 'Add Time Slot',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Login1"
          component={Login1}
          options={{
            title: 'Change Mobile Number',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Otp1"
          component={Otp1}
          options={{
            title: 'Change Mobile Number',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="ListVideo"
          component={ListVideo}
          options={{
            title: 'Tutorial Videos',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="AstrologerSRegistration"
          component={AstrologerSRegistration}
          options={{
            title: 'Registration',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="AstrologerTRegistration"
          component={AstrologerTRegistration}
          options={{
            title: 'Registration',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />
        {/* <Stack.Screen*/}
        {/*  name="AudioCall"*/}
        {/*  component={AudioCall}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/> */}

        {/*<Stack.Screen*/}
        {/*  name="VideoCall"*/}
        {/*  component={VideoCall}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}
        <Stack.Screen
          name="Coupon"
          component={Coupon}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCall"
          component={VideoCall}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Review"
          component={Review}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PremiumAstrologer"
          component={PremiumAstrologer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PremiumAstrologerBookingDetail"
          component={PremiumAstrologerBookingDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatHistory"
          component={ChatHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{headerShown: false}}
        />
        {/*<Stack.Screen*/}
        {/*  name="Brodcastlive"*/}
        {/*  component={Brodcastlive}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}
        {/*<Stack.Screen*/}
        {/*  name="BrodcastList"*/}
        {/*  component={BrodcastList}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}
        <Stack.Screen
          name="TotalEarning"
          component={TotalEarning}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dicount"
          component={Dicount}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Dicount1"
          component={Dicount1}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Pending"
          component={Pending}
          options={{headerShown: false}}
        />

        {/*<Stack.Screen*/}
        {/*  name="Brodcast"*/}
        {/*  component={Brodcast}*/}
        {/*  options={{headerShown: false}}*/}
        {/*/>*/}

        <Stack.Screen
          name="Live"
          component={Live}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoCallHistory"
          component={VideoCallHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CallHistory"
          component={CallHistory}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pendingq"
          component={Pendingq}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            title: 'Notifications',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="Suppourt"
          component={Suppourt}
          options={{
            title: 'Suppourt',
            headerStyle: {
              backgroundColor: '#FFC613',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
              fontFamily: 'AvenirLTStd-Medium',
            },
          }}
        />

        <Stack.Screen
          name="HtmlScreen"
          component={HtmlScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
