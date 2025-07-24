import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Loader from '../utils/Loader';
import Toast from 'react-native-simple-toast';
import {AddSuport} from '../service/Api';
import store from '../redux/store';
const Suppourt = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    loading: false,
    email: '',
    message: '',
  });
  const toggleLoading = bol => setState({...state, loading: bol});

  const send = () => {
    if (state.name.length == 0) {
      Toast.showWithGravity('Name is required', Toast.SHORT, Toast.CENTER);
      return;
    }
    if (state.email.length == 0) {
      Toast.showWithGravity('Email is required', Toast.SHORT, Toast.CENTER);
      return;
    }
    if (state.message.length == 0) {
      Toast.showWithGravity('Message is required', Toast.SHORT, Toast.CENTER);
      return;
    }

    let f = {
      name: state.name,
      email: state.email,
      message: state.message,
      astrologer_id: store.getState().user.user_id,
    };

    console.log(JSON.stringify(f));

    toggleLoading(true);

    AddSuport({
      name: state.name,
      email: state.email,
      message: state.message,
      astrologer_id: store.getState().user.user_id,
    })
      .then(data => {
        toggleLoading(false);
        //  alert(JSON.stringify(data))
        if (data.status) {
          alert('Your Enquiry Submit Successfully.Our Team will contact soon.');
          navigation.goBack();

          // alert(JSON.stringify(data))
          //   navigation.navigate('Otp',{otp:+data.otp,status:true,mobile:+mobile})
        } else {
          //   navigation.navigate('Otp',{otp:+data.otp,status:false,mobile:+mobile})
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        {/* <Image
          source={require('../assets/icons/support-bg.png')}
          style={styles.bgImage}
        /> */}

        <View style={styles.view_1}>
          <View style={styles.view_11}>
            <Text style={styles.text_2}>Contact Us</Text>
            <Text
              style={[
                styles.text_3,
                {
                  fontSize: 12,
                  color: '#242A37',
                  fontWeight: 'bold',
                  fontFamily: 'AvenirLTStd-Medium',
                },
              ]}>
              info@devvani.com
            </Text>
            <Text
              style={[
                styles.text_3,
                {
                  fontSize: 12,
                  color: '#A6A7A9',
                  marginTop: 6,
                  fontFamily: 'AvenirLTStd-Medium',
                },
              ]}>
              Please get in touch with us in case you face any issues. We will
              be happy to help you.
            </Text>
          </View>
          <Image
            style={styles.image_1}
            source={require('../assets/question2.png')}
          />
        </View>
        <View style={styles.mainView}>
          <View style={styles.view_2}>
            <Image
              style={[styles.image_2, {marginLeft: 10}]}
              source={require('../assets/help.png')}
            />
            <Text style={styles.text_4}>Get in Touch</Text>
          </View>
          <Text style={[styles.text_1, {lineHeight: 22}]}>
            Please give us in between 12 to 24 working hours to address your
            issues
          </Text>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            onChangeText={text => setState({...state, name: text})}
            value={state.name}
            maxLength={30}
          />
          <Text style={styles.inputText}>Email </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            onChangeText={text => setState({...state, email: text})}
            value={state.email}
            maxLength={30}
          />
          <Text style={styles.inputText}>Message</Text>
          <TextInput
            style={styles.textInput}
            keyboardType="default"
            onChangeText={text => setState({...state, message: text})}
            value={state.message}
            multiline={true}
            maxLength={200}
            numberOfLines={3}
          />
          <TouchableOpacity style={styles.buttonTouch} onPress={() => send()}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Suppourt;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  backView: {
    position: 'absolute',
    left: 18,
    bottom: 8,
  },
  backTouch: {
    padding: 5,
  },
  bgImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    fontSize: 20,
    color: '#1E2432',
    alignSelf: 'center',
  },
  text_1: {
    fontFamily: 'AvenirLTStd-Medium',
    fontWeight: '400',
    fontSize: 14,
    color: '#7D7D7E',
    marginHorizontal: 12,
  },
  image_1: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  view_1: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    height: 120,
  },
  mainView: {
    marginHorizontal: 15,
    marginBottom: 25,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  view_11: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  text_2: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontWeight: '400',
    fontSize: 22,
    color: '#000000',
  },
  text_3: {
    fontFamily: 'AvenirLTStd-Medium',
    fontWeight: '400',
    fontSize: 18,
    color: '#000000',
  },
  image_2: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  view_2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 15,
  },
  text_4: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    fontSize: 20,
    color: '#1E2432',
  },
  inputText: {
    fontFamily: 'AvenirLTStd-Medium',
    fontWeight: '400',
    fontSize: 15,
    color: '#ACB1C0',
    marginHorizontal: 12,
    marginTop: 15,
  },
  textInput: {
    width: '90%',
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 16,
    fontWeight: '400',
    color: '#1E1F20',
    alignSelf: 'center',
    borderBottomColor: '#1e1f2033',
    borderBottomWidth: 1,
  },
  buttonView: {
    marginHorizontal: 109,
    borderRadius: 25,
    marginVertical: 30,
  },
  buttonTouch: {
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 25,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFC613',
  },
  buttonText: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
  },
});
