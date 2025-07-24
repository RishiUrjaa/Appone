import {View, Text, FlatList, StyleSheet} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {useStore} from 'react-redux';
import {PoojaHistoryApi} from '../service/Api';
import Loader from '../utils/Loader';

const OnlinePuja = ({navigation}) => {
  const store = useStore();
  const [state, setState] = useState({
    user_id: store.getState().user.user_id,
    lists: [],
    isLoading: true,
  });

  const renderItem = ({item, index}) => {
    // alert(JSON.stringify(item))
    return (
      <View
        style={{
          justifyContent: 'center',
          alignSelf: 'center',
          width: '90%',
          marginBottom: 10,
        }}>
        <View
          style={{
            height: 185,
            width: '100%',
            backgroundColor: '#FFF',
            borderRadius: 8,
            marginTop: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 12,
          }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                lineHeight: 18,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#000',
                fontFamily: 'Avenir',
              }}>
              {item.id}
            </Text>

            <Text
              style={{
                lineHeight: 16,
                fontSize: 12,
                fontWeight: 'normal',
                color: '#9F9F9F',
                fontFamily: 'Avenir',
              }}>
              {item.pujaBookedDateTime}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#C8C8D3',
              borderWidth: 0.7,
              borderStyle: 'dashed',
              borderRadius: 0.1,
              marginTop: 10,
            }}></View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                marginTop: 12,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: '#83878E',
                  fontFamily: 'Avenir',
                }}>
                Customer Name
              </Text>

              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Avenir',
                }}>
                {item.customerName}
              </Text>
            </View>

            <View
              style={{
                marginTop: 11,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: '#83878E',
                  fontFamily: 'Avenir',
                }}>
                Date & Time
              </Text>

              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Avenir',
                }}>
                {item.pujaDateTime}
              </Text>
            </View>

            <View
              style={{
                marginTop: 11,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  lineHeight: 16,
                  fontSize: 12,
                  fontWeight: 'normal',
                  color: '#83878E',
                  fontFamily: 'Avenir',
                }}>
                Puja Type
              </Text>
              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Avenir',
                }}>
                {item.pujaType}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#C8C8D3',
              borderWidth: 0.7,
              borderStyle: 'dashed',
              borderRadius: 0.1,
              marginTop: 13,
            }}></View>

          <View
            style={{
              marginTop: 11,
              width: '90%',
              flexDirection: 'row',
              marginLeft: 15,
            }}>
            <Text
              style={{
                lineHeight: 22,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#000',
                fontFamily: 'Avenir',
              }}>
              {' '}
              Commission Earned:{' '}
            </Text>

            <Text
              style={{
                lineHeight: 22,
                fontSize: 14,
                fontWeight: 'normal',
                color: '#F87B00',
                fontFamily: 'Avenir',
              }}>
              {' '}
              {item.commissionEarn}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const body = {
      user_id: store.getState().user.user_id,
    };
    console.log(body);
    const {status = false, lists = []} = await PoojaHistoryApi(body);
    console.log(lists);
    if (status) {
      setState({...state, lists, isLoading: false});
      // console.log(JSON.stringify(lists, null, 2));
    } else {
      setState({...state, isLoading: false});
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      {SimpleHeader('Online Puja', () => navigation.goBack())}
      {state.lists.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Puja Found</Text>
      )}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <FlatList
          style={{width: '100%', marginBottom: 70}}
          data={state.lists}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default OnlinePuja;

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
