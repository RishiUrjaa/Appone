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
import Global from './Global';
const {width, height} = Dimensions.get('window');
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import {CallHistoryApi, timeFormate_mmss} from '../service/Api';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Loader from '../utils/Loader';
import {SimpleHeader} from '../utils/Header';
const statusList = {
  status_0: 'Pending',
  status_1: 'Confirmed',
  status_2: 'Completed',
  status_3: 'Cancel',
  status_4: 'Refund',
  status_5: 'Missing',
};
const CallHistory = ({navigation}) => {
  const store = useStore();
  const [state, setState] = useState({
    user_id: store.getState().user.user_id,
    lists: [],
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
  const fetchList = async () => {
    const {user_id, specific_date, specific_date_end} = state;
    const body = {
      user_id,
      specific_date,
      specific_date_end,
    };
    console.log(body);
    const {status = false, lists = []} = await CallHistoryApi(body);
    console.log(JSON.stringify(lists, null, 2));
    if (status) {
      setState({...state, lists, isLoading: false});
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

      {SimpleHeader('Call History', () => navigation.goBack())}
      {state.lists.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Audio History Found</Text>
      )}
      <FlatList
        data={state.lists}
        renderItem={({item}) => (
          <View>
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
                  source={{uri: item.user_details.image_url}}
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontSize: 15,
                    fontFamily: 'Avenir',
                    color: '#979797',
                  }}>
                  {`Order ID : ${item.id}`}
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
                  {`Duration : ${timeFormate_mmss(item.total_seconds)} min`}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Avenir',
                    fontSize: 15,
                    fontFamily: 'Avenir',
                    color: '#979797',
                  }}>
                  {`Amount :₹ ${
                    item.payable_amount == 'Free' ? '0' : item.payable_amount
                  }`}
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
                    item.astrologer_comission_amount == 'Free'
                      ? '0'
                      : item.astrologer_comission_amount
                  }`}
                </Text>
                {item.payable_amount == 'Free' && (
                  <Text
                    style={{
                      fontFamily: 'Avenir',
                      fontSize: 15,
                      fontFamily: 'Avenir',
                      color: 'green',

                      marginTop: 0,
                    }}>
                    Free Call
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: Global.medium,
                    fontSize: 15,

                    color: 'blue',
                    marginTop: 2,
                  }}>
                  {item.created_at}
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
        )}
      />

      {calState.visible && calendarView()}
    </SafeAreaProvider>
  );
};

export default CallHistory;
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
    fontSize: 14,
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
