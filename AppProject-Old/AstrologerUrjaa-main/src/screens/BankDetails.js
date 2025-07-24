import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SimpleHeader} from '../utils/Header';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import {useSelector, useStore} from 'react-redux';
import {
  BankDetail,
  BankDetail2,
  ChatHistoryApi,
  formatAmount,
  timeFormate_mmss,
} from '../service/Api';
import Global from './Global';
import Loader from '../utils/Loader';
import {useIsFocused} from '@react-navigation/core';

const BankDetails = ({navigation}) => {
  const {user} = useSelector(store => store);
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    history: [],
    isLoading: false,
  });

  const renderItem1 = ({item, index}) => {
    // alert(JSON.stringify(item))

    return (
      <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '100%',
            margin: 10,

            // backgroundColor: 'blue',
          }}>
          <View
            style={
              {
                // backgroundColor: 'red',
              }
            }>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 18,
                fontFamily: 'Avenir',
                color: '#1E1F20',
              }}>
              Bank Name : {item.bankName}
            </Text>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Account Holder Name :{item.bank_account_holder_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Account No :{item.bank_account_no}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Branch Name :{item.branch_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              Ifsc Code :{item.ifsc_code}
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: 'yellow',
              flex: 0.4,
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 15,
                fontFamily: 'Avenir',
                color: '#979797',
              }}>
              {item.bank_name}
            </Text>
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
  }, [isFocused == true]);

  const fetchList = async () => {
    const {user_id} = user;
    const body = {
      user_id: user_id,
    };

    const {status = false, list = []} = await BankDetail2(body);

    if (status) {
      console.log(JSON.stringify(list, null, 2));
      let d = [];
      d.push(list);
      setState({...state, history: d, isLoading: false});
    } else {
      setState({...state, isLoading: false});
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {SimpleHeader('Bank Details', () => navigation.goBack())}
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
      <Pressable
        style={{
          width: 60,
          height: 60,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          navigation.navigate('Bank');
        }}>
        <Image
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            bottom: 20,
            right: 20,
          }}
          source={require('../assets/circle-plus1.png')}
        />
      </Pressable>
    </SafeAreaProvider>
  );
};

export default BankDetails;

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
