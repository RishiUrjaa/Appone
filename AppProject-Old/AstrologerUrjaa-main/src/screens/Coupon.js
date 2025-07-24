import React, {useEffect, useState} from 'react';

import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import {CouponApi, PoojaCouponApi} from '../service/Api';
import {globStyle} from '../styles/style';
import {SubmitButton} from '../utils/Button';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import Loader from '../utils/Loader';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
const Coupon = ({navigation, route}) => {
  const store = useStore();
  const [state, setState] = useState({
    isLoading: true,
    expire: '',
    percentage: '',
    lists: [],
    puja_id: '',
  });

  useEffect(() => {
    console.log('route');
    console.log(route.params);
    fetchPoojaList();
  }, []);

  const fetchPoojaList = async () => {
    const body = {user_id: store.getState().user.user_id};
    console.log(body);
    const {status = false, puja_lists = []} = await PoojaCouponApi(body);
    setState({...state, lists: puja_lists, isLoading: false});
    if (!status) {
      alert('Something went wrong Please try later');
    }
  };
  const generateHandler = async () => {
    if (state.puja_id === '') {
      alert('Please Select Puja');
      return;
    }
    if (state.percentage === '') {
      alert('Please enter discount upto 25');
      return;
    }

    const body = {
      astrologer_id: store.getState().user.user_id,
      user_id: route.params.user_id,
      puja_id: state.puja_id,
      id: route.params.id,
      percentage: state.percentage,
    };
    console.log(body);
    setState({...state, isLoading: true});
    const {status = false} = await CouponApi(body);
    setState({...state, isLoading: false});
    if (status) {
      Alert.alert('Coupon Applied', 'Coupon Applied Successfully', [
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
      alert('Something went wrong please try later');
    }
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      {SimpleHeader('Coupon', () => navigation.goBack())}
      <KeyboardAwareScrollView contentContainerStyle={styles.view_main}>
        <Text style={styles.label}>Discount</Text>
        <View style={styles.outerView}>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            placeholder={'discount % ( 1 - 25 )'}
            keyboardType={'number-pad'}
            onChangeText={(percentage) => {
              if (
                (typeof +percentage === 'number' &&
                  +percentage > 0 &&
                  +percentage < 26) ||
                percentage === ''
              ) {
                setState({...state, percentage});
              }
            }}
            value={state.percentage}
          />
        </View>
        <Dropdown
          label="Puja Type"
          containerStyle={{
            marginHorizontal: 30,
            marginBottom: 20,
          }}
          data={state.lists}
          onChangeText={(puja_id) => setState({...state, puja_id})}
          labelExtractor={(item) => item.name}
          valueExtractor={(item) => item.id}
        />
        {SubmitButton('Generate', generateHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#69707F',
    marginHorizontal: 30,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    alignSelf: 'center',
  },

  outerView: {
    flexDirection: 'row',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '82%',
    alignSelf: 'center',
  },
  view_main: {
    flex: 1,
    justifyContent: 'center',
  },
});
