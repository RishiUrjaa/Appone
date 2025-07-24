import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SimpleHeader} from '../utils/Header';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import {useSelector, useStore} from 'react-redux';
import {
  Birth,
  ChatHistoryApi,
  formatAmount,
  timeFormate_mmss,
} from '../service/Api';
import Global from './Global';
import Loader from '../utils/Loader';
import moment from 'moment';
const statusList = {
  status_0: 'Pending',
  status_1: 'Confirmed',
  status_2: 'Completed',
  status_3: 'Cancel',
  status_4: 'Refund',
  status_5: 'Missing',
};
const BirthHistory = ({navigation}) => {
  const {user} = useSelector(store => store);
  const [state, setState] = useState({
    history: [],
    isLoading: false,
  });
  const chatHandler = item => {
    const {
      id,
      user_id,
      type,
      user_name,
      user_fathername,
      user_mothername,
      user_email,
      user_phone,
      zodiac_sign,
      user_language,
      message,
      user_dob,
      user_tob,
      user_gender,
      user_pob,
      user_gotro,
      created_at,
      user_spouse,
      bridge_id,
    } = item;

    const user_member = {
      id,
      user_id,
      type,
      name: user_name,
      fathername: user_fathername,
      mothername: user_mothername,
      email: user_email,
      phone: user_phone,
      zodiac: zodiac_sign,
      occupation: null,
      language: user_language,
      message: message,
      dob: user_dob,
      tob: user_tob,
      gender: user_gender,
      pob: user_pob,
      gotro: user_gotro,
      spouse: user_spouse,
      relation: null,
      location: null,
      latitude: '0.00000000',
      longitude: '0.00000000',
      is_default: '1',
      status: '1',
      created_at,
    };
    console.log(JSON.stringify(user_member, null, 2));
    Global.bookingid = bridge_id;
    Global.another = user_id;
    Global.user_id = user.user_id;
    Global.myname = user.name;
    navigation.navigate('MyChats', {user_member});
  };
  const renderItem1 = ({item, index}) => {
    // alert(JSON.stringify(item))

    return (
      <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '100%',

            paddingHorizontal: 15,
            // backgroundColor: 'blue',
          }}>
          <View style={{marginLeft: 6}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 18,
                fontFamily: 'Avenir',
                color: '#1E1F20',
              }}>
              Name : {item.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              {`Date of Birth : ${moment(item.date_of_birth).format(
                'DD/MM/YYYY',
              )}`}
            </Text>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Time of Birth : {item.time_of_birth}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Place of Birth : {item.place_of_birth}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Gender : {item.gender}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              Global.lan = 'hi';
              navigation.navigate('Kundali', item);
            }}>
            <View
              style={{
                backgroundColor: '#FF6961',
                borderRadius: 12,
                width: 120,
                height: 30,
                marginTop: 3,
                alignSelf: 'flex-end',
                marginLeft: 12,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'AvenirLTStd-Heavy',
                  color: 'white',
                  marginTop: 7,
                  textAlign: 'center',
                }}>
                Kundali in Hindi
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Global.lan = 'en';
              navigation.navigate('Kundali', item);
            }}>
            <View
              style={{
                backgroundColor: '#FF6961',
                borderRadius: 12,
                width: 120,
                height: 30,
                marginTop: 3,
                alignSelf: 'flex-end',
                marginLeft: 12,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'AvenirLTStd-Heavy',
                  color: 'white',
                  marginTop: 7,
                  textAlign: 'center',
                }}>
                Kundali in English
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            borderWidth: 0.3,
            borderColor: '#D1D1D1',
            marginTop: 10,
          }}></View>
      </View>
    );
  };

  const _keyExtractor = (item, index) => item.key;
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const {user_id} = user;

    const body = {
      user_id: user_id,
      // schedule_date: '',
      // schedule_date_end: '',
    };
    console.log(body);
    // const {status = false, lists = []} = await ChatHistoryApi(body);
    const data = await Birth(body);

    if (data.status) {
      console.log(JSON.stringify(data, null, 2));
      let getdata = [];
      let getdatas = data.user_member ? data.user_member : {};
      getdata.push(getdatas);
      setState({...state, history: getdata, isLoading: false});
    } else {
      setState({...state, isLoading: false});
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {SimpleHeader('Birth Details', () => navigation.goBack())}
      {state.history.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Data Found</Text>
      )}
      <FlatList
        data={state.history}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={_keyExtractor}
        renderItem={renderItem1}
      />
    </SafeAreaProvider>
  );
};

export default BirthHistory;

const styles = StyleSheet.create({
  noResult: {
    marginTop: '50%',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
});
