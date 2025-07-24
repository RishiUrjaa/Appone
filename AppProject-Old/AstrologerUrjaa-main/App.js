
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import StackNavigator from './src/screens/navigator/StackNavigator';
import {Provider} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import store from './src/redux/store';
import io from 'socket.io-client';
import {SocketContext} from './src/redux/context';
import * as actions from './src/redux/actions';
import {SetNetInfo} from './src/redux/actions';
import 'react-native-gesture-handler';
import type {Node} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
const GLOBAL = require('./src/screens/Global');
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FlashMessage from 'react-native-flash-message';
//import messaging from '@react-native-firebase/messaging';

import {addEventListener} from '@react-native-community/netinfo';
import {showMessage, hideMessage} from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
window.consolejson = json => console.log(JSON.stringify(json, null, 2));
const App: () => Node = () => {
  const socket = io('http://astrourjaa.com:5050', {
    transports: ['websocket'],
  });
  useEffect(() => {
    requestUserPermission()
    const unsubscribe = addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }, []);


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken();
    }
}

const getFcmToken = async () => {

    try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) {
            // dispatch(actions.SetToken(fcmToken));
            store.dispatch(
              actions.SetDeviceInfo({
                id: DeviceInfo.getDeviceId(),
                token: fcmToken.toString(),
                model: DeviceInfo.getModel(),
                os: Platform.OS,
              }),
            );
            // alert(JSON.stringify(fcmToken, null, 2));
            console.log('-------------fcmToken : ', fcmToken);
        }
    } catch (error) {
        console.log(error, '-------------fcmtokenerror');
    }
};
  // const getFCMToken = () => {
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log('token=>>>', token);
  //       GLOBAL.firebaseToken = token;
  //     });
  // };

  // notifee.onBackgroundEvent(async ({type, detail}) => {
  //   const {notification, pressAction} = detail;
  //   // Check if the user pressed the Mark as read action

  //   //Remove the notification
  // });

  // async function DisplayNotification(remoteMessage) {
  //   // Create a channel
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //     importance: AndroidImportance.HIGH,
  //   });

  //   console.log(JSON.stringify(remoteMessage.data.title));
  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: remoteMessage.data.title,
  //     body: remoteMessage.notification.body,
  //     android: {
  //       smallIcon:
  //         'https://jyotishcall.in/admin/project/public/adminassets/images/logo1.png',
  //       largeIcon:
  //         'https://jyotishcall.in/admin/project/public/adminassets/images/logo1.png',
  //       channelId,
  //     },
  //   });
  // }

  // const requestPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  // };
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      var connnection = '';
      state.isConnected == true ? (connnection = '1') : (connnection = '0');
      actions.SetNetInfo(connnection);
      if (state.isConnected == false) {
        // showMessage({
        //   message: 'No Internet Available.Please connect to internet',
        //   type: 'danger',
        //   autoHide: 'false',
        // });
        // alert('No Internet Available.Please connect to internet');
      } else {
        //hideMessage();
      }
    });
  //  getFCMToken();
   // requestPermission();

    // const unsubscribew = messaging().onMessage(async remoteMessage => {
    //   console.log('remoteMessage', JSON.stringify(remoteMessage));
    //   DisplayNotification(remoteMessage);
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // return unsubscribew;

    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     GLOBAL.firebaseToken = token.token;
    //     console.log('TOKEN:', token);
    //   },

    //   // (required) Called when a remote is received or opened, or local notification is opened
    //   onNotification: function (notification) {
    //     EventRegister.emit('myCustomEvent', 'it works!!!');
    //     Alert.alert('AstroUrjaa', notification.data.title, [
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ]);
    //     // alert(notification.data.title);
    //     console.log('NOTIFICATION:', notification);
    //   },

    //   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    //   onAction: function (notification) {
    //     console.log('ACTION:', notification.action);
    //     console.log('NOTIFICATION:', notification);

    //     // process the action
    //   },

    //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //   onRegistrationError: function (err) {},

    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },

    //   // Should the initial notification be popped automatically
    //   // default: true
    //   popInitialNotification: false,

    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    * - if you are not using remote notification or do not have Firebase installed, use this:
    //    *     requestPermissions: Platform.OS === 'ios'
    //    */
    //   requestPermissions: true,
    // });
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <StackNavigator />
      </SocketContext.Provider>
      <FlashMessage position="top" autoHide={false} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;