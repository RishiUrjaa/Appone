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
//   FetchPuja,
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
const AstrologerTRegistration = ({navigation, route}) => {
  const [selectedId, setselectedId] = useState(false);

  const [minimum, settMinimum] = React.useState('');
  const [maximum, settMaximum] = React.useState('');
  const [foreign, settForeign] = React.useState('');
  const [fulltime, settFullTime] = React.useState('');

  const [gender, setGender] = React.useState(0);
  const [gender1, setGender1] = React.useState(0);

  const [expertise, setExpertise] = useState(false);
  const [skill, setSkill] = useState(false);
  const [language, setLanguage] = useState(false);

  const [expertiseArray, setExpertiseArray] = useState([]);
  const [skillArray, setSkillArray] = useState([]);
  const [languageArray, setLanguageArray] = useState([]);

  const [selectedexpertiseArray, selectedsetExpertiseArray] = useState([]);

  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});

  var radio_props = [
    {label: 'Yes', value: 0},
    {label: 'No', value: 1},
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

  const onPressLogin = () => {
    if (minimum == '') {
      alert('Please enter Minimum Expectation');
      return;
    }
    if (maximum == '') {
      alert('Please enter maximum Expectation');
      return;
    }

    if (foreign == '') {
      alert('Please enter no of foreign countres you live');
      return;
    }
    let max = parseInt(maximum);
    let min = parseInt(minimum);

    if (min > max) {
      alert('Minimum expectation can not be greater than maximum');
      return;
    }

    // if (maximum == '') {
    //   alert('Please enter maximum Expectation');
    //   return;
    // }
    (route.params['otherplatform'] = gender),
      (route.params['minimum'] = minimum),
      (route.params['maximum'] = maximum),
      (route.params['foreign'] = foreign),
      (route.params['fulltime'] = fulltime),
      (route.params['takepuja'] = gender1),
      (route.params['puja'] = expertiseArray);

    console.log(JSON.stringify(route.params));

    let specialization = '';
    for (let i = 0; i < route.params.expertise.length; i++) {
      specialization = specialization + route.params.expertise[i].id + ',';
    }

    let service_offered = '';
    for (let i = 0; i < route.params.skill.length; i++) {
      service_offered = service_offered + route.params.skill[i].id + ',';
    }

    let languages = '';
    for (let i = 0; i < route.params.language.length; i++) {
      languages = languages + route.params.language[i].id + ',';
    }

    let puja = '';
    for (let i = 0; i < route.params.puja.length; i++) {
      puja = puja + route.params.puja[i].name + ',';
    }

    const url = 'https://astrourjaa.com/dev/admin/api/update_astrologer_regestrion';
    const data = new FormData();
    data.append('image', {
      uri: route.params.image,
      type: 'image/jpeg', // or photo.type
      name: 'image.png',
    });
    data.append('user_id', route.params.user_id);
    data.append('name', route.params.name);
    data.append(
      'gender',
      route.params.gender == 0
        ? 'Male'
        : route.params.gender == 1
        ? 'Female'
        : 'Other',
    );
    data.append('specialization', specialization.slice(0, -1));
    data.append('service_offered', service_offered.slice(0, -1));
    data.append('languages', languages.slice(0, -1));
    data.append('experience', route.params.experience);
    data.append('dob', moment(route.params.date_of_birth).format('DD-MM-YYYY'));
    data.append('contribute_hours', route.params.daily);
    data.append('working_on_digital', route.params.platform);
    data.append('city', route.params.live);
    data.append('hear_about', route.params.hear);
    data.append('email', route.params.email);
    data.append('preferable_time', route.params.preferable.toString());
    data.append(
      'date_time_interview',
      `${moment(route.params.idate).format('DD-MM-YYYY')} - ${moment(
        route.params.itime,
      ).format('HH:MM')}`,
    );
    data.append('any_refer_AstroUrjaa', route.params.otherplatform);
    data.append('minimum_earning', route.params.minimum.toString());
    data.append('maximum_earning', route.params.maximum.toString());
    data.append('foreign_live', route.params.foreign.toString());
    data.append('any_working_job', route.params.fulltime.toString());
    data.append('password', route.params.password.toString());
    data.append('take_online_puja', route.params.takepuja.toString());
    data.append('expertise_online_puja', puja == '' ? '' : puja.slice(0, -1));

    console.log(JSON.stringify(data));
    fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson));
        if (responseJson.status == true) {
          navigation.navigate('Thankyou', responseJson.astrologer);
          //   navigation.goBack();
        } else {
          alert(responseJson.message);
        }
      });
  };

  useEffect(() => {
    fetch('http://astrourjaa.com:5050/api/fetch_pujas', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: '1',
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          let array = [];
          for (let i = 0; i < data.data.length; i++) {
            let dict = {
              is_selected: '',
              name: data.data[i].name,
            };
            array.push(dict);
          }
          // alert(JSON.stringify(data));
          setExpertiseArray(array);
        } else {
        }

        // console.log(JSON.stringify(json.result.docs));
      })
      .catch(error => {
        console.error(error);
      });

    // FetchPuja()
    //   .then(data => {
    //     if (data.status) {
    //       let array = [];
    //       for (let i = 0; i < data.data.length; i++) {
    //         let dict = {
    //           is_selected: '',
    //           name: data.data[i].name,
    //         };
    //         array.push(dict);
    //       }
    //       // alert(JSON.stringify(data));
    //       setExpertiseArray(array);
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
          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Are you working on any other online Platform?
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
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Minimum Earning Expectation from AstroUrjaa
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
                onChangeText={settMinimum}
                value={minimum}
                placeholderTextColor="#204768"
                keyboardType="numeric"
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
            Maximum Earning Expectation from AstroUrjaa
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
                onChangeText={settMaximum}
                value={maximum}
                keyboardType="numeric"
                placeholderTextColor="#204768"
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
            No of Foreign Countries you have live/ travelled to?
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
                onChangeText={settForeign}
                value={foreign}
                keyboardType="numeric"
                placeholderTextColor="#204768"
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
            Are you currently working a fulltime job?
          </Text>

          <View style={style.srow100}>
            <View style={style.signupmobile100}>
              <TextInput
                style={style.input}
                onChangeText={settFullTime}
                value={fulltime}
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
            Do you provide online puja also ?
          </Text>

          <RadioForm
            style={style.formstyle}
            labelStyle={style.radiostyle}
            buttonOuterSize={20}
            buttonColor="#FFC613"
            selectedButtonColor="#FFC613"
            radio_props={radio_props}
            initial={gender1}
            onPress={(index, value) => {
              setGender1(index);
            }}
            formHorizontal={true}
          />
          <Text
            style={{
              color: '#204768',
              marginLeft: 20,
              marginTop: 10,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 16,
            }}>
            Expertise in Online Puja
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

          <View style={style.button}>
            <Button onPress={onPressLogin} color="#FFC613" title={'CONTINUE'} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};
export default AstrologerTRegistration;
