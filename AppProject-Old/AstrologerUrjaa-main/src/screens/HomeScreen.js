import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  AppState,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
  Alert,
  Pressable,
} from 'react-native';

import {Switch} from 'react-native-switch';

const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import React, {useEffect, useState, useContext} from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import Global from './Global';
import {SocketContext} from '../redux/context';
import {EventRegister} from 'react-native-event-listeners';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';
import Loader from '../utils/Loader';
import {useDispatch, useSelector, useStore} from 'react-redux';
import * as actions from '../redux/actions';
import {
  DynamicApi,
  HomeApi,
  AcceptRejectApi,
  StatusApi,
  AstroOnlineStatusApi,
  MasterSpecializationApi,
  Unread,
  DeleteAstrologer,
} from '../service/Api';
import {useIsFocused} from '@react-navigation/native';

import requestCameraAndAudioPermission from './permission';

import io from 'socket.io-client';
import {SOCKET_URL} from '../service/Config';
const calltype = {
  1: 'Video Call',
  2: 'Audio Call',
  3: 'Chat',
  4: 'Puja Call',
  5: 'Audio Call',
};

import * as SoundHandler from '../utils/SoundHandler';
import {color} from 'react-native-reanimated';

const HomeScreen = ({navigation, route}) => {
  const store = useStore();
  const isFocused = useIsFocused();
  const [read, setRead] = useState('0');
  const socket = useContext(SocketContext);
  const [state, setState] = useState({
    video_status: false,
    audio_status: false,
    chat_status: false,
    onlineStatus: false,
    isLoading: false,
    is_start: '',
    user_id: store.getState().user.user_id,
    app_status: store.getState().user.app_status,
    approved: store.getState().user.approved,
    user_detail: [],
  });

  const [resultState, setResultState] = useState({
    status: false,
    is_chat_or_video_start: 0,
    booking_id: 0,
    chat_g_id: 0,
    is_booking: 0,
    user_name: '',
    booking_type: '',
    user_id: '',
    user_gender: '',
    request_array: [],
  });
  const {netInfo, user} = useSelector(store => store);
  const dispatch = useDispatch();
  // const socket = io(SOCKET_URL, {
  //   transports: ['websocket'],
  // });

  const headerView = () => (
    <View style={styles.header_container}>
      <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
        <View style={styles.header_titleView}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.header_text_1}>Welcome</Text>
              <Text style={styles.header_text_2}>{user.name}</Text>
            </View>
          </View>
        </View>
      </Pressable>
      <Switch
        barHeight={25}
        value={state.onlineStatus}
        onValueChange={updateOnlineStatus}
        circleSize={25}
        circleBorderWidth={0.5}
        innerCircleStyle={styles.switch_icStyle}
        switchLeftPx={2}
        switchRightPx={2}
        switchWidthMultiplier={2.5}
        switchBorderRadius={25}
        activeTextStyle={styles.switch_text}
        inactiveTextStyle={styles.switch_text}
        containerStyle={{
          marginLeft: 'auto',
        }}
      />
      <TouchableOpacity
        style={styles.header_notifyTouch}
        onPress={() => navigation.navigate('Notification')}>
        <Image
          style={styles.header_notifyIcon}
          //   style={{height: 26, width: 23, resizeMode: 'contain'}}
          source={require('../assets/notificationBell.png')}
        />
      </TouchableOpacity>
    </View>
  );
  const statusView = () => (
    <View style={styles.sv_container}>
      <View style={styles.sv_h1}>
        <Text style={styles.sv_t1}>Type</Text>
        <Text style={styles.sv_t1}>Status</Text>
      </View>
      <View style={styles.sv_h1}>
        <Text style={styles.sv_t2}>Chat</Text>
        {switchView('chat_status')}
      </View>
      <View style={styles.sv_h1}>
        <Text style={styles.sv_t2}>Phone Call</Text>
        {switchView('audio_status')}
      </View>
      <View style={styles.sv_h1}>
        <Text style={styles.sv_t2}>Video Call</Text>
        {switchView('video_status')}
      </View>
    </View>
  );

  const _handleAppStateChange = nextAppState => {
    // const socket = io('http://astrourjaa.com:5050', {
    //   transports: ['websocket']
    // })
    socket.on('astrologers_dynamic', msg => {
      Global.data = msg;
      //   setState({...state, is_start: result.is_start});
      setResultState({...resultState, ...msg});
    });

    socket.emit('astrologers_dynamic', {
      astrologer_id: store.getState().user.user_id,
    });

    //  this.setState({appState: nextAppState});
  };
  const requestHandler = (what, item) => {
    const callback = async () => {
      SoundHandler.stop();
      toggleLoading(true);
      const body = {id: item.id, what};
      console.log(JSON.stringify(body));
      const result = await AcceptRejectApi(body);
      console.log(result);
      socket.emit('accept_reject_booking', {
        ...body,
        user_id: item.user_id,
        astrologer_id: store.getState().user.user_id,
      });
      toggleLoading(false);
    };
    if (what === '2') {
      Alert.alert('Decline Request', 'Do you want to decline this request?', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: callback},
      ]);
    } else {
      callback();
    }
    return;
  };
  const bookingView = () => (
    <>
      <Text style={styles.bv_title}>New Booking</Text>
      {resultState.request_array.map(item => (
        <View style={styles.bv_container} key={`_id_${item.id}`}>
          {/* <View style={styles.bv_h1}>
            <Text style={styles.sv_t1}>Date: 26/11/2020</Text>
            <Text style={styles.sv_t1}>Time: 2:00 PM</Text>
          </View> */}
          <View style={styles.bv_h2}>
            <Image style={styles.bv_image} source={{uri: item.img}} />
            <View style={styles.bv_h3}>
              <Text style={styles.bv_t1}>{item.name}</Text>

              <Text style={styles.bv_t1}>{item.gender}</Text>
              {/* <Text style={styles.bv_t2}>{`${item.gender} | ${
                item.age || '- -'
              } yrs`}</Text> */}
              <Text style={styles.bv_t3}>{`Type: ${calltype[item.type]}`}</Text>
            </View>
            <View style={styles.bv_h4}>
              <TouchableOpacity
                style={styles.bv_touch_accept}
                onPress={() => requestHandler('1', item)}>
                <Text style={styles.bv_t4}>ACCEPT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bv_touch_decline}
                onPress={() => requestHandler('2', item)}>
                <Text style={styles.bv_t4}>DECLINE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </>
  );

  const optionView1 = (title, source, key, color = 'black') => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#4E9EF9',
        marginHorizontal: 10,
        marginBottom: 15,
        width: (width - 100) / 3,
        height: 90,
      }}
      onPress={() => optionHandler(key)}>
      <View>
        <Text
          style={{
            backgroundColor: 'red',
            borderRadius: 12,
            color: 'white',
            width: 24,
            height: 24,
            marginTop: -12,
            padding: 3,
            paddingLeft: 7,
          }}>
          {read}
        </Text>
        <Image source={source} style={styles.opt_image} />
        <Text style={styles.opt_title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
  const optionView = (title, source, key, color = '#6E9A05') => (
    <TouchableOpacity
      style={[
        styles.opt_touch,
        {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
      ]}
      onPress={() => optionHandler(key)}>
      <View style={styles.opt_bg}>
        <Image source={source} style={styles.opt_image} />
        <Text style={styles.opt_title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
  const switchView = key => (
    <Switch
      barHeight={25}
      value={state[key]}
      onValueChange={value => updateStatus(key, value)}
      circleSize={25}
      circleBorderWidth={0.5}
      innerCircleStyle={styles.switch_icStyle}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={2.5}
      switchBorderRadius={25}
      activeTextStyle={styles.switch_text}
      inactiveTextStyle={styles.switch_text}
    />
  );

  const updateStatus = async (key, value) => {
    let {user_id, video_status, audio_status, chat_status} = state;
    const body = {
      astrologer_id: user_id,
      chat_status: chat_status ? '1' : '0',
      audio_status: audio_status ? '1' : '0',
      video_status: video_status ? '1' : '0',
      [key]: value ? '1' : '0',
    };
    console.log(JSON.stringify(body));

    toggleLoading(true);
    const {status = false} = await StatusApi(body);
    if (status) {
      setState({...state, [key]: value, isLoading: false});
    } else {
      toggleLoading(false);
      alert('Something went wrong Please try again');
    }
  };
  const updateOnlineStatus = async online => {
    toggleLoading(true);
    const {status = false} = await AstroOnlineStatusApi({
      astrologer_id: state.user_id,
      online,
    });
    if (status) {
      setState({...state, onlineStatus: online, isLoading: false});
    } else {
      toggleLoading(false);
      alert('Something went wrong Please try again');
    }
  };
  const toggleLoading = isLoading => setState({...state, isLoading});

  const callbackfunction = async () => {
    const {token, id, os} = store.getState().deviceInfo;
    const body = {
      user_id: state.user_id,
      device_token: token,
      device_id: id,
      device_type: os,
    };

    const result = await DynamicApi(body);
    console.log('api dynamic');
    console.log(JSON.stringify(result));
    Global.data = result;

    //   setState({...state, is_start: result.is_start});
    setResultState({...resultState, ...result});
  };
  const optionHandler = key => {
    console.log('key', key);
    switch (key) {
      case 'profile':
        navigation.navigate('ProfileScreen');
        break;
      case 'change':
        navigation.navigate('Login1');
        break;
      case 'support':
        navigation.navigate('Suppourt');
        break;
      case 'birth':
        navigation.navigate('BirthHistory');
        break;
      case 'bank':
        navigation.navigate('BankDetails');
        break;
      case 'pending':
        navigation.navigate('Pending');
        break;
      case 'astrologer':
        navigation.navigate('PremiumAstrologer');
        break;
      case 'chat':
        navigation.navigate('ChatHistory');
        break;
      case 'setting':
        navigation.navigate('SettingScreen');
        break;
      case 'live':
        navigation.navigate('Live');
        break;
      case 'slot':
        navigation.navigate('Slot');
        break;
      case 'gift':
        navigation.navigate('GiftHistory');
        break;
      case 'Review':
        navigation.navigate('Review');
        break;
      case 'earning':
        navigation.navigate('TotalEarning');
        break;
      case 'horoscope':
        navigation.navigate('HoroscopeOrderedScreen');
        break;
      case 'brodcast':
        navigation.navigate('BrodcastList');
        break;
      case 'bookingh':
        navigation.navigate('History');
        break;
      case 'discount':
        navigation.navigate('Dicount');
        break;
      case 'call':
        navigation.navigate('CallHistory');
        break;
      case 'video':
        navigation.navigate('VideoCallHistory');
        break;
      case 'price':
        navigation.navigate('Dicount1');
        break;
      case 'logout':
        Alert.alert('Logout', 'Are you sure want to Logout?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => logoutHandler()},
        ]);

        break;
      case 'delete':
        Alert.alert('Delete Account', 'Are you sure want to Delete Account?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => logoutHandler1()},
        ]);

        break;
      default:
        console.log('somthing missing in switch');
    }
  };
  const logoutHandler = () => {
    dispatch(actions.Logout());
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const logoutHandler1 = async () => {
    const body = {
      id: state.user_id,
    };

    const result = await DeleteAstrologer(body);
    if (result.status == true) {
      dispatch(actions.Logout());
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  const unread = async () => {
    const body = {astrologer_id: store.getState().user.user_id};
    const result = await Unread(body);
    //alert(JSON.stringify(result))
    if (result.status) {
      setRead(result.data);
    } else {
      //  toggleLoading(false);
    }
  };

  useEffect(() => {

    //   const inAppUpdates = new SpInAppUpdates(
    //     false // isDebug
    //   );
    // //  alert(inAppUpdates
    //
    //   // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    //   inAppUpdates.checkNeedsUpdate({ curVersion: DeviceInfo.getVersion()}).then((result) => {
    //   //  alert(JSON.stringify(result))
    //     if (result.shouldUpdate) {
    //       let updateOptions: StartUpdateOptions = {};
    //       if (Platform.OS === 'android') {
    //         // android only, on iOS the user will be promped to go to your app store page
    //         updateOptions = {
    //           updateType: IAUUpdateKind.FLEXIBLE,
    //         };
    //       }
    //       inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
    //     }
    //   });

    AppState.addEventListener('change', _handleAppStateChange);

    const unsubscribew = navigation.addListener('focus', () => {
      callback();
    });
    // console.log(JSON.stringify(store.getState(), null, 2));
    socket.on('connect', () => {
      console.log('socket connected');
    });
    requestCameraAndAudioPermission().then(_ => {
      console.log('requested!');
    });

    const {token, id, os} = store.getState().deviceInfo;
    const body = {
      user_id: state.user_id,
      device_token: token,
      device_id: id,
      device_type: os,
    };
    // console.log(body);
    let timer;
    const callback = async () => {
      let ms = 1000;
      if (netInfo.isInternetReachable && state.app_status && state.approved) {
        console.log(JSON.stringify(body));
        const result = await DynamicApi(body);
        console.log('api dynamic');
        console.log(JSON.stringify(result));
        Global.data = result;

        //   setState({...state, is_start: result.is_start});
        setResultState({...resultState, ...result});
      }
      //  timer = setTimeout(callback, ms);
    };
    callback();

    return () => {
      console.log('HomeScreen Unmount');
      clearTimeout(timer);
      SoundHandler.stop();
      socket.on('disconnect', () => {
        console.log('Disconnected Socket!');
      });
    };
  }, []);

  useEffect(() => {
    const {
      status = false,
      request_array,
      booking_id = 0,
      chat_g_id,
      user_id,
      name,
      booking_type,
      user_member,
      is_start,
    } = resultState;

    if (is_start == '0') {
      //alert('Waiting For Accept of User');
    }

    if (is_start == '1') {
      if (status && booking_id !== 0) {
        console.log('booking', isFocused);
        // console.log(JSON.stringify(resultState, null, 2));
        if (isFocused) {
          switch (booking_type) {
            case 'chat':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              console.log('Global.myname', Global.myname);
              navigation.navigate('MyChat', {user_member});
              break;
            case 'audio':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              setTimeout(() => {
                navigation.navigate('AudioCall', {user_member});
              }, 2000);
              // navigation.navigate('AudioCall', {
              //   uid: Math.floor(Math.random() * 100),
              //   clientRole: Host,
              //   channelName: chat_g_id,
              //   user_member,
              //   // onCancel: (message) => {},
              // });
              break;
            case 'video':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              setTimeout(() => {
                navigation.navigate('VideoCall', chat_g_id);
              }, 2000);
              break;
            case 'puja':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;

              setTimeout(() => {
                navigation.navigate('VideoCall', chat_g_id);
              }, 2000);
          }
        }
      }
    }

    if (booking_id === 0 && !isFocused) {
      console.log('goBack');
      EventRegister.emit('pujaend', 'it works!!!');
    }
  }, [
    resultState.status,
    resultState.booking_id,
    resultState.request_array.length,
    resultState.is_start,
  ]);

  useEffect(() => {
    const {
      status = false,
      request_array,
      booking_id = 0,
      chat_g_id,
      user_id,
      name,
      booking_type,
      user_member,
      is_start,
    } = resultState;
    if (is_start == '1') {
      if (status && booking_id !== 0) {
        console.log('booking', isFocused);
        // console.log(JSON.stringify(resultState, null, 2));
        if (isFocused) {
          switch (booking_type) {
            case 'chat':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              console.log('Global.myname', Global.myname);
              navigation.navigate('MyChat', {user_member});
              break;
            case 'audio':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              setTimeout(() => {
                navigation.navigate('AudioCall', {user_member});
              }, 2000);
              // navigation.navigate('AudioCall', {
              //   uid: Math.floor(Math.random() * 100),
              //   clientRole: Host,
              //   channelName: chat_g_id,
              //   user_member,
              //   // onCancel: (message) => {},
              // });
              break;
            case 'video':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;
              setTimeout(() => {
                navigation.navigate('VideoCall', chat_g_id);
              }, 2000);
              break;
            case 'puja':
              Global.bookingid = chat_g_id;
              Global.another = user_id;
              Global.user_id = state.user_id;
              Global.myname = user.name;

              setTimeout(() => {
                navigation.navigate('VideoCall', chat_g_id);
              }, 2000);
          }
        }
      }
    }
  }, [isFocused == true]);
  useEffect(() => {
    // RNVoipCall.stopRingtune();
    // RNVoipCall.endAllCalls();
  }, [isFocused]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        if (nextAppState == 'active') {
          // RNVoipCall.stopRingtune();
          // RNVoipCall.endAllCalls();
        }
        console.log('Next AppState is: ', nextAppState);
      },
    );
    let listener = EventRegister.addEventListener('hello', data => {
      callbackfunction();
    });
  }, []);

  useEffect(() => {
    Global.user_id = state.user_id;
    // const socket = io('http://astrourjaa.com:5050', {
    //   transports: ['websocket']
    // })
    socket.on('astrologers_dynamic', msg => {
      //  alert(JSON.stringify(msg))

      Global.data = msg;
      //   setState({...state, is_start: result.is_start});
      setResultState({...resultState, ...msg});
    });

    socket.emit('astrologers_dynamic', {
      astrologer_id: store.getState().user.user_id,
    });

    (async () => {
      const body = {user_id: state.user_id};
      console.log('body', body);
      const {status = false, user_detail = []} = await HomeApi(body);
      if (status && user_detail.length !== 0) {
        const {video_status, audio_status, chat_status, online_status} =
          user_detail;
        setState({
          ...state,
          video_status: video_status === '1',
          audio_status: audio_status === '1',
          chat_status: chat_status === '1',
          onlineStatus: online_status === '1',
        });
      }
    })();
    (async () => {
      const {status = false, list = []} = await MasterSpecializationApi();
      if (status) {
        dispatch(actions.SkillList(list));
      }
    })();
  }, []);
  // incoming request caller tone handler
  useEffect(() => {
    resultState.request_array.length === 1
      ? SoundHandler.play()
      : SoundHandler.stop();
  }, [resultState.request_array.length]);

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {headerView()}
      <ScrollView>
        {statusView()}
        {typeof resultState.is_start != 'undefined' && (
          <View>
            {resultState.is_start == '0' && (
              <View style={{}}>
                <Text style={{color: 'red', textAlign: 'center'}}>
                  Waiting For User to Accept the call
                </Text>
              </View>
            )}
          </View>
        )}
        {resultState.request_array.length !== 0 && bookingView()}
        <View style={styles.opt_container}>
          {optionView(
            'View Birth Detail',
            require('../assets/profileimg.png'),
            'birth',
          )}

          {optionView(
            'My Profile',
            require('../assets/profileimgq.png'),
            'profile',
          )}
          {/* {optionView(
            'Astrologer',
            require('../assets/calen.png'),
            'astrologer',
          )} */}
          {optionView('Chat', require('../assets/chat.png'), 'chat', '#4E9EF9')}
          {optionView('Call', require('../assets/call.png'), 'call', '#4E9EF9')}
          {optionView(
            'Video Call',
            require('../assets/video-call.png'),
            'video',
          )}

          {/* {optionView(
            'Booking',
            require('../assets/booking.png'),
            'pending',
            '#40C8C8',
          )} */}

          {/* {optionView(
            'Booking History',
            require('../assets/booking.png'),
            'bookingh',
          )} */}

          {/* {optionView('Discount', require('../assets/booking.png'), 'discount')} */}
          {/* {optionView('Review', require('../assets/review.png'), 'Review')}
          {optionView('Live History', require('../assets/call.png'), 'live')}
          {optionView1('Report', require('../assets/report.png'), 'horoscope')} */}
          {optionView(
            'Total Earning',
            require('../assets/report.png'),
            'earning',
          )}
          {/* 
          {optionView(
            'Login Hours',
            require('../assets/login.png'),
            'login',
            '#F39B49',
          )} */}
          {/* {optionView(
            'Booking Slots',
            require('../assets/booking-slot.png'),
            'slot',
            '#E93ED8',
          )} */}

          {/* {optionView(
            'Change Price Request',
            require('../assets/booking-slot.png'),
            'price',
            '#E93ED8',
          )} */}
          {/* {optionView(
            'Support',
            require('../assets/support.png'),
            'support',
            '#9B6AE6',
          )} */}

          {/* {optionView(
            'Tutorial Videos',
            require('../assets/settings.png'),
            'setting',
          )} */}
          {/* {optionView(
            'Bank Account',
            require('../assets/account.png'),
            'bank',
            '#6391FF',
          )} */}

          {optionView(
            'Feedback',
            require('../assets/account.png'),
            'Review',
            '#6391FF',
          )}

          {optionView(
            'Settings',
            require('../assets/settings.png'),
            'setting',
            '#6391FF',
          )}
          {optionView(
            'Logout',
            require('../assets/login.png'),
            'logout',
            '#F39B49',
          )}
          {Platform.OS == 'ios' &&
            optionView(
              'Delete account',
              require('../assets/deleteacc.png'),
              'delete',
              '#F39B49',
            )}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFC613',
    paddingTop: 40,
    paddingBottom: 10,
  },
  header_icon: {
    height: 40,
    width: 40,
  },
  header_icon_view: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
  },
  header_titleView: {
    paddingHorizontal: 10,
  },
  header_text_1: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
  header_text_2: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 16,
    color: '#000000',
    textTransform: 'uppercase',
  },
  header_notifyTouch: {
    marginLeft: 30,
  },
  header_notifyIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  sv_container: {
    margin: 20,
    padding: 15,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sv_h1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  sv_t1: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
  },
  sv_t2: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 16,
    color: '#A6A7A9',
  },
  bv_title: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1D1E2C',
    marginHorizontal: 20,
  },
  bv_container: {
    margin: 20,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFC613',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bv_h1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#9797971a',
  },
  bv_h2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bv_h3: {
    paddingHorizontal: 15,
  },
  bv_h4: {
    marginLeft: 'auto',
  },
  bv_image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  bv_touch_accept: {
    backgroundColor: '#00B05F',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 4,
  },
  bv_touch_decline: {
    backgroundColor: '#ff3a31',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 4,
  },
  bv_t1: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 16,
    // color: '#F97012',
    color: 'black',
  },
  bv_t2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#69707F',
  },
  bv_t3: {
    fontFamily: 'Avenir-Medium',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#212121',
  },
  bv_t4: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF',
  },
  opt_container: {
    margin: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  opt_touch: {
    marginHorizontal: 10,
    marginBottom: 15,
    width: (width - 100) / 3,
    height: 90,
  },
  opt_bg: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  opt_image: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  opt_title: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 12,
    color: '#000000',
    width: '100%',
    textAlign: 'center',
  },
  switch_icStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switch_text: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 9,
    fontWeight: '900',
    color: '#fff',
  },
});
