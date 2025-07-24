import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';

import io from 'socket.io-client';
const socket = io('http://astrourjaa.com:5050', {
  transports: ['websocket'],
});
var arrayholder = [];

const window = Dimensions.get('window');

const GLOBAL = require('./Global');
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
const styles = StyleSheet.create({
  wrapper: {},
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
    marginLeft: 30,
  },
  bv_t4: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#FFFFFF',
  },
  AndroidSafeArea: {
    flex: 0,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
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

export default class Pendingq extends Component {
  state = {
    text: '',
    passwordtext: '',
    selectedTab: 0,
    isSecure: true,
    username: '',
    password: '',
    status: '',
    ipAdd: '',
    loading: '',
    states: '',
    results: [],
    speciality: [],
    loggedIn: false,
    show: false,
    array: ['All', 'Date', 'A to Z', 'Z to A'],
    visible: false,
    description: '',
    text: '',
    countamount: '',
  };

  componentDidMount() {
    this.apicall();
  }

  SearchFilterFunction(text) {
    const newData = arrayholder.filter(function (item) {
      const itemData = item.doctor_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      speciality: newData,
      text: text,
      nodata: 'No found',
    });
  }
  _responseInfoCallback = (error, result) => {
    alert(JSON.stringify(result));
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.buttonClickListeners(result.name, result.email);
      // alert('Result Name: ' + result.name);
      // alert('Result Name: ' + result.email);
    }
  };
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      alert(JSON.stringify(userInfo));

      //  this.buttonClickListeners(userInfo.user.name,userInfo.user.email)
      this.setState({userInfo: userInfo, loggedIn: true});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        this.setState({loggedIn: false});
      } else {
        // some other error
        this.setState({loggedIn: false});
      }
    }
  };

  _handlePress = () => {
    this.props.navigation.navigate('Otp');
  };

  fieldRef = React.createRef();
  initUser(token) {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        alert(JSON.stringify(json));
        // Some user object has been set up somewhere, build that user here
        // alert(JSON.stringify(json))
      })
      .catch(() => {});
  }
  onSubmit = () => {
    let {current: field} = this.fieldRef;

    alert(field.value());

    console.log(field.value());
  };
  renderRowItem3 = itemData => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          color: 'white',
          flex: 1,
          margin: 10,
          width: window.width - 60,
          shadowColor: '#000',
        }}>
        <ImageBackground
          style={{height: 170, width: window.width - 60, marginRight: 20}}
          resizeMode="stretch"
          source={image}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: GLOBAL.heavy,
              color: 'white',
              margin: 10,
              marginTop: 20,
              paddingLeft: 8,
            }}>
            1100 Consulations Point
          </Text>

          <Text
            style={{
              fontSize: 32,
              fontFamily: GLOBAL.heavy,
              color: 'white',
              marginLeft: 10,
              marginTop: 12,
              paddingLeft: 8,
            }}>
            ₹ 1000 /-
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontFamily: GLOBAL.roman,
              color: 'white',
              marginLeft: 10,
              marginTop: 22,
              paddingLeft: 8,
            }}>
            (You will get 1100 consulations points)
          </Text>
        </ImageBackground>
      </View>
    );
  };

  renderRowItem1 = itemData => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          color: 'white',
          flex: 1,
          margin: 10,
          borderRadius: 9,
          width: 110,
          shadowColor: '#000',
        }}>
        <Text
          style={{
            fontFamily: GLOBAL.medium,
            fontSize: 20,
            marginLeft: 6,
            marginTop: 5,
          }}>
          Alexs
        </Text>

        <Text
          style={{
            fontFamily: GLOBAL.roman,
            fontSize: 16,
            marginLeft: 6,
            marginTop: 4,
            color: '#8E9198',
          }}>
          Cardiology
        </Text>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 6,
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', marginRight: 8, marginBottom: 12}}>
            <Text
              style={{
                fontFamily: GLOBAL.roman,
                fontSize: 16,
                marginLeft: 6,
                color: '#1E2432',
              }}>
              4.8
            </Text>
          </View>
        </View>
      </View>
    );
  };

  apicall = () => {
    const url = 'http://astrourjaa.com:5050/api/' + 'fetch_gift_bag';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: GLOBAL.user_id,
        broadcast_id: this.props.route.params.item.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.scroll.props.scrollToPosition(0, 0)
        console.log(JSON.stringify(responseJson));

        if (responseJson.status == true) {
          this.setState({countamount: responseJson.countamount.total});
          //setState({...state, list, isLoading: false});
          //alert(JSON.stringify(responseJson.data))
          this.setState({speciality: responseJson.data}); //   this.setState({time:responseJson.slot})
          //this.scroll.scrollToEnd()
        } else {
          this.setState({time: []});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  categorySelect = index => {
    this.setState({selectedTab: index});
    if (index == 0) {
      this.apicall('new');
    } else {
      this.apicall('completed');
    }
  };

  cat = itemData => {
    this.props.navigation.navigate('AppointmentCompleted', itemData.item);

    //  alert(JSON.stringify(itemData))

    // if (itemData.index == 0){
    //     GLOBAL.matchid = "live13"
    //     this.props.navigation.navigate('MyChat')
    // }else{
    //     this.props.navigation.navigate("VideoCall", {
    //         channelName: GLOBAL.bookingid,
    //         onCancel: (message) => {
    //             this.setState({
    //                 visible: true,
    //                 mesxsage
    //             });
    //         }
    //     })
    // }
  };

  start = item => {
    GLOBAL.mybookingid = item.id;
    GLOBAL.bookingid = item.t4_hours_chat_id;
    this.props.navigation.navigate('CompletedChat');
  };

  publish = () => {
    const url = GLOBAL.BASE_URL + 'tem_video_';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        condition: 'consult_online',
        user_id: '154',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.statusCode == '200') {
          GLOBAL.session = responseJson.session_id;
          GLOBAL.token = responseJson.token;
          //  this.setState({speciality:responseJson.lists})
          GLOBAL.matchid = 'live130';
          this.props.navigation.navigate('Publish');
        } else {
          alert('Unable to Get response. Please try again.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  select = itemd => {
    this.setState({show: false});
    var filter = '';
    if (itemd.item == 'All') {
      filter = 'all';
    }
    if (itemd.item == 'Date') {
      filter = 'date';
    }
    if (itemd.item == 'A to Z') {
      filter = 'a to z';
    }
    if (itemd.item == 'Z to A') {
      filter = 'z to a';
    }

    var m = JSON.stringify({
      doctor_id: GLOBAL.user_id,
      condition: 'all',
      type: filter,
      keyword: '',
    });

    const url = GLOBAL.BASE_URL + 'emr_record';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: GLOBAL.user_id,
        condition: 'all',
        type: filter,
        keyword: '',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == true) {
          this.setState({speciality: responseJson.prescription_list_s});
        } else {
          this.setState({speciality: []});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderRowItem2s = itemData => {
    return (
      <TouchableOpacity onPress={() => this.select(itemData)}>
        <View style={{height: 30}}>
          <Text
            style={{
              fontFamily: GLOBAL.heavy,
              fontSize: 12,
              marginLeft: 6,
              marginTop: 8,
              color: 'grey',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {itemData.item}
          </Text>

          <View style={{backgroundColor: 'grey', height: 1}}></View>
        </View>
      </TouchableOpacity>
    );
  };

  requestHandler = (what, item) => {
    const url = 'http://astrourjaa.com:5050/api/' + 'accept_reject_request';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        what: what,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.scroll.props.scrollToPosition(0, 0)
        console.log(JSON.stringify(responseJson));

        if (responseJson.status == true) {
          //setState({...state, list, isLoading: false});

          const socket = io('http://astrourjaa.com:5050', {
            transports: ['websocket'],
          });
          socket.emit('accept_reject_booking', {
            astrologer_id: GLOBAL.user_id,
            user_id: item.user_id,
            id: item.id,
            what: what,
          });
          if (what == '1') {
            alert('Wait fo Accept User');
          }

          this.props.navigation.goBack(); //   this.setState({time:responseJson.slot})
          //this.scroll.scrollToEnd()
        } else {
          this.setState({time: []});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  desc = item => {
    this.setState({visible: !this.state.visible});
    this.setState({description: item.prescription_description});
  };
  renderRowItem2 = itemData => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.cat(itemData)}>
          <View
            style={{
              backgroundColor: 'white',
              color: 'white',
              flex: 1,
              margin: 10,
              borderRadius: 9,
              width: window.width - 30,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontFamily: GLOBAL.heavy,
                  fontSize: 12,
                  marginLeft: 6,
                  marginTop: 8,
                  color: 'grey',
                  fontWeight: 'bold',
                }}>
                Id :{itemData.item.broadcast_id}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: itemData.item.user_image}}
                style={{width: 60, height: 60, margin: 10, borderRadius: 30}}
              />
              <View style={{marginTop: 12}}>
                <Text
                  style={{
                    fontFamily: GLOBAL.heavy,
                    fontSize: 16,
                    marginLeft: 6,
                    marginTop: 8,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  {itemData.item.user_name}
                </Text>
                <Text
                  style={{
                    fontFamily: GLOBAL.heavy,
                    fontSize: 16,
                    marginLeft: 6,
                    marginTop: 8,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Gift Name: {itemData.item.gift_name}
                </Text>
                <Text
                  style={{
                    fontFamily: GLOBAL.heavy,
                    fontSize: 16,
                    marginLeft: 6,
                    marginTop: 8,
                    color: 'black',
                    fontWeight: 'bold',
                  }}>
                  Price: {itemData.item.price}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}></View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.AndroidSafeArea}>
        <StatusBar backgroundColor="#639ced" barStyle="light-content" />

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
                Gift List
              </Text>
            </View>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={{
            color: 'black',
            fontFamily: 'Avenir-Heavy',
            fontSize: 16,
            height: 30,
            marginTop: 8,
            textAlign: 'center',
          }}>
          Total:{this.state.countamount}
        </Text>

        <FlatList
          style={{
            marginTop: 6,
            marginLeft: 5,
            width: window.width - 10,
            height: window.height - 90,
          }}
          data={this.state.speciality}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderRowItem2}
          extraData={this.state}
        />
      </SafeAreaView>
    );
  }
}
