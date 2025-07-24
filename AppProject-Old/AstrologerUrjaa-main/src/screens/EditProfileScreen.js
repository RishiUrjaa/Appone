import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {SimpleHeader} from '../utils/Header';
import {globStyle} from '../styles/style';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SubmitButton} from '../utils/Button';
import {useDispatch, useStore} from 'react-redux';
import {GetProfileApi, UpdateProfileApi} from '../service/Api';
import * as actions from '../redux/actions';
import ImagePicker from 'react-native-image-picker';

const EditProfileScreen = ({navigation}) => {
  const store = useStore();
  const {user} = store.getState();
  const dispatch = useDispatch();
  console.log(user);
  const [state, setState] = useState({
    mobile: user.mobile,
    dob: user.dob,
    consultType: '',
    skill: '',
    experience: '',
    name: user.name,
    email: user.email,
    gender: user.gender,
    service_offered: user.service_offered,
    specialization: user.specialization,
    language: user.language,
    experience: user.experience,
    avatarSource: '',
    image: user.image,
    profileImage: user.image,
    isLoading: false,
  });

  const inputView = (
    label,
    key,
    placeholder,
    keyboardType = 'default',
    editiable = true,
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.outerView}>
        <TextInput
          style={styles.textInput}
          editable={editiable}
          keyboardType="default"
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={value => setState({...state, [key]: value})}
          value={state[key]}
        />
        <Image
          source={require('../assets/edit1.png')}
          style={styles.editImage2}
        />
      </View>
    </>
  );
  const saveHandler = async () => {
    const {user_id} = user;
    const {
      service_offered,
      gender,
      name,
      dob,
      specialization,
      experience,
      language,
    } = state;
    const body = {
      user_id,
      name,
      dob,
      gender,
      service_offered,
      specialization,
      language,
      experience,
    };
    if (body.name === '') {
      alert('Please Enter Your Name');
      return;
    }
    if (body.dob === '') {
      alert('Please Enter Your Dob (YYYY-MM-DD)');
      return;
    }
    if (body.gender === '') {
      alert('Please Enter Your Gender (Male or Female)');
      return;
    }
    // if (body.service_offered === '') {
    //   alert('Please Enter Your Consultand Type');
    //   return;
    // }
    // if (body.specialization === '') {
    //   alert('Please Enter Your Skills');
    //   return;
    // }
    if (body.experience === '') {
      alert('Please Enter Your Experience in Years');
      return;
    }
    setState({...state, isLoading: true});
    const {status = false} = await UpdateProfileApi(body);
    setState({...state, isLoading: false});
    if (status) {
      updateProfile(body.user_id);
      alert('Your Profile has been Updated Successfull');
    } else {
      alert('Something went wrong');
    }
  };
  const updateProfile = async user_id => {
    const {status = false, user_details = {}} = await GetProfileApi({
      user_id: user_id,
    });
    if (status) {
      dispatch(actions.Login(user_details));
    }
  };
  const changeImage = () => {
    console.log('pick image');
    const options = {
      title: 'Select and Take Profile Picture',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log(source);
        // GLOBAL.profileImage = response.uri;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setState({...state, avatarSource: source, profileImage: response.uri});
      }
    });
  };
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarDark />
      {SimpleHeader('Edit Profile', () => navigation.goBack())}
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={changeImage}
            style={{
              margin: 15,
              alignSelf: 'center',
            }}>
            <Image
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                alignSelf: 'center',
              }}
              source={
                state.avatarSource === ''
                  ? {uri: state.image}
                  : state.avatarSource
              }
            />
          </TouchableOpacity>
          <KeyboardAwareScrollView>
            {inputView('Name', 'name')}
            {inputView('Email', 'email', '', '', false)}
            {inputView('Mobile No.', 'mobile', '', 'number-pad', false)}
            {inputView('Language', 'language', 'Hindi|English')}
            {inputView('Gender', 'gender', 'Male or Female', '')}
            {inputView('Date of Birth', 'dob', 'DD-MM-YYYY', 'number-pad')}
            {SubmitButton('SAVE', saveHandler)}
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  label: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#69707F',
    marginHorizontal: 30,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    alignSelf: 'center',
  },
  outerView: {
    flexDirection: 'row',
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '82%',
    alignSelf: 'center',
  },
  editImage2: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});
