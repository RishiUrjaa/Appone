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
import PujaHeader1 from './PujaHeader1';
import {getIncremental} from 'react-native-device-info';
import Loader from '../utils/Loader';

const Friend = ({data}) => {
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');

  const [detail, setDetail] = useState([]);

  useEffect(() => {
    toggleLoading(true);
    const url =
      'https://astroapi-3.divineapi.com/indian-api/v1/composite-friendship';

    fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdHJvYXBpLTEuZGl2aW5lYXBpLmNvbS9hcGkvYXV0aC1hcGktdXNlciIsImlhdCI6MTcwODYwMTc1MiwibmJmIjoxNzA4NjAxNzUyLCJqdGkiOiJiRGpad2xTU1NzZ2tZa1Z2Iiwic3ViIjoiMTU1MiIsInBydiI6ImU2ZTY0YmIwYjYxMjZkNzNjNmI5N2FmYzNiNDY0ZDk4NWY0NmM5ZDcifQ.ewzPVCXkrWeFL1cIPXI_z8FEQM38AsYGgeL0GKxNvjg',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        toggleLoading(false);
        if (responseJson.success == '1') {
          // setDetail(responseJson?.data);

          const naturalFriendshipArray = Object.entries(
            responseJson?.data?.natural_friendship,
          );

          // Sort array based on keys
          naturalFriendshipArray.sort((a, b) => a[0].localeCompare(b[0]));

          // Map each item to a format suitable for FlatList
          const flatListData = naturalFriendshipArray.map(([key, value]) => ({
            key,
            value,
          }));
          setDetail(flatListData);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          alert(responseJson.message);
        }
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      {state.loading && <Loader />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FEBD57B2',
          marginTop: 10,
          paddingVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'AvenirLTStd-Heavy',
            color: '#333333',
            marginHorizontal: 18,
            paddingVertical: 5,
          }}>
          Permanent Friendship
        </Text>
      </View>

      <View
        style={{
          backgroundColor: 'white',
          marginTop: 13,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{marginLeft: 63}}>
          <Text style={styles.snotext}>SU</Text>
        </View>
        <Text style={styles.snotext}>MO</Text>
        <Text style={styles.snotext}>MA</Text>
        <Text style={styles.snotext}>ME</Text>
        <Text style={styles.snotext}>JU</Text>
        <Text style={styles.snotext}>VE</Text>
        <Text style={styles.snotext}>SA</Text>
      </View>

      <FlatList
        data={detail}
        renderItem={({item, index}) => (
          <View
            style={{
              width: window.width,
              alignSelf: 'center',
              paddingVertical: 10,
              backgroundColor: 'white',
              marginTop: 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                backgroundColor: index % 2 === 0 ? '#FFF2D8' : 'white',
              }}>
              <Text style={styles.multitext}>{item.key}</Text>
              <Text style={styles.multitext}>{item.value?.Sun?.charAt(0)}</Text>
              <Text style={styles.multitext}>
                {item.value?.Moon?.charAt(0)}
              </Text>

              <Text style={styles.multitext}>
                {item.value?.Mars?.charAt(0)}
              </Text>
              <Text style={styles.multitext}>
                {item.value?.Mercury?.charAt(0)}
              </Text>
              <Text style={styles.multitext}>
                {item.value?.Jupiter?.charAt(0)}
              </Text>
              <Text style={styles.multitext}>
                {item.value?.Venus?.charAt(0)}
              </Text>
              <Text style={styles.multitext}>
                {item.value?.Saturn?.charAt(0)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Friend;

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
