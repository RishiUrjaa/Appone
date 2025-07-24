import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  NativeModules,
  Pressable,
} from 'react-native';
import style from './Style';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {TextField} from 'react-native-material-textfield-plus';
import {SubmitButton} from '../utils/Button';
const {width, height} = Dimensions.get('window');
import {CreatBroadcastApi, Price} from '../service/Api';
import {useStore} from 'react-redux';
import Global from './Global';

var array = [
  {
    per: '5%',
    is_selected: '',
    per2: '5',
  },
  {
    per: '10%',
    is_selected: '',
    per2: '10',
  },
  {
    per: '15%',
    is_selected: '',
    per2: '15',
  },
  {
    per: '20%',
    is_selected: '',
    per2: '20',
  },
  {
    per: '25%',
    is_selected: '',
    per2: '25',
  },

  {
    per: '30%',
    is_selected: '',
    per2: '30',
  },
  {
    per: '35%',
    is_selected: '',
    per2: '35',
  },
  {
    per: '40%',
    is_selected: '',
    per2: '40',
  },
  {
    per: '45%',
    is_selected: '',
    per2: '45',
  },
  {
    per: '50%',
    is_selected: '',
    per2: '50',
  },
];
const Dicount1 = ({navigation, route}) => {
  const store = useStore();
  const {user} = store.getState();
  const [date, setDate] = useState(new Date());
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateq, setDateq] = useState(new Date());
  const [value, setLanguage] = useState('');
  const [mobile, onChangeMobile] = React.useState('');
  const [mobile1, onChangeMobile1] = React.useState('');
  const [mobile2, onChangeMobile2] = React.useState('');
  const [pack, setpack] = useState([
    {
      per: '0%',
      is_selected: '',
      per2: '0',
    },
    {
      per: '5%',
      is_selected: '',
      per2: '5',
    },
    {
      per: '10%',
      is_selected: '',
      per2: '10',
    },
    {
      per: '15%',
      is_selected: '',
      per2: '15',
    },
    {
      per: '20%',
      is_selected: '',
      per2: '20',
    },
    {
      per: '25%',
      is_selected: '',
      per2: '25',
    },

    {
      per: '30%',
      is_selected: '',
      per2: '30',
    },
    {
      per: '35%',
      is_selected: '',
      per2: '35',
    },
    {
      per: '40%',
      is_selected: '',
      per2: '40',
    },
    {
      per: '45%',
      is_selected: '',
      per2: '45',
    },
    {
      per: '50%',
      is_selected: '',
      per2: '50',
    },
  ]);
  const [array, setArray] = useState({});
  const [selectedId, setSelectedId] = useState(true);
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState(false);
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
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
  const onChangeq = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowq(false);
    setendTime(moment(selectedDate).format('HH:mm'));
  };
  useEffect(() => {
    console.log(selectedId ? 'tt' : 'ff');
    setSelectedId(!selectedId);
  }, [array]);

  const getPrice = () => {
    const url = 'http://astrourjaa.com:5050/api/get_astrologer_prices'; //  this.showLoading()
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
        //  alert(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          // alert(responseJson.data.price_per_mint_chat);
          onChangeMobile(responseJson.data.price_per_mint_chat.toString());
          onChangeMobile1(responseJson.data.price_per_mint_video.toString());
          onChangeMobile2(responseJson.data.price_per_mint_audio.toString());
          setArray(responseJson.data); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    getPrice();
  }, []);

  const setValid = () => {
    setAudio(false);
    setVideo(false);
    setChat(false);
  };

  const pujaopen = () => {
    var d = {
      id: store.getState().user.user_id,
      price_per_mint_chat: mobile,
      price_per_mint_video: mobile1,
      price_per_mint_audio: mobile2,
    };
    //alert(JSON.stringify(d));
    console.log(JSON.stringify(d));

    const url =
      'https://www.devvaani.com/admin/admin/api/update_astrologer_price'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(d),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == true) {
          getPrice();
          alert('Price Request send to Admin ');

          // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });

    // const {status = false, data = {}} = await Price(d);
    //
    // if (status) {
    //   alert('Discount set successfully')
    //
    // } else {
    //   alert('api fail');
    // }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('Set Price ', () => navigation.goBack())}
      <KeyboardAwareScrollView>
        <Text
          style={{color: 'grey', fontSize: 15, marginLeft: 20, marginTop: 10}}>
          Discount Set : {array.discount} %
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              // setChat(!chat);
              // setAudio(true);
              // setVideo(true);
            }}>
            <View
              style={{
                width: 80,
                height: 70,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: chat == true ? 'green' : 'white',
              }}>
              {array.discount == 0 && (
                <Text
                  style={{
                    color: audio == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹ {array.price_per_mint_chat} /min
                </Text>
              )}

              {array.discount != 0 && (
                <Text
                  style={{
                    color: chat == true ? 'white' : 'red',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    textDecorationColor: 'red',
                  }}>
                  ₹ {array.price_per_mint_chat} /min
                </Text>
              )}
              {array.discount != 0 && (
                <Text
                  style={{
                    color: chat == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹{' '}
                  {parseFloat(array.price_per_mint_chat) -
                    (parseFloat(array.price_per_mint_chat) *
                      parseFloat(array.discount)) /
                      100}{' '}
                  /min
                </Text>
              )}

              {/* <Text
                style={{
                  color: chat == true ? 'white' : 'grey',
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                ₹ {array.price_per_mint_chat}/min
              </Text> */}
              <Text
                style={{
                  color: chat == true ? 'white' : 'grey',
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                Chat
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // setAudio(!audio);
              // setChat(true);
              // setVideo(true);
            }}>
            <View
              style={{
                width: 80,
                height: 70,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: audio == true ? 'green' : 'white',
              }}>
              {array.discount == 0 && (
                <Text
                  style={{
                    color: audio == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹ {array.price_per_mint_audio} /min
                </Text>
              )}

              {array.discount != 0 && (
                <Text
                  style={{
                    color: audio == true ? 'white' : 'red',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    textDecorationColor: 'red',
                  }}>
                  ₹ {array.price_per_mint_audio} /min
                </Text>
              )}
              {array.discount != 0 && (
                <Text
                  style={{
                    color: audio == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹{' '}
                  {parseFloat(array.price_per_mint_audio) -
                    (parseFloat(array.price_per_mint_audio) *
                      parseFloat(array.discount)) /
                      100}{' '}
                  /min
                </Text>
              )}
              <Text
                style={{
                  color: audio == true ? 'white' : 'grey',
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                Audio
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setVideo(!video);
              // setChat(true);
              // setAudio(true);
            }}>
            <View
              style={{
                width: 80,
                height: 70,
                borderRadius: 12,
                borderWidth: 1,
                backgroundColor: video == true ? 'green' : 'white',
              }}>
              {array.discount == 0 && (
                <Text
                  style={{
                    color: audio == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹ {array.price_per_mint_video} /min
                </Text>
              )}

              {array.discount != 0 && (
                <Text
                  style={{
                    color: video == true ? 'white' : 'red',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    textDecorationColor: 'red',
                  }}>
                  ₹ {array.price_per_mint_video} /min
                </Text>
              )}
              {array.discount != 0 && (
                <Text
                  style={{
                    color: video == true ? 'white' : 'grey',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 3,
                  }}>
                  ₹{' '}
                  {parseFloat(array.price_per_mint_video) -
                    (parseFloat(array.price_per_mint_video) *
                      parseFloat(array.discount)) /
                      100}{' '}
                  /min
                </Text>
              )}

              {/* <Text
                style={{
                  color: video == true ? 'white' : 'grey',
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                ₹ {array.price_per_mint_video}/min
              </Text> */}
              <Text
                style={{
                  color: video == true ? 'white' : 'grey',
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 5,
                }}>
                Video
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* {showq && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'time'}
            format="HH:mma"
            is24Hour={true}
            display="default"
            onChange={onChangeq}
          />
        )} */}

        {/* {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'time'}
            format="HH:mma"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )} */}

        <View style={{marginLeft: 22, marginTop: 42}}>
          <View style={[style.mobile, {width: '90%'}]}>
            <TextInput
              style={style.input}
              onChangeText={onChangeMobile}
              value={mobile}
              placeholderTextColor="#A6A7A9"
              placeholder={'Chat Price'}
              keyboardType={'numeric'}
              maxLength={3}
            />
          </View>

          <View style={[style.mobile, {width: '90%', marginTop: 10}]}>
            <TextInput
              style={style.input}
              onChangeText={onChangeMobile1}
              value={mobile1}
              placeholderTextColor="#A6A7A9"
              placeholder={'Video Price'}
              keyboardType={'numeric'}
              maxLength={3}
            />
          </View>

          <View style={[style.mobile, {width: '90%', marginTop: 10}]}>
            <TextInput
              style={style.input}
              onChangeText={onChangeMobile2}
              value={mobile2}
              placeholderTextColor="#A6A7A9"
              placeholder={'Audio Price'}
              keyboardType={'numeric'}
              maxLength={3}
            />
          </View>
        </View>

        {SubmitButton('Submit', pujaopen)}
      </KeyboardAwareScrollView>
      <DatePicker
        modal
        open={open2}
        mode={'date'}
        date={new Date()}
        minimumDate={moment()}
        onConfirm={date => {
          setOpen2(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
      <DatePicker
        modal
        open={open}
        mode={'date'}
        date={new Date()}
        minimumDate={moment()}
        onConfirm={date => {
          setOpen(false);
          setDateq(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </SafeAreaProvider>
  );
};

export default Dicount1;

const styles = StyleSheet.create({
  phoneView: {
    width: width / 2 - 30,
    alignSelf: 'center',
    margin: 8,
  },
});
