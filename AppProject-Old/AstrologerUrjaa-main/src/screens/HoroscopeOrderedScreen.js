import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  StyleSheet,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {useStore} from 'react-redux';
import {HoroscopeHistoryApi} from '../service/Api';
import Loader from '../utils/Loader';

const HoroscopeOrderedScreen = ({navigation}) => {
  const store = useStore();
  const [state, setState] = useState({
    lists: [],
    isLoading: true,
  });

  const [selectedIndex, setselectedIndex] = useState(0);
  const toggleLoading = isLoading => setState({...state, isLoading});
  const listView = (key, value) => (
    <View style={styles.ft_view}>
      <Text style={styles.ft_text_1}>{key}</Text>
      <Text style={styles.ft_text_2}>{value}</Text>
    </View>
  );
  const renderItem = ({item}) => (
    <TouchableOpacity
      key={`key_${item.id}`}
      style={styles.ft_touch}
      onPress={() => {
        if (selectedIndex == 1) {
          alert(JSON.stringify(item.horoscope_message));
        } else {
          navigation.navigate('HoroscopeDetail', item);
        }
      }}>
      {listView('Name', item.user_name)}
      {listView('Date of Birth', item.user_dob)}
      {listView('Place of Birth', item.user_pob)}
      {listView('Time of Birth', item.user_tob)}
      {listView('Problem Area', item.problem_area)}
      {listView('Report Type', item.horoscope_name)}
      {listView('Post Date', item.added_on)}
      {listView('Status', item.stat_us)}
      {listView('Booking amount :', '₹' + item.payable_amount)}
      {item.stat_us == 'completed' &&
        listView('Commison amount :', '₹' + item.astrologer_comission_amount)}

      {selectedIndex == 0 && (
        <View
          style={{
            backgroundColor: '#FFC613',
            borderRadius: 1,
            height: 40,
            width: '100%',
            marginTop: 4,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Avenir-Medium',
              textAlign: 'center',
              marginTop: 8,
            }}>
            Upload Report
          </Text>
        </View>
      )}

      {selectedIndex == 1 && (
        <View
          style={{
            backgroundColor: '#FFC613',
            borderRadius: 1,
            height: 40,
            width: '100%',
            marginTop: 4,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Avenir-Medium',
              textAlign: 'center',
              marginTop: 8,
            }}>
            View Report
          </Text>
        </View>
      )}

      {/* {listView('Status', item.status)} */}
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchListData('pending');
  }, []);

  const hi = event => {
    setselectedIndex(event.nativeEvent.selectedSegmentIndex);

    var a = 'pending';
    if (event.nativeEvent.selectedSegmentIndex == 0) {
      a = 'pending';
    } else {
      a = 'complete';
    }

    fetchListData(a);
    //
    //       var b = {
    //         user_id: store.getState().user.user_id,
    //         status:a
    //       }
    // console.log(JSON.stringify(b))
    //       const {status = false, lists = []} =   HoroscopeHistoryApi({
    //         user_id: store.getState().user.user_id,
    //         status:a
    //       });
    //       if (status) {
    //         alert(JSON.stringify(lists))
    //         setState({...state, lists, isLoading: false});
    //         // console.log(JSON.stringify(lists, null, 2));
    //       } else {
    //         toggleLoading(false);
    //       }
  };

  const fetchListData = async a => {
    // console.log(store.getState().user.user_id);
    const {status = false, lists = []} = await HoroscopeHistoryApi({
      user_id: store.getState().user.user_id,
      status: a,
    });
    if (status) {
      console.log(JSON.stringify(lists));
      setState({...state, lists, isLoading: false});
      // console.log(JSON.stringify(lists, null, 2));
    } else {
      toggleLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}
      {SimpleHeader('Report', () => navigation.goBack())}
      <View style={styles.mainView}>
        <SegmentedControl
          values={['Pending', 'Completed']}
          selectedIndex={selectedIndex}
          onChange={event => {
            hi(event);
          }}
        />
        {state.lists.length !== 0 && (
          <FlatList
            data={state.lists}
            horizontal={false}
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default HoroscopeOrderedScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  ft_touch: {
    margin: 20,
    marginBottom: 10,
    paddingVertical: 1,
    borderRadius: 5,
    backgroundColor: 'white',
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
  },
  ft_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  ft_text_1: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: 'black',
  },
  ft_text_2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
  noResult: {
    marginTop: '50%',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
});
