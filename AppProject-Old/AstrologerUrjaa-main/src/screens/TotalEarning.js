import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {Appbar, Menu, Provider} from 'react-native-paper';
import {useStore} from 'react-redux';
import Loader from '../utils/Loader';
import {EarningApi, textInPrice} from '../service/Api';

import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {time} from './Global';
const TotalEarning = ({navigation}) => {
  const store = useStore();
  const [state, setstate] = useState({
    total_income: '0',
    paid_commission: '0',
    unpaid_commission: '0',
    today_income_gift: '0',
    today_income: '0',
    list: [],
    condition: '10 data',
    start_date: '',
    end_date: '',
    user_id: store.getState().user.user_id,
    isLoading: false,
    total_income_gift: '',
    astrologer_incentive: '',
  });
  const [menuVisible, setMenuVisible] = useState(false);
  const [calState, setCalState] = useState({
    visible: false,
    markedDates: {},
    selectType: 1,
  });

  const renderItem1 = ({item}) => (
    <View
      key={`ft_${item.id}`}
      style={{
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 5,
      }}>
      <Image
        style={{
          height: 50,
          width: 50,
          resizeMode: 'contain',
        }}
        source={require('../assets/total.png')}
      />
      <View
        style={{
          flex: 1,
          paddingLeft: 15,
        }}>
        <View>
          <Text style={styles.ft_text_1}>
            {`Transfer from: ${item.user_name}`}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.ft_text_2}>{`Order Id: ${item.id}`}</Text>
            <Text style={styles.ft_text_2}>{`Type: ${
              item.type == '1'
                ? 'Video'
                : item.type == '2'
                ? 'Audio'
                : item.type == '3'
                ? 'Chat'
                : 'Report'
            }`}</Text>
            <Text style={styles.ft_text_2}>{`Amount : ${textInPrice(
              parseFloat(item.payable_amount).toFixed(2),
            )}`}</Text>
            <Text style={styles.ft_text_3}>{`Consultancy Amt : ${textInPrice(
              parseFloat(item.total_astro_comission).toFixed(2),
            )}`}</Text>

            <Text style={styles.ft_text_2}>{`TDS : ${textInPrice(
              parseFloat(item.tds_astro).toFixed(2),
            )}`}</Text>
            <Text style={styles.ft_text_2}>{`PG : ${textInPrice(
              parseFloat(item.gst_astro).toFixed(2),
            )}`}</Text>
            <Text
              style={styles.ft_text_2}>{`Earned Consultancy Amt : ${textInPrice(
              parseFloat(item.astrologer_comission_amount).toFixed(2),
            )}`}</Text>
            <Text style={styles.ft_text_2}>{`Start Date: ${moment(
              item.schedule_date_time,
            ).format('DD MMM YYYY HH:mm:SS')}`}</Text>
            <Text style={styles.ft_text_2}>{`End Date: ${moment(
              item.end_time,
            ).format('DD MMM YYYY HH:mm:SS')}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    const {condition} = state;
    if (condition) {
      fetchListData();
    }
  }, [state.condition]);

  useEffect(() => {
    const {start_date, end_date} = state;
    const marks = {
      selected: true,
      selectedColor: '#09304B',
    };
    let markedDates = {};
    if (start_date !== '') {
      markedDates[start_date] = marks;
    }
    if (end_date !== '') {
      markedDates[end_date] = marks;
    }
    setCalState({...calState, markedDates});
  }, [state.start_date, state.end_date]);

  const setCondition = condition => {
    setMenuVisible(true);
    if (condition) {
      setstate({...state, condition});
    } else {
      setstate({...state, condition, start_date: '', end_date: ''});
      setCalState({...calState, visible: true});
    }
  };

  const fetchListData = async (optional = '') => {
    const {user_id, start_date, end_date} = state;
    let condition = state.condition;

    if (optional != '') {
      condition = optional;
    }
    const body = {
      user_id,
      condition,
      start_date,
      end_date,
    };
    console.log(JSON.stringify(body.condition, null, 2));
    //setstate({...state, isLoading: true});
    const {
      status = false,
      list = [],
      total_income = '0',
      paid_commission = '0',
      unpaid_commission = '0',
      today_income = '0',
      today_income_gift = '0',
      total_income_gift = '0',
      astrologer_incentive = '0',
    } = await EarningApi(body);
    console.log('res status');
    // console.log(JSON.stringify(list, null, 2));
    if (status) {
      setstate({
        ...state,
        list,
        total_income,
        paid_commission,
        unpaid_commission,
        today_income,
        today_income_gift,
        total_income_gift,
        astrologer_incentive,
        isLoading: false,
      });
    } else {
      setstate({...state, isLoading: false});
    }
  };

  const onDayPressHandler = ({dateString}) => {
    let {start_date, end_date} = state;
    const {selectType} = calState;
    if (selectType === 1) {
      start_date = start_date === dateString ? '' : dateString;
    } else {
      end_date = end_date === dateString ? '' : dateString;
    }
    setstate({...state, start_date, end_date});
  };

  const cancelHandler = () => {
    setCalState({...calState, visible: false});
    setCondition('10 data');
  };
  const searchHandler = () => {
    setCalState({...calState, visible: false});
    const {start_date, end_date} = state;
    if (start_date !== '' && end_date !== '') {
      fetchListData('specific_date');
    }
  };
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
              }>{`Start From : ${state.start_date || '- - -'}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              calStyle[calState.selectType === 2 ? 'touch_active' : 'touch']
            }
            onPress={() => setCalState({...calState, selectType: 2})}>
            <Text
              style={
                calStyle[calState.selectType === 2 ? 'text_1' : 'text_2']
              }>{`End From : ${state.end_date || '- - -'}`}</Text>
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
      {SimpleHeader('Earning', () => navigation.goBack())}
      {state.isLoading && <Loader />}
      <View
        style={{
          width: '90%',
          backgroundColor: '#FFC613',
          height: 190,
          justifyContent: 'center',
          marginTop: 20,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        {state.start_date != '' && state.end_date != '' && (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Avenir-Heavy',
              color: '#FFF',
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: 22,
            }}>
            Between {state.start_date} to {state.end_date}
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                color: '#FFF',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 8,
              }}>
              Total Earnings
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Avenir',
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {textInPrice(
                parseFloat(
                  parseFloat(state.total_income) +
                    parseFloat(state.total_income_gift),
                ).toFixed(2),
              )}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                color: '#FFF',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginTop: 8,
              }}>
              Today's Earnings
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Avenir',
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'right',
              }}>
              {textInPrice(
                parseFloat(
                  parseFloat(state.today_income) +
                    parseFloat(state.today_income_gift),
                ).toFixed(2),
              )}
            </Text>
          </View>
        </View>
        {/* 
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Avenir-Heavy',
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 8,
          }}>
          Gift Total Earnings
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Avenir',
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {textInPrice(state.total_income_gift)}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Avenir-Heavy',
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: 8,
          }}>
          Gift Today Earnings
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontFamily: 'Avenir',
            color: '#FFF',
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {textInPrice(state.today_income_gift)}
        </Text> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                color: '#FFF',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Paid Consultancy
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Avenir',
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {textInPrice(parseFloat(state.paid_commission).toFixed(2))}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                color: '#FFF',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Unpaid Consultancy
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Avenir',
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'right',
              }}>
              {textInPrice(parseFloat(state.unpaid_commission).toFixed(2))}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Avenir-Heavy',
                color: '#FFF',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Incentive Earning
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: 'Avenir',
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              {textInPrice(parseFloat(state.astrologer_incentive).toFixed(2))}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          marginVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: '#00000080',
            fontFamily: 'Avenir-Medium',
          }}>
          Earning History
        </Text>

        <View style={styles.menuView}>
          <Menu
            contentStyle={styles.menu}
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Appbar.Action onPress={() => setMenuVisible(true)} />}>
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('10 data')}
              title="Last 10 Consultations"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('7 data')}
              title="View Last week"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('30 data')}
              title="View Last month"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('')}
              title="Custom Dates"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('video')}
              title="Video Earning"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('audio')}
              title="Call Earning"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('chat')}
              title="Chat Earning"
            />
            <Menu.Item
              titleStyle={styles.menuTitleStyle}
              onPress={() => setCondition('report')}
              title="Report Earning"
            />
          </Menu>
        </View>
      </View>

      {state.list.length !== 0 && (
        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={state.list}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem1}
        />
      )}
      {!state.isLoading && state.list.length === 0 && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.nobooking}>No Data found</Text>
        </View>
      )}
      {calState.visible && calendarView()}
    </SafeAreaProvider>
  );
};

export default TotalEarning;
const styles = StyleSheet.create({
  menu: {
    marginTop: 60,
    marginLeft: -10,
  },
  menuView: {
    position: 'absolute',
    right: 5,
  },
  menuTitleStyle: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 12,
    color: '#344356',
  },
  nobooking: {
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
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
    fontSize: 15,
    color: '#979797',
  },
  ft_text_3: {
    fontFamily: 'Avenir-Medium',
    fontSize: '500',
    fontSize: 15,
    color: '#7ED321',
  },
  ft_touch: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: '#7ED321',
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
