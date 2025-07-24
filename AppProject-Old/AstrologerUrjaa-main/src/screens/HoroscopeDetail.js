import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  ImageBackground,
  Linking,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {globStyle} from '../styles/style';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';
import {SubmitButton} from '../utils/Button';
import DocumentPicker from 'react-native-document-picker';
import {useStore} from 'react-redux';
import {
  AttachListApi,
  AttachRemoveApi,
  AttachUploadApi,
  AttachCompleteApi,
} from '../service/Api';
import Loader from '../utils/Loader';

const HoroscopeDetail = ({navigation, route}) => {
  const store = useStore();
  const [state, setState] = useState({
    user_id: store.getState().user.user_id,
    images: [],
    path: '',
    horoscope_message: '',
    isLoading: false,
  });
  const toggleLoading = (isLoading) => setState({...state, isLoading});
  const detailView = (label, value) => (
    <View style={styles.labelView}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.labelValue}>{value}</Text>
    </View>
  );

  const documentHandler = async () => {
    console.log('document picker');
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [

          DocumentPicker.types.pdf,

        ],
      });
      UploadDocuments(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const UploadDocuments = async (results) => {
    toggleLoading(true);
    const {user_id} = state;
    const {id} = route.params;
    for (const res of results) {
      let formdata = new FormData();
      formdata.append('user_id', user_id);
      formdata.append('id', id);
      formdata.append('flag', 1);
      formdata.append('image', res);
      console.log(formdata);
      const {status = false, images = [], path = ''} = await AttachUploadApi(
        formdata,
      );
      toggleLoading(false);
      if (status) {
        setState({...state, images});
        console.log(path);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const {id} = route.params;
    const {user_id} = state;
    toggleLoading(true);
    const {status = false, list = [], path = ''} = await AttachListApi({
      user_id,
      id,
    });
    toggleLoading(false);
    if (status) {
      setState({...state, images: list, path});
    }
  };
  const openUrlHandler = (image) => {
    console.log(state.path + image);
    Linking.openURL(state.path + image);
  };
  const removeDocumentHandler = async (file_id) => {
    const {user_id} = state;
    const {id} = route.params;
    toggleLoading(true);
    const {status = false, list_of_images = []} = await AttachRemoveApi({
      user_id,
      id,
      file_id,
    });
    toggleLoading(false);
    if (status) {
      setState({...state, images: list_of_images});
      alert('File Deleted Successfully');
    } else {
      alert('Something went wrong please try again');
    }
  };
  const submitHandler = async () => {
    console.log('submit handler');

    let uploads_doc = '';
    const {id} = route.params;
    // state.images.forEach((item) => {
    //   if (uploads_doc === ``) {
    //     uploads_doc += `${item.image},${item.type}`;
    //   } else {
    //     uploads_doc += `||${item.image},${item.type}`;
    //   }
    // });
  //  alert(id)

      console.log(id, uploads_doc);
    //  toggleLoading(true);
      const {status = false} =  AttachCompleteApi({
        id,
        uploads_doc ,
        horoscope_message: state.horoscope_message,
      });

    //  toggleLoading(false);

    Alert.alert('Upload', 'Report Submit Successfully', [
      {
        text: 'OK',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          }),
      },
    ]);


  };
  const {
    user_name,
    user_gender,
    user_phone,
    user_email,
    user_dob,
    user_pob,
    user_tob,
    occupation,
    problem_area,
    zodiac_sign,
    address,
  } = route.params;
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {state.isLoading && <Loader />}
      {SimpleHeader('Horoscope Detail', () => navigation.goBack())}
      <ScrollView>
        <Text style={styles.title}>Customer Details:</Text>
        {detailView('Name', user_name)}
        {detailView('Gender', user_gender)}

        {detailView('Date of Birth', user_dob)}
        {detailView('Place of Birth', user_pob)}
        {detailView('Time of Birth', user_tob)}

        {detailView('Problem Area', problem_area)}
        <Text style={styles.title}> Please Horoscope :</Text>



   <View style = {{height:300,backgroundColor:'white',borderWidth:1,borderColor:'grey',width:'90%',margin:'5%',alignSelf:'center'}}>
          <TextInput
            value={state.horoscope_message}
            onChangeText={(horoscope_message) =>
              setState({...state, horoscope_message})
            }
            style={styles.inputText}
            placeholder={'Add Report'}
            multiline={true}
          />
          </View>

        {SubmitButton('SUBMIT', submitHandler)}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HoroscopeDetail;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#83878E',
  },
  label_2: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#83878E',
    marginHorizontal: 20,
    marginTop: 20,
  },
  labelValue: {
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  labelView: {
    padding: 20,
    borderBottomColor: '#83878E80',
    borderBottomWidth: 1,
  },
  upload_image: {
    width: 130,
    height: 80,
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
  },
  upload_text: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 15,
    color: '#000',
  },
  upload_touch: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  ft_view: {
    flexDirection: 'row',
    marginHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ft_cross: {
    width: 25,
    height: 25,
  },
  ft_touch: {
    padding: 5,
  },
  ft_touch_name: {
    flex: 0.6,
  },
  inputText: {
    marginHorizontal: 20,
    borderBottomColor: 'black',

  },
});
