import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SimpleHeader} from '../utils/Header';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import {useEffect} from 'react';
import {useStore} from 'react-redux';
import {CancelAstrologerBookingsApi} from '../service/Api';
import Loader from '../utils/Loader';

const PremiumAstrologerBookingDetail = ({navigation, route}) => {
  const store = useStore();
  const [state, setState] = useState({
    user_id: store.getState().user.user_id,
    id: route.params.id,
    isLoading: false,
  });
  useEffect(() => {
    console.log(JSON.stringify(route.params, null, 2));
  });

  const cancelHandler = async () => {
    setState({...state, isLoading: true});
    const {user_id, id} = state;
    const body = {user_id, id};
    console.log(body);
    const {status = false} = await CancelAstrologerBookingsApi(body);
    // console.log(res);
    setState({...state, isLoading: false});
    if (status) {
      Alert.alert('Successfully', 'Request Cancel Successfully', [
        {
          text: 'OK',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            }),
        },
      ]);
    } else {
      Alert.alert(
        'Reques Failed',
        'Something Went Wrong. Please try again',
        [{text: 'Ok'}],
        {cancelable: false},
      );
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      {SimpleHeader('Booking Detail', () => navigation.goBack())}
      <View style={styles.ft_container}>
        <View style={styles.ft_h1}>
          <Image
            style={styles.ft_image}
            source={require('../assets/profileimg.png')}
          />
          <Text style={styles.ft_t1}>Personal Details</Text>
        </View>
        <View style={styles.ft_h2}>
          <Text style={styles.ft_t2}>{`Name: ${route.params.user_name}`}</Text>
          <Text
            style={
              styles.ft_t2
            }>{`Date of Birth: ${route.params.user_dob}`}</Text>
        </View>
      </View>
      <View style={styles.ft_container}>
        <View style={styles.ft_h1}>
          <Image style={styles.ft_image} source={require('../assets/ic.png')} />
          <Text style={styles.ft_t1}>Booking Details</Text>
        </View>
        <View style={styles.ft_h2}>
          <Text
            style={
              styles.ft_t2
            }>{`Service: ${route.params.booking_mode}`}</Text>
        </View>
      </View>
      <View style={styles.ft_container}>
        <View style={styles.ft_h1}>
          <Image style={styles.ft_image} source={require('../assets/ca.png')} />
          <Text style={styles.ft_t1}>Booking Date & Time</Text>
        </View>
        <View style={styles.ft_h2}>
          <Text style={styles.ft_t2}>{route.params.booking_date}</Text>
        </View>
      </View>
      {route.params.cancel_power === 1 && (
        <TouchableOpacity style={styles.ft_touch} onPress={cancelHandler}>
          <Text style={styles.ft_touch_text}>Cancel</Text>
        </TouchableOpacity>
      )}
    </SafeAreaProvider>
  );
};

export default PremiumAstrologerBookingDetail;

const styles = StyleSheet.create({
  ft_container: {
    marginHorizontal: 20,
    marginTop: 30,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#C8C8D3',
    borderBottomWidth: 1,
  },
  ft_h2: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  ft_image: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  ft_t1: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 16,
    color: '#1E1F20',
    paddingHorizontal: 20,
  },
  ft_t2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#1E1F20',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  ft_touch: {
    borderColor: '#F97012',
    borderWidth: 1,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 40,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  ft_touch_text: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: '900',
    fontSize: 16,
    color: '#1E1F20',
  },
});
