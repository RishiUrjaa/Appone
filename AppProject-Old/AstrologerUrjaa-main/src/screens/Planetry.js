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
import Global from './Global';

const Planetry = ({data}) => {
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
      'https://astroapi-3.divineapi.com/indian-api/v1/planetary-positions';

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
          setDetail(responseJson?.data?.planets);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          // alert(responseJson.message);
        }
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      {state.loading && <Loader />}
      <FlatList
        data={detail}
        style={{marginTop: 10, flexGrow: 0}}
        renderItem={({item, index}) => (
          <View
            style={{
              width: window.width - 36,
              alignSelf: 'center',
              paddingVertical: 10,
              backgroundColor: 'white',
              elevation: 5,
              bottom: 8,
              marginTop: 10,
              borderRadius: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#F7F7F7',
                marginTop: -10,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderRadius: 0,
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'AvenirLTStd-Heavy',
                  color: '#333333',
                  marginLeft: 10,
                  marginTop: 5,
                }}>
                {item.name}
              </Text>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginRight: 10,
                }}
                source={{uri: item.image}}
              />
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Name_lan' : 'नाम_लैन'}
              </Text>
              <Text style={styles.textstyle4}>{item.name_lan}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Full_degree' : 'पूर्ण_डिग्री'}
              </Text>
              <Text style={styles.textstyle4}>{item.full_degree}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Speed' : 'रफ़्तार'}
              </Text>
              <Text style={styles.textstyle4}>{item.speed}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Is_retro' : 'रेट्रो है'}
              </Text>
              <Text style={styles.textstyle4}>{item.is_retro}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Is_combusted' : 'दहन हो गया है'}
              </Text>
              <Text style={styles.textstyle4}>{item.is_combusted}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Longitude' : 'देशान्तर'}
              </Text>
              <Text style={styles.textstyle4}>{item.longitude}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Sign' : 'संकेत'}
              </Text>
              <Text style={styles.textstyle4}>{item.sign}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {' '}
                {Global.lan == 'en' ? 'Sign_no' : 'साइन_नो'}
              </Text>
              <Text style={styles.textstyle4}>{item.sign_no}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Rashi_lord' : 'राशि_स्वामी'}
              </Text>
              <Text style={styles.textstyle4}>{item.rashi_lord}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Nakshatra' : 'नक्षत्र'}
              </Text>
              <Text style={styles.textstyle4}>{item.nakshatra}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Nakshatra_pada' : 'नक्षत्र पद'}
              </Text>
              <Text style={styles.textstyle4}>{item.nakshatra_pada}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Nakshatra_no' : 'नक्षत्र_सं'}
              </Text>
              <Text style={styles.textstyle4}>{item.nakshatra_no}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Nakshatra_lord' : 'नक्षत्र स्वामी'}
              </Text>
              <Text style={styles.textstyle4}>{item.nakshatra_lord}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>
                {Global.lan == 'en' ? 'Sublord' : 'उपस्वामी'}
              </Text>
              <Text style={styles.textstyle4}>{item.sub_lord}</Text>
            </View>
            {/* <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>Awastha</Text>
              <Text style={styles.textstyle4}>{item.awastha}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>karakamsha</Text>
              <Text style={styles.textstyle4}>{item.karakamsha}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>House</Text>
              <Text style={styles.textstyle4}>{item.house}</Text>
            </View>
            <View style={styles.viewstyle3}>
              <Text style={styles.textstyle3}>Lord_of</Text>
              <Text style={styles.textstyle4}>{item.lord_of}</Text>
            </View> */}
          </View>
        )}
      />
    </View>
  );
};

export default Planetry;

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
