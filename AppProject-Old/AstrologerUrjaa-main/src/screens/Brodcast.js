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

const Brodcast = ({navigation, route}) => {
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
    const url = 'http://astrourjaa.com:5050/api/fetch_languages'; //  this.showLoading()
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
    // alert("coming soon")
    //     return
    const {special_discount} = state;
    const exp = /^(?:[1-9]|[1-4][0-9]|50)$/;
    if (state.title == '') {
      alert('Please Enter Event Name');
      return;
    }
    if (state.description == '') {
      alert('Please Enter Price');
      return;
    }
    if (state.special_discount == '') {
      alert('Please Enter EventDescription');
      return;
    }
    if (value == '') {
      alert('Please Enter Language');
      return;
    }
    if (date == '') {
      alert('Please Enter Start Date');
      return;
    }
    if (dateq == '') {
      alert('Please Enter End Date');
      return;
    }
    if (startTime == '') {
      alert('Please Enter start Time');
      return;
    }
    if (endTime == '') {
      alert('Please Enter end Time');
      return;
    }

    var startDate = `${date} ${startTime}`;
    var endDate = `${dateq} ${endTime}`;

    var d = {
      astrologer_id: store.getState().user.user_id,
      title: state.title,
      description: state.special_discount,
      price: state.description,
      language: value,
      start_time: startDate,
      end_time: endDate,
    };
    //alert(JSON.stringify(d));
    console.log(JSON.stringify(d));

    const {status = false, data = {}} = await CreatBroadcastApi(d);
    if (status) {
      alert('Brodcast create successfully');
    } else {
      alert('api fail');
    }
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('Create Live Event', () => navigation.goBack())}
      <KeyboardAwareScrollView>
        <View style={styles.phoneView}>
          <TextField
            // autoFocus
            label="Event Name"
            value={state.title}
            keyboardType="default"
            labelFontSize={12}
            fontSize={16}
            baseColor={'#000000'}
            onChangeText={text => setState({...state, title: text})}
            tintColor={'#69707F'}
            textColor={'#1D1E2C'}
            baseColor={'#1D1E2C'}
            labelTextStyle={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
            }}
            containerStyle={{
              paddingHorizontal: 10,
            }}
            affixTextStyle={{
              paddingBottom: 2,
            }}
          />
        </View>
        <View style={styles.phoneView}>
          <TextField
            // autoFocus
            label="Price"
            value={state.description}
            keyboardType="default"
            labelFontSize={12}
            fontSize={16}
            baseColor={'#000000'}
            onChangeText={text => setState({...state, description: text})}
            tintColor={'#69707F'}
            textColor={'#1D1E2C'}
            baseColor={'#1D1E2C'}
            labelTextStyle={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
            }}
            containerStyle={{
              paddingHorizontal: 10,
            }}
            affixTextStyle={{
              paddingBottom: 2,
            }}
            //   maxLength={10}
          />
        </View>
        <View style={styles.phoneView}>
          <TextField
            // autoFocus
            label="Event Description"
            value={state.special_discount}
            labelFontSize={12}
            fontSize={16}
            baseColor={'#000000'}
            onChangeText={special_discount => {
              setState({...state, special_discount});
            }}
            tintColor={'#69707F'}
            textColor={'#1D1E2C'}
            baseColor={'#1D1E2C'}
            labelTextStyle={{
              fontFamily: 'Nunito-Regular',
              fontWeight: '400',
            }}
            containerStyle={{
              paddingHorizontal: 10,
            }}
            affixTextStyle={{
              paddingBottom: 2,
            }}
          />
        </View>
        <TouchableOpacity onPress={() => setvisible(!visible)}>
          <View style={styles.phoneView}>
            <TextInput
              style={{
                height: 50,
                width: width - 40,
                borderBottomWidth: 1,
                borderColor: 'grey',
              }}
              // autoFocus
              placeholder="Event Will be in which Language"
              editable={false}
              placeholderTextColor="black"
              value={value}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.phoneView}>
          <DatePicker
            date={date}
            onDateChange={date => setDate(date)}
            mode={'date'}
            placeholder={'Select Start Date'}
            minDate={moment()}
            locale={'en'}
            showIcon={false}
            style={{
              width: width - 40,
              borderBottomWidth: 1,
              borderColor: 'grey',
              height: 40,
              color: '#f1f1f1',
              marginTop: 12,
              alignSelf: 'center',
            }}
            customStyles={{
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
              },
            }}
          />
        </View>
        <View style={styles.phoneView}>
          <TouchableOpacity onPress={() => setShow(!show)}>
            <View>
              <TextInput
                style={{
                  marginTop: 0,
                  width: width - 40,
                  borderColor: '#f1f1f1',
                  borderBottomWidth: 1,
                  alignSelf: 'center',
                }}
                placeholder="Start Time"
                editable={false}
                value={startTime}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.phoneView}>
          <DatePicker
            date={dateq}
            onDateChange={date => setDateq(date)}
            mode={'date'}
            placeholder={'Select End Date'}
            minDate={date}
            locale={'en'}
            showIcon={false}
            style={{
              width: width - 40,
              borderBottomWidth: 1,
              borderColor: 'grey',
              height: 40,
              color: '#f1f1f1',
              marginTop: 12,
              alignSelf: 'center',
            }}
            customStyles={{
              dateInput: {
                marginLeft: 0,
                borderWidth: 0,
                borderBottomWidth: 0,
              },
            }}
          />
        </View>

        <Dialog
          dialogStyle={{width: 300, borderRadius: 22, height: 300}}
          visible={visible}
          onTouchOutside={() => {
            setvisible(false);
          }}>
          <DialogContent>
            <View style={{marginTop: 8}}>
              <FlatList
                data={array}
                extraData={selectedId}
                renderItem={({item, index}) => (
                  <TouchableOpacity onPress={() => pujaopen(item, index)}>
                    <View
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        borderColor: '#f1f1f1',
                        flexDirection: 'row',
                        width: 300,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Avenir-Medium',
                          height: 30,
                          width: 200,
                        }}>
                        {item.name}
                      </Text>
                      {item.is_selected == '' && (
                        <Image
                          style={{width: 20, height: 20}}
                          source={require('../assets/uncheck.png')}
                        />
                      )}
                      {item.is_selected != '' && (
                        <Image
                          style={{width: 20, height: 20}}
                          source={require('../assets/check.png')}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </DialogContent>
        </Dialog>

        {showq && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'time'}
            format="HH:mma"
            is24Hour={true}
            display="default"
            onChange={onChangeq}
          />
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'time'}
            format="HH:mma"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity onPress={() => setShowq(!showq)}>
          <View style={styles.phoneView}>
            <TextInput
              style={{
                marginTop: 0,
                width: width - 40,
                borderColor: '#f1f1f1',
                borderBottomWidth: 1,
                alignSelf: 'center',
              }}
              placeholder="End Time"
              editable={false}
              value={endTime}
            />
          </View>
        </TouchableOpacity>
        {SubmitButton('Submit', brodcastHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Brodcast;

const styles = StyleSheet.create({
  phoneView: {
    width: width - 30,
    alignSelf: 'center',
  },
});
