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
import Loader from '../utils/Loader';

const KundliGemstone = ({data}) => {
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
      'https://astroapi-3.divineapi.com/indian-api/v1/gemstone-suggestion';

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
          setDetail(responseJson?.data);
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
              paddingVertical: 5,
            }}>
            Lucky Stone
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Primary</Text>
          <Text style={styles.textstyle4}>
            {detail?.lucky_stone?.gemstones.Primary}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Secondary</Text>
          <Text style={styles.textstyle4}>
            {detail?.lucky_stone?.gemstones.Secondary}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Day_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.lucky_stone?.day_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Finger_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.lucky_stone?.finger_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Time_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.lucky_stone?.time_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Mantra</Text>
          <Text style={styles.textstyle4}>{detail?.lucky_stone?.mantra}</Text>
        </View>
      </View>

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
              paddingVertical: 5,
            }}>
            Life Stone
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Primary</Text>
          <Text style={styles.textstyle4}>
            {detail?.life_stone?.gemstones.Primary}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Secondary</Text>
          <Text style={styles.textstyle4}>
            {detail?.life_stone?.gemstones.Secondary}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Day_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.life_stone?.day_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Finger_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.life_stone?.finger_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Time_to_wear</Text>
          <Text style={styles.textstyle4}>
            {detail?.life_stone?.time_to_wear}
          </Text>
        </View>
        <View style={styles.viewstyle3}>
          <Text style={styles.textstyle3}>Mantra</Text>
          <Text style={styles.textstyle4}>{detail?.life_stone?.mantra}</Text>
        </View>
      </View>
    </View>
  );
};

export default KundliGemstone;

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
