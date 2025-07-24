import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
const window = Dimensions.get('window');
import {EventRegister} from 'react-native-event-listeners';
import Backend from './Backend.js';
import CountDown from 'react-native-countdown-component';
import {GiftedChat, Send, Time, InputToolbar} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import Bubble from 'react-native-gifted-chat/lib/Bubble';
import {SimpleHeader} from '../utils/Header.js';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar.js';
import TimerCounter from './TimerCounter.js';
var randomString = require('random-string');
const GLOBAL = require('./Global');
const socket = io('http://astrourjaa.com:5050', {
  transports: ['websocket'],
});
import io from 'socket.io-client';
const {width, height} = Dimensions.get('window');
const options = {
  title: 'Select Document',
  maxWidth: 300,
  maxHeight: 500,

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class MyChats extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chat Consulation',
      animations: {
        setRoot: {
          waitForRender: false,
        },
      },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      recognized: '',
      started: '',
      text: '',
      mystatus: false,
      results: [],
      messages: [],
      texts: '',
      visible: false,
    };
  }

  // renderBubble(props) {
  //
  //     return (
  //         <View>
  //             <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
  //         </View>
  //     );
  // }

  endcall = () => {
    const socket = io('http://astrourjaa.com:5050', {
      transports: ['websocket'],
    });
    socket.emit('end_live_session_by_astrologer', {
      astrologer_id: GLOBAL.user_id,
      user_id: GLOBAL.data.user_member.user_id,
      booking_id: GLOBAL.data.booking_id,
      bridge_id: GLOBAL.data.chat_g_id,
    });
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
  };

  componentWillMount() {
    this.listener = EventRegister.addEventListener('pujaend', data => {
      this.props.navigation.goBack();
    });
    // const url = GLOBAL.BASE_URL + 'chat_read';

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_id: GLOBAL.user_id,
    //     chat_group_id: GLOBAL.bookingid,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     if (responseJson.status == true) {
    //     } else {
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
  renderBubble = (props, index) => {
    var a = false;
    if (props.currentMessage.status == true) {
      a = true;
    } else {
      a = false;
    }
    //
    // if (props.currentMessage.user_id != GLOBAL.user_id ){
    //
    // }
    return (
      <View style={{paddingRight: 12}}>
        <Bubble
          {...props}
          textProps={{
            style: {
              fontFamily: 'Nunito-Regular',
              color: '#333333',
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: 'white',
              color: '#333333',
            },
            right: {
              backgroundColor: '#90EE90',
              color: '#333333',
            },
          }}
        />
        {props.currentMessage.user_id != GLOBAL.user_id && <View></View>}

        {props.currentMessage.user_id == GLOBAL.user_id && <View></View>}
      </View>
    );
  };

  showActionSheet = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        const url =
          'http://139.59.67.166/astrohelp24/api/image_attchment_upload';
        const data = new FormData();

        // you can append anyone.
        data.append('image', {
          uri: response.uri,
          type: 'image/jpeg', // or photo.type
          name: 'image.png',
        });
        fetch(url, {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            //       this.hideLoading()

            //alert(responseJson.path)
            var x = randomString({
              length: 20,
              numeric: true,
              letters: true,
              special: false,
              exclude: ['a', 'b'],
            });

            var array = [];
            var users = {
              _id: GLOBAL.user_id,
              name: GLOBAL.myname,
            };
            var today = new Date();
            /* today.setDate(today.getDate() - 30);
                                 var timestamp = new Date(today).toISOString(); */
            var timestamp = today.toISOString();
            var dict = {
              text: 'Attachment',
              user: users,
              createdAt: timestamp,
              _id: x,
              image: responseJson.path,

              // etc.
            };
            array.push(dict);
            //Backend.load()

            console.log(responseJson.images);
            //  Backend.sendMessage(array);
          });

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  renderActions = () => {
    return (
      <TouchableOpacity onPress={() => this.showActionSheet()}>
        <Image
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
            marginLeft: 9,
            marginBottom: 12,
          }}
          source={require('../assets/attachement.png')}
        />
      </TouchableOpacity>
    );
  };
  login = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Landing',
            params: {someParams: 'parameters goes here...'},
          }),
        ],
      }),
    );
  };

  renderChatFooter = () => {
    if (this.state.texts != '') {
      return (
        <Text style={{fontSize: 14, margin: 10}}> {this.state.texts}</Text>
      );
    }

    // if (this.state.isTyping) {
    //   if (this.typingTimeoutTimer == null) {
    //     this.startTimer();
    //   }
    //   return <TypingIndicator />;
    // }
    return null;
  };
  fieldView = (title, value) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        paddingVertical: 5,
      }}>
      <View style={{flex: 0.5, paddingHorizontal: 5}}>
        <Text>{title}</Text>
      </View>
      <View style={{flex: 0.5, paddingHorizontal: 5}}>
        <Text>{value}</Text>
      </View>
    </View>
  );
  infoView = () => {
    const {
      name,
      dob,
      gender,
      fathername = 'NA',
      mothername = 'NA',
      email,
      phone,
      zodiac,
      occupation,
      language,
      message,
      tob,
      pob,
      gotro,
      spouse,
      relation,
      location,
      latitude,
      longitude,
    } = this.props.route.params.user_member;
    return (
      <View style={calStyle.container}>
        <View style={calStyle.container_2}>
          <View style={{alignItems: 'flex-end', marginBottom: 5}}>
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => this.setState({visible: false})}>
              <Image
                source={require('../assets/close.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {this.fieldView('Name', name)}
            {/* {this.fieldView('Father Name', fathername)} */}
            {/* {this.fieldView('Mother Name', mothername)} */}
            {this.fieldView('Gender', gender)}
            {this.fieldView('Time', tob)}
            {this.fieldView('D.O.B', dob)}
            {this.fieldView('Place', pob)}
            {/* {this.fieldView('Zodiac Sign', zodiac)}
            {this.fieldView('Latitude', latitude)}
            {this.fieldView('Longitude', longitude)}
            {this.fieldView('Mobile', phone)}
            {this.fieldView('Email', email)}
            {this.fieldView('Occupation', occupation)}
            {this.fieldView('Message', message)} */}
          </ScrollView>
        </View>
      </View>
    );
  };
  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        textInputStyle={{color: 'black'}}
        containerStyle={{
          backgroundColor: 'white',
          marginLeft: 10,
          borderRadius: 20,
          borderWidth: 0,
          color: 'black',
          marginBottom: 0,
          marginRight: 10,
        }}
      />
    );
  }
  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{backgroundColor: 'transparent'}}>
          <Image
            source={require('../assets/send.png')}
            style={{
              height: 38,
              width: 38,
              resizeMode: 'contain',
              backgroundColor: 'transparent',
              marginRight: 2,
              marginBottom: 2,
            }}
          />
        </View>
      </Send>
    );
  }
  renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'grey',
          },
          right: {
            color: 'grey',
          },
        }}
      />
    );
  };
  render() {
    const {user_member = {}} = this.props.route.params;
    const {remaining_time = 0} = user_member;
    console.log(remaining_time);
    return (
      <ImageBackground
        source={require('../assets/chat-bg.png')}
        style={{
          flex: 1,
          backgroundColor: '#fcfcfe',
          width: window.width,
          marginBottom: 8,
        }}>
        <View style={headerStyle.container}>
          <TouchableOpacity
            style={headerStyle.touch}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={headerStyle.backImage}
            />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', width: window.width - 190}}>
              <Text
                numberOfLines={1}
                style={{
                  color: 'black',
                  fontFamily: 'Avenir-Heavy',
                  fontSize: 16,
                  width: 100,
                  height: 30,
                  marginTop: 8,
                }}>
                {this.props.route.params.user_member.name}
              </Text>
            </View>
          </View>
        </View>

        <GiftedChat
          renderActions={this.renderActions}
          extraData={this.state}
          showUserAvatar={false}
          messages={this.state.messages}
          onSend={message => {}}
          renderBubble={this.renderBubble}
          renderTime={this.renderTime}
          renderAvatar={null}
          renderInputToolbar={() => null}
          onInputTextChanged={text => {
            Backend.updateTyping(text);

            // alert(text)
          }}
          user={{
            _id: GLOBAL.user_id,
            name: '',
          }}
        />
      </ImageBackground>
    );
  }

  componentDidMount() {
    //  alert(JSON.stringify(GLOBAL.data))
    console.log(JSON.stringify(this.props.route.params, null, 2));

    // console.log(JSON.stringify(this.props.route.params.user_member, null, 2));
    //  GLOBAL.mystatus = "Online";

    // Backend.updateMessage(message => {
    //     alert(JSON.stringify(message))
    //
    //
    // })

    Backend.loadMessages(message => {
      //  alert(JSON.stringify(message))

      if (message.text == '') {
        for (var i = 0; i < this.state.messages.length; i++) {
          //  if (this.state.messages[i].anotherid == GLOBAL.user_id) {

          if (this.state.messages[i].status == false) {
            let {messages} = this.state;
            let targetPost = messages[i];

            // Flip the 'liked' property of the targetPost
            targetPost.status = true;

            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property
            this.setState({messages});
          }
          //  }
          // alert(JSON.stringify(this.state.messages))
        }

        this.setState({messages: this.state.messages});

        return {
          messages: this.state.messages,
        };
        //  var a = this.state.messages[i]
        //
        //
        //  a.status = true
        //
        // // this.setState({messages:a})
        //  this.setState({messages:})
        //   }
      } else {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      }
    });

    // Backend.updateMessage(message => {
    //     alert(JSON.stringify(message))
    //
    //
    // })

    Backend.loadMessagess(message => {
      // alert(JSON.stringify(message.typinganother))
      if (message.typinganother == true) {
        var s = message.name + ' is typing ...';
        this.setState({texts: s});
      } else {
        this.setState({texts: ''});
      }
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    backgroundColor: '#001739',
  },
  slide1: {
    marginLeft: 50,

    width: window.width - 50,
    height: 300,
    resizeMode: 'contain',
    marginTop: window.height / 2 - 200,
  },
  loading: {
    position: 'absolute',
    left: window.width / 2 - 30,

    top: window.height / 2,

    opacity: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 10,
    backgroundColor: '#FFC613',
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 20,
  },
  backImage: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  touch: {
    padding: 10,
  },
  filter_image: {
    height: 23,
    width: 22,
    resizeMode: 'contain',
  },
  filter_touch: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
});

const calStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    height: height,
    flexDirection: 'column-reverse',
  },
  container_2: {
    width: window.width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  view_1: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  touch_active: {
    flex: 0.47,
    padding: 5,
    backgroundColor: '#F97012',
    justifyContent: 'flex-start',
  },
  touch: {
    flex: 0.47,
    padding: 5,
    justifyContent: 'flex-start',
  },
  text_1: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'white',
  },
  text_2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  view_2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  touch_cancel: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  touch_search: {
    backgroundColor: '#F97012',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  text_cancel: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  text_search: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'white',
  },
});
