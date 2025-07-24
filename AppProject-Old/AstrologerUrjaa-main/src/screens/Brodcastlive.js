import React, {Component, PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  NativeModules,
  Image,
  Alert,
  StatusBar,
  FlatList,
} from 'react-native';
import Chat from './Chat';
import User from './User.js';
import * as Animatable from 'react-native-animatable';
import CountDown from 'react-native-countdown-component';
import RBSheet from 'react-native-raw-bottom-sheet';
import {EndBrodcastApi} from '../service/Api';

import io from 'socket.io-client';

const window = Dimensions.get('window');
import {EventRegister} from 'react-native-event-listeners';
import LottieView from 'lottie-react-native';
import {Surface, ActivityIndicator} from 'react-native-paper';
const GLOBAL = require('./Global');
import NetInfo from '@react-native-community/netinfo';
import {RtcEngine, AgoraView} from 'react-native-agora';

import {APPID} from './settingss';
import {Stopwatch} from 'react-native-stopwatch-timer';
import {SOCKET_URL} from '../service/Config';
var Sound = require('react-native-sound');

const {Agora} = NativeModules;
// console.log(Agora);
const options = {
  container: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 12,
    color: '#fff',
  },
};
if (!Agora) {
  throw new Error(
    'Agora load failed in react-native, please check ur compiler environments',
  );
}

const {
  FPS30,
  AudioProfileDefault,
  AudioScenarioDefault,
  Host,
  Audience,
  Adaptative,
} = Agora;

const BtnEndCall = () => require('../assets/btn_endcall.png');
const BtnMute = () => require('../assets/btn_mute.png');
const BtnSwitchCamera = () => require('../assets/btn_switch_camera.png');
const IconMuted = () => require('../assets/icon_muted.png');

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  absView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  videoView: {
    padding: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    zIndex: 100,
  },
  localView: {
    flex: 1,
  },
  duration: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absView: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  absViews: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: window.width,
    height: 80,
    justifyContent: 'space-between',
  },
  remoteView: {
    width: (width - 40) / 3,
    height: (width - 40) / 3,
    margin: 5,
  },
  bottomView: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

class OperateButton extends PureComponent {
  render() {
    const {
      onPress,
      source,
      style,
      imgStyle = {width: 50, height: 50, resizeMode: 'contain', marginTop: 6},
    } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.7}>
        <Image style={imgStyle} source={source} />
      </TouchableOpacity>
    );
  }
}

type Props = {
  channelProfile: Number,
  channelName: String,
  clientRole: Number,
  onCancel: Function,
  uid: Number,
};

