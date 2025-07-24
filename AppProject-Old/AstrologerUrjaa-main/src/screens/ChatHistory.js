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
import {ChatHistoryApi, formatAmount, timeFormate_mmss} from '../service/Api';
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
const ChatHistory = ({navigation}) => {
  const {user} = useSelector(store => store);
  const [state, setState] = useState({
    history: [],
    isLoading: true,
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
    const {
      user_name,
      id,
      payable_amount,
      price_per_mint,
      total_seconds,
      user_details,

      astrologer_comission_amount,
    } = item;
    return (
      <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 15,
            // backgroundColor: 'blue',
          }}>
          <View style={{}}>
            <Image
              style={{
                height: 60,
                width: 60,

                borderRadius: 30,
              }}
              source={{uri: user_details.image_url}}
              // source={require('../assets/user.png')}
            />
          </View>

          <View style={{marginLeft: 6}}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 18,
                fontFamily: 'Avenir',
                color: '#1E1F20',
              }}>
              {item.user_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              {`Order ID : ${id}`}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Status : {statusList[`status_${item.status}`]}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              {`Duration : ${timeFormate_mmss(total_seconds)} min`}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              {`Amount :₹ ${payable_amount == 'Free' ? '0' : payable_amount}`}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',

                marginTop: 0,
              }}>
              {`Commison amount :₹ ${
                astrologer_comission_amount == 'Free'
                  ? '0'
                  : astrologer_comission_amount
              }`}
            </Text>
            {payable_amount == 'Free' && (
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontSize: 15,
                  fontFamily: 'Avenir',
                  color: 'green',

                  marginTop: 0,
                }}>
                Free Chat
              </Text>
            )}
            <Text
              style={{
                fontFamily: Global.medium,
                fontSize: 15,

                color: 'blue',
                marginTop: 2,
              }}>
              {item.booking_date}
            </Text>
            {item.delete_chat == '0' && (
              <TouchableOpacity onPress={() => chatHandler(item)}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                  source={require('../assets/chath.png')}
                />
              </TouchableOpacity>
            )}
          </View>
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
      astrologer_id: user_id,
      // schedule_date: '',
      // schedule_date_end: '',
    };
    // console.log(body);
    // const {status = false, lists = []} = await ChatHistoryApi(body);
    const {status = false, data = []} = await ChatHistoryApi(body);
    if (status) {
      console.log(JSON.stringify(data, null, 2));
      setState({...state, history: data, isLoading: false});
    } else {
      setState({...state, isLoading: false});
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {SimpleHeader('Chat History', () => navigation.goBack())}
      {state.history.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Chat History Found</Text>
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

export default ChatHistory;

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
