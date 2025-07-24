import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
} from 'react-native';
const window = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import store from '../redux/store';
import io from 'socket.io-client';

import {buttonStyle, globalStyle, headerStyle} from '../styles/style';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SOCKET_URL} from '../service/Config';
import Global from './Global';
import GLOBAL from './Global';

const User = ({navigation, route, greeting}) => {
  const [state, setState] = useState({
    amount: '',
    gst: '',
    total: '',
    gst: '',
  });
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
  });

  useEffect(() => {}, []);

  const success = txn => {
    RechargeWallet({
      recharge_amount: state.amount,
      txn_id: txn,
      gst_perct: state.percentage,
      gst_amount: state.gst,
    })
      .then(data => {
        if (data.status) {
          //alert(JSON.stringify(data.recharge_amount))
          navigation.navigate('Thankyou');

          alert('Thankyou for Recharge');
          //setnotification(data.notification_count)
        } else {
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const change = () => {};
  //navigation.navigate('Signup')

  const block = item => {
    var dict = {
      astrologer_id: item.astrologer_id,
      user_id: item.user_id,
      broadcast_id: item.broadcast_id,
      bridge_id: item.bridge_id,
    };

    const socket = io('http://astrourjaa.com:5050', {
      transports: ['websocket'],
    });
    socket.on('block_user_broadcast', msg => {
      // socket.emit('audience_list_update', {bridge_id: item.bridge_id});
      //alert(JSON.stringify(msg))
    });

    socket.emit('block_user_broadcast', {
      astrologer_id: item.astrologer_id,
      user_id: item.user_id,
      broadcast_id: item.broadcast_id,
      bridge_id: item.bridge_id,
    });
    // socket.emit('leave_broadcast',{
    //
    //   astrologer_id:item.astrologer_id,
    //   user_id:store.item.user_id,
    //   bridge_id:item.bridge_id
    // })
  };
  const topBannerView = () => (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={greeting}
      style={{flexGrow: 0, marginVertical: 10}}
      renderItem={({item, index}) => (
        <View
          style={{
            backgroundColor: 'white',
            marginTop: 12,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 0,
            width: '100%',
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: 22,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', width: '65%'}}>
            <Text style={{color: 'black', marginTop: 14, fontSize: 16}}>
              {index + 1}
            </Text>
            <Image
              source={{uri: item.user.imageUrl}}
              style={{width: 40, height: 40, marginTop: 7, marginLeft: 12}}
            />
            <Text
              style={{
                color: 'black',
                marginTop: 14,
                fontSize: 16,
                marginLeft: 12,
              }}>
              {item.user.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => block(item)}>
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: 'red',
                borderRadius: 7,
              }}>
              <Text
                style={{
                  color: 'white',
                  marginTop: 6,
                  fontSize: 16,
                  textAlign: 'center',
                }}>
                Block
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
  useEffect(() => {
    // console.log(JSON.stringify(greeting[0].user.imageUrl))
    // console.log(JSON.stringify(state,null,2))
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBarLight />
      <View style={{flex: 1, width: window.width}}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Nunito-Bold',
            fontSize: 22,
            marginLeft: 12,
          }}>
          {greeting.length} Viewers
        </Text>

        {topBannerView()}
      </View>
    </SafeAreaView>
  );
};

export default User;
const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    marginBottom: 25,
  },
  pay_view: {
    padding: 20,
  },
  pay_view_2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  pay_title: {
    fontFamily: 'Nunito-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
  },
  pay_text_1: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: '#000521',
  },
  pay_text_2: {
    fontFamily: 'Nunito-SemiBold',
    fontWeight: '600',
    fontSize: 14,
    color: '#000521',
  },
  pay_text_21: {
    fontFamily: 'Nunito-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#000521',
  },
  payTotal_view: {
    flexDirection: 'row',
    backgroundColor: '#FFC6131a',
    padding: 20,
    justifyContent: 'space-between',
  },
  payTotal_text: {
    fontFamily: 'Nunito-Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#FFC613',
  },
});
