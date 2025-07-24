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
import Global from './Global';

const BasicKundli = ({data}) => {
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');

  const [detail, setDetail] = useState({});

  useEffect(() => {
    toggleLoading(true);
    const url =
      'https://astroapi-3.divineapi.com/indian-api/v2/basic-astro-details';

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
          //alert(responseJson.message);
        }
      });
  }, []);

  return (
    <View style={{flex: 1}}>
      {state.loading && <Loader />}
      <ScrollView nestedScrollEnabled={true} style={{height: '100%'}}>
        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Full Name' : 'पूरा नाम'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.full_name}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Date' : 'तारीख'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.date}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Year' : 'वर्ष'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.year}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Month' : 'महीना'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.month}</Text>
        </View>
        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Day' : 'दिन'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.day}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Hour' : 'घंटा'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.hour}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Minute' : 'मिनट'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.minute}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Gender' : 'लिंग'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.gender}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Place' : 'जगह'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.place}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Latitude' : 'अक्षांश'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.latitude}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Longitude' : 'देशान्तर'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.longitude}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Timezone' : 'समय क्षेत्र'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.timezone}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Sunrise' : 'सूर्योदय'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.sunrise}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Sunset' : 'सूर्यास्त'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.sunset}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Tithi' : 'तिथि'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.tithi}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Paksha' : 'पक्ष'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.paksha}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Sunsign' : 'कुण्डली'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.sunsign}</Text>
        </View>
        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Moonsign' : 'राशि'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.moonsign}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Rishi_akshar' : 'ऋषि_अक्षर'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.rashi_akshar}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Chandramasa' : 'चंद्रमास'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.chandramasa}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Tatva' : 'तत्व'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.tatva}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Prahar' : 'प्रहार'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.prahar}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Nakshatra' : 'नक्षत्र'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.nakshatra}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Vaar' : 'वार'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.vaar}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Varna' : 'वार्ना'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.varna}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Vashya' : 'वश्य'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.vashya}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Yoni' : 'योनि'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.yoni}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Gana' : 'गण'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.gana}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Nadi' : 'नाड़ी'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.nadi}</Text>
        </View>

        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Yoga' : 'योग'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.yoga}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'karana' : 'करण'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.karana}</Text>
        </View>
        <View style={styles.viewstyle2}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Ayanamsha' : 'अयनांश'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.ayanamsha}</Text>
        </View>

        <View style={styles.viewstyle1}>
          <Text style={styles.textstyle1}>
            {Global.lan == 'en' ? 'Yunja' : 'युंजा'}
          </Text>
          <Text style={styles.textstyle2}>{detail?.yunja}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BasicKundli;

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
