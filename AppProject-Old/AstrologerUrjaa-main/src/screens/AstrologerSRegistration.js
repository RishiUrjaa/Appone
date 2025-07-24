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
const AstrologerSRegistration = ({navigation, route}) => {
  const [gender, setGender] = React.useState(0);

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

  const [business, setBusiness] = React.useState('');
  const [qualification, setQualification] = React.useState('');
  const [learn, setLearn] = React.useState('');
  const [insta, setInsta] = React.useState('');
  const [website, setWebsite] = React.useState('');

  var radio_props = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  const onPressLogin = () => {
    console.log(JSON.stringify(route.params));

    if (experience == '') {
      alert('Please select Experience');
    } else if (date == '') {
      alert('Please select Date of Inerview');
    } else if (time == '') {
      alert('Please select Time of Inerview');
    } else if (business == '') {
      alert('Please select Business Other Than Astrology');
    } else {
      route.params['experience'] = experience;
      route.params['daily'] = hour;
      route.params['hear'] = hear;
      route.params['platform'] = gender;
      route.params['preferable'] = preferable;
      route.params['idate'] = date;
      route.params['itime'] = time;
      route.params['live'] = live;

      route.params['business'] = business;
      route.params['qualification'] = qualification;
      route.params['learn'] = learn;
      route.params['insta'] = insta;
      route.params['website'] = website;
      console.log(route.params);

      navigation.navigate('AstrologerTRegistration', route.params);
    }
  };

  // useEffect(()=>{

  // },[hour])

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
            Experience (In Years)
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setExperience}
                value={experience}
                keyboardType="numeric"
                placeholderTextColor="#204768"
                maxLength={2}
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            How many hours you can contribute daily?
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                //  onChangeText={setHour}
                value={hour}
                onChangeText={text => {
                  if (text == '') {
                  }
                  let a = parseInt(text);
                  if (a > 24) {
                    alert('Daily hour should not above 24 hour');
                  } else {
                    setHour(text);
                  }
                  // setGender(index);
                }}
                keyboardType="numeric"
                placeholderTextColor="#204768"
                maxLength={2}
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Where did you hear about astro jyotish?
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setHear}
                value={hear}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Are you working on any other online Platform?
          </Text>

          <RadioForm
            style={style.formstyle}
            labelStyle={style.radiostyle}
            buttonOuterSize={20}
            buttonColor="#FFC613"
            selectedButtonColor="#FFC613"
            radio_props={radio_props}
            initial={gender}
            onPress={(index, value) => {
              setGender(index);
            }}
            formHorizontal={true}
          />

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Your Preferable Time For Online(AM/PM)
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
                    preferable == '' ? '' : moment(preferable).format('hh:mm:a')
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
            What is the suitable date & time for interview?
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{width: '40%', margin: '5%'}}
              onPress={() => {
                setType(false);
                setOpen(true);
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
                  style={[style.input, {width: '60%'}]}
                  value={date == '' ? '' : moment(date).format('DD-MM-YYYY')}
                  placeholderTextColor="#204768"
                  editable={false}
                />
                <Image
                  source={require('../assets/calender.png')}
                  style={style.facebookimage}
                />
              </View>
            </Pressable>

            <Pressable
              style={{width: '40%', margin: '5%'}}
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
                  style={[style.input, {width: '60%'}]}
                  value={time == '' ? '' : moment(time).format('hh:mm:a')}
                  placeholderTextColor="#204768"
                  editable={false}
                />
                <Image
                  source={require('../assets/calender.png')}
                  style={style.facebookimage}
                />
              </View>
            </Pressable>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Which city do you currently live in?
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setLive}
                value={live}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Main source of business Other than Astrology
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setBusiness}
                value={business}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Enter your Highest Qualification
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setQualification}
                value={qualification}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            From Where did you learn Astrology ?
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setLearn}
                value={learn}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Instagram/Youtube/Facebook Profile Link
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setInsta}
                value={insta}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Website Link
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={setWebsite}
                value={website}
                placeholderTextColor="#204768"
              />
            </View>
          </View>

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
        mode={'time'}
        maximumDate={new Date()}
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
        mode={'time'}
        maximumDate={new Date()}
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
export default AstrologerSRegistration;
