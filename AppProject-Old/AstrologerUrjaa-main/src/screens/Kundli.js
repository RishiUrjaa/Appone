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
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import BasicKundli from './BasicKundli';
import Planetry from './Planetry';
import KundliGemstone from './KundliGemstone';
import Friend from './Friend';
import Mangalik from './Mangalik';
import Kal from './Kal';
import Shad from './Shad';
import DashaAnalysis from './DashaAnalysis';
import Dasha from './Dasha';

const Kundli = ({navigation, route}) => {
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

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <BasicKundli data={value} />;
      case 'second':
        return <Planetry data={value} />;
      case 'third':
        return <Dasha data={value} />;

      case 'fourth':
        return <Friend data={value} />;

      case 'fifth':
        return <Mangalik data={value} />;
      case 'sixth':
        return <Kal data={value} />;
      case 'seventh':
        return <Shad data={value} />;
      case 'eight':
        return <DashaAnalysis data={value} />;
    }
  };

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
      {route.params.type == '0' && <BasicKundli data={value} />}
      {route.params.type == '2' && <Planetry data={value} />}
      {route.params.type == '3' && <Dasha data={value} />}
      {route.params.type == '4' && <Friend data={value} />}
      {route.params.type == '5' && <Mangalik data={value} />}
      {route.params.type == '6' && <Kal data={value} />}
      {route.params.type == '7' && <Shad data={value} />}
      {route.params.type == '1' && <DashaAnalysis data={value} />}

      {/* <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={props => (
          <TabBar
            style={styles.style}
            labelStyle={styles.labelStyle}
            scrollEnabled={true}
            tabStyle={{height: 50, width: 'auto'}}
            activeColor={'#FEBD57'}
            inactiveColor={'#333333'}
            inactiveOpacity={0.5}
            {...props}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Kundli;

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
