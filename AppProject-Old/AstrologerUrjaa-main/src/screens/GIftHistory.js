import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import moment from 'moment';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SimpleHeader} from '../utils/Header';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import {useSelector, useStore} from 'react-redux';
import {
  ChatHistoryApi,
  formatAmount,
  GiftList,
  timeFormate_mmss,
  textInPrice,
} from '../service/Api';
import Global from './Global';
import Loader from '../utils/Loader';

const GiftHistory = ({navigation}) => {
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
      <View style={{borderBottomWidth: 1}}>
        <View style={{flexDirection: 'row', width: '100%', marginTop: 0}}>
          <Image
            style={{width: 80, height: 80, margin: 5, borderRadius: 7}}
            source={{uri: item.user_image}}
          />
          <View>
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 18,

                color: '#1E1F20',
                marginTop: 3,
              }}>
              ID : {item.id}
            </Text>
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 18,

                color: '#1E1F20',
                marginTop: 2,
              }}>
              {item.user_name}
            </Text>
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 15,

                color: 'grey',
                marginTop: 2,
              }}>
              {item.gift_name}
            </Text>
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 15,

                color: 'grey',
                marginTop: 2,
              }}>
              ₹{item.price}
            </Text>

            <Text style={styles.ft_text_3}>{`Comission : ${textInPrice(
              parseFloat(item.total_astro_comission).toFixed(2),
            )}`}</Text>

            <Text style={styles.ft_text_2}>{`TDS : ${textInPrice(
              parseFloat(item.tds_astro).toFixed(2),
            )}`}</Text>
            <Text style={styles.ft_text_2}>{`PG : ${textInPrice(
              parseFloat(item.gst_astro).toFixed(2),
            )}`}</Text>
            <Text style={styles.ft_text_2}>{`Earned Comission : ${textInPrice(
              parseFloat(item.astrologer_comission_amount).toFixed(2),
            )}`}</Text>
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 15,

                color: 'blue',
                marginTop: 2,
              }}>
              {moment(item.created_at).format('DD-MMM-YYYY hh:MM a')}
            </Text>
          </View>
        </View>
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
    // console.log(body);
    // const {status = false, lists = []} = await ChatHistoryApi(body);

    const {status = false, gifts = []} = await GiftList(body);
    if (status) {
      console.log(JSON.stringify(gifts, null, 2));
      setState({...state, history: gifts, isLoading: false});
    } else {
      setState({...state, isLoading: false});
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {SimpleHeader('Gift History', () => navigation.goBack())}
      {state.history.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Gift History Found</Text>
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

export default GiftHistory;

const styles = StyleSheet.create({
  noResult: {
    marginTop: '50%',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
  ft_text_1: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 'bold',
    fontSize: 16,
    color: '#1E1F20',
  },
  ft_text_2: {
    fontFamily: 'Avenir-Medium',
    fontSize: '500',
    fontSize: 16,
    color: '#979797',
  },
  ft_text_3: {
    fontFamily: 'Avenir-Medium',
    fontSize: '500',
    fontSize: 16,
    color: '#7ED321',
  },
});
