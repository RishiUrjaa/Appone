import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {useStore} from 'react-redux';
import {useEffect} from 'react';
import {PremiumAstrologerApi} from '../service/Api';
import Loader from '../utils/Loader';

const PremiumAstrologer = ({navigation}) => {
  const store = useStore();
  const [state, setstate] = useState({
    user_id: store.getState().user.user_id,
    lists: [],
    isLoading: true,
  });
  const fieldView = (title, label) => (
    <View style={styles.ft_h2}>
      <Text style={styles.ft_t3}>{title}</Text>
      <Text style={styles.ft_t4}>{label}</Text>
    </View>
  );

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const body = {
      user_id: store.getState().user.user_id,
      specific_date: '',
      specific_date_end: '',
    };
    // console.log(body);
    const {status = false, lists = []} = await PremiumAstrologerApi(body);
    // console.log(lists);
    if (status) {
      setstate({...state, lists, isLoading: false});
      console.log(JSON.stringify(lists, null, 2));
    } else {
      setstate({...state, isLoading: false});
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      {SimpleHeader('Premium Astrologer', () => navigation.goBack())}
      {state.lists.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No order Found</Text>
      )}
      <FlatList
        data={state.lists}
        contentContainerStyle={{
          paddingBottom: 30,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={`ft_${item.id}`}
            style={styles.ft_container}
            onPress={() =>
              navigation.navigate('PremiumAstrologerBookingDetail', item)
            }>
            <View style={styles.ft_h1}>
              <Text style={styles.ft_t1}>{`Booking ID #\n${item.id}`}</Text>
              <Text style={styles.ft_t2}>{item.booking_date}</Text>
            </View>
            {fieldView('Name', item.user_name)}
            {fieldView('Date & Time', item.booking_date)}
            {fieldView('Service', item.booking_mode)}
            <View style={styles.ft_h3}>
              {item.coupan_code_create === 1 && (
                <TouchableOpacity
                  style={{marginRight: 'auto'}}
                  onPress={() =>
                    navigation.navigate('Coupon', {
                      id: item.id,
                      user_id: item.user_id,
                    })
                  }>
                  <Text style={styles.hs_gen}>Generate Coupon</Text>
                </TouchableOpacity>
              )}
              {item.cancel_power === 1 && (
                <View style={styles.ft_cancel}>
                  <Text style={styles.ft_t5}>Cancel</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaProvider>
  );
};

export default PremiumAstrologer;

const styles = StyleSheet.create({
  ft_container: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
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
  ft_h1: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#C8C8D3',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  ft_h2: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ft_h3: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: '#C8C8D3',
    borderTopWidth: 1,
  },
  ft_t1: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 15,
    color: '#1E1F20',
  },
  ft_t2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 12,
    color: '#9F9F9F',
  },
  ft_t3: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 12,
    color: '#83878E',
  },
  ft_t4: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 12,
    color: '#000000',
  },
  ft_t5: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF002F',
  },
  ft_cancel: {
    padding: 5,
  },
  hs_gen: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#1E1F20',
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
