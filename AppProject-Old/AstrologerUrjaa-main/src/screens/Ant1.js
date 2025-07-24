import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,

  StyleSheet,
  Dimensions,
} from 'react-native';
import io from 'socket.io-client';
import {SOCKET_URL} from '../service/Config';
import CountDown from 'react-native-countdown-component';

import RBSheet from "react-native-raw-bottom-sheet";
const GLOBAL = require('./Global');
import {EndBrodcastApi} from '../service/Api';
var Sound = require('react-native-sound');
// NOTE: remove this dependency if you want don't want loud speaker ability
import RNSwitchAudioOutput from 'react-native-switch-audio-output';
import Chat from './Chat';
import {useStore} from 'react-redux';
import StreamView from './StreamView';
const window = Dimensions.get('window');
import useAntMedia from './useAntMedia';
import styles from './styles';
const {width} = Dimensions.get('window');
 const RBSheetUser = useRef();
const pc_config = { iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }] };
const webSocketUrl = 'http://139.59.67.166:5443/LiveApp/websocket';
const styles2 = StyleSheet.create({
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
const Ant1 = ({navigation,route}) => {
  const store = useStore();

  const {user} = store.getState();
  const [localStream, setLocalStream] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [roomId, setRoomId] = useState(route.params.item.bridge_id);
  const [isMute, setIsMute] = useState(false);
  const [isMuteVideo, setIsMuteVideo] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [broadCastAudience,setbroadCastAudience] = useState([]);
    const [broadCastJoiner,setbroadCastJoiner] = useState([]);
    const [remaining_time,setremaining_time] = useState(0)
  //broadCastJoiner
  const [maximizedStream, setMaximizedStream] = useState(null);

  const stream = useRef({ id: '' }).current;
  let roomTimerId = useRef(null).current;
  let streamsList = useRef([]).current;
const  socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });
  const { width, height } = Dimensions.get('screen');

  const adaptor = useAntMedia({
    url: webSocketUrl,
    mediaConstraints: {
      video: true,
      audio: true,
    },
    sdp_constraints: {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    },
    bandwidth: 300,
    peerconnection_config: pc_config,
    callback(command, data) {
      //alert(command)
      switch (command) {
        case 'pong':

          break;
        case 'joinedTheRoom':
          const tok = data.ATTR_ROOM_NAME;
          this.initPeerConnection(data.streamId);
          this.publish(data.streamId, tok);
          stream.id = data.streamId;
          const streams = data.streams;

          if (streams != null) {
            streams.forEach((item) => {
              if (item === stream.id) return;
              this.play(item, tok, roomId);
            });
            streamsList = streams;
          }
          roomTimerId = setInterval(() => {
          //  alert(data.streamId)
            this.getRoomInfo(roomId, data.streamId);
          }, 3000);
          break;
        case 'publish_started':
          setIsPublishing(false);
          break;
        case 'publish_finished':
          streamsList = [];
          setIsPublishing(false);
          break;
        case 'streamJoined':

          this.play(data.streamId, undefined, roomId);
          break;
        case 'leavedFromRoom':
          console.log('leavedFromRoom');
          clearRoomInfoInterval();
          break;
        case 'roomInformation':
          const token = data.ATTR_ROOM_NAME;
          for (let str of data.streams) {
            if (!streamsList.includes(str)) {

              this.play(str, token, roomId);
            }
          }
          streamsList = data.streams;
          console.log(Platform.OS, 'roomInformation', data);
          break;
        default:
          break;
      }
    },
    callbackError: (err, data) => {
      console.log('callbackError', err, data);
      clearRoomInfoInterval();
    },
  });

  const playHandler = () => {
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

  const clearRoomInfoInterval = () => {
    if (roomTimerId != null) {
      console.log('interval cleared');
      clearInterval(roomTimerId);
    }
  };

  const handleConnect = useCallback(() => {

    if (adaptor) {
      adaptor.joinRoom(roomId, store.getState().user.user_id);
      setIsPublishing(true);
    }
  }, [adaptor, roomId]);

  const handleDisconnect = useCallback(() => {
    if (adaptor) {
      adaptor.leaveFromRoom(roomId);
      clearRoomInfoInterval();
      setIsPublishing(false);
      setMaximizedStream(null);
    }
  }, [adaptor, roomId, roomTimerId]);

  const handleMute = useCallback(() => {
    if (adaptor) {
      adaptor.handleTurnVolume();
      setIsMute(!isMute);
    }
  }, [adaptor, isMute]);

  const handleVideo = useCallback(() => {
    if (adaptor) {
      adaptor.handleTurnCamera();
      setIsMuteVideo(!isMuteVideo);
    }
  }, [adaptor, isMuteVideo]);

  const switchCamera = useCallback(() => {
    if (adaptor) {
      adaptor.switchCamera();
      setIsFront(!isFront);
    }
  }, [adaptor, isFront]);

  const switchAudio = useCallback(() => {


    RNSwitchAudioOutput.selectAudioOutput(
      isSpeaker
        ? RNSwitchAudioOutput.AUDIO_SPEAKER
        : RNSwitchAudioOutput.AUDIO_SPEAKER,
    );
    setIsSpeaker(!isSpeaker);
  }, [isSpeaker]);


  useEffect(() => {
  Sound.setCategory('Playback');
  socket.on('audience_list_update', ({status = false, data = []}) => {
    if (status) {
      setbroadCastAudience(data)

    }
    console.log('boradcast audience', data.length);
  });
  socket.emit('audience_list_update', {bridge_id: GLOBAL.bookingid});
  socket.on('broadcasters_joiners', ({status = false, data = []}) => {
    if (status) {
      let broadCastJoiner = ['', '', ''];

      if (data.length == 0){
        setremaining_time(0)

      }
      data.forEach((item, index) => {
        broadCastJoiner[index] = item.user.imageUrl;
        if (index == 0){
          setremaining_time(item.remaining_time)

        }
        //  alert(JSON.stringify(item))
      });
      if (data.length === 0) {
        broadCastJoiner = [];
      }
    //  alert(JSON.stringify(broadCastJoiner))
    setbroadCastJoiner(broadCastJoiner)

      playHandler();
    }
    console.log('broadcasters_joiners', data.length);
    // console.log(JSON.stringify(data, null, 2));
  });
  socket.emit('broadcasters_joiners', {bridge_id: GLOBAL.bookingid});
  },[])


  useEffect(() => {

if (adaptor){
  handleConnect()
}

  },[adaptor])
  useEffect(() => {
    if (adaptor) {
      console.log('checking localstream here.');
      const verify = () => {
        if (
          adaptor.localStream.current &&
          adaptor.localStream.current.toURL()
        ) {
          return setLocalStream(adaptor.localStream.current.toURL());
        }
        setTimeout(verify, 3000);
      };
      verify();
    }
  }, [adaptor]);

  const getRemoteStreams = () => {
    const remoteStreams = [];
    if (adaptor && Object.keys(adaptor.remoteStreams).length > 0) {
      for (let i in adaptor.remoteStreams) {
        if (i !== stream.id) {
              //  alert(JSON.stringify(remoteStreams))
          let st =
            adaptor.remoteStreams[i][0] &&
              'toURL' in adaptor.remoteStreams[i][0]
              ? adaptor.remoteStreams[i][0].toURL()
              : null;

          if (st) remoteStreams.push(st);
        }
      }
    }
    return remoteStreams;
  };

  const renderStream = ({ item: _stream ,index }) => {
  // alert(JSON.stringify(index,null,2))

    const count = allStreams.length;
    let wScale = 1;
    let hScale = 1;
    if (count > 3 && count < 6) wScale = 2;
    else if (count > 6) wScale = 3;

    if (count % 3 === 0 || count >= 5) hScale = 3;
    else if (count < 5 && count !== 1) hScale = 2;

    return (
      <View>
      {index == 0 && (
        <TouchableOpacity

          style={{ width: width, height: height }}>
          {!maximizedStream && <StreamView stream={_stream} />}
        </TouchableOpacity>
      )}
    </View>
    );
  };

const closeHandler = async () => {


  handleVideo()
  console.log('close video');
  console.log({
    astrologer_id: store.getState().user.user_id,

    bridge_id: route.params.item.bridge_id,
  });
  // const res = await EndBrodcastApi({
  //   astrologer_id: this.props.route.params.user.user_id,

  //   bridge_id: GLOBAL.bookingid,
  // });
  // console.log(res);
  // return;
  const {status = false} = await EndBrodcastApi({
    astrologer_id: store.getState().user.user_id,
    bridge_id: route.params.item.bridge_id,
  });
  if (status) {
        handleDisconnect()
   navigation.goBack();
    console.log('asdfd');
    socket.emit('end_broadcast', {
      bridge_id: route.params.item.bridge_id,
    });
    handleDisconnect()
      alert('Your Live broadcast is successfully completed')
  } else {
    console.log('failed');
  }

    }

  const renderMaximizedStream = () => {
    if (!maximizedStream) return null;
    return (
      <View style={styles.fullscreen}>
        <StreamView stream={maximizedStream} />
        <TouchableOpacity
          onPress={() => setMaximizedStream(null)}
          style={styles.closeBtn}>
          <Text style={styles.btnTxt}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const remoteStreams = getRemoteStreams();
  let allStreams = [];
  if (localStream) allStreams = [localStream];

   if (remoteStreams.length) allStreams = [...allStreams,...remoteStreams];
//alert(JSON.stringify(remoteStreams))
  const numColumns =
    allStreams.length <= 3
      ? 1
      : allStreams.length > 3 && allStreams.length <= 6
        ? 2
        : 3;

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderStream}
        data={allStreams}
        keyExtractor={(item) => item}
        numColumns={numColumns}
        key={numColumns}
      />
      <View style={styles2.absView}>
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
            <Chat  />
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
            <TouchableOpacity style = {{width:80,height:50,backgroundColor:'#f1f1f1',borderRadius:12,marginTop:-5}}
              activeOpacity={0.99}
              onPress={() => switchCamera()}>
              <Image
                source={require('../assets/btn_switch_camera.png')}
                style={{
                  width: 40,
                  height: 40,
                  margin: 5,
                  marginLeft:20,

                  resizeMode: 'contain',

                }}
              />
            </TouchableOpacity>

          </View>
        </View>
      </View>

      <View
          style={{
           
            width: '100%',
            top: StatusBar.currentHeight + 10,
            position: 'absolute',
height:50
          }}>
<View style = {{flexDirection:'row',justifyContent:'space-between'}}>

<View style = {{flexDirection:'row',backgroundColor:'grey',width:140,marginLeft:20,borderRadius:22}}>

<Image
                source={{uri: route.params.detail.image}}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: 'white',
marginLeft:12,
marginTop:6

                }}
              />
<View style={{flex:1}} >
<Text
                style={{
                  fontFamily: 'Avenir-Medium',
                  fontSize: 16,          
                  color: 'white',
                   marginLeft:3,
                   marginTop:4,
                 
                }}>{route.params.detail.name.trim()}
            </Text>
</View>

</View>
<FlatList
  data={broadCastAudience}
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
         <TouchableOpacity activeOpacity = {0.99} onPress= {()=>RBSheetUser.current.open()}>
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
              onPress={() => closeHandler()}>
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


<TouchableOpacity
              style={{
                padding: 5,
                // backgroundColor: 'red',
                marginLeft: 'auto',
              }}
              activeOpacity={0.99}
              onPress={() => switchAudio()}>
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


<RBSheet
ref={RBSheetUser}
  closeOnDragDown={true}
  height={window.height - 90}
  openDuration={250}
  customStyles={{
  container: {
  justifyContent: "center",
  alignItems: "center"
  }
  }}
  >
  <User  greeting = {broadCastAudience}/>
  </RBSheet>

</View>
      {renderMaximizedStream()}
    </View>
  );
};

export default Ant1;
