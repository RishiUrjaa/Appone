import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SubmitButton} from '../utils/Button';
import {
  MasterEducationDegreeApi,
  MasterSpecializationApi,
  LanguageCategoriesApi,
} from '../service/Api';

const customStyles = {
  marginBottom: 10,
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#F97012',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#F97012',
  stepStrokeUnFinishedColor: '#e5e5e5',
  separatorFinishedColor: '#F97012',
  separatorUnFinishedColor: '#e5e5e5',
  stepIndicatorFinishedColor: '#F97012',
  stepIndicatorUnFinishedColor: '#e5e5e5',
  stepIndicatorCurrentColor: '#F97012',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#F97012',
  stepIndicatorLabelFinishedColor: '#F97012',
  stepIndicatorLabelUnFinishedColor: 'black',
  labelColor: 'black',
  labelSize: 13,
  currentStepLabelColor: '#F97012',
};

const ProfessionalDetails = ({navigation}) => {
  const [state, setState] = useState({
    experience: '',
    language: '',

    langlist: [],
    edulist: [],
    speclist: [],
    spec: '',
    edu: '',
    langSelectList: [],
  });
  const [modalState, setModalState] = useState(false);

  const submitHandler = async () => {
    const body = {
      user_id: '11',
      languages: state.language,
      experience: state.experience,
      working_on_digital: '1',
      similar_app: '1',
      can_take_horoscope: '1',
      service_offered: '',
      specialization: state.spec,
      educational_background: state.edu,
    };
    console.log(JSON.stringify(body, null, 2));
    // const res = await UpdateProfessionalDetailsApi()
  };

  const fetchData = async () => {
    let speclist = [];
    let edulist = [];
    let langlist = [];
    const resSpec = await MasterSpecializationApi();
    if (resSpec.status) speclist = resSpec.list;
    const resEdu = await MasterEducationDegreeApi();
    if (resEdu.status) edulist = resEdu.list;
    const resLang = await LanguageCategoriesApi();
    if (resLang.status) langlist = resLang.list;
    setState({...state, edulist, langlist, speclist});
    console.log('done');
  };
  useEffect(() => {
    fetchData();
  }, []);

  const languageToggleHandler = () => setModalState(true);
  const selectLanguageHandler = (lang) => {
    let {langSelectList} = state;
    if (state.langSelectList.includes(lang)) {
      langSelectList = langSelectList.filter((item) => item !== lang);
    } else {
      langSelectList.push(lang);
    }
    setState({...state, langSelectList, language: langSelectList.join('|')});
  };
  const showModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalState}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={modalStyle.container}>
        <View style={modalStyle.modalView}>
          <TouchableOpacity
            onPress={() => setModalState(false)}
            style={{
              alignSelf: 'flex-end',
              padding: 5,
            }}>
            <Text>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={state.langlist}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => selectLanguageHandler(item.language_name)}
                style={[
                  {
                    marginVertical: 2,
                  },
                  state.langSelectList.includes(item.language_name) && {
                    backgroundColor: 'red',
                  },
                ]}>
                <Text>{item.language_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <StatusBar backgroundColor="orange" />
      {showModal()}
      <KeyboardAwareScrollView>
        <View style={{marginTop: 40}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={1}
            stepCount={4}
          />
        </View>

        <Text style={{fontSize: 51, marginTop: 42, color: '#F7F7FB'}}>
          REGISTRATION
        </Text>

        <View style={{width: '60%', marginLeft: 32}}>
          <Text
            style={{
              fontSize: 24,
              marginTop: -40,
              color: '#1D1E2C',
              fontFamily: 'Avenir',
              fontWeight: 'bold',
            }}>
            Professional Details
          </Text>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 25,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Dropdown
              containerStyle={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                marginTop: 25,
              }}
              icon={require('../assets/dropdownimg.png')}
              labelFontSize={18}
              label="Select Specialization"
              underlineColor={{borderBottomColor: 'white'}}
              data={state.speclist}
              onChangeText={(spec) => setState({...state, spec})}
              labelExtractor={(item) => item.name}
              valueExtractor={(item) => item.name}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Experience in related field"
              value={state.experience}
              onChangeText={(experience) => setState({...state, experience})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 25,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Dropdown
              containerStyle={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                marginTop: 25,
              }}
              icon={require('../assets/dropdownimg.png')}
              labelFontSize={18}
              label="Educational Background"
              underlineColor={{borderBottomColor: 'white'}}
              data={state.edulist}
              onChangeText={(edu) => setState({...state, edu})}
              labelExtractor={(item) => item.name}
              valueExtractor={(item) => item.name}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={languageToggleHandler}
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            marginBottom: 25,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              editable={false}
              placeholder="Languages which you can speak"
              value={state.language}
              onChangeText={(language) => setState({...state, language})}
            />
          </View>
        </TouchableOpacity>
        {SubmitButton('Save & Next', submitHandler)}
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default ProfessionalDetails;

const modalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
  },
  modalView: {
    borderRadius: 8,
    backgroundColor: 'white',
    marginHorizontal: 30,
    padding: 10,
    height: '40%',
  },
});
