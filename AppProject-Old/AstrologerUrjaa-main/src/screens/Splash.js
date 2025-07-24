import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {checkVersion} from 'react-native-check-version';
import {useDispatch} from 'react-redux';

import uuid from 'uuid';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 100,
    marginBottom: 20,
  },
  callButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width: '100%',
  },
  logContainer: {
    flex: 3,
    width: '100%',
    backgroundColor: '#D9D9D9',
  },
  log: {
    fontSize: 10,
  },
});
const alarmNotifData = {
  title: 'My Notification Title',
  message: 'My Notification Message',
  channel: 'my_channel_id',
  small_icon: 'ic_launcher',
  alarm_id: 1,

  // You can add any additional data that is important for the notification
  // It will be added to the PendingIntent along with the rest of the bundle.
  // e.g.
  data: {foo: 'bar'},
};
const hitSlop = {top: 10, left: 10, right: 10, bottom: 10};

import {
  AsyncStorageGetUserId,
  GetProfileApi,
  CheckStatusApi,
} from '../service/Api';
import * as actions from '../redux/actions';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';


const Splash = ({navigation}) => {
  const [logText, setLog] = useState('');
  const [heldCalls, setHeldCalls] = useState({}); // callKeep uuid: held
  const [mutedCalls, setMutedCalls] = useState({}); // callKeep uuid: muted
  const [calls, setCalls] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {


  }, []);


  const screenHandler = async () => {
    const user_id = await AsyncStorageGetUserId();
    console.log(user_id);
    if (user_id && user_id !== '') {
      console.log('pass');
      console.log(
        JSON.stringify(
          await GetProfileApi({
            user_id: user_id,
          }),
        ),
      );
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
        //  navigation.navigate('Ant')
        navigation.replace('HomeScreen', {
          app_status: app_status === '1',
          approved: approved === '1',
        });
        return;
      }
    }
    navigation.replace('Login');
  };
  //   const answerCall = ({ callUUID }) => {
  //     const number = calls[callUUID];
  //     console.log(`[answerCall] ${format(callUUID)}, number: ${number}`);
  //     RNCallKeep.rejectCall(callUUID);
  // screenHandler()
  //     // RNCallKeep.startCall(callUUID, number, number);
  //     //
  //     // BackgroundTimer.setTimeout(() => {
  //     //     console.log(`[setCurrentCallActive] ${format(callUUID)}, number: ${number}`);
  //     //   RNCallKeep.setCurrentCallActive(callUUID);
  //     // }, 1000);
  //   };
  // const displayIncomingCallNow = () => {
  //   displayIncomingCall('astrohelp24 call');
  // };
  // const didPerformSetMutedCallAction = ({ muted, callUUID }) => {
  //     const number = calls[callUUID];
  //       console.log(`[didPerformSetMutedCallAction] ${format(callUUID)}, number: ${number} (${muted})`);
  //
  //     setCallMuted(callUUID, muted);
  //   };
  //
  //   const didToggleHoldCallAction = ({ hold, callUUID }) => {
  //     const number = calls[callUUID];
  //     console.log(`[didToggleHoldCallAction] ${format(callUUID)}, number: ${number} (${hold})`);
  //
  //     setCallHeld(callUUID, hold);
  //   };

  // const endCall = ({ callUUID }) => {
  //   const handle = calls[callUUID];
  //   console.log(`[endCall] ${format(callUUID)}, number: ${handle}`);
  //
  //   removeCall(callUUID);
  // };
  // const removeCall = (callUUID) => {
  //   const { [callUUID]: _, ...updated } = calls;
  //   const { [callUUID]: __, ...updatedHeldCalls } = heldCalls;
  //
  //   setCalls(updated);
  //   setCalls(updatedHeldCalls);
  // };
  //     const hangup = (callUUID) => {
  //     //  RNCallKeep.endCall(callUUID);
  //       removeCall(callUUID);
  //     };
  //
  //     const setOnHold = (callUUID, held) => {
  //       const handle = calls[callUUID];
  //       RNCallKeep.setOnHold(callUUID, held);
  //       console.log(`[setOnHold: ${held}] ${format(callUUID)}, number: ${handle}`);
  //
  //       setCallHeld(callUUID, held);
  //     };
  //
  //     const setOnMute = (callUUID, muted) => {
  //       const handle = calls[callUUID];
  //       RNCallKeep.setMutedCall(callUUID, muted);
  //       console.log(`[setMutedCall: ${muted}] ${format(callUUID)}, number: ${handle}`);
  //
  //       setCallMuted(callUUID, muted);
  //     };
  //
  //     const updateDisplay = (callUUID) => {
  //       const number = calls[callUUID];
  //       // Workaround because Android doesn't display well displayName, se we have to switch ...
  //       if (isIOS) {
  //         RNCallKeep.updateDisplay(callUUID, 'New Name', number);
  //       } else {
  //         RNCallKeep.updateDisplay(callUUID, number, 'New Name');
  //       }
  //
  //       console.log(`[updateDisplay: ${number}] ${format(callUUID)}`);
  //     };
  //
  //   const displayIncomingCall = (number) => {
  //       const callUUID = getNewUuid();
  //       addCall(callUUID, number);
  //
  //       console.log(`[displayIncomingCall] ${format(callUUID)}, number: ${number}`);
  //
  //       RNCallKeep.displayIncomingCall(callUUID, number, number, 'number', false);
  //     };
  //
  //     const didPerformDTMFAction = ({ callUUID, digits }) => {
  //   const number = calls[callUUID];
  //   console.log(`[didPerformDTMFAction] ${format(callUUID)}, number: ${number} (${digits})`);
  // };
  // const didReceiveStartCallAction = ({ handle }) => {
  //   if (!handle) {
  //     // @TODO: sometime we receive `didReceiveStartCallAction` with handle` undefined`
  //     return;
  //   }
  //   const callUUID = getNewUuid();
  //   //addCall(callUUID, handle);
  //       removeCall(callUUID);
  //
  //   // console.log(`[didReceiveStartCallAction] ${callUUID}, number: ${handle}`);
  //   //
  //   // RNCallKeep.startCall(callUUID, handle, handle);
  //   //
  //   // BackgroundTimer.setTimeout(() => {
  //   //   console.log(`[setCurrentCallActive] ${format(callUUID)}, number: ${handle}`);
  //   //   RNCallKeep.setCurrentCallActive(callUUID);
  //   // }, 1000);
  // };


  const checkPermis =async()=>{
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  }

  useEffect( () => {
    checkPermis()
  }, []);
  const checkversion = async () => {

    const version = await checkVersion();
    console.log('Got version info:', version);

    if (version.needsUpdate) {
      // screenHandler();
      navigation.navigate('Update');
    } else {
      //  navigation.navigate('Update');
      screenHandler();
    }
  };

  useEffect(() => {
    // getAppstoreAppMetadata('com.astrohelp24a') //put any apps packageId here
    //   .then(metadata => {
    //     var currentVerNum = VersionNumber.appVersion.split('-')[0];
    //     if (currentVerNum != metadata.version) {
    //       console.log(currentVerNum);
    //       console.log(metadata.version);
    //       //alert('Please update your app.')
    //       return;
    //     } else {
    //     }
    //     console.log(
    //       'clashofclans android app version on playstore',
    //       metadata.version,
    //       'published on',
    //       metadata.currentVersionReleaseDate,
    //     );
    //   })
    //   .catch(err => {
    //     console.log('error occurred', err);
    //   });
    // firebasePushSetup()
    checkversion();

    //    RNCallKeep.addEventListener('answerCall', answerCall);
    //   RNCallKeep.addEventListener('didPerformDTMFAction', didPerformDTMFAction);
    //   RNCallKeep.addEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
    //   RNCallKeep.addEventListener('didPerformSetMutedCallAction', didPerformSetMutedCallAction);
    //   RNCallKeep.addEventListener('didToggleHoldCallAction', didToggleHoldCallAction);
    //   RNCallKeep.addEventListener('endCall', endCall);
    //
    //   return () => {
    //     RNCallKeep.removeEventListener('answerCall', answerCall);
    //     RNCallKeep.removeEventListener('didPerformDTMFAction', didPerformDTMFAction);
    //     RNCallKeep.removeEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
    //     RNCallKeep.removeEventListener('didPerformSetMutedCallAction', didPerformSetMutedCallAction);
    //     RNCallKeep.removeEventListener('didToggleHoldCallAction', didToggleHoldCallAction);
    //     RNCallKeep.removeEventListener('endCall', endCall);
    //   }
    // ReactNativeAN.stopAlarmSound();
    //  const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 1000));
    //  ReactNativeAN.deleteAlarm(1);
    // const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + parseInt(1000)));
    //
    //    const alarm =  ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    //     console.log(alarm);

    // setTimeout(() => {
    //   screenHandler();
    // }, 2000);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBarDark />

      <Image
        source={require('../assets/splash.png')}
        style={{
          height: height,
          width: width,
          resizeMode:'contain'
        }}
      />
    </View>
  );
};

export default Splash;
