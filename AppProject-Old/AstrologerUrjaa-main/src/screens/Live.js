import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
const window = Dimensions.get('window');
const {width, height} = Dimensions.get('window');
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import {CallHistoryApia} from '../service/Api';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Loader from '../utils/Loader';
const statusList = {
  status_0: 'Pending',
  status_1: 'Confirmed',
  status_2: 'Completed',
  status_3: 'Cancel',
  status_4: 'Refund',
  status_5: 'Missing',
};
const Live = ({navigation}) => {
  const store = useStore();
  const [state, setState] = useState({
    user_id: store.getState().user.user_id,
    data: [],
    specific_date: '',
    specific_date_end: '',
    isLoading: true,
  });
  const [calState, setCalState] = useState({
    visible: false,
    markedDates: {},
    selectType: 1,
  });
  useEffect(() => {
    fetchList();
  }, []);

  const secondsToHms = d => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
    return hDisplay + mDisplay + sDisplay;
  };

  const fetchList = async () => {
    const {user_id, specific_date, specific_date_end} = state;
    const body = {
      astrologer_id: user_id,
    };
    console.log(body);
    const {status = false, data = []} = await CallHistoryApia(body);
    console.log(JSON.stringify(data, null, 2));
    if (status) {
      setState({...state, data, isLoading: false});
    } else {
      setState({...state, isLoading: false});
    }
  };
  const onDayPressHandler = ({dateString}) => {
    let {specific_date, specific_date_end} = state;
    const {selectType} = calState;
    if (selectType === 1) {
      specific_date = specific_date === dateString ? '' : dateString;
    } else {
      specific_date_end = specific_date_end === dateString ? '' : dateString;
    }
    setState({...state, specific_date, specific_date_end});
  };
  const cancelHandler = () => {
    setCalState({...calState, visible: false});
  };
  const searchHandler = () => {
    setCalState({...calState, visible: false});
    const {start_date, end_date} = state;
    if (start_date !== '' && end_date !== '') {
      fetchList();
    }
  };

  useEffect(() => {
    const {specific_date, specific_date_end} = state;
    const marks = {
      selected: true,
      selectedColor: '#09304B',
    };
    let markedDates = {};
    if (specific_date !== '') {
      markedDates[specific_date] = marks;
    }
    if (specific_date_end !== '') {
      markedDates[specific_date_end] = marks;
    }
    setCalState({...calState, markedDates});
  }, [state.specific_date, state.specific_date_end]);
  const calendarView = () => (
    <View style={calStyle.container}>
      <View style={calStyle.container_2}>
        <View style={calStyle.view_1}>
          <TouchableOpacity
            style={
              calStyle[calState.selectType === 1 ? 'touch_active' : 'touch']
            }
            onPress={() => setCalState({...calState, selectType: 1})}>
            <Text
              style={
                calStyle[calState.selectType === 1 ? 'text_1' : 'text_2']
              }>{`Start From : ${state.specific_date || '- - -'}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              calStyle[calState.selectType === 2 ? 'touch_active' : 'touch']
            }
            onPress={() => setCalState({...calState, selectType: 2})}>
            <Text
              style={
                calStyle[calState.selectType === 2 ? 'text_1' : 'text_2']
              }>{`End From : ${state.specific_date_end || '- - -'}`}</Text>
          </TouchableOpacity>
        </View>
        <Calendar
          onDayPress={onDayPressHandler}
          markedDates={calState.markedDates}
          markingType={'interactive'}
          maxDate={moment().format('YYYY-MM-DD')}
        />
        <View style={calStyle.view_2}>
          <TouchableOpacity
            style={calStyle.touch_cancel}
            onPress={cancelHandler}>
            <Text style={calStyle.text_cancel}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={calStyle.touch_search}
            onPress={searchHandler}>
            <Text style={calStyle.text_search}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}

      <View style={headerStyle.container}>
        <TouchableOpacity style={headerStyle.touch} onPress={navigation.goBack}>
          <Image
            source={require('../assets/back.png')}
            style={headerStyle.backImage}
          />
        </TouchableOpacity>
        <Text style={headerStyle.title}>Live History</Text>
      </View>
      {state.data.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Live History Found</Text>
      )}
      <FlatList
        data={state.data}
        renderItem={({item}) => (
          <View style={styles.hs_view}>
            <View style={styles.hs_view_1}>
              <Text style={styles.hs_name}>{item.title}</Text>
              <Text style={styles.hs_text}>{`Duration ${secondsToHms(
                item.total_seconds,
              )}`}</Text>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontSize: 15,
                  fontFamily: 'Avenir',
                  color: '#979797',
                  marginLeft: 0,
                  marginTop: 10,
                }}>
                {`Title :₹ ${item.title}`}
              </Text>
              <Text
                style={{
                  fontFamily: 'Avenir',
                  fontSize: 15,
                  fontFamily: 'Avenir',
                  color: '#979797',
                  marginLeft: 0,
                  marginTop: 0,
                }}>
                {`Commison amount :₹ ${item.astrologer_comission_amount}`}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pendingq', {item: item})}>
                <View
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 12,
                    height: 40,
                    width: 100,
                    marginTop: 9,
                    marginLeft: window.width - 180,
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', marginTop: 7}}>
                    View Gift
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.hs_view_2}>
              <Text style={styles.hs_text}>{item.booking_date}</Text>
              <Text style={styles.hs_text}>
                {statusList[`status_${item.status}`]}
              </Text>
            </View>
          </View>
        )}
      />

      {calState.visible && calendarView()}
    </SafeAreaProvider>
  );
};

export default Live;
const styles = StyleSheet.create({
  noResult: {
    marginTop: '50%',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
  hs_name: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: '#1E1F20',
    paddingBottom: 4,
  },
  hs_gen: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#1E1F20',
    paddingBottom: 4,
  },
  hs_text: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#8F92A1',
  },
  hs_view: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hs_view_1: {},
  hs_view_2: {
    marginLeft: 'auto',
  },
});

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 10,
    backgroundColor: '#FFC613',
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 20,
  },
  backImage: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  touch: {
    padding: 10,
  },
  filter_image: {
    height: 23,
    width: 22,
    resizeMode: 'contain',
  },
  filter_touch: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
});

const calStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    height: height,
    flexDirection: 'column-reverse',
  },
  container_2: {
    width: window.width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
  },
  view_1: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  touch_active: {
    flex: 0.47,
    padding: 5,
    backgroundColor: '#FFC613',
    justifyContent: 'flex-start',
  },
  touch: {
    flex: 0.47,
    padding: 5,
    justifyContent: 'flex-start',
  },
  text_1: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  text_2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  view_2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  touch_cancel: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  touch_search: {
    backgroundColor: '#FFC613',
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  text_cancel: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
  text_search: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
  },
});
