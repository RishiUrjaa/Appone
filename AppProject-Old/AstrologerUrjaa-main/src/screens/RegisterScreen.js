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
const RegisterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [name, onChangeName] = React.useState('');
  const [gender, setGender] = React.useState(0);
  const [open, setOpen] = useState(false);
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
    {label: 'Male', value: 0},
    {label: 'Female', value: 1},
    {label: 'Other', value: 2},
  ];

  const loginHandler = () => {
    navigation.navigate('SecondRegisterScreen');
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {state.isLoading && <Loader />}

      <KeyboardAwareScrollView>
        <Pressable onPress={() => _handlePressd1()}>
          <Image
            source={{uri: img}}
            style={{
              width: 80,
              height: 80,
              borderWidth: 1,
              borderColor: '#FFC613',
              overflow: 'hidden',
              borderRadius: 40,
              alignSelf: 'center',
              marginTop: 22,
            }}
          />
        </Pressable>

        <View style={{margin: 20, marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
            }}>
            Full Name
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

          <View style={style.srow1}>
            <Text
              style={{
                fontFamily: 'AvenirLTStd-Roman',
                fontSize: 16,
                color: '#204768',
                marginTop: 4,
              }}>
              Gender
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
          </View>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 5,
            }}>
            Date of Birth
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
          <Pressable
            onPress={() => {
              setType(false);
              setOpen(true);
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FFC613',
                borderRadius: 4,
                height: 40,
                marginTop: 5,
              }}>
              <Text style={[style.input, {marginTop: 8, marginLeft: 10}]}>
                {moment(date).format('DD-MM-YYYY')}
              </Text>
            </View>
          </Pressable>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 8,
            }}>
            Expertise in
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
              placeholder={'Select Skills'}
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

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 8,
            }}>
            Choose Skills
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
              placeholder={'Select Skills'}
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

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Roman',
              fontSize: 16,
              color: '#204768',
              marginTop: 8,
            }}>
            Language
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
              placeholder={'Select Skills'}
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
        {SubmitButton('CONTINUE', loginHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;

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
