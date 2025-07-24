import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  NativeModules,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import DatePickers from 'react-native-date-picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {TextField} from 'react-native-material-textfield-plus';
import {SubmitButton} from '../utils/Button';
const {width, height} = Dimensions.get('window');
import {CreatBroadcastApi, GetProfileApi} from '../service/Api';
import {useStore} from 'react-redux';
const GLOBAL = require('./Global');
var Sound = require('react-native-sound');
import {SOCKET_URL} from '../service/Config';
import {Stopwatch} from 'react-native-stopwatch-timer';
import CountDown from 'react-native-countdown-component';
import RBSheet from 'react-native-raw-bottom-sheet';
import {EndBrodcastApi} from '../service/Api';
import User from './User.js';
import io from 'socket.io-client';
const {Agora} = NativeModules;
const {FPS30, AudioProfileDefault, AudioScenarioDefault, Host, Adaptative} =
  Agora;

const BrodcastList = ({navigation, route}) => {
  const store = useStore();
  const {user} = store.getState();
  const [date, setDate] = useState('');
  const [detail, setDetail] = useState('');
  const [dateq, setDateq] = useState('');
  const [value, setLanguage] = useState('');
  const [array, setArray] = useState([]);
  const [selectedId, setSelectedId] = useState(true);
  const [show, setShow] = useState(false);
  const [startTime, setstartTime] = useState('');
  const [visible, setvisible] = useState(false);
  const [endTime, setendTime] = useState('');
  const [showq, setShowq] = useState(false);
  const [state, setState] = useState({
    astrologer_id: store.getState().user.user_id,
    title: '',
    description: '',
    special_discount: '',
  });
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setstartTime(moment(selectedDate).format('HH:mm'));
  };

  const astrologer = () => {
    const url = 'http://astrourjaa.com:5050/api/fetch_astrologer_broadcasts'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          setArray(responseJson.data); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onChangeq = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowq(false);
    setendTime(moment(selectedDate).format('HH:mm'));
  };

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
  useEffect(() => {
    console.log(selectedId ? 'tt' : 'ff');
    setSelectedId(!selectedId);
  }, [array]);
  useEffect(() => {
    const unsubscribew = navigation.addListener('focus', () => {
      astrologer();
    });
    GetProfileApi({user_id: store.getState().user.user_id})
      .then(data => {
        // setLoading(false)
        console.log(JSON.stringify(data));
        if (data.status) {
          //setData(data.data)
          setDetail(data.user_details);

          //alert(JSON.stringify(data))
        } else {
        }
      })
      .catch(error => {
        console.log('error', error);
      });
    const url = 'http://astrourjaa.com:5050/api/fetch_astrologer_broadcasts'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          setArray(responseJson.data); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const check = item => {
    GLOBAL.bookingid = item.bridge_id;
    //  alert(item.bridge_id)

    const url = 'http://astrourjaa.com:5050/api/start_broadcast_astro'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
        broadcast_id: item.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))

        if (responseJson.status == true) {
          navigation.navigate('Brodcastlive', {
            uid: Math.floor(Math.random() * 100),
            clientRole: Host,
            channelName: item.bridge_id,
            onCancel: message => {},
            user,
          });
          // navigation.navigate('Ant',{
          //   item:item,
          //   detail:detail
          // }) // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const pujaopen = (item, index) => {
    const url = 'http://astrourjaa.com:5050/api/delete_broadcast'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
        broadcast_id: item.id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          navigation.goBack(); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const brodcastHandler = async () => {
    navigation.navigate('Brodcast');
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('Event List', () => navigation.goBack())}
      <KeyboardAwareScrollView>
        <FlatList
          data={array}
          extraData={selectedId}
          renderItem={({item, index}) => (
            <ImageBackground
              imageStyle={{borderRadius: 12}}
              style={{
                width: width - 20,
                alignSelf: 'center',
                height: 290,
                marginTop: 12,
              }}
              source={require('../assets/bg-star.png')}>
              <Text
                numberOfLines={2}
                style={{
                  color: '#FFC613',
                  fontSize: 26,
                  fontFamily: 'Avenir-Heavy',
                  margin: 8,
                  width: width - 25,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Avenir-Roman',
                  marginLeft: 8,
                  width: width - 25,
                  marginTop: 4,
                }}>
                Description: {item.description}
              </Text>
              <Text
                style={{
                  color: '#FFC613',
                  fontSize: 15,
                  fontFamily: 'Avenir-Roman',
                  marginLeft: 8,
                  width: width - 25,
                  marginTop: 4,
                }}>
                Event Language: {item.language}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Avenir-Roman',
                  marginLeft: 8,
                  width: width - 25,
                  marginTop: 4,
                }}>
                {moment(item.start_time).format('HH:mm')} -{' '}
                {moment(item.end_time).format('HH:mm')} (IST)
              </Text>
              <Text
                style={{
                  color: '#FFC613',
                  fontSize: 15,
                  fontFamily: 'Avenir-Roman',
                  marginLeft: 8,
                  width: width - 25,
                  marginTop: 4,
                }}>
                {moment(item.start_time).format('DD MMM YYYY')}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontFamily: 'Avenir-Roman',
                  marginLeft: 8,
                  width: width - 25,
                  marginTop: 4,
                }}>
                Entry Fee: Rs {item.price}
              </Text>
              {item.is_approved == '0' && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Avenir-Roman',
                    marginLeft: 8,
                    width: width - 25,
                    marginTop: 4,
                  }}>
                  Status: Pending for Approval
                </Text>
              )}
              {item.is_approved == '1' && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontFamily: 'Avenir-Roman',
                    marginLeft: 8,
                    width: width - 25,
                    marginTop: 4,
                  }}>
                  Status: Approved
                </Text>
              )}

              {item.can_start == '1' && (
                <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => check(item)}>
                    <View
                      style={{
                        backgroundColor: 'red',
                        width: 100,
                        height: 40,
                        borderRadius: 12,
                        marginRight: 20,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontFamily: 'Avenir-Roman',
                          marginTop: 8,
                          textAlign: 'center',
                        }}>
                        Start
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {item.can_start == '0' && (
                <View style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
                  {item.is_gift_added == '0' && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Gift', {
                          item: item.id,
                        })
                      }>
                      <View
                        style={{
                          backgroundColor: 'red',
                          width: 100,
                          height: 40,
                          borderRadius: 12,
                          marginRight: 20,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 15,
                            fontFamily: 'Avenir-Roman',
                            marginTop: 8,
                            textAlign: 'center',
                          }}>
                          Edit Gift
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={() => pujaopen(item, index)}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: 'center',
                        marginBottom: 7,
                        resizeMode: 'contain',
                        marginTop: 12,
                        marginRight: 12,
                      }}
                      source={require('../assets/bin.png')}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </ImageBackground>
          )}
        />

        {SubmitButton('Create', brodcastHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default BrodcastList;

const styles = StyleSheet.create({
  phoneView: {
    width: width - 30,
    alignSelf: 'center',
  },
});
