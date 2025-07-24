import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from 'react-native-button';

const Kundli1 = ({navigation, route}) => {
  const [value, setValue] = useState(route.params);

  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');

  const detail = [{}, {}];
  const detail1 = [{}, {}];
  const session = [{}, {}];

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Basic'},
    {key: 'eight', title: 'Chart'},
    {key: 'second', title: 'Planetry'},
    {key: 'third', title: 'Dasha'},
    {key: 'fourth', title: 'Friendship'},
    {key: 'fifth', title: 'Manglik Dosha'},
    {key: 'sixth', title: 'Kaal Sarpa Dosha'},
    {key: 'seventh', title: 'SadeSathi'},
  ]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#FEBD57" />
      {state.loading && <Loader />}

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '0';
          navigation.navigate('Kundli', route.params);
        }}>
        BASIC DETAIL
      </Button>

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '1';
          navigation.navigate('Kundli', route.params);
        }}>
        Chart
      </Button>

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '2';
          navigation.navigate('Kundli', route.params);
        }}>
        Planetery Position
      </Button>

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '3';
          navigation.navigate('Kundli', route.params);
        }}>
        Dasha
      </Button>

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '4';
          navigation.navigate('Kundli', route.params);
        }}>
        Friendship
      </Button>

      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '5';
          navigation.navigate('Kundli', route.params);
        }}>
        Manglikdosha
      </Button>
      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '6';
          navigation.navigate('Kundli', route.params);
        }}>
        Kal Sarpa Dosha
      </Button>
      <Button
        style={{
          fontSize: 17,
          padding: 8,
          color: '#1E1F20',
          backgroundColor: '#FFC629',
          height: 40,
          borderRadius: 8,
          width: '90%',
          alignSelf: 'center',
          marginTop: 12,
        }}
        onPress={() => {
          route.params.type = '7';
          navigation.navigate('Kundli', route.params);
        }}>
        Sadesathi
      </Button>
    </SafeAreaView>
  );
};

export default Kundli1;

const styles = StyleSheet.create({
  style: {
    backgroundColor: '#FFF2D8',
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Heavy',
    color: '#333333',
    textTransform: 'capitalize',
    marginHorizontal: 15,
  },
  indicatorStyle: {
    backgroundColor: '#FEBD57',
    height: 2,
  },
  viewstyle1: {
    backgroundColor: 'white',
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textstyle1: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Medium',
    marginLeft: 18,
  },
  textstyle2: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Heavy',
    marginRight: 18,
    textAlign: 'right',
    width: Dimensions.get('window').width - 220,
  },
  viewstyle2: {
    backgroundColor: '#FFF2D8',
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textstyle3: {
    fontSize: 14,
    color: '#191D2166',
    fontFamily: 'AvenirLTStd-Medium',
    marginLeft: 10,
  },
  textstyle4: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Heavy',
    marginRight: 10,
    textAlign: 'right',
    width: Dimensions.get('window').width - 200,
  },
  viewstyle3: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snotext: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Medium',
    marginTop: 15,
  },
  multitext: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Roman',
  },
});
