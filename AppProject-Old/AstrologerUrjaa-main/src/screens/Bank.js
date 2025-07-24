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
  UpdateBankDetail,
} from '../service/Api';
import * as actions from '../redux/actions';
import Loader from '../utils/Loader';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {TextField} from 'react-native-material-textfield-plus';
import ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';
import {useSelector} from 'react-redux';
import store from '../redux/store';
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
const Bank = ({navigation}) => {
  const {user} = useSelector(store => store);
  const [date, setDate] = useState(new Date());
  const [name, onChangeName] = React.useState('');
  const [bankname, onChangeBankName] = React.useState('');
  const [branchname, onChangeBranchName] = React.useState('');
  const [accountno, onChangeAccount] = React.useState('');
  const [raccountno, onChangerAccount] = React.useState('');
  const [ifsc, onChangeIfsc] = React.useState('');
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

  const loginHandler = async () => {
    if (name == '') {
      alert('Please enter Name');
      return;
    }
    if (bankname == '') {
      alert('Please enter Bank Name');
      return;
    }
    if (accountno == '') {
      alert('Please enter Account no');
      return;
    }
    if (accountno != raccountno) {
      alert('Account no not match');
      return;
    }
    if (ifsc == '') {
      alert('Please enter Ifsc Code');
      return;
    }
    const {user_id} = user;
    const body = {
      user_id: user_id,
      bank_account_holder_name: name,
      bankName: bankname,
      bank_account_no: accountno,
      branch_name: branchname,
      ifsc_code: ifsc,
      // schedule_date: '',
      // schedule_date_end: '',
    };
    // console.log(body);
    // const {status = false, lists = []} = await ChatHistoryApi(body);
    const {status = false, data = []} = await UpdateBankDetail(body);
    if (status) {
      console.log(JSON.stringify(data, null, 2));
      setState({...state, isLoading: false});
      alert('Bank Account Add Successfully');
    } else {
      setState({...state, isLoading: false});
    }
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
            }}>
            Account Holder's Name
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
            Bank Name
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
              onChangeText={onChangeBankName}
              value={bankname}
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
            Branch Name
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
              onChangeText={onChangeBranchName}
              value={branchname}
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
            Account Number
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
              onChangeText={onChangeAccount}
              keyboardType={'number-pad'}
              value={accountno}
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
            Re Enter Account Number
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
              onChangeText={onChangerAccount}
              value={raccountno}
              keyboardType={'number-pad'}
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
            IFSC Code
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
              onChangeText={onChangeIfsc}
              value={ifsc}
              placeholderTextColor="#204768"
            />
          </View>
        </View>

        {SubmitButton('ADD BANK ACCOUNT', loginHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default Bank;

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
