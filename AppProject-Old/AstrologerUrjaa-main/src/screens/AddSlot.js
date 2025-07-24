import React, {useEffect, useState} from 'react';
import style from './Styleww';
import {
  Button,
  DeviceEventEmitter,
  Image,
  FlatList,
  Platform,
  Pressable,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
const window = Dimensions.get('window');
const options = {
  title: 'Select Image',
  maxWidth: 300,
  maxHeight: 500,

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-picker';
import {
  MobileLogin,
  UserRegister,
  VerifyLogin,
  FetchAstrologerFilter,
} from '../backend/Api';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import stringsoflanguages from './Language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../utils/Loader';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import randomString from 'random-string';
import GLOBAL from './Global';
import Backend from './Backend';
import store from '../redux/store';
import {useSelector} from 'react-redux';
const AddSlot = ({navigation, route}) => {
  const {user} = useSelector(store => store);
  const [gender, setGender] = React.useState(0);
  const [selectedid, setSelectedId] = useState(false);

  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});

  const [experience, setExperience] = React.useState('');
  const [hour, setHour] = React.useState('');
  const [hear, setHear] = React.useState('');
  const [preferable, setPeferable] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [live, setLive] = React.useState('');
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [slot, setSlot] = useState([]);

  const [business, setBusiness] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [learn, setLearn] = React.useState('');
  const [insta, setInsta] = React.useState('');
  const [website, setWebsite] = React.useState('');

  var radio_props = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  const onPressLogin = async () => {
    if (preferable == '') {
      alert('Please select start Date');
      return;
    }
    if (time == '') {
      alert('Please select end  Time');
      return;
    }

    let fin = [];
    for (let i = 0; i < slot.length; i++) {
      if (slot[i].is_selected != '') {
        let dictdd = {
          start: slot[i].start_time,
          end: slot[i].end_time,
        };
        fin.push(dictdd);
      }
    }
    const {user_id} = user;
    let dict = {
      start_date: moment(preferable).format('YYYY-MM-DD'),
      end_date: moment(time).format('YYYY-MM-DD'),
      timslots: fin,
      astrologer_id: user_id,
    };

    console.log(JSON.stringify(dict));
    // let getid = route.params.history.length == 0 ? '0' : '1';
    // let array = route.params.history;
    // array.push(dict);

    // return;

    // console.log(JSON.stringify(d));

    // let getid = route.params.data.id ? route.params.data.id : '0';

    // var d3 = {
    //   timslots: array,
    //   astrologer_id: user_id,
    //   id: route.params.data.id ? route.params.data.id : '0',
    // };

    // if (getid != '0') {
    //   toggleLoading(true);
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(d3),
    //   };
    //   try {
    //     await fetch(
    //       'https://astrourjaa.com/dev/admin/api/editslots',
    //       requestOptions,
    //     ).then(response => {
    //       response.json().then(data => {
    //         toggleLoading(false);
    //         if (data.status == true) {
    //           navigation.goBack();
    //           //  setSlot(data.slot);
    //         } else {
    //           // setSlot([]);
    //         }
    //         // alert(JSON.stringify(data));
    //       });
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    // var d2 = {
    //   timslots: array,
    //   astrologer_id: user_id,
    //   date: route.params.date,
    // };

    console.log(JSON.stringify(dict));

    toggleLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dict),
    };

    try {
      await fetch(
        'https://www.devvaani.com/admin/devvaani_admin/api/addmultipleslots',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          toggleLoading(false);
          // alert(JSON.stringify(data));
          if (data.status == true) {
            navigation.goBack();
            //  setSlot(data.slot);
          } else {
            // setSlot([]);
          }
          // alert(JSON.stringify(data));
        });
      });
    } catch (error) {
      console.error(error);
    }

    //  alert(moment(preferable).format('HH:mma'));
    // alert(moment(time).format('HH:mma'));
  };

  useEffect(async () => {
    try {
      const response = await fetch(
        'https://www.devvaani.com/admin/devvaani_admin/api/masterslots',
      );
      const json = await response.json();
      //  alert(JSON.stringify(json));
      setSlot(json.slots);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <SafeAreaView style={style.container}>
        {state.loading && <Loader />}
        <KeyboardAwareScrollView>
          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Start Date
          </Text>
          <Pressable
            onPress={() => {
              setOpen2(true);
            }}>
            <View style={style.srow100}>
              <View style={style.signupmobile100}>
                <TextInput
                  style={style.input}
                  onChangeText={setPeferable}
                  value={
                    preferable == ''
                      ? ''
                      : moment(preferable).format('DD-MM-YYYY')
                  }
                  editable={false}
                  placeholderTextColor="#204768"
                />
              </View>
            </View>
          </Pressable>
          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            End Date
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{width: '90%', margin: '5%'}}
              onPress={() => {
                setType(false);
                setOpen1(true);
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFC613',
                  height: 45,
                  borderRadius: 12,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={[style.input, {width: '80%'}]}
                  value={time == '' ? '' : moment(time).format('DD-MM-YYYY')}
                  placeholderTextColor="#204768"
                  editable={false}
                />
                {/* <Image
                  source={require('../assets/calender.png')}
                  style={style.facebookimage}
                /> */}
              </View>
            </Pressable>
          </View>
          <FlatList
            data={slot}
            style={{marginLeft: 6}}
            numColumns={3}
            extraData={selectedid}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    // alert(index);
                    if (slot[index].is_selected == '') {
                      slot[index].is_selected = 'Y';
                    } else {
                      slot[index].is_selected = '';
                    }

                    setSelectedId(!selectedid);
                    // setSlot(slot);
                  }}>
                  <View
                    style={{
                      margin: 4,
                      backgroundColor:
                        item.is_selected != '' ? '#EBC757' : 'white',
                      paddingLeft: 10,
                      borderWidth: 1,
                      borderColor: '#FFC50B',
                      height: 40,

                      padding: 4,
                      width: window.width / 3.3,

                      borderRadius: 4,
                    }}>
                    <Text
                      style={{
                        color: '#204768',
                        marginTop: 10,
                        fontFamily: 'AvenirLTStd-Medium',
                        width: window.width / 3.3,

                        fontSize: 11,
                      }}>
                      {item.start_time} - {item.end_time}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
          <View style={style.button}>
            <Button onPress={onPressLogin} color="#FFC613" title={'CONTINUE'} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <DatePicker
        modal
        open={open}
        mode={'date'}
        maximumDate={new Date()}
        date={date == '' ? new Date() : date}
        onConfirm={date => {
          setOpen(false);
          type == false ? setDate(date) : setPDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        open={open1}
        mode={'date'}
        date={time == '' ? new Date() : time}
        onConfirm={date => {
          setOpen1(false);
          type == false ? setTime(date) : setPTime(date);
        }}
        onCancel={() => {
          setOpen1(false);
        }}
      />

      <DatePicker
        modal
        open={open2}
        mode={'date'}
        date={preferable == '' ? new Date() : preferable}
        onConfirm={date => {
          setOpen2(false);
          setPeferable(date);
        }}
        onCancel={() => {
          setOpen2(false);
        }}
      />
    </>
  );
};
export default AddSlot;
