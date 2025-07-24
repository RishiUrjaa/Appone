import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
import Lightbox from 'react-native-lightbox-v2';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import {globStyle} from '../styles/style';
import moment from 'moment';
import GLOBAL from './Global';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
const window = Dimensions.get('window');
import NotificationHeader from './NotificationHeader';
import {NotificationApi, DeleteNotification} from '../service/Api';
const Notification = ({navigation, route}) => {
  const store = useStore();
  const [selectedindex, setSelectedIndex] = React.useState(-1);
  const user_id = store.getState().user.user_id;
  const [state, setstate] = useState({
    isLoading: true,
    list: [],
  });
  useEffect(() => {
    (async () => {
      call();
    })();
  }, []);

  const call = async () => {
    const {status = false, list = []} = await NotificationApi({user_id});
    if (!status) {
    }
    setstate({...state, list, isLoading: false});
  };
  return (
    <SafeAreaView>
      <StatusBarDark />

      {state.list.length === 0 && !state.isLoading && (
        <Text style={styles.noResult}>No Notification Found</Text>
      )}
      <FlatList
        style={{
          marginTop: 0,
          marginLeft: 5,
          width: window.width - 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
        data={state.list}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                color: 'white',
                flex: 1,
                margin: 10,
                borderRadius: 9,
                width: window.width - 30,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View style={{}}>
                <View style={{marginTop: 4}}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain',
                        marginTop: 12,
                        marginLeft: 4,
                      }}
                      source={require('../assets/bell.png')}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: GLOBAL.medium,
                          color: '#1E1F20',
                          fontSize: 18,
                          marginLeft: 6,
                          width: Dimensions.get('window').width - 110,
                          marginTop: 8,
                        }}>
                        {item.title}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'AvenirLTStd-Medium',
                          color: 'grey',
                          fontSize: 12,
                          marginLeft: 6,
                          width: 250,

                          marginTop: 2,
                          lineHeight: 16,
                        }}>
                        {item.notification}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'AvenirLTStd-Medium',
                          color: '#A6A7A9',
                          fontSize: 14,
                          marginLeft: 6,
                          marginBottom: 8,
                          fontWeight: 'bold',

                          marginTop: 4,
                        }}>
                        {moment(item.added_on).fromNow()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Notification;

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
