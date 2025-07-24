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
  BackHandler,
} from 'react-native';
import {create} from 'apisauce';
import {globStyle} from '../styles/style';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const window = Dimensions.get('window');
import {EventRegister} from 'react-native-event-listeners';
import Backend from './Backend.js';
import {SocketContext} from '../redux/context';
import CountDown from 'react-native-countdown-component';
import {GiftedChat, Send, Time, InputToolbar} from 'react-native-gifted-chat';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Bubble from 'react-native-gifted-chat/lib/Bubble';
import {SimpleHeader} from '../utils/Header.js';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar.js';
import TimerCounter from './TimerCounter.js';
var randomString = require('random-string');
const GLOBAL = require('./Global');
const socket = io('https://jyotishcall.in:5030', {
  transports: ['websocket'],
});
import io from 'socket.io-client';
import Global from './Global';
import store from '../redux/store.js';
import LinearGradient from 'react-native-linear-gradient';
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
export default class MyChat extends Component {
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
          this.timerId = null;
          this.props.navigation.goBack();
        }

        // console.log(JSON.stringify(json.result.docs));
      })
      .catch(error => {
        clearInterval(this.timerId);
        this.timerId = null;
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
    this.timerId = null;
  }
  endcall = () => {
    const socket = io('https://jyotishcall.in:5030', {
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
    clearInterval(this.timerId);
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

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  backAction = () => {
    return true;
  };

  componentWillMount() {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.backAction,
    // );
    this.props.navigation.addListener('focus', () => {
      // The screen is focused
      this.booking();
      this.timerId = setInterval(() => this.booking(), 10000);
      // Call any action
    });

    this.props.navigation.addListener('blur', () => {
      clearInterval(this.timerId);
      this.timerId = null;
      // Call any action
    });
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
    //  alert(props.currentMessage.text);
    var a = false;
    if (props.currentMessage.messageseenuser == '1') {
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
              fontFamily: 'Poppins-Medium',
              color: 'black',
              fontSize:12
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: 'white',
              color: '#333333',
            },
            right: {
              backgroundColor:
                props.currentMessage.text ==
                'This is an automated message to confirm that chat has started.'
                  ? '#E4FCE5'
                  : '#E4FCE5',
              color:
                props.currentMessage.text ==
                'This is an automated message to confirm that chat has started.'
                  ? 'white'
                  : 'white',
            },
          }}
        />
        {props.currentMessage.messageseenuser == '1' && (
          <Image
            style={{
              width: 12,
              height: 12,
              alignSelf: 'flex-end',
              resizeMode: 'contain',
            }}
            source={require('../assets/seen.png')}
          />
        )}
      </View>
    );
  };

  showActionSheet = () => {
    const options = {
      title: 'Take Profile Picture',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {type, fileName, fileSize, uri} = response.assets[0];
        const source = {uri: response.uri};

        const api = create({
          baseURL: 'https://jyotishcall.in/admin/api',
        });

        const data = new FormData();

        // you can append anyone.
        data.append('image', {
          uri: uri,
          type: 'image/jpeg', // or photo.type
          name: 'image.png',
        });

        api
          .post('/chat_image_upload', data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(responseJson => {
            if (responseJson.data != null) {
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
                image: responseJson.data.path,

                // etc.
              };
              array.push(dict);
              //Backend.load()

              Backend.sendMessage(array);
            } else {
              const formData = new FormData();
              formData.append('image', {
                uri: uri,
                type: 'image/jpeg', // or photo.type
                name: 'image.png',
              });

              api
                .post('/chat_image_upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then(responseJson => {
                  // alert(JSON.stringify(responseJson.data));

                  if (responseJson.data != null) {
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
                      image: responseJson.data.path,

                      // etc.
                    };
                    array.push(dict);
                    //Backend.load()

                    Backend.sendMessage(array);
                  } else {
                  }
                  // Handle the response
                  console.log(response.data);
                })
                .catch(error => {
                  // Handle errors
                  console.error(error);
                });
            }
            // Handle the response
            console.log(response.data);
          })
          .catch(error => {
            // Handle errors
            console.error(error);
          });
        return;

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
            Backend.sendMessage(array);
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
          source={require('../assets/dslr-camera.png')}
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
            color: 'white',
          },
          right: {
            color: 'white',
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
      <SafeAreaProvider style={globStyle.safeAreaView}>
        <StatusBarDark />
        <ImageBackground
          source={require('../assets/chat-bg.png')}
          style={{
            flex: 1,
            backgroundColor: '#fcfcfe',
            width: window.width,
            marginBottom: 8,
          }}>
                   <LinearGradient colors={['#D6551C', '#F9C356']} style={[headerStyle.container,{height:70}]}>
            <TouchableOpacity
              style={headerStyle.touch}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/backwhite.png')}
                style={[headerStyle.backImage, {marginTop: 4}]}
              />
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', width: window.width - 190}}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 16,
                      width: 100,
                      marginTop: 5,
                    }}>
                    {this.props.route.params.user_member.name}
                  </Text>
                  {/* <Text
                  numberOfLines={1}
                  style={{
                    color: 'black',
                    fontFamily: 'AvenirLTStd-Roman',
                    fontSize: 9,
                    width: 100,
                    height: 30,

                  }}>
                  {this.state.texts}
                </Text> */}
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'End Chat',
                    'Are you sure you wish to end the chat?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.endcall()},
                    ],
                  );
                }}>
                <View
                  style={{
                    borderColor: 'red',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 12,
                    width: 90,
                    height: 30,
                    marginTop: 0,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Bold',
                      color: 'red',
                      marginTop: 7,
                      textAlign: 'center',
                    }}>
                    END CHAT
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View
            style={{
              width: '100%',
              backgroundColor: '#FFFBE5',
              height: 45,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#333333',
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 8,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                }}>
                Chat Time Left :
              </Text>
              <View style={{marginLeft: 10, marginTop: 10}}>
                <CountDown
                  until={parseInt(remaining_time)}
                  onFinish={() => this.props.navigation.goBack()}
                  digitStyle={{backgroundColor: '#FFFBE5'}}
                  digitTxtStyle={{color: 'red'}}
                  size={11}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{h: '', m: '', s: ''}}
                  timeLabelStyle={{fontSize: 13, color: 'red'}}
                />
              </View>
            </View>

            <Text
              style={{
                color: '#333333',
                fontFamily: 'Poppins-Medium',
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
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Langugae', 'Please choose Langugae', [
                {
                  text: 'English',
                  onPress: () => {
                    Global.lan = 'en';
                    this.props.navigation.navigate(
                      'Kundali',
                      this.props.route.params.user_member,
                    );
                  },
                  style: 'cancel',
                },
                {
                  text: 'Hindi',
                  onPress: () => {
                    Global.lan = 'hi';
                    this.props.navigation.navigate(
                      'Kundali',
                      this.props.route.params.user_member,
                    );
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
                marginTop: 3,
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Bold',
                  color: 'white',
                  marginTop: 7,
                  textAlign: 'center',
                }}>
                Kundali
              </Text>
            </View>
          </TouchableOpacity>

    
          <GiftedChat
            alwaysShowSend
  
            extraData={this.state}
            showUserAvatar={false}
            messages={this.state.messages}
            renderChatFooter={this.renderChatFooter}
            renderSend={this.renderSend}
            renderInputToolbar={this.renderInputToolbar}
            onSend={message => {
              Backend.sendMessage(message);
            }}
            renderBubble={this.renderBubble}
            renderTime={this.renderTime}
            renderAvatar={null}
            onInputTextChanged={text => {
            //  Backend.updateTyping(text);

              // alert(text)
            }}
            user={{
              _id: GLOBAL.user_id,
              name: store.getState().user.name,
            }}
          />
     
        </ImageBackground>
      </SafeAreaProvider>
    );
  }

  // componentDidMount() {
  //   //  alert(JSON.stringify(GLOBAL.data))
  //   console.log(JSON.stringify(this.props.route.params, null, 2));

  //   // console.log(JSON.stringify(this.props.route.params.user_member, null, 2));
  //   //  GLOBAL.mystatus = "Online";

  //   // Backend.updateMessage(message => {
  //   //     alert(JSON.stringify(message))
  //   //
  //   //
  //   // })

  //   Backend.loadMessages(message => {
  //     //  alert(JSON.stringify(message))

  //     if (message.text == '') {
  //       for (var i = 0; i < this.state.messages.length; i++) {
  //         //  if (this.state.messages[i].anotherid == GLOBAL.user_id) {

  //         if (this.state.messages[i].status == false) {
  //           let {messages} = this.state;
  //           let targetPost = messages[i];

  //           // Flip the 'liked' property of the targetPost
  //           targetPost.status = true;

  //           // Then update targetPost in 'posts'
  //           // You probably don't need the following line.
  //           // posts[index] = targetPost;

  //           // Then reset the 'state.posts' property
  //           this.setState({messages});
  //         }
  //         //  }
  //         // alert(JSON.stringify(this.state.messages))
  //       }

  //       this.setState({messages: this.state.messages});

  //       return {
  //         messages: this.state.messages,
  //       };
  //       //  var a = this.state.messages[i]
  //       //
  //       //
  //       //  a.status = true
  //       //
  //       // // this.setState({messages:a})
  //       //  this.setState({messages:})
  //       //   }
  //     } else {
  //       this.setState(previousState => {
  //         return {
  //           messages: GiftedChat.append(previousState.messages, message),
  //         };
  //       });
  //     }
  //   });

  //   // Backend.updateMessage(message => {
  //   //     alert(JSON.stringify(message))
  //   //
  //   //
  //   // })

  //   Backend.loadMessagess(message => {
  //     // alert(JSON.stringify(message.typinganother))
  //     if (message.typinganother == true) {
  //       var s = message.name + ' is typing ...';
  //       this.setState({texts: s});
  //     } else {
  //       this.setState({texts: ''});
  //     }
  //   });
  // }

  componentDidMount() {
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
    // alert(JSON.stringify(GLOBAL.data.user_member));
    // setTimeout(() => {
    //   if (this.state.messages.length == 0) {
    //     let dd = `Hi\nBelow are my details:\nName:${GLOBAL.data.user_member.name}\nDOB:${GLOBAL.data.user_member.date_of_birth}\nTOB:${GLOBAL.data.user_member.time_of_birth}\nPOB:${GLOBAL.data.user_member.place_of_birth}\nGender:${GLOBAL.data.user_member.gender}`;
    //     var x = randomString({
    //       length: 20,
    //       numeric: true,
    //       letters: true,
    //       special: false,
    //       exclude: ['a', 'b'],
    //     });
    //     var array = [];
    //     var users = {
    //       _id: GLOBAL.user_id,
    //       name: '',
    //     };
    //     var today = new Date();
    //     /* today.setDate(today.getDate() - 30);
    //              var timestamp = new Date(today).toISOString(); */
    //     var timestamp = today.toISOString();
    //     var dict = {
    //       text: dd,
    //       user: users,
    //       createdAt: timestamp,
    //       _id: x,
    //       // etc.
    //     };
    //     array.push(dict);
    //     //Backend.load()
    //     Backend.sendMessage(array);

    //     // Recently({user_id: store.getState().user.id})
    //     //   .then(data => {
    //     //     if (data.status) {
    //     //       var data = data.data;
    //     //       var dd = `Hi\nBelow are my details:\nName:${data.name}\nDOB:${data.dob}\nTOB:${data.tob}\nPOB:${data.pob}\nGender:${data.gender}`;
    //     //       var x = randomString({
    //     //         length: 20,
    //     //         numeric: true,
    //     //         letters: true,
    //     //         special: false,
    //     //         exclude: ['a', 'b'],
    //     //       });
    //     //       var array = [];
    //     //       var users = {
    //     //         _id: store.getState().user.id,
    //     //         name: '',
    //     //       };
    //     //       var today = new Date();
    //     //       /* today.setDate(today.getDate() - 30);
    //     //          var timestamp = new Date(today).toISOString(); */
    //     //       var timestamp = today.toISOString();
    //     //       var dict = {
    //     //         text: dd,
    //     //         user: users,
    //     //         createdAt: timestamp,
    //     //         _id: x,
    //     //         // etc.
    //     //       };
    //     //       array.push(dict);
    //     //       //Backend.load()
    //     //       Backend.sendMessage(array);
    //     //       //this.props.navigation.replace('Rating')
    //     //     } else {
    //     //     }
    //     //   })
    //     //   .catch(error => {
    //     //     console.log('error', error);
    //     //   });
    //   }
    // }, 40);

    // Backend.updateMessage(message => {
    //     alert(JSON.stringify(message))
    //
    //
    // })

    // Backend.loadMessagess(message => {
    //   // alert(JSON.stringify(message.typinganother))
    //   if (message.typinganother == true) {
    //     var s = this.props.route.params.user_member.name + ' is typing ...';
    //     this.setState({texts: s});
    //   } else {
    //     this.setState({texts: ''});
    //   }
    // });
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
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 20,
  },
  backImage: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
    marginTop: 15,
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
