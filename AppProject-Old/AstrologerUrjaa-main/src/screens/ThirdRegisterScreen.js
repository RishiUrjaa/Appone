import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import style from './Style';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StatusBarDark, StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';
import {SubmitButton} from '../utils/Button';
import {useDispatch, useStore} from 'react-redux';
import {
  AsyncStorageSetUserId,
  CheckStatusApi,
  GetProfileApi,
  SignInApi,
} from '../service/Api';
import * as actions from '../redux/actions';
import Loader from '../utils/Loader';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {TextField} from 'react-native-material-textfield-plus';
import ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
const {width, height} = Dimensions.get('window');
const options = {
  title: 'Select Document',
  maxWidth: 300,
  maxHeight: 500,

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const ThirdRegisterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [name, onChangeName] = React.useState('');
  const [time, setTime] = useState(new Date());
  const [gender, setGender] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [type, setType] = useState(false);
  const [state, setState] = useState({
    isLoading: false,
  });
  const [img, setImage] = React.useState('');
  const toggleLoading = bol => setState({...state, loading: bol});
  const [check, setCheck] = React.useState('');
  const _handlePressd1 = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        //toggleLoader(true);
        setCheck('1');
        setImage(response.uri);
      }
    });
  };

  var radio_props = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
  ];

  const loginHandler = () => {
    navigation.navigate('Thankyou');
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}

      <KeyboardAwareScrollView>
        <View style={{margin: 20, marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 10,
            }}>
            Did anybody refer you to AstroUrjaa?
          </Text>

          <RadioForm
            style={style.formstyle}
            labelStyle={style.radiostyle}
            buttonOuterSize={20}
            buttonColor="#FFC613"
            selectedButtonColor="#FFC613"
            radio_props={radio_props}
            initial={gender}
            onPress={(index, value) => {
              setGender(index);
            }}
            formHorizontal={true}
          />
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 12,
            }}>
            Minimum Earning Expectation from AstroUrjaa
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#FF4801',
                marginLeft: 2,
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFC613',
              borderRadius: 4,
              height: 40,
              marginTop: 5,
            }}>
            <TextInput
              style={style.input}
              onChangeText={onChangeName}
              value={name}
              placeholderTextColor="#204768"
            />
          </View>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 10,
            }}>
            Maximum Earning Expectation from AstroUrjaa
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#FF4801',
                marginLeft: 2,
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFC613',
              borderRadius: 4,
              height: 40,
              marginTop: 5,
            }}>
            <TextInput
              style={style.input}
              onChangeText={onChangeName}
              value={name}
              placeholderTextColor="#204768"
            />
          </View>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 10,
            }}>
            No of Foreign Countries you have live/ travelled to?
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#FF4801',
                marginLeft: 2,
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFC613',
              borderRadius: 4,
              height: 40,
              marginTop: 5,
            }}>
            <TextInput
              style={style.input}
              onChangeText={onChangeName}
              value={name}
              placeholderTextColor="#204768"
            />
          </View>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 10,
            }}>
            Are you currently working a fulltime job?
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#FF4801',
                marginLeft: 2,
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFC613',
              borderRadius: 4,
              height: 40,
              marginTop: 5,
            }}>
            <TextInput
              style={style.input}
              onChangeText={onChangeName}
              value={name}
              placeholderTextColor="#204768"
            />
          </View>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 10,
            }}>
            Do you provide online puja also ?
          </Text>

          <RadioForm
            style={style.formstyle}
            labelStyle={style.radiostyle}
            buttonOuterSize={20}
            buttonColor="#FFC613"
            selectedButtonColor="#FFC613"
            radio_props={radio_props}
            initial={gender}
            onPress={(index, value) => {
              setGender(index);
            }}
            formHorizontal={true}
          />

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 8,
            }}>
            Expertise in Online Puja
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#FF4801',
                marginLeft: 2,
              }}>
              *
            </Text>
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#FFC613',
              borderRadius: 4,
              height: 40,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={[style.input, {marginTop: -4}]}
              placeholder={'Select Online Puja'}
              placeholderTextColor="#C7C7C7"
            />
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginRight: 12,
                marginTop: 5,
              }}
              source={require('../assets/downarrow.png')}
            />
          </View>
        </View>

        <DatePicker
          modal
          open={open}
          mode={'date'}
          maximumDate={new Date()}
          date={date}
          onConfirm={date => {
            setOpen(false);
            type == false ? setDate(date) : setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <DatePicker
          modal
          open={open1}
          mode={'time'}
          maximumDate={new Date()}
          date={new Date()}
          onConfirm={date => {
            setOpen1(false);
            type == false ? setTime(date) : setTime(date);
          }}
          onCancel={() => {
            setOpen1(false);
          }}
        />
        {SubmitButton('CONTINUE', loginHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ThirdRegisterScreen;

const styles = StyleSheet.create({
  phoneView: {
    backgroundColor: '#F7F7FB',
    borderRadius: 4,
    marginTop: 20,
    width: width - 80,
    alignSelf: 'center',
  },
  checkView: {
    marginTop: 10,
    marginBottom: '30%',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
  },
  checkView_2: {
    marginLeft: 20,
    marginRight: 30,
  },
  checkText_1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: '#6F6F7B',
  },
  checkText_2: {
    color: '#7ED321',
  },
});
