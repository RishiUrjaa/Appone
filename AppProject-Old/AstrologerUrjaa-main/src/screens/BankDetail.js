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
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import store from '../redux/store';
import {GetProfileApi} from '../service/Api';
import {globStyle} from '../styles/style';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';

const BankDetail = ({navigation}) => {
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
    // alert(JSON.stringify(user));
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
      {SimpleHeader('Bank Details', () => navigation.goBack())}
      <ScrollView>
        <View
          style={{
            width: Dimensions.get('window').width - 30,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 14,
              color: '#1E1F20',
            }}>
            Bank Account No
          </Text>

          <View
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              marginTop: 5,
              borderColor: '#00000010',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 14,
                color: '#A6A7A9',
                marginTop: 12,
                marginLeft: 10,
              }}>
              {user.bank_account_no}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width - 30,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 14,
              color: '#1E1F20',
            }}>
            Confirm Account No
          </Text>

          <View
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              marginTop: 5,
              borderColor: '#00000010',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 14,
                color: '#A6A7A9',
                marginTop: 12,
                marginLeft: 10,
              }}>
              {user.bank_account_no?.toString()}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width - 30,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 14,
              color: '#1E1F20',
            }}>
            Account Type
          </Text>

          <View
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              marginTop: 5,
              borderColor: '#00000010',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 14,
                color: '#A6A7A9',
                marginTop: 12,
                marginLeft: 10,
              }}>
              {user.account_type?.toString()}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width - 30,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 14,
              color: '#1E1F20',
            }}>
            IFSC Code
          </Text>

          <View
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              marginTop: 5,
              borderColor: '#00000010',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 14,
                color: '#A6A7A9',
                marginTop: 12,
                marginLeft: 10,
              }}>
              {user.ifsc_code?.toString()}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get('window').width - 30,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 14,
              color: '#1E1F20',
            }}>
            Account Holder Name
          </Text>

          <View
            style={{
              width: '100%',
              height: 45,
              borderWidth: 1,
              marginTop: 5,
              borderColor: '#00000010',
            }}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 14,
                color: '#A6A7A9',
                marginTop: 12,
                marginLeft: 10,
              }}>
              {user.bank_holder_name}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default BankDetail;

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
