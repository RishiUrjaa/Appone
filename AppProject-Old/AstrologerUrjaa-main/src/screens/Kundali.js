import React, {useEffect, useState} from 'react';
import style from './Style';
import {
  Button,
  DeviceEventEmitter,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {MobileLogin, UserRegister, VerifyLogin} from '../backend/Api';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {MatchMakingApi} from '../backend/Api';
import stringsoflanguages from './Language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../utils/Loader';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import GLOBAL from './Global';
import * as actions from '../redux/actions';
const window = Dimensions.get('window');

import {SimpleHeader} from '../utils/Header';
import Global from './Global';
const Kundali = ({navigation, route}) => {
  const [date, setDate] = useState(new Date(route.params.date_of_birth));
  const [time, setTime] = useState('');
  const [locationData, setLocationData] = useState({});
  const [location, setLocation] = React.useState(route.params.place_of_birth);
  const [name, onChangeName] = React.useState(route.params.name);
  const [accept, setAccept] = useState(false);
  const [email, onChangeEmail] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [marital, onChangeMarital] = React.useState('');
  const [gender, setGender] = React.useState(
    route.params.gender == 'Male' ? 0 : route.params.gender == 'Female' ? 1 : 2,
  );
  const [type, setType] = useState(false);
  const [pname, onChangePName] = React.useState('');
  const [pdate, setPDate] = useState(new Date());
  const [ptime, setPTime] = useState(new Date());
  const [plocationData, setPLocationData] = useState({});
  const [plocation, setPLocation] = React.useState('');
  const [open, setOpen] = useState(false);
  const [timezone, settimezone] = React.useState('5.5');
  const [open1, setOpen1] = useState(false);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const callbackHandler = data => {
    if (data.item.type == false) {
      //   settimezone(data.item.timezoneOffset);
      getMoviesFromApi(data.item.lat, data.item.lon);
      setLocation(data.item.display_name);
      setLocationData(data.item);
    } else {
      setPLocation(data.item.place);
      setPLocationData(data.item);
    }
  };

  useEffect(() => {
    let dict = {
      lat: route.params.latitude ? route.params.latitude : 0,
      lon: route.params.longitude == 'undefined' ? 0 : route.params.longitude,
    };
    //  alert(JSON.stringify(dict));
    setLocationData(dict);
    let stringDate = `01-01-1970 ${route.params.time_of_birth}`;
    setTime(new Date(stringDate));

    // alert(JSON.stringify(route.params.time_of_birth));
  }, []);

  const getMoviesFromApi = (lat, long) => {
    fetch(
      `https://us1.locationiq.com/v1/timezone?key=pk.182d2651b455ddca5bba510a3e8d3f0f&lat=${lat}&lon=${long}`,
    )
      .then(response => response.json())
      .then(json => {
        // alert(JSON.stringify(json));
        let timezone = json.timezone.offset_sec;
        settimezone(timezone / 3600);
      })
      .catch(error => {
        console.error(error);
      });
  };
  var radio_props = [
    {label: stringsoflanguages.male, value: 0},
    {label: stringsoflanguages.female, value: 1},
    {label: stringsoflanguages.others, value: 2},
  ];

  const onPressLogin = () => {
    if (name == '') {
      alert(stringsoflanguages.name + ' ' + stringsoflanguages.isrequired);
    } else if (date == '') {
      alert(stringsoflanguages.dob + ' ' + stringsoflanguages.isrequired);
    } else if (time == '') {
      alert(stringsoflanguages.tob + ' ' + stringsoflanguages.isrequired);
    } else if (location == '') {
      alert(stringsoflanguages.pob + ' ' + stringsoflanguages.isrequired);
    } else {
      if (locationData.lat == 0) {
        alert('Please select Place of Birth');
        return;
      }
      toggleLoading(true);
      const data = new FormData();
      data.append('api_key', '351b33587c5fdd93bd42ef7ac9995a28');
      data.append('full_name', name);
      data.append('day', moment(date).format('DD'));
      data.append('month', moment(date).format('MM'));
      data.append('year', moment(date).format('YYYY'));
      data.append('hour', moment(time).format('HH'));
      data.append('min', moment(time).format('mm'));
      data.append('sec', '45');
      data.append('gender', 'male');
      data.append('lat', locationData.lat);
      data.append('lon', locationData.lon);
      data.append('tzone', timezone);
      data.append('lan', 'en');
      data.append('place', location);
      data.append('lan', Global.lan);
      data.append('dasha_type', 'pratyantar-dasha');
      toggleLoading(false);
      navigation.navigate('Kundli1', data);

      //navigation.navigate('KundaliDetail', matchdata);
    }
  };

  async function storeUserSession(token) {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          token: token,
        }),
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (error) {}
  }

  useEffect(() => {
    DeviceEventEmitter.addListener('event.testEvent', eventData =>
      callbackHandler(eventData),
    );
    return () => {
      DeviceEventEmitter.removeAllListeners('event. testEvent');
    };
  }, []);
  return (
    <>
      <SafeAreaView style={style.container}>
        {state.loading && <Loader />}

        <KeyboardAwareScrollView>
          <Text style={style.loginmobile}> Name</Text>
          <View style={style.srow}>
            <View style={style.signupmobile}>
              <TextInput
                style={style.input}
                onChangeText={onChangeName}
                value={name}
                placeholderTextColor="#204768"
                placeholder={stringsoflanguages.name}
              />
            </View>
          </View>

          <View style={style.srow1}>
            <Text style={style.connect}> Gender</Text>
            <RadioForm
              style={style.formstyle}
              labelStyle={style.radiostyle}
              buttonOuterSize={20}
              buttonColor="#F5C525"
              selectedButtonColor="#F5C525"
              radio_props={radio_props}
              initial={gender}
              onPress={(index, value) => {
                setGender(index);
              }}
              formHorizontal={true}
            />
          </View>
          <View style={style.srow1}>
            <Pressable
              onPress={() => {
                setType(false);
                setOpen(true);
              }}>
              <View style={style.signupmobile}>
                <TextInput
                  style={style.input}
                  value={date == '' ? '' : moment(date).format('DD-MM-YYYY')}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={stringsoflanguages.dob}
                />
              </View>
            </Pressable>
          </View>
          <View style={style.srow1}>
            <Pressable
              onPress={() => {
                setType(false);
                setOpen1(true);
              }}>
              <View style={style.signupmobile}>
                <TextInput
                  style={style.input}
                  value={time == '' ? '' : moment(time).format('hh:mm:a')}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={stringsoflanguages.tob}
                />
              </View>
            </Pressable>
          </View>

          <View style={style.srow1}>
            <Pressable
              onPress={() => {
                setType(false);
                navigation.navigate('SelectPlace1', '0');
              }}>
              <View style={style.signupmobile}>
                <TextInput
                  style={style.input}
                  editable={false}
                  value={location}
                  placeholderTextColor="#204768"
                  placeholder={stringsoflanguages.pob}
                />
              </View>
            </Pressable>
          </View>

          <View style={style.button}>
            <Button
              onPress={onPressLogin}
              color="#F5C525"
              title={stringsoflanguages.create}
            />
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
        mode={'time'}
        date={time == '' ? new Date() : time}
        onConfirm={date => {
          setOpen1(false);
          type == false ? setTime(date) : setPTime(date);
        }}
        onCancel={() => {
          setOpen1(false);
        }}
      />
    </>
  );
};
export default Kundali;
