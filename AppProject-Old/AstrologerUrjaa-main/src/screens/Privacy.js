import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import {globStyle} from '../styles/style';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {NotificationApi} from '../service/Api';
import WebView from 'react-native-webview';
const Privacy = ({navigation, route}) => {
  const store = useStore();
  const user_id = store.getState().user.user_id;
  const [state, setstate] = useState({
    isLoading: true,
    list: [],
  });

  return (
    <WebView
      source={{
        uri: 'https://astrourjaa.com/dev/admin/admin_ci/api/astrologer_privacy',
      }}
    />
  );
};

export default Privacy;

const styles = StyleSheet.create({
  fl_container: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 15,
    borderLeftColor: '#FF9445',
    borderLeftWidth: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  fl_image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  fl_view: {
    marginHorizontal: 20,
  },
  fl_title: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#000521',
  },
  fl_date: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#FF9445',
    marginTop: 5,
  },
  noResult: {
    marginTop: '50%',
    alignSelf: 'center',
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  },
});
