import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
const {width, height} = Dimensions.get('window');
import CountDown from 'react-native-countdown-component';
const window = Dimensions.get('window');

import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ChannelMediaRelayConfiguration,
  ChannelMediaInfo,
  ChannelProfile,
} from 'react-native-agora';
import io from 'socket.io-client';
import store from '../redux/store';
const GLOBAL = require('./Global');
const socket = io('http://52.8.192.30:3001', {
  transports: ['websocket'],
});
import requestCameraAndAudioPermission from './permission';
import styles from './Style2';
interface Props {}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface State {
  appId: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
}

export default class AudioCall extends Component<Props, State> {
  _engine: RtcEngine;

  constructor(props) {
    super(props);
    this.state = {
      appId: '1c78fd9bc1a644c5b519b2211c9cc53b',
      channelName: GLOBAL.bookingid,
      joinSucceed: false,
      peerIds: [],
      mute: false,
      zoom: false,
      on: false,
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  clearTimer() {
    // Handle an undefined timer rather than null
    this.timer !== undefined ? this.clearTimeout(this.timer) : null;
  }

  booking = async () => {
    console.log('hh');
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
        if (data.status) {
        } else {
          clearInterval(this.timerId);
          this.props.navigation.goBack();
        }

        // console.log(JSON.stringify(json.result.docs));
      })
      .catch(error => {
        console.error(error);
      });

    // console.log('hello')
    // BookingInfo({booking_no:this.props.route.params.booking_no})
    //   .then(data => {
    //     if (data.status) {

    //       let end = true;
    //       if (data.booking.status == "6" ){
    //         end = false
    //       }
    //       if (data.booking.status == "0" ){
    //         end = false
    //       }
    //       if (end){
    //         clearInterval(this.timerId)
    //       this.endCall1()
    //         Alert.alert('Consultation Complete','You have Successfully Completed your online Consulation Please rate your call',
    //           [{text:"Okay",  onPress: () =>  {

    //             }
    //           },

    //           ],
    //           {cancelable:false}
    //         )
    //         this.props.navigation.replace('Rating',this.props.route.params)

    //       }

    //     } else {
    //       alert(data.message);
    //     }
    //   })
    //   .catch(error => {

    //     console.log('error', error);
    //   });
  };

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      // The screen is focused
      this.booking();
      this.timerId = setInterval(() => this.booking(), 10000);
      // Call any action
    });
    // alert(JSON.stringify(GLOBAL.bookingid));
    this.init();
  }

  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    await this._engine.disableVideo();
    //this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting)

    this._engine.addListener('Warning', warn => {
      console.log('Warning', warn);
    });

    this._engine.addListener('Error', err => {
      console.log('Error', err);
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);

      const {peerIds} = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });

    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);

      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });

    // const ch = ChannelMediaRelayConfiguration(
    //     srcInfo :{
    //     channelName: "11",
    //         uid: 0,
    // },
    // destInfos:{
    //     channelName: "akash",
    //         uid: 1,
    // }
    // )

    // const channelMediaConfig = RtcEngine.ChannelMediaConfiguration();
    // // Set the source channel information.
    // channelMediaConfig.setSrcChannelInfo({
    //     channelName: "11",
    //     uid: 0,
    //
    // })
    // // Set the destination channel information. You can set a maximum of four destination channels.
    // channelMediaConfig.addDestChannelInfo({
    //     channelName: "akash",
    //     uid: 1,
    //
    // })

    // var start = new ChannelMediaRelayConfiguration(
    //
    //
    // )

    //  this._engine.startChannelMediaRelay()
    await this._engine?.leaveChannel();
    this.startCall();
  };

  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    //alert(JSON.stringify(store.getState().user.user_id));
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(
      null,
      this.state.channelName,
      null,
      parseInt(store.getState().user.user_id),
    );
  };

  // endcall = async () => {

  // };

  /**
   * @name endCall
   * @description Function to end the call
   */

  //     socket.emit('end_live_session',{
  //       token:store.getState().token,
  //       user_id:store.getState().user.id,
  //       booking_id:GLOBAL.ids
  // })

  mutecall1 = async () => {
    await this._engine.setEnableSpeakerphone(false);
    // RtcEngine.setEnableSpeakerphone(!this.state.mute);
    //this.setState(mute:!this.state.mute);
  };

  mutecall = async () => {
    await this._engine.setEnableSpeakerphone(true);
    // RtcEngine.setEnableSpeakerphone(!this.state.mute);
    this.setState({mute: !this.state.mute});
  };

  finalend = async () => {
    clearInterval(this.timerId);
    await this._engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
    this.props.navigation.goBack();
    alert('Call Ended');
  };
  mutecall1 = async () => {
    await this._engine.muteLocalAudioStream(true);
    // RtcEngine.setEnableSpeakerphone(!this.state.mute);
    this.setState({on: !this.state.on});
    //this.setState(mute:!this.state.mute);
  };

  mutecall2 = async () => {
    await this._engine.muteLocalAudioStream(false);
    // RtcEngine.setEnableSpeakerphone(!this.state.mute);
    this.setState({on: !this.state.on});
    //this.setState(mute:!this.state.mute);
  };

  render() {
    const {user_member = {}} = this.props.route.params;
    const {remaining_time = 0} = user_member;
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
      <View style={{backgroundColor: '#FFC613', flex: 1}}>
        <RtcLocalView.SurfaceView
          style={{width: width, height: 100, backgroundColor: '#FFC613'}}
          channelId={this.state.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}

        <View
          style={{
            position: 'absolute',
            top: 10,
            marginLeft: 0,
            width: window.width,
            backgroundColor: '#FFC613',
          }}>
          <View style={{marginTop: 3}}>
            <Image
              style={{
                width: 300,
                height: 200,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={require('../assets/logo.png')}
            />
            <Text
              style={{
                color: '#323643',
                fontSize: 22,
                marginTop: 0,
                fontFamily: 'Rubik-Medium',
                textAlign: 'center',

                color: 'white',
              }}>
              {this.props.route.params.user_member.name}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: '#90EE90',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 70,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#333333',
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 15,
                  textAlign: 'center',
                  marginTop: 8,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                }}>
                Audio Time Left :
              </Text>
              <View style={{marginLeft: 10, marginTop: 10}}>
                <CountDown
                  until={parseInt(remaining_time)}
                  onFinish={() => console.log('hi')}
                  digitStyle={{backgroundColor: '#90EE90'}}
                  digitTxtStyle={{color: '#333333'}}
                  size={13}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{h: 'H', m: 'min', s: 'sec'}}
                  timeLabelStyle={{fontSize: 13, color: 'black'}}
                />
              </View>
            </View>

            <Text
              style={{
                color: '#333333',
                fontFamily: 'Avenir-Heavy',
                fontSize: 12,
                textAlign: 'center',
                marginTop: 8,
                textAlign: 'center',
                alignSelf: 'center',
                marginRight: 20,
              }}>
              Wallet:{this.props.route.params.user_member.wallet}
            </Text>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 60,

            height: 40,
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              const socket = io('http://astrourjaa.com:5050', {
                transports: ['websocket'],
              });

              let e = {
                astrologer_id: GLOBAL.user_id,
                user_id: GLOBAL.data.user_member.user_id,
                booking_id: GLOBAL.data.booking_id,
                bridge_id: GLOBAL.data.chat_g_id,
              };
              console.log(JSON.stringify(e));
              socket.emit('end_live_session_by_astrologer', {
                astrologer_id: GLOBAL.user_id,
                user_id: GLOBAL.data.user_member.user_id,
                booking_id: GLOBAL.data.booking_id,
                bridge_id: GLOBAL.data.chat_g_id,
              });

              this.finalend();
              // var k = {booking_id:GLOBAL.ids}
              //
              //   EndLive({booking_id:GLOBAL.ids})
              //        .then((data) => {
              //
              //         // alert(JSON.stringify(data))
              //          if (data.status) {
              //
              //            socket.emit('end_live_session',{
              //
              //                                    token:store.getState().token,
              //                                    user_id:store.getState().user.id
              //                 })
              //
              //         // alert('Your Live Consulation has been Ended')
              //          this.props.navigation.replace('Rating')
              //
              //          } else {
              //
              //          }
              //        })
              //        .catch((error) => {
              //          console.log('error', error);
              //        });
            }}
            activeOpacity={0.7}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/btn_endcall.png')}
            />
          </TouchableOpacity>

          {this.state.on == false && (
            <TouchableOpacity
              onPress={() => this.mutecall1()}
              activeOpacity={0.7}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/unmute.png')}
              />
            </TouchableOpacity>
          )}

          {this.state.on == true && (
            <TouchableOpacity
              onPress={() => this.mutecall2()}
              activeOpacity={0.7}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/mute.png')}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => this.mutecall()} activeOpacity={0.7}>
            {this.state.mute == false && (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/speaker.png')}
              />
            )}

            {this.state.mute == true && (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                }}
                source={require('../assets/speakeroff.png')}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* <View
          style={{
            position: 'absolute',
            bottom: 60,

            height: 40,
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity onPress={() => this.mute()} activeOpacity={0.7}>
            {this.state.mute == false && (
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/btn_mute.png')}
              />
            )}
            {this.state.mute == true && (
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/btn_mute.png')}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.endCall()} activeOpacity={0.7}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/btn_endcall.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            top: 40,
            left: 12,
            backgroundColor: '#132074',
            height: 50,
            borderRadius: 50,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontFamily: 'Rubil-Bold',
              fontSize: 12,
              marginTop: 15,
              color: 'white',
              marginLeft: -7,
              width: 150,
            }}>
              Driver
          </Text>
        </View> */}
      </View>
    );
  }

  mute = () => {
    this._engine.muteLocalAudioStream(!this.state.mute);
    this.setState({mute: !this.state.mute});
  };

  _renderVideos1 = () => {
    const {joinSucceed} = this.state;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 70,
          right: 20,
        }}
        onPress={() => this.setState({zoom: false})}
        activeOpacity={0.7}>
        <View style={{}}>
          <RtcRemoteView.SurfaceView
            style={{
              width: 100,
              height: 100,
              margin: 12,
            }}
            channelId={this.state.channelName}
            uid={parseInt(GLOBAL.anoter)}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 70,
          right: 20,
        }}
        onPress={() => this.setState({zoom: true})}
        activeOpacity={0.7}>
        <View style={{}}>
          <RtcLocalView.SurfaceView
            style={{
              width: 100,
              height: 100,
            }}
            channelId={this.state.channelName}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <RtcRemoteView.SurfaceView
              style={{
                width: 100,
                height: 100,
                margin: 12,
                backgroundColor: '#FFC613',
              }}
              uid={value}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
