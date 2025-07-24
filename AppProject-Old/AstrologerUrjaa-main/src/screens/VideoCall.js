import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import AgoraUIKit, {VideoRenderMode} from 'agora-rn-uikit';
import {SocketContext} from '../redux/context';
import {useIsFocused} from '@react-navigation/native';
import CountDown from 'react-native-countdown-component';
import GLOBAL from './Global';
import io from 'socket.io-client';
import Global from './Global';
import moment from 'moment';
// const socket = io('http://astrourjaa.com:5050', {
//     transports: ['websocket']
// })

const VideoCall = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const socket = useContext(SocketContext);
  console.log('route.params in videocall screen', route.params);
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    // appId: 'a39d2e3cd97d4895840dd9ea23cb3b6a',
    // channel: 'cool',
    // token:'006bfcb4dfcf2e94c60afa978b93a202b7cIABQ9REHWlY3cRube8Y2apsXpUYRwSt4BE3Jzi23XAsbgvdRPe0AAAAAEABE3sOcxpHZYgEAAQDHkdli'
    appId: '5ac18a8856f3415680d67b5aedd14b50',
    channel: Global.bookingid,
  };
  // useEffect(() => {
  //   const backAction = () => {
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  //   // alert(JSON.stringify(route.params));
  // }, []);

  useEffect(() => {
    let timer;

    const callback = async () => {
      console.log('ddd');
      let ms = 5000;

      fetch('https://astrourjaa.com/dev/admin/api/checkbooking', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: GLOBAL.data.booking_id,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(Global.data));
          if (data.status) {
          } else {
            clearTimeout(timer);
            navigation.goBack();
          }

          // console.log(JSON.stringify(json.result.docs));
        })
        .catch(error => {
          console.error(error);
        });

      timer = setTimeout(callback, ms);
    };
    if (isFocused) {
      console.log('focused');
      callback();
    } else {
      console.log('unfocused');
      clearTimeout(timer);
    }
    return () => {
      console.log('unmount main component');
      clearTimeout(timer);
    };
  }, [isFocused == true]);

  const rtcCallbacks = {
    EndCall: async () => {
      console.log(
        JSON.stringify({
          astrologer_id: GLOBAL.user_id,
          user_id: GLOBAL.data.user_member.user_id,
          booking_id: GLOBAL.data.booking_id,
          bridge_id: GLOBAL.data.chat_g_id,
        }),
      );
      Alert.alert(
        'End Video Call',
        'Are you sure you wish to end the Video Call?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              socket.emit('end_live_session_by_astrologer', {
                astrologer_id: GLOBAL.user_id,
                user_id: GLOBAL.data.user_member.user_id,
                booking_id: GLOBAL.data.booking_id,
                bridge_id: GLOBAL.data.chat_g_id,
              });
              navigation.goBack();
            },
          },
        ],
      );
    },
  };

  const textStyle = {
    color: '#fff',
    backgroundColor: '#2edb85',
    fontWeight: '700',
    fontSize: 24,
    width: '100%',
    borderColor: '#2edb85',
    borderWidth: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  };

  const btnStyle = {
    borderRadius: 2,
    width: 40,
    height: 40,
    backgroundColor: '#2edb85',
    borderWidth: 0,
  };

  const startButton = {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '90%',
  };

  const remoteBtnStyle = {backgroundColor: '#2edb8555'};
  const styleProps = {
    // iconSize: 30,
    // theme: '#ffffffee',
    // videoMode: {
    //   max: VideoRenderMode.Hidden,
    //   min: VideoRenderMode.Hidden,
    // },
    // overlayContainer: {
    //   backgroundColor: '#2edb8533',
    //   opacity: 1,
    // },
    // localBtnStyles: {
    //   muteLocalVideo: btnStyle,
    //   muteLocalAudio: btnStyle,
    //   switchCamera: btnStyle,
    //   endCall: {
    //     borderRadius: 0,
    //     width: 50,
    //     height: 50,
    //     backgroundColor: '#f66',
    //     borderWidth: 0,
    //   },
    // },
    // localBtnContainer: {
    //   backgroundColor: '#fff',
    //   bottom: 0,
    //   paddingVertical: 10,
    //   borderWidth: 4,
    //   borderColor: '#2edb85',
    //   height: 80,
    // },
    // maxViewRemoteBtnContainer: {
    //   top: 0,
    //   alignSelf: 'flex-end',
    // },
    // remoteBtnStyles: {
    //   muteRemoteAudio: remoteBtnStyle,
    //   muteRemoteVideo: remoteBtnStyle,
    //   remoteSwap: remoteBtnStyle,
    //   minCloseBtnStyles: remoteBtnStyle,
    // },
    minViewContainer: {
      bottom: 80,
      top: 190,
      left: Dimensions.get('window').width - 130,
      // backgroundColor: '#fff',
      // borderColor: '#2edb85',
      // borderWidth: 4,
      width: 100,
      height: 150,
    },
    remoteBtnContainer: {
      display: 'none',
    },
    minViewStyles: {
      height: '100%',
      width: 100,
    },
    // maxViewStyles: {
    //   height: '64%',
    // },
    // UIKitContainer: {height: '94%'},
    UIKitContainer: {height: '50%', width: '100%'},
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <AgoraUIKit
        layout={0}
        styleProps={styleProps}
        connectionData={connectionData}
        rtcCallbacks={rtcCallbacks}
      />

      {Array.isArray(GLOBAL.data.user_member) == false && (
        <View
          style={{
            width: 170,
            height: 120,
            alignSelf: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 12,
            position: 'absolute',
            top: 170,
            left: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            Name:{GLOBAL.data?.user_member?.name}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            Gender:{GLOBAL.data?.user_member?.gender}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            Pob:{GLOBAL.data?.user_member?.place_of_birth}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            Dob:
            {moment(GLOBAL.data?.user_member?.date_of_birth).format(
              'DD/MM/YYYY',
            )}
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Bold',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
            }}>
            Tob:{GLOBAL.data?.user_member?.time_of_birth}
          </Text>
        </View>
      )}

      {Array.isArray(GLOBAL.data.user_member) == false && (
        <View
          style={{
            height: 75,
            backgroundColor: '#FFC629',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            width: Dimensions.get('window').width,
          }}>
          <TouchableOpacity
            style={{width: 30, height: 30, marginLeft: 12, marginTop: 40}}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={{width: 22, height: 22, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width - 170,
              }}>
              <View>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'black',
                      fontFamily: 'AvenirLTStd-Medium',
                      fontSize: 16,
                      width: 100,
                      height: 30,
                      marginTop: 45,
                    }}>
                    {GLOBAL.data?.user_member
                      ? GLOBAL.data?.user_member?.name
                      : ''}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
      {Array.isArray(GLOBAL.data.user_member) == false && (
        <View
          style={{
            width: '100%',
            backgroundColor: '#FFFBE5',
            height: 45,
            flexDirection: 'row',
            position: 'absolute',
            top: 100,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'AvenirLTStd-Heavy',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 8,
              textAlign: 'center',
              alignSelf: 'center',
              marginLeft: Dimensions.get('window').width / 2 - 90,
            }}>
            Video Time Left :
          </Text>
          <View style={{marginLeft: 0, marginTop: 14}}>
            <CountDown
              until={parseInt(
                GLOBAL.data?.user_member
                  ? parseInt(GLOBAL.data?.user_member?.remaining_time)
                  : 0,
              )}
              onFinish={() => navigation.goBack()}
              digitStyle={{backgroundColor: '#FFFBE5'}}
              digitTxtStyle={{color: 'red'}}
              size={10}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{h: '', m: '', s: ''}}
              timeLabelStyle={{fontSize: 13, color: 'red'}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Langugae', 'Please choose Langugae', [
                {
                  text: 'English',
                  onPress: () => {
                    Global.lan = 'en';
                    navigation.navigate('Kundali', GLOBAL.data.user_member);
                  },
                  style: 'cancel',
                },
                {
                  text: 'Hindi',
                  onPress: () => {
                    Global.lan = 'hi';
                    navigation.navigate('Kundali', GLOBAL.data.user_member);
                  },
                  style: 'cancel',
                },
              ]);
            }}>
            <View
              style={{
                backgroundColor: '#FF6961',
                borderRadius: 12,
                width: 100,
                height: 30,
                marginTop: 12,
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'AvenirLTStd-Heavy',
                  color: 'white',
                  marginTop: 7,
                  textAlign: 'center',
                }}>
                Kundali
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        // <View
        //   style={{
        //     width: '100%',
        //     backgroundColor: '#90EE90',
        //     height: 40,
        //     flexDirection: 'row',
        //     position: 'absolute',
        //     top: 100,
        //   }}>
        //   <Text
        //     style={{
        //       color: '#333333',
        //       fontFamily: 'Nunito-Bold',
        //       fontSize: 12,
        //       marginTop: 8,
        //       textAlign: 'center',
        //       alignSelf: 'center',
        //       marginLeft: Dimensions.get('window').width / 2 - 90,
        //     }}>
        //     Video Time Left :
        //   </Text>
        //   <View style={{marginLeft: 10, marginTop: 10}}>
        //     <CountDown
        //       until={
        //         GLOBAL.data?.user_member
        //           ? parseInt(GLOBAL.data?.user_member?.remaining_time)
        //           : 0
        //       }
        //       onFinish={() => navigation.goBack()}
        //       digitStyle={{backgroundColor: '#90EE90'}}
        //       digitTxtStyle={{color: '#333333'}}
        //       size={13}
        //       timeToShow={['H', 'M', 'S']}
        //       timeLabels={{h: 'hr', m: 'min', s: 'sec'}}
        //       timeLabelStyle={{fontSize: 13, color: 'black'}}
        //     />
        //   </View>
        // </View>
      )}
    </SafeAreaView>
  );
};

export default VideoCall;

const styles = StyleSheet.create({});
