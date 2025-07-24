import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
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
import moment from 'moment';
import {useIsFocused} from '@react-navigation/core';

const Slot = ({navigation}) => {
  const {user} = useSelector(store => store);
  const isFocused = useIsFocused();
  const [selectedStartDate, setselectedStartDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [state, setState] = useState({
    history: [],
    data: [],
    isLoading: false,
  });

  const deleteTimeslot = async array => {
    const {user_id} = user;
    // console.log(JSON.stringify(d));

    let d = {
      timslots: array,
      astrologer_id: user_id,
      id: state.data.id,
    };
    console.log(JSON.stringify(d));
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        timslots: array,
        astrologer_id: user_id,
        id: state.data.id,
      }),
    };
    try {
      await fetch(
        'https://astrourjaa.com/dev/admin/api/editslots',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          if (data.status == true) {
            setState({...state, history: array});
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
  };

  const renderItem1 = ({item, index}) => {
    // alert(JSON.stringify(item))

    return (
      <View style={{flexDirection: 'column', width: '100%', marginTop: 20}}>
        <View
          style={{
            width: '100%',
            margin: 2,

            // backgroundColor: 'blue',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
            }}>
            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 18,
                fontFamily: 'Avenir',
                color: '#1E1F20',
              }}>
              {item.start} - {item.end}
            </Text>
            <Pressable
              onPress={() => {
                Alert.alert('Devvaani', 'Are you sure want to Delete?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      var array = [...state.history]; // make a separate copy of the array
                      var index = index;
                      if (index !== -1) {
                        array.splice(index, 1);
                        // setState({...state, history: array});
                      }

                      deleteTimeslot(array);
                    },
                  },
                ]);

                //alert(JSON.stringify(array));
              }}>
              <Image
                source={require('../assets/delete.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 32,
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            borderWidth: 0.3,
            borderColor: '#D1D1D1',
            marginTop: 0,
          }}></View>
      </View>
    );
  };

  const _keyExtractor = (item, index) => item.key;
  useEffect(() => {
    // fetchList();
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

  const postExample = async (date, duration) => {
    setState({...state, history: []});
    // let d = {
    //   date: date,
    //   duration: duration,
    //   astrologer_id: data.id,
    //   user_id: store.getState().user.id,
    // };
    const {user_id} = user;
    // console.log(JSON.stringify(d));
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: date,
        astrologer_id: user_id,
      }),
    };
    try {
      await fetch(
        'https://astrourjaa.com/dev/admin/api/getslots-date',
        requestOptions,
      ).then(response => {
        response.json().then(data => {
          if (data.status == true) {
            setState({
              ...state,
              history: JSON.parse(data.slots[0].json),
              isLoading: false,
              data: data.slots[0],
            });
            //  alert(JSON.stringify(data));
            //  setSlot(data.slot);
          } else {
            setState({
              ...state,
              history: [],
              isLoading: false,
              data: [],
            });
            // setSlot([]);
          }
          // alert(JSON.stringify(data));
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    postExample(moment().format('YYYY-MM-DD'), '15');
  }, []);

  const onDateChange = date => {
    setselectedStartDate(moment(date).format('YYYY-MM-DD'));
    postExample(moment(date).format('YYYY-MM-DD'), '15');
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}

      <View
        style={{
          borderWidth: 1,
          width: '96%',
          alignSelf: 'center',
          marginTop: 12,
          borderColor: '#FFC613',
        }}>
        <CalendarPicker
          headerWrapperStyle={{
            backgroundColor: '#FFC613',
            width: '100%',
            height: 40,
          }}
          onDateChange={onDateChange}
        />
      </View>
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
          navigation.navigate('AddSlot', {
            data: state.data,
            history: state.history,
            date: selectedStartDate,
          });
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

export default Slot;

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
