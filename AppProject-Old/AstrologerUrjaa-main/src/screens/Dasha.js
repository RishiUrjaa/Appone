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
import moment from 'moment';

const Dasha = ({data}) => {
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');

  const [detail, setDetail] = useState([]);
  const [antar, setAntar] = useState([]);
  const [pray, setPra] = useState([]);
  const [index, selectedIndex] = useState(0);
  const renderAntarDasha = ({item, index}) => (
    <Pressable
      onPress={() => {
        selectedIndex(2);
        const antarDashaArray = Object.keys(item.value.pratyantar_dasha).map(
          key => ({
            key,
            value: item.value.pratyantar_dasha[key],
          }),
        );
        setPra(antarDashaArray);
      }}>
      <View
        style={[
          styles.mahaDashaContainer,
          {backgroundColor: index % 2 == 0 ? '#D3D3D3' : 'white'},
        ]}>
        <Text style={styles.mahaDashaText}>
          {item.key}:{' '}
          {item.value.start_time == '--'
            ? '--'
            : moment(item.value.start_time).format('DD-MMM-YYYY')}{' '}
          -{' '}
          {item.value.end_time == '--'
            ? '--'
            : moment(item.value.end_time).format('DD-MMM-YYYY')}
        </Text>
      </View>
    </Pressable>
  );

  const renderAntarDasha1 = ({item}) => (
    <View
      style={[
        styles.mahaDashaContainer,
        {backgroundColor: index % 2 == 0 ? '#D3D3D3' : 'white'},
      ]}>
      <Text style={styles.mahaDashaText}>
        {item.key}:{' '}
        {item.value.start_time == '--'
          ? '--'
          : moment(item.value.start_time).format('DD-MMM-YYYY')}{' '}
        -{' '}
        {item.value.end_time == '--'
          ? '--'
          : moment(item.value.end_time).format('DD-MMM-YYYY')}
      </Text>
    </View>
  );
  const renderMahaDasha = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          selectedIndex(1);
          const antarDashaArray = Object.keys(item.value.antar_dasha).map(
            key => ({
              key,
              value: item.value.antar_dasha[key],
              p: item.pratyantar_dasha,
            }),
          );
          setAntar(antarDashaArray);
        }}>
        <View
          style={[
            styles.mahaDashaContainer,
            {backgroundColor: index % 2 == 0 ? '#D3D3D3' : 'white'},
          ]}>
          <Text style={styles.mahaDashaText}>
            {item.key}: {moment(item.value.start_date).format('DD-MMM-YYYY')} -{' '}
            {moment(item.value.end_date).format('DD-MMM-YYYY')}
          </Text>
          {/* <FlatList
          data={antarDashaArray}
          renderItem={renderAntarDasha}
          keyExtractor={antarDashaItem => antarDashaItem.key}
        /> */}
        </View>
      </Pressable>
    );
  };

  // const mahaDashaArray = Object.keys(detail?.maha_dasha).map(key => ({
  //   key,
  //   value: detail?.maha_dasha[key],
  // }));
  useEffect(() => {
    const url =
      'https://astroapi-3.divineapi.com/indian-api/v1/vimshottari-dasha';

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
        console.log('Hello');
        console.log(JSON.stringify(responseJson));
        console.log('Bye');
        if (responseJson.success == '1') {
          //   alert(JSON.stringify(responseJson));
          // setDetail(responseJson?.data);
          //  setDetail(responseJson.data);
          let mahaDashaArray = Object.keys(responseJson?.data?.maha_dasha).map(
            key => ({
              key,
              value: responseJson?.data?.maha_dasha[key],
            }),
          );
          setDetail(mahaDashaArray);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          alert(JSON.stringify(responseJson));
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'AvenirLTStd-Medium',
            fontSize: 22,
            margin: 12,
            color: 'black',
          }}>
          {index == 0
            ? 'Maha Dasha'
            : index == 1
            ? 'Antar Dasha'
            : 'Pryantar Dasha'}
        </Text>

        {index == 0 && (
          <FlatList
            data={detail}
            renderItem={renderMahaDasha}
            keyExtractor={mahaDashaItem => mahaDashaItem.key}
          />
        )}
        {index == 1 && (
          <FlatList
            data={antar}
            renderItem={renderAntarDasha}
            keyExtractor={mahaDashaItem => mahaDashaItem.key}
          />
        )}
        {index == 2 && (
          <FlatList
            data={pray}
            renderItem={renderAntarDasha1}
            keyExtractor={mahaDashaItem => mahaDashaItem.key}
          />
        )}

        {[1, 2].includes(index) && (
          <Pressable
            onPress={() => {
              selectedIndex(index - 1);
            }}>
            <View
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 40,
                borderRadius: 12,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  alignSelf: 'center',
                  fontFamily: 'AvenirLTSTd-Medium',
                }}>
                Back
              </Text>
            </View>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default Dasha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  mahaDashaContainer: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  mahaDashaText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'AvenirLTStd-Heavy',
    textAlign: 'center',
    marginTop: 6,
  },
  antarDashaContainer: {
    paddingLeft: 10,
  },
  antarDashaText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'AvenirLTStd-Heavy',
  },
});
