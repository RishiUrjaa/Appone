import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  NativeModules,
} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import DatePickers from 'react-native-date-picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {TextField} from 'react-native-material-textfield-plus';
import {SubmitButton} from '../utils/Button';
const {width, height} = Dimensions.get('window');
import {CreatBroadcastApi} from '../service/Api';
import {useStore} from 'react-redux';
import Global from './Global';
const {Agora} = NativeModules;
const {FPS30, AudioProfileDefault, AudioScenarioDefault, Host, Adaptative} =
  Agora;

const Gift = ({navigation, route}) => {
  const store = useStore();
  const {user} = store.getState();
  const [date, setDate] = useState('');
  const [dateq, setDateq] = useState('');
  const [value, setLanguage] = useState('');
  const [array, setArray] = useState([]);
  const [selectedId, setSelectedId] = useState(true);
  const [show, setShow] = useState(false);
  const [startTime, setstartTime] = useState('');
  const [visible, setvisible] = useState(false);
  const [endTime, setendTime] = useState('');
  const [showq, setShowq] = useState(false);
  const [state, setState] = useState({
    astrologer_id: store.getState().user.user_id,
    title: '',
    description: '',
    special_discount: '',
  });
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setstartTime(moment(selectedDate).format('HH:mm'));
  };
  const onChangeq = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowq(false);
    setendTime(moment(selectedDate).format('HH:mm'));
  };
  useEffect(() => {
    console.log(selectedId ? 'tt' : 'ff');
    setSelectedId(!selectedId);
  }, [array]);
  useEffect(() => {
    const url = 'http://astrourjaa.com:5050/api/fetch_gifts'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))
        if (responseJson.status == true) {
          setArray(responseJson.data); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const pujaopen = (item, index) => {
    var cal = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i].is_selected == 'Y') {
        cal = cal + 1;
      }
    }

    if (cal > 11) {
      alert('Maximum you have select 12');

      return;
    }

    var a = array[index];
    if (a.is_selected == '') {
      a.is_selected = 'Y';
    } else {
      a.is_selected = '';
    }
    array[index] = a;
    var c = '';
    for (var i = 0; i < array.length; i++) {
      if (array[i].is_selected == 'Y') {
        c = c + array[i].name + ',';
      }
    }
    setLanguage(c);

    setArray(array);
    //alert(JSON.stringify(lang))

    setSelectedId(!selectedId);
  };
  const brodcastHandler = async () => {
    var inde = '';
    for (var i = 0; i < array.length; i++) {
      if (array[i].is_selected == 'Y') {
        inde = inde + array[i].id + ',';
      }
    }

    if (inde == '') {
      return;
    }
    inde = inde.substring(0, inde.length - 1);

    const url = 'http://astrourjaa.com:5050/api/update_broadcast_gifts'; //  this.showLoading()
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        astrologer_id: store.getState().user.user_id,
        gifts_id: inde,
        broadcast_id: route.params.item,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))
        if (responseJson.status == true) {
          navigation.goBack(); // this.setState({listdata : responseJson.data})
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('Create Live Event', () => navigation.goBack())}
      <KeyboardAwareScrollView>
        <View style={{marginTop: 8}}>
          <FlatList
            data={array}
            extraData={selectedId}
            numColumns={3}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => pujaopen(item, index)}>
                <View
                  style={{
                    margin: 5,
                    borderBottomWidth: 1,
                    borderColor: '#f1f1f1',
                    width: width / 3.2,
                    borderWidth: 1,
                    borderColor: '#f1f1f1',
                    marginBottom: 5,
                  }}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      marginTop: 6,
                    }}
                    source={{uri: item.imageUrl}}
                  />

                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Avenir-Medium',
                      height: 30,
                      textAlign: 'center',
                    }}>
                    {item.name}
                  </Text>
                  <View style={{}}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'Avenir-Medium',
                        textAlign: 'center',
                        marginTop: -10,
                      }}>
                      Rs :{item.price}
                    </Text>
                    {item.is_selected == '' && (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: 'center',
                          marginBottom: 7,
                        }}
                        source={require('../assets/uncheck.png')}
                      />
                    )}
                    {item.is_selected != '' && (
                      <Image
                        style={{
                          width: 20,
                          height: 20,
                          alignSelf: 'center',
                          marginBottom: 7,
                        }}
                        source={require('../assets/check.png')}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {SubmitButton('Submit', brodcastHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Gift;

const styles = StyleSheet.create({
  phoneView: {
    width: width - 30,
    alignSelf: 'center',
  },
});
