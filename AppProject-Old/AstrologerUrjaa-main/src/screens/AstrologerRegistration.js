import React, {useEffect, useState} from 'react';
import style from './Styleww';
import {
  Button,
  DeviceEventEmitter,
  Image,
  FlatList,
  Platform,
  Pressable,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
var validator = require('email-validator');
const window = Dimensions.get('window');
const options = {
  title: 'Select Image',
  maxWidth: 300,
  maxHeight: 500,

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import SelectDropdown from 'react-native-select-dropdown';
import ImagePicker from 'react-native-image-picker';
// import {
//   MobileLogin,
//   UserRegister,
//   VerifyLogin,
//   FetchAstrologerFilter,
// } from '../backend/Api';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import stringsoflanguages from './Language';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Loader from '../utils/Loader';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

import randomString from 'random-string';
import GLOBAL from './Global';
import Backend from './Backend';
import store from '../redux/store';
const AstrologerRegistration = ({navigation, route}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedId, setselectedId] = useState(false);
  const [img, setImage] = React.useState('');
  const [check, setCheck] = React.useState('');
  const [locationData, setLocationData] = useState({});
  const [location, setLocation] = React.useState('');
  const [name, onChangeName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [relation, setRelation] = React.useState('');
  const [accept, setAccept] = useState(false);
  const [email, onChangeEmail] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [marital, onChangeMarital] = React.useState('');
  const [gender, setGender] = React.useState(0);
  const [type, setType] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [expertise, setExpertise] = useState(false);
  const [skill, setSkill] = useState(false);
  const [language, setLanguage] = useState(false);

  const [expertiseArray, setExpertiseArray] = useState([]);
  const [skillArray, setSkillArray] = useState([]);
  const [languageArray, setLanguageArray] = useState([]);

  const [selectedexpertiseArray, selectedsetExpertiseArray] = useState([]);
  const [selectedskillArray, selectedsetSkillArray] = useState([]);
  const [selectedlanguageArray, selectedsetLanguageArray] = useState([]);

  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const callbackHandler = data => {
    if (data.item.type == false) {
      setLocation(data.item.place);
      setLocationData(data.item);
    } else {
      setPLocation(data.item.place);
      setPLocationData(data.item);
    }
  };
  var radio_props = [
    {label: stringsoflanguages.male, value: 0},
    {label: stringsoflanguages.female, value: 1},
    {label: stringsoflanguages.others, value: 2},
  ];

  useEffect(() => {
    let array = [];
    for (let i = 0; i < expertiseArray.length; i++) {
      if (expertiseArray[i].is_selected != '') {
        array.push(expertiseArray[i]);
      }
    }

    selectedsetExpertiseArray(array);
  }, [expertise]);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < languageArray.length; i++) {
      if (languageArray[i].is_selected != '') {
        array.push(languageArray[i]);
      }
    }

    selectedsetLanguageArray(array);
  }, [language]);

  useEffect(() => {
    let array = [];
    for (let i = 0; i < skillArray.length; i++) {
      if (skillArray[i].is_selected != '') {
        array.push(skillArray[i]);
      }
    }

    selectedsetSkillArray(array);
  }, [skill]);

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

  const onPressLogin = () => {
    if (img == '') {
      alert('Please select Image');
    } else if (name == '') {
      alert('Please enter Name');
    } else if (email == '') {
      alert('Please enter Email');
    } else if (validator.validate(email) == false) {
      alert('Please enter Valid Email');
    } else if (password == '') {
      alert('Please enter Password');
    } else if (date == '') {
      alert('Please select date of Birth');
    } else if (selectedexpertiseArray.length == 0) {
      alert('Please select Expertise');
    } else if (selectedskillArray.length == 0) {
      alert('Please select Skill');
    } else if (selectedlanguageArray.length == 0) {
      alert('Please select Language');
    } else {
      let data = {
        image: img,
        name: name,
        gender: gender,
        date_of_birth: date,
        email: email,
        expertise: selectedexpertiseArray,
        skill: selectedskillArray,
        language: selectedlanguageArray,
        user_id: route.params,
        password: password,
      };

      navigation.navigate('AstrologerSRegistration', data);
    }
  };

  useEffect(() => {
    fetch('http://astrourjaa.com:5050/api/fetch_astrologer_filters', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: '1',
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          setExpertiseArray(json.speciality);
          setSkillArray(json.service);
          setLanguageArray(json.language);
        }

        console.log(JSON.stringify(json.result.docs));
      })
      .catch(error => {
        console.error(error);
      });

    // FetchAstrologerFilter({user_id: '4'})
    //   .then(data => {
    //     if (data.status) {
    //       setExpertiseArray(data.speciality);
    //       setSkillArray(data.service);
    //       setLanguageArray(data.language);
    //     } else {
    //     }
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
  }, []);
  return (
    <>
      <SafeAreaView style={style.container}>
        {state.loading && <Loader />}
        <KeyboardAwareScrollView>
          <Pressable onPress={() => _handlePressd1()}>
            {img != '' && (
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
            )}

            {img == '' && (
              <Image
                source={require('../assets/upload.png')}
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
            )}
          </Pressable>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Full Name
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={onChangeName}
                value={name}
                placeholderTextColor="#204768"
                placeholder={stringsoflanguages.name}
              />
            </View>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Email
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholderTextColor="#204768"
                placeholder={'Email id'}
              />
            </View>
          </View>
          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Password
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>
          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={onChangePassword}
                value={password}
                placeholderTextColor="#204768"
                secureTextEntry={true}
                placeholder={'Password'}
              />
            </View>
          </View>
          <View style={style.srow1}>
            <Text style={style.connect}> {stringsoflanguages.gender}</Text>
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
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Date of Birth
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <View style={style.srow100}>
            <Pressable
              onPress={() => {
                setType(false);
                setOpen(true);
              }}>
              <View style={[style.signupmobile100, {flexDirection: 'row'}]}>
                <TextInput
                  style={[style.input, {width: '80%'}]}
                  value={date == '' ? '' : moment(date).format('DD-MM-YYYY')}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={stringsoflanguages.dob}
                />
                <Image
                  source={require('../assets/calender.png')}
                  style={style.facebookimage}
                />
              </View>
            </Pressable>
          </View>

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Expertise in
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>
          <Pressable onPress={() => setExpertise(!expertise)}>
            <View style={style.srow100}>
              <View style={[style.signupmobile100, {flexDirection: 'row'}]}>
                <TextInput
                  style={[style.input, {width: '85%'}]}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={'Select Expertise'}
                />
                {expertise == false && (
                  <Image
                    source={require('../assets/drop.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
                {expertise == true && (
                  <Image
                    source={require('../assets/upload2.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
              </View>
            </View>
          </Pressable>

          {expertise == false && (
            <FlatList
              nestedScrollEnabled={true}
              horizontal
              data={selectedexpertiseArray}
              extraData={selectedId}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectedexpertiseArray.splice(index, 1);
                      setselectedId(!selectedId);

                      // expertiseArray[index].is_selected = 'Y'
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 20,
                        borderRadius: 12,
                        borderColor: '#FFC518',
                        borderWidth: 1,
                        margin: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,

                          marginTop: 0,
                          fontFamily: 'AvenirLTStd-Medium',
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: 'black',

                          marginLeft: 4,
                        }}>
                        {item.name}
                      </Text>
                      <Image
                        style={{width: 8, height: 8, resizeMode: 'contain'}}
                        source={require('../assets/cancel.png')}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {expertise == true && (
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
                width: '90%',
                alignSelf: 'center',
                height: 200,
                backgroundColor: 'white',
              }}>
              <FlatList
                style={{
                  marginTop: 0,
                  marginLeft: 5,
                }}
                nestedScrollEnabled={true}
                data={expertiseArray}
                extraData={selectedId}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (item.is_selected == '') {
                          expertiseArray[index].is_selected = 'Y';
                        } else {
                          expertiseArray[index].is_selected = '';
                        }
                        setselectedId(!selectedId);

                        // expertiseArray[index].is_selected = 'Y'
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 20,
                        }}>
                        {item.is_selected == '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/checkbox.png')}
                          />
                        )}
                        {item.is_selected != '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/check.png')}
                          />
                        )}

                        <Text
                          style={{
                            fontSize: 12,

                            marginTop: 0,
                            fontFamily: 'AvenirLTStd-Regular',
                            fontSize: 12,

                            marginLeft: 4,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Select Skill
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <Pressable onPress={() => setSkill(!skill)}>
            <View style={style.srow100}>
              <View style={[style.signupmobile100, {flexDirection: 'row'}]}>
                <TextInput
                  style={[style.input, {width: '85%'}]}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={'Select Skill'}
                />
                {skill == false && (
                  <Image
                    source={require('../assets/drop.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
                {skill == true && (
                  <Image
                    source={require('../assets/upload2.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
              </View>
            </View>
          </Pressable>

          {skill == false && (
            <FlatList
              nestedScrollEnabled={true}
              horizontal
              data={selectedskillArray}
              extraData={selectedId}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectedskillArray.splice(index, 1);
                      setselectedId(!selectedId);

                      // expertiseArray[index].is_selected = 'Y'
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 20,
                        borderRadius: 12,
                        borderColor: '#FFC518',
                        borderWidth: 1,
                        margin: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,

                          marginTop: 0,
                          fontFamily: 'AvenirLTStd-Medium',
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: 'black',

                          marginLeft: 4,
                        }}>
                        {item.name}
                      </Text>
                      <Image
                        style={{width: 8, height: 8, resizeMode: 'contain'}}
                        source={require('../assets/cancel.png')}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {skill == true && (
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
                width: '90%',
                alignSelf: 'center',
                height: 200,
                backgroundColor: 'white',
              }}>
              <FlatList
                style={{
                  marginTop: 0,
                  marginLeft: 5,
                }}
                nestedScrollEnabled={true}
                data={skillArray}
                extraData={selectedId}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (item.is_selected == '') {
                          skillArray[index].is_selected = 'Y';
                        } else {
                          skillArray[index].is_selected = '';
                        }
                        setselectedId(!selectedId);

                        // expertiseArray[index].is_selected = 'Y'
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 20,
                        }}>
                        {item.is_selected == '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/checkbox.png')}
                          />
                        )}
                        {item.is_selected != '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/check.png')}
                          />
                        )}

                        <Text
                          style={{
                            fontSize: 12,

                            marginTop: 0,
                            fontFamily: 'AvenirLTStd-Regular',
                            fontSize: 12,

                            marginLeft: 4,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Select Language
            <Text
              style={{
                color: 'red',
                marginLeft: 20,
                marginTop: 10,
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 16,
              }}>
              *
            </Text>
          </Text>

          <Pressable onPress={() => setLanguage(!language)}>
            <View style={style.srow100}>
              <View style={[style.signupmobile100, {flexDirection: 'row'}]}>
                <TextInput
                  style={[style.input, {width: '85%'}]}
                  placeholderTextColor="#204768"
                  editable={false}
                  placeholder={'Select Language'}
                />
                {language == false && (
                  <Image
                    source={require('../assets/drop.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
                {language == true && (
                  <Image
                    source={require('../assets/upload2.png')}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      marginTop: 11,
                    }}
                  />
                )}
              </View>
            </View>
          </Pressable>

          {language == false && (
            <FlatList
              nestedScrollEnabled={true}
              horizontal
              data={selectedlanguageArray}
              extraData={selectedId}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectedlanguageArray.splice(index, 1);

                      setselectedId(!selectedId);

                      // expertiseArray[index].is_selected = 'Y'
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 20,
                        borderRadius: 12,
                        borderColor: '#FFC518',
                        borderWidth: 1,
                        margin: 8,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,

                          marginTop: 0,
                          fontFamily: 'AvenirLTStd-Medium',
                          fontWeight: 'bold',
                          fontSize: 12,
                          color: 'black',

                          marginLeft: 4,
                        }}>
                        {item.name}
                      </Text>
                      <Image
                        style={{width: 8, height: 8, resizeMode: 'contain'}}
                        source={require('../assets/cancel.png')}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          {language == true && (
            <View
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
                width: '90%',
                alignSelf: 'center',
                height: 200,
                backgroundColor: 'white',
              }}>
              <FlatList
                style={{
                  marginTop: 0,
                  marginLeft: 5,
                }}
                nestedScrollEnabled={true}
                data={languageArray}
                extraData={selectedId}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (item.is_selected == '') {
                          languageArray[index].is_selected = 'Y';
                        } else {
                          languageArray[index].is_selected = '';
                        }
                        setselectedId(!selectedId);

                        // expertiseArray[index].is_selected = 'Y'
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 20,
                        }}>
                        {item.is_selected == '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/checkbox.png')}
                          />
                        )}
                        {item.is_selected != '' && (
                          <Image
                            style={{width: 12, height: 12, marginTop: 3}}
                            source={require('../assets/check.png')}
                          />
                        )}

                        <Text
                          style={{
                            fontSize: 12,

                            marginTop: 0,
                            fontFamily: 'AvenirLTStd-Regular',
                            fontSize: 12,

                            marginLeft: 4,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          <View style={style.button}>
            <Button onPress={onPressLogin} color="#FFC613" title={'CONTINUE'} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <DatePicker
        modal
        open={open}
        mode={'date'}
        maximumDate={new Date()}
        date={date == '' ? new Date() : date}
        onConfirm={date => {
          setOpen(false);
          type == false ? setDate(date) : setPDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default AstrologerRegistration;