class Brodcastlive extends Component<Props> {
  state = {
    peerIds: [],
    joinSucceed: false,
    isMute: false,
    hideButton: false,
    visible: false,
    shown: false,
    selectedUid: undefined,
    animating: true,
    isMutes: false,
    remaining_time: 0,
    mydata: {},
    connectionState: 'connecting',
    stopwatchStart: false,
    stopwatchReset: false,
    broadCastJoiner: [],
    broadCastAudience: [],
  };
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });
  componentWillMount() {
    this.listener = EventRegister.addEventListener('pujaend', data => {
      this.props.navigation.goBack();
    });

    // const options = {
    //     appid: 'ef38b64215ed49d2acc3c6d8e20439f4',
    //     channelProfile: 1,
    //     videoProfile: 40,
    //     clientRole: 1,
    //     swapWidthAndHeight: true
    // };
    // RtcEngine.init(options);

    const config = {
      appid: GLOBAL.APPID,
      channelProfile: this.props.channelProfile,
      clientRole: this.props.clientRole,
      videoEncoderConfig: {
        width: 360,
        height: 480,
        bitrate: 1,
        frameRate: FPS30,
        orientationMode: Adaptative,
      },
      swapWidthAndHeight: true,
      audioProfile: AudioProfileDefault,
      audioScenario: AudioScenarioDefault,
    };
    // console.log('[CONFIG]', JSON.stringify(config));
    // console.log('[CONFIG.encoderConfig', config.videoEncoderConfig);
    RtcEngine.on('videoSizeChanged', data => {
      // console.log('[RtcEngine] videoSizeChanged ', data);
    });
    RtcEngine.on('remoteVideoStateChanged', data => {
      // console.log('[RtcEngine] `remoteVideoStateChanged`', data);
    });
    RtcEngine.on('userJoined', data => {
      //  alert(JSON.stringify(data))
      // console.log('[RtcEngine] onUserJoined', data);
      const {peerIds} = this.state;
      if (peerIds.indexOf(data.uid) === -1) {
        this.setState({stopwatchStart: true});
        this.setState({connectionState: 'connected'});
        this.setState({
          peerIds: [...peerIds, data.uid],
        });
      }
    });
    RtcEngine.on('userOffline', data => {
      // console.log('[RtcEngine] onUserOffline', data);
      this.setState({
        peerIds: this.state.peerIds.filter(uid => uid !== data.uid),
      });
      // console.log('peerIds', this.state.peerIds, 'data.uid ', data.uid);
    });
    RtcEngine.on('joinChannelSuccess', data => {
      // console.log('[RtcEngine] onJoinChannelSuccess', data);
      RtcEngine.startPreview().then(_ => {
        this.setState({
          joinSucceed: true,
          animating: false,
        });
      });
    });
    RtcEngine.on('audioVolumeIndication', data => {
      // console.log('[RtcEngine] onAudioVolumeIndication', data);
    });
    RtcEngine.on('clientRoleChanged', data => {
      // console.log('[RtcEngine] onClientRoleChanged', data);
    });
    RtcEngine.on('videoSizeChanged', data => {
      // console.log('[RtcEngine] videoSizeChanged', data);
    });
    RtcEngine.on('error', data => {
      // console.log('[RtcEngine] onError', data);
      if (data.error === 17) {
        RtcEngine.leaveChannel().then(_ => {
          this.setState({
            joinSucceed: false,
          });
          const {state, goBack} = this.props.navigation;
          this.props.onCancel(data);
          goBack();
        });
      }
    });
    RtcEngine.init(config);
  }

  toggleStopwatch = () => {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  };
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  getFormattedTime(time) {
    // this.currentTime = time;
  }

  navigateToScreen1 = () => {
    this.prop.navigation.reset({
      index: 0,
      routes: [{name: 'TabNavigator'}],
    });
    // alert

    // Alert.alert('Complete Booking!','Are you sure you want to Complete Booking?',
    //     [{text:"Cancel"},
    //         {text:"Yes", onPress:()=>this.handleCancel()
    //         },
    //     ],
    //     {cancelable:false}
    // )
  };

  playHandler = () => {
    console.log('play');
    var whoosh = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          whoosh.getDuration() +
          'number of channels: ' +
          whoosh.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };
  componentDidMount() {
    Sound.setCategory('Playback');
    if (GLOBAL.user_id != '0') {
      // this.getlog()
    }
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        // console.log(state.isConnected);
      }
    });
    RtcEngine.getSdkVersion(version => {
      // console.log('[RtcEngine] getSdkVersion', version);
    });

    // console.log('[joinChannel] ' + this.props.channelName);
    RtcEngine.joinChannel(this.props.channelName, this.props.uid).then(
      result => {
        /**
         * ADD the code snippet after join channel success.
         */
      },
    );
    RtcEngine.enableAudioVolumeIndication(500, 3, true);

    console.log('bridge_id', GLOBAL.bookingid);

    this.socket.on('gift_sender_user', msg => {
      //this.setState({status:false})
      if (msg.status == true) {
        //alert(JSON.stringify(msg))
        this.setState({shown: true});
        setTimeout(() => {
          // write your functions
          this.setState({shown: false});
        }, 3000);
        this.setState({mydata: msg.data});
      }
    });

    this.socket.emit('gift_sender_user', {
      bridge_id: GLOBAL.bookingid,
    });

    this.socket.on('audience_list_update', ({status = false, data = []}) => {
      if (status) {
        this.setState({
          broadCastAudience: data,
        });
      }
      console.log('boradcast audience', data.length);
    });
    this.socket.emit('audience_list_update', {bridge_id: GLOBAL.bookingid});
    this.socket.on('broadcasters_joiners', ({status = false, data = []}) => {
      if (status) {
        let broadCastJoiner = ['', '', ''];

        if (data.length == 0) {
          this.setState({remaining_time: 0});
        }
        data.forEach((item, index) => {
          broadCastJoiner[index] = item;
          if (index == 0) {
            this.setState({remaining_time: item.remaining_time});
          }
          //  alert(JSON.stringify(item))
        });
        if (data.length === 0) {
          broadCastJoiner = [];
        }
        //  alert(JSON.stringify(broadCastJoiner))
        this.setState({broadCastJoiner});
        this.playHandler();
      }
      console.log('broadcasters_joiners', data.length);
      // console.log(JSON.stringify(data, null, 2));
    });
    this.socket.emit('broadcasters_joiners', {bridge_id: GLOBAL.bookingid});
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }
  closeHandler = async () => {
    console.log('close video');
    console.log({
      astrologer_id: this.props.route.params.user.user_id,

      bridge_id: GLOBAL.bookingid,
    });
    // const res = await EndBrodcastApi({
    //   astrologer_id: this.props.route.params.user.user_id,

    //   bridge_id: GLOBAL.bookingid,
    // });
    // console.log(res);
    // return;
    const {status = false} = await EndBrodcastApi({
      astrologer_id: this.props.route.params.user.user_id,
      bridge_id: GLOBAL.bookingid,
    });
    if (status) {
      this.props.navigation.goBack();
      console.log('asdfd');
      this.socket.emit('end_broadcast', {
        bridge_id: GLOBAL.bookingid,
      });
      alert('Your Live broadcast is successfully completed');
    } else {
      console.log('failed');
    }
  };
  componentWillUnmount() {
    if (this.state.joinSucceed) {
      RtcEngine.leaveChannel()
        .then(res => {
          RtcEngine.destroy();
        })
        .catch(err => {
          RtcEngine.destroy();
          // console.log('leave channel failed', err);
        });
    } else {
      RtcEngine.destroy();
    }
  }

  handleCancel = () => {
    const {goBack} = this.props.navigation;
    RtcEngine.leaveChannel()
      .then(_ => {
        this.setState({
          joinSucceed: false,
        });
      })
      .catch(err => {
        // console.log('[agora]: err', err);
      });

    //   const url = 'http://139.59.76.223/shaktipeeth/api/force_booking_done_complete_online'
    // fetch(url, {
    // method: 'POST',
    // headers: {
    //  'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
    //  'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({
    //  booking_id: GLOBAL.booking_id,
    //  from:"priest"
    //
    // }),
    // }).then((response) => response.json())
    // .then((responseJson) => {
    //
    //
    // if (responseJson.status == true) {
    //   // this.props
    //   //     .navigation
    //   //     .dispatch(StackActions.reset({
    //   //         index: 0,
    //   //         actions: [
    //   //             NavigationActions.navigate({
    //   //                 routeName: 'DrawerNavigator',
    //   //                 params: { someParams: 'parameters goes here...' },
    //   //             }),
    //   //         ],
    //   //     }))
    // } else {
    // }
    // })
    // .catch((error) => {
    //
    // console.error(error);
    // });
  };

  switchCamera = () => {
    RtcEngine.switchCamera();
  };

  toggleAllRemoteAudioStreams = () => {
    this.setState(
      {
        isMute: !this.state.isMute,
      },
      () => {
        RtcEngine.muteAllRemoteAudioStreams(this.state.isMute).then(_ => {
          /**
           * ADD the code snippet after muteAllRemoteAudioStreams success.
           */
        });
      },
    );
  };

  toggleAllRemoteAudioStreamss = () => {
    this.setState(
      {
        isMutes: !this.state.isMutes,
      },
      () => {
        RtcEngine.setEnableSpeakerphone(this.state.isMutes).then(_ => {
          /**
           * ADD the code snippet after muteAllRemoteAudioStreams success.
           */
        });
      },
    );
  };

  toggleHideButtons = () => {
    this.setState({
      hideButton: !this.state.hideButton,
    });
  };

  onPressVideo = uid => {
    this.setState(
      {
        selectedUid: uid,
      },
      () => {
        this.setState({
          visible: true,
        });
      },
    );
  };
  //setEnableSpeakerphone
  toolBar = ({hideButton, isMute}) => {
    if (!hideButton) {
      return (
        <View>
          <View style={styles.bottomView}>
            <OperateButton
              onPress={this.toggleAllRemoteAudioStreams}
              source={isMute ? IconMuted() : BtnMute()}
            />

            <OperateButton
              onPress={this.switchCamera}
              source={BtnSwitchCamera()}
            />
          </View>
        </View>
      );
    }
  };

  agoraPeerViews = ({visible, peerIds}) => {
    return visible ? (
      <View style={styles.videoView} />
    ) : (
      <View style={styles.videoView}>
        {peerIds.map((uid, key) => (
          <TouchableOpacity activeOpacity={1} key={key}>
            {/*               <Text>uid: {uid}</Text>*/}
            <AgoraView
              mode={1}
              style={styles.remoteView}
              zOrderMediaOverlay={true}
              showLocalVideo={true}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  selectedView = ({visible}) => {
    return (
      <Modal
        visible={visible}
        presentationStyle={'fullScreen'}
        animationType={'slide'}
        onRequestClose={() => {}}>
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() =>
            this.setState({
              visible: false,
            })
          }>
          <AgoraView
            mode={1}
            style={{flex: 1}}
            zOrderMediaOverlay={true}
            remoteUid={this.state.selectedUid}
          />
        </TouchableOpacity>
      </Modal>
    );
  };

  endcall = item => {
    //alert(JSON.stringify(item))

    Alert.alert('Astrohelp24', 'Are you Sure to end the call?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          const socket = io('http://astrourjaa.com:5050', {
            transports: ['websocket'],
          });
          socket.on('complete_booking_broadcast', msg => {
            //alert(JSON.stringify(msg))
            if (msg.status == true) {
              //RtcEngine.setClientRole(Host)
            } else {
              //RtcEngine.setClientRole(Audience)
            }
          });

          socket.emit('complete_booking_broadcast', {
            user_id: item.user_id,
            bridge_id: item.bridge_id,
            booking_id: item.id,
          });
        },
      },
    ]);
  };

  render() {
    //  alert(this.state.peerIds)
    if (!this.state.joinSucceed) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating={this.state.animating} />
        </View>
      );
    }

    // if (this.state.peerIds.length == 0) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: '#fff',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text
    //         style={{
    //           color: 'black',
    //           textAlign: 'center',
    //           marginTop: 30,
    //           fontSize: 12,
    //         }}>
    //         Connecting
    //       </Text>
    //       <LottieView source={require('./waiting.json')} autoPlay loop />
    //     </View>
    //   );
    // }
    return (
      <Surface
        activeOpacity={1}
        onPress={this.toggleHideButtons}
        style={styles.container}>
        {/* <AgoraView
          style={styles.localView}
          // remoteUid={this.state.peerIds[0]}
          showLocalVideo={true}
          mode={1}
        /> */}
        <AgoraView style={styles.localView} showLocalVideo={true} mode={1} />

        {this.state.shown == true && (
          <View style={{position: 'absolute', top: 200}}>
            <Animatable.View iterationCount={2} animation={'slideInRight'}>
              <View style={{width: 300, flexDirection: 'row', height: 50}}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    width: 240,
                    borderRadius: 22,
                    height: 46,
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={{uri: this.state.mydata.gift_image}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      margin: 10,
                      marginTop: 0,
                    }}
                  />

                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginTop: 12,
                      marginLeft: 3,
                      fontFamily: 'Nunito-Bold',
                    }}>
                    {this.state.mydata.user_name} Send Gift          {' '}
                  </Text>
                  <Image
                    source={{uri: this.state.mydata.user_image}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      margin: 10,
                      marginTop: 0,
                    }}
                  />
                </View>
              </View>
            </Animatable.View>
          </View>
        )}

        {/* <View style={{position: 'absolute', top: 400}}>
          <Image
            source={require('../assets/on-call.png')}
            style={{width: 200, height: 100, margin: 5, resizeMode: 'contain'}}
          />
        </View> */}
        <View
          style={{
            // backgroundColor: 'black',
            width: '100%',
            top: StatusBar.currentHeight + 10,
            position: 'absolute',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                // backgroundColor: 'red',
                paddingHorizontal: 10,
              }}>
              <Image
                source={{uri: this.props.route.params.user.image}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
              <Text
                style={{
                  fontFamily: GLOBAL.heavy,
                  fontSize: 16,
                  paddingVertical: 4,
                  color: 'white',
                  textAlign: 'center',
                }}>
                {this.props.route.params.user.name.trim()}
              </Text>
              {this.state.remaining_time != 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={{marginLeft: 5, alignSelf: 'center'}}>
                    <CountDown
                      until={parseInt(this.state.remaining_time)}
                      onFinish={() => console.log('hi')}
                      digitStyle={{backgroundColor: '#90EE90'}}
                      digitTxtStyle={{color: '#333333'}}
                      size={11}
                      timeToShow={['M', 'S']}
                      timeLabels={{m: 'min', s: 'sec'}}
                    />
                  </View>
                </View>
              )}
            </View>
            <FlatList
              data={this.state.broadCastAudience}
              horizontal
              // inverted
              style={{
                // backgroundColor: 'yellow',
                marginHorizontal: 5,
              }}
              contentContainerStyle={{
                marginLeft: 'auto',
              }}
              renderItem={({item}) => {
                const {user_id, user} = item;
                console.log(JSON.stringify(user_id, null, 2));
                return (
                  <TouchableOpacity
                    activeOpacity={0.99}
                    onPress={() => this.RBSheetUser.open()}>
                    <Image
                      source={{uri: user.imageUrl}}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: 'white',
                        marginHorizontal: 5,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              style={{
                padding: 5,
                // backgroundColor: 'red',
                marginLeft: 'auto',
              }}
              activeOpacity={0.99}
              onPress={() => this.closeHandler()}>
              <Image
                source={require('../assets/closewhite.png')}
                style={{
                  width: 15,
                  height: 15,
                  margin: 14,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          {this.state.broadCastJoiner.length !== 0 && (
            <View
              style={{
                marginHorizontal: 10,
                marginTop: 20,
                flexDirection: 'row',
                backgroundColor: '#7ED321',
                borderRadius: 25,
                paddingHorizontal: 15,
                paddingVertical: 5,
                alignSelf: 'flex-start',
              }}>
              {this.state.broadCastJoiner.map(item => {
                return (
                  <TouchableOpacity onPress={() => this.endcall(item)}>
                    <Image
                      source={
                        item !== ''
                          ? {uri: item.user.imageUrl}
                          : require('../assets/add.png')
                      }
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: 'white',
                        marginHorizontal: 5,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <RBSheet
          ref={ref => {
            this.RBSheetUser = ref;
          }}
          closeOnDragDown={true}
          height={window.height - 90}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <User greeting={this.state.broadCastAudience} />
        </RBSheet>

        <View style={styles.absView}>
          {/*      <Text>uid: {this.props.uid}, channelName: {this.props.channelName}, peers: {this.state.peerIds.join(",")}</Text>*/}
          {/* {this.agoraPeerViews(this.state)} */}

          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              backgroundColor: 'transparent',
              width: window.width - 30,
              position: 'absolute',
              bottom: 10,
              height: 250,
            }}>
            <View style={{flexDirection: 'row', width: window.width - 90}}>
              <Chat name={this.props.route.params.user.name} />
            </View>
            <View
              style={{
                position: 'absolute',
                height: 30,
                bottom: 12,
                right: -20,
                marginLeft: 60,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 50,
                  backgroundColor: '#f1f1f1',
                  borderRadius: 12,
                  marginTop: -5,
                }}
                activeOpacity={0.99}
                onPress={() => this.switchCamera()}>
                <Image
                  source={require('../assets/btn_switch_camera.png')}
                  style={{
                    width: 40,
                    height: 40,
                    margin: 5,
                    marginLeft: 20,

                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.selectedView(this.state)}
      </Surface>
    );
  }
}

export default function AgoraRTCViewContainer(props) {
  const navigation = props.route.params;
  //alert(JSON.stringify(props.route.params))

  const channelProfile = navigation.channelProfile;
  const clientRole = navigation.clientRole;
  const channelName = navigation.channelName;
  const uid = +navigation.user.user_id;
  const onCancel = navigation.onCancel;
  return (
    <Brodcastlive
      channelProfile={channelProfile}
      channelName={channelName}
      clientRole={clientRole}
      uid={uid}
      onCancel={onCancel}
      {...props}></Brodcastlive>
  );
}
