import moment from 'moment';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import store from '../redux/store';
import {GetProfileApi} from '../service/Api';
import {globStyle} from '../styles/style';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';

const ProfileScreen = ({navigation}) => {
  const {user} = useSelector(state => state);

  const getProfile = async () => {
    const {status = false, user_details = {}} = await GetProfileApi({
      user_id: store.getState().user.user_id,
    });

    dispatch(
      actions.Login({
        ...user_details,
        app_status: app_status === '1',
        approved: approved === '1',
      }),
    );
  };

  useEffect(() => {
    getProfile();
  }, []);

  const fildView = (title, value, source) => (
    <View style={styles.vt_container}>
      <View style={styles.vt_view}>
        <Image
          style={styles.vt_image}
          source={source}
          // source={require('../assets/avatar.png')}
        />
        <Text style={styles.vt_text_1}>{title}</Text>
      </View>
      <Text style={styles.vt_text_2}>{value}</Text>
    </View>
  );
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('MyProfile', () => navigation.goBack())}
      <View>
        <View
          style={{
            width: Dimensions.get('window').width - 20,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            alignSelf: 'center',
            height: 150,
            marginTop: 10,
            borderRadius: 12,
          }}>
          <View style={{}}>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Image
                style={{width: 60, height: 60, borderRadius: 40, margin: 5}}
                source={{uri: user.image}}
              />
              <View>
                <Text
                  style={{
                    fontFamily: 'AvenirLTStd-Heavy',
                    fontSize: 18,
                    marginTop: 12,
                    color: '#1E1F20',
                  }}>
                  {user.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'AvenirLTStd-Medium',
                    fontSize: 15,
                    color: '#A6A7A9',
                  }}>
                  {user.gender}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'AvenirLTStd-Medium',
                  fontSize: 14,
                  color: '#1E1F20',
                  marginLeft: 10,
                }}>
                {user.email}
              </Text>
              <Image
                style={{width: 12, height: 12, margin: 3}}
                source={require('../assets/tick.png')}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'AvenirLTStd-Medium',
                  fontSize: 14,
                  color: '#1E1F20',
                  marginLeft: 10,
                }}>
                {user.mobile}
              </Text>
              <Image
                style={{width: 12, height: 12, margin: 3}}
                source={require('../assets/tick.png')}
              />
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('BasicDetail');
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 20,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
              alignSelf: 'center',
              height: 60,
              marginTop: 20,
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              Basic Details
            </Text>

            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 12,
                marginTop: 16,
              }}
              source={require('../assets/rightArrow.png')}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('BankDetail');
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 20,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
              alignSelf: 'center',
              height: 60,
              marginTop: 20,
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              Bank Details
            </Text>

            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 12,
                marginTop: 16,
              }}
              source={require('../assets/rightArrow.png')}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Document');
          }}>
          <View
            style={{
              width: Dimensions.get('window').width - 20,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
              alignSelf: 'center',
              height: 60,
              marginTop: 20,
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              Documents
            </Text>

            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                marginRight: 12,
                marginTop: 16,
              }}
              source={require('../assets/rightArrow.png')}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  pro_v1: {
    alignItems: 'center',
    marginVertical: 20,
  },
  pro_v2: {
    marginBottom: 15,
    marginHorizontal: 30,
  },
  pro_image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -50,
  },
  pro_name: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1D1E2C',
  },
  pro_type: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#69707F',
  },
  pro_value: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 20,
    color: '#1D1E2C',
    paddingHorizontal: 10,
  },
  bt_container: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  bt_view_1: {
    margin: 20,
    width: '85%',
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    top: -130,
    padding: 10,
    paddingTop: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  vt_container: {
    margin: 20,
    marginVertical: 10,
    width: '85%',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  vt_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vt_image: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  vt_text_1: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '400',
    fontSize: 18,
    color: '#69707F',
    marginLeft: 15,
  },
  vt_text_2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
    marginLeft: 30,
    paddingVertical: 5,
  },
});

const headerStyle = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    height: height * 0.35,
    justifyContent: 'space-between',
    backgroundColor: '#FFC613',
  },
  container_inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    paddingHorizontal: 20,
  },
  backImage: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
  },
  touch: {
    padding: 10,
  },
  editImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  editTouch: {
    padding: 5,
    marginLeft: 'auto',
    marginRight: 10,
  },
  bottomView: {
    backgroundColor: 'white',
    height: height * 0.3 * 0.15,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
});
