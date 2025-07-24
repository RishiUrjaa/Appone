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
  Alert,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Stars from 'react-native-stars';
import {SimpleHeader} from '../utils/Header';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import io from 'socket.io-client';
import moment from 'moment';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
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
    backgroundColor: '#DD2476',
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
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
  rev_view: {
    flex: 0.7,
    justifyContent: 'center',
  },
  rev_view_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rev_view_level: {
    fontFamily: 'AvenirLTStd-Medium',
    fontWeight: '400',
    fontSize: 12,
    color: '#6F6F7B',
    marginHorizontal: 5,
  },
  rev_view_point: {
    fontFamily: 'AvenirLTStd-Medium',
    fontWeight: '400',
    fontSize: 13,
    color: '#6F6F7B',
    marginHorizontal: 5,
  },
  rev_view_image: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
  },
  rev_view_prog: {
    marginHorizontal: 5,
  },
  rev2: {
    flexDirection: 'row',
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

export default class Review extends Component {
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
    id: '',
    results: [],
    speciality: [],
    loggedIn: false,
    show: false,
    array: ['All', 'Date', 'A to Z', 'Z to A'],
    visible: false,
    description: '',
    text: '',
    value: '',
    userDetail: {},
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

  review = (level, progress, color, point) => {
    let progress1 =
      progress == 0 ? 0 : (+progress * 100) / +this.state.speciality.length;
    return (
      <View style={styles.rev_view_1}>
        <Text style={styles.rev_view_level}>{level}</Text>
        <Image
          source={require('../assets/gray-star.png')}
          style={styles.rev_view_image}
        />
        <ProgressBar
          progress={progress1 == 0 ? 0 : progress1 / 100}
          width={window.width / 2.5}
          color={color}
          style={styles.rev_view_prog}
        />
        <Text style={styles.rev_view_point}>{point}</Text>
      </View>
    );
  };

  apicall = () => {
    const url = 'http://astrourjaa.com:5050/api/' + 'get_astrologer_review';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: GLOBAL.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.scroll.props.scrollToPosition(0, 0)
        // alert(JSON.stringify(responseJson.data.length));

        if (responseJson.status == true) {
          //setState({...state, list, isLoading: false});

          this.setState({speciality: responseJson.data});
          this.setState({
            userDetail: responseJson.data[0].total_reviews_by_rate,
          });

          //total_reviews_by_rate
          //   this.setState({time:responseJson.slot})
          //this.scroll.scrollToEnd()
        } else {
          this.setState({time: []});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  requestHandler1 = () => {
    this.setState({visible: false});
    const url = 'http://astrourjaa.com:5050/api/' + 'reply_on_review';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        message: this.state.value,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //this.scroll.props.scrollToPosition(0, 0)
        console.log(JSON.stringify(responseJson));

        if (responseJson.status == true) {
          //setState({...state, list, isLoading: false});

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

  requestHandler = (what, item) => {
    this.setState({id: item.id});

    this.setState({visible: true});
  };
  //     const url = 'http://139.59.25.187/admin/api/' +  'accept_reject_request'
  //
  //                   fetch(url, {
  //                       method: 'POST',
  //                       headers: {
  //                           'Content-Type': 'application/json',
  //                       },
  //                       body: JSON.stringify({
  //                           id:item.id,
  //                           what:what
  //
  //
  //
  //                       }),
  //                   }).then((response) => response.json())
  //                       .then((responseJson) => {
  //
  // //this.scroll.props.scrollToPosition(0, 0)
  // console.log(JSON.stringify(responseJson))
  //
  //                           if (responseJson.status == true) {
  // //setState({...state, list, isLoading: false});
  //
  // const socket = io('http://astrourjaa.com:5050', {
  //   transports: ['websocket']
  // })
  // socket.emit('accept_reject_booking',{
  //
  //                         astrologer_id:GLOBAL.user_id,
  //                         user_id:item.user_id,
  //                         id:item.id,
  //                         what:what
  //      })
  //      if (what == "1"){
  //        alert('Wait fo Accept User')
  //      }
  //
  //      this.props.navigation.goBack()
  //                           //   this.setState({time:responseJson.slot})
  // //this.scroll.scrollToEnd()
  //                           }else {
  //                               this.setState({time:[]})
  //                           }
  //                       })
  //                       .catch((error) => {
  //                           console.error(error);
  //                       });
  //    }

  desc = item => {
    this.setState({visible: !this.state.visible});
    this.setState({description: item.prescription_description});
  };
  renderRowItem2 = itemData => {
    return (
      <View>
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', width: '50%'}}>
              <Image
                source={{uri: itemData.item.user.imageUrl}}
                style={{width: 60, height: 60, margin: 10, borderRadius: 30}}
              />
              <View style={{marginTop: 2}}>
                <Text
                  style={{
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 16,
                    marginLeft: 6,
                    marginTop: 8,
                    color: '#1E1F20',
                  }}>
                  {itemData.item.user.name}
                </Text>
                <View
                  style={{alignSelf: 'flex-start', margin: 10, marginLeft: 6}}>
                  <Stars
                    default={parseFloat(
                      itemData.item.rate ? itemData.item.rate : '0',
                    ).toFixed(1)}
                    count={5}
                    half={true}
                    starSize={12}
                    disabled
                    halfStar={require('../assets/star.png')}
                    fullStar={require('../assets/star.png')}
                    emptyStar={require('../assets/gray-star.png')}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: 'AvenirLTStd-Roman',
                    fontSize: 14,
                    marginLeft: 6,
                    marginTop: -5,
                    color: '##1E1F20',
                    lineHeight: 20,
                    width: window.width - 120,
                  }}>
                  {itemData.item.message}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 13,
                marginRight: 6,
                marginTop: 8,
                color: '#A6A7A9',
              }}>
              {moment(itemData.item.created_at).format('DD/MM/YYYY')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}></View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaProvider style={globStyle.safeAreaView}>
        <StatusBarDark />

        {SimpleHeader('Feedback', () => this.props.navigation.goBack())}
        <ScrollView>
          <Dialog
            visible={this.state.visible}
            onTouchOutside={() => {
              this.setState({visible: false});
            }}>
            <DialogContent>
              <View
                style={{
                  width: window.width - 100,
                  alignself: 'center',
                  height: 200,
                }}>
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
                  Enter Review{' '}
                </Text>
                <TextInput
                  style={{
                    paddingRight: 10,
                    lineHeight: 23,
                    flex: 2,
                    textAlignVertical: 'top',
                    borderWidth: 1,
                  }}
                  value={this.state.value}
                  onChangeText={text => this.setState({value: text})}
                  multiline={true}
                  numberOfLines={4}
                />

                <TouchableOpacity
                  style={styles.bv_touch_accept}
                  onPress={() => this.requestHandler1()}>
                  <Text style={{color: 'white', textAlign: 'center'}}>
                    SEND
                  </Text>
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Heavy',
              fontSize: 16,
              marginLeft: 6,
              color: '#1E1F20',
              lineHeight: 20,
              width: window.width - 120,
              margin: 10,
            }}>
            Feedback ({this.state.speciality.length})
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
              height: 150,
              margin: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 1,
            }}>
            <Text
              style={{
                fontSize: 17,
                color: '#242A37',
                margin: 10,

                fontFamily: 'AvenirLTStd-Heavy',
              }}>
              User Feedbacks
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                {this.review(
                  5,
                  this.state.userDetail.five || 0,
                  '#E98120',
                  this.state.userDetail.five || 0,
                )}
                {this.review(
                  4,
                  this.state.userDetail.four || 0,
                  '#E98120',
                  this.state.userDetail.four || 0,
                )}
                {this.review(
                  3,
                  this.state.userDetail.three || 0,
                  '#F27447',
                  this.state.userDetail.three || 0,
                )}
                {this.review(
                  2,
                  this.state.userDetail.two || 0,
                  '#FF585D',
                  this.state.userDetail.two || 0,
                )}
                {this.review(
                  1,
                  this.state.userDetail.one || 0,
                  '#FF585D',
                  this.state.userDetail.one || 0,
                )}
              </View>
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    marginLeft: 40,
                  }}
                  source={require('../assets/star.png')}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white',

                    marginTop: -29,
                    width: 130,
                    textAlign: 'center',

                    fontFamily: 'AvenirLTStd-Heavy',
                  }}></Text>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#242A37',
                    marginTop: 12,
                    textAlign: 'center',
                    width: 130,

                    fontFamily: 'AvenirLTStd-Roman',
                  }}>
                  Based on
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#07A64B',

                    marginTop: 1,
                    width: 130,
                    textAlign: 'center',

                    fontFamily: 'AvenirLTStd-Roman',
                  }}>
                  {this.state.speciality.length} Reviews
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            style={{
              marginTop: 6,
              marginLeft: 5,
              width: window.width - 10,
              marginBottom: 100,
            }}
            data={this.state.speciality}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderRowItem2}
            extraData={this.state}
          />
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}
