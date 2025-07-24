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

const {width, height} = Dimensions.get('window');

const Thankyou = ({navigation, route}) => {
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

  const loginHandler = () => {};
  return (
    <View style={{flex: 1}}>
      <Image
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: 80,
        }}
        source={require('../assets/thank.png')}
      />

      <Text
        style={{
          fontFamily: 'AvenirLTStd-Roman',
          fontSize: 12,
          color: 'black',
          marginTop: 10,
          margin: 20,
        }}>
        Thanks for showing interest in AstroUrjaa. Your reference number is
        <Text
          style={{
            fontFamily: 'AvenirLTStd-Roman',
            fontSize: 12,
            color: '#FED700',
          }}>
          &nbsp;{route.params.id}
        </Text>
      </Text>
      <Text
        style={{
          fontFamily: 'AvenirLTStd-Roman',
          fontSize: 12,
          color: 'black',
          marginTop: 10,
          margin: 20,
        }}>
        Our team will contact you for interviews within one week if the profile
        gets shortlist.
      </Text>
      <Text
        style={{
          fontFamily: 'AvenirLTStd-Roman',
          fontSize: 12,
          color: 'black',
          marginTop: 10,
          margin: 20,
        }}>
        For more information, drop an email at
        <Text
          style={{
            fontFamily: 'AvenirLTStd-Roman',
            fontSize: 12,
            color: '#FED700',
          }}>
          &nbsp;onboard@AstroUrjaa.co.in
        </Text>
      </Text>
    </View>
  );
};

export default Thankyou;

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
