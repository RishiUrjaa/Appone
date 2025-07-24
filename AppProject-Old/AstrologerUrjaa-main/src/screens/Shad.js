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

import {getIncremental} from 'react-native-device-info';
import Loader from '../utils/Loader';

const Shad = ({data}) => {
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');

  const [detail, setDetail] = useState({});

  useEffect(() => {
    toggleLoading(true);
    const url = 'https://astroapi-3.divineapi.com/indian-api/v1/sadhe-sati';

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
          setDetail(responseJson.data);
          // setDetail(responseJson?.data?.planets);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          alert(responseJson.message);
        }
      });
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      {state.loading && <Loader />}
      <FlatList
        data={['']}
        style={{flexGrow: 0, marginTop: 10}}
        renderItem={({item, index}) => (
          <View
            style={{
              marginHorizontal: 18,
              paddingVertical: 10,
              backgroundColor: '#EEE4FF',
              borderRadius: 12,
              elevation: 5,
              bottom: 10,
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#333333',
                  fontFamily: 'AvenirLTStd-Heavy',
                  marginHorizontal: 10,
                }}>
                Status
              </Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                lineHeight: 26,
                textAlign: 'justify',
                marginTop: 7,
                fontFamily: 'AvenirLTStd-Medium',
                marginHorizontal: 10,
              }}>
              {detail?.sadhesati?.result == true
                ? 'Yes Current you are not undergoing sadesathi'
                : 'No Current you are not undergoing sadesathi'}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: '#000000',
                lineHeight: 26,
                textAlign: 'justify',
                marginTop: 7,
                fontFamily: 'AvenirLTStd-Medium',
                marginHorizontal: 10,
              }}>
              Saturn Sign :{detail?.sadhesati?.saturn_sign}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          backgroundColor: 'white',
          marginTop: -13,
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.snotext}>Date</Text>
        <Text style={styles.snotext}>Sign Name</Text>
        <Text style={styles.snotext}>Retro</Text>
        <Text style={styles.snotext}>Phase</Text>
      </View>

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
            width: window.width,

            backgroundColor: '#FFFFFF',
          }}>
          {detail?.sadhesati_life_analysis?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  backgroundColor: index % 2 === 0 ? '#FFF2D8' : 'white',
                }}>
                <View style={{marginLeft: 18}}>
                  <Text style={styles.multitext}>{item.sign_symbol}</Text>
                </View>
                <Text style={styles.multitext}>{item.sign_name}</Text>
                <Text style={styles.multitext}>{item.is_retro}</Text>
                <View style={{marginRight: 18}}>
                  <Text style={styles.multitext}>{item.phase}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Shad;

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
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Roman',
  },
});
