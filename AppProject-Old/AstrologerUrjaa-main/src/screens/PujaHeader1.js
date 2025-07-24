import {
  Button,
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import style1 from './Style';

import {useNavigation} from '@react-navigation/native';

function PujaHeader1({type}) {
  const [data, setUser] = React.useState({});
  const [currency, setCurrency] = React.useState({});
  const [selectedindex, setSelectedIndex] = React.useState(-1);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginTop: 10,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/pujaback.png')}
          style={[style1.homemenu, {width: 30, height: 30}]}
        />
      </Pressable>
      <Text
        style={[
          style1.homewallet,
          {
            width: '67%',
            fontSize: 20,
            color: '#191D21',
            fontFamily: 'AvenirLTStd-Heavy',
            marginTop: 28,
          },
        ]}>
        {type}
      </Text>
    </View>
  );
}
export default PujaHeader1;
