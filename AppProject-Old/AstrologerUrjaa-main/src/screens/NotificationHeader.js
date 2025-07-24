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

// import {UpdateNotification, GetProfile} from '../../backend/Api';

function NotificationHeader({type}) {
  const [data, setUser] = React.useState({});
  const [notification, setNotification] = React.useState('1');

  const navigation = useNavigation();

  return (
    <View style={style1.headerview}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={style1.homemenu} />
      </Pressable>
      <Text style={[style1.homewallet, {width: '68%', color: 'black'}]}>
        Notifications
      </Text>

      {/* <Pressable
        onPress={() => {
          // UpdateNotification({notification: notification == '1' ? '0' : '1'})
          //   .then(data => {
          //     if (data.status) {
          //       if (data.status == true) {
          //         setNotification(notification == '1' ? '0' : '1');
          //       } else {
          //         // setChat(data.data);
          //       }
          //     } else {
          //       //   setChat(data.data);
          //     }
          //   })
          //   .catch(error => {
          //     console.log('error', error);
          //   });
        }}>
        <View>
          {notification == '1' && (
            <Image
              source={require('../assets/on.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginTop: 20,
              }}
            />
          )}
          {notification == '0' && (
            <Image
              source={require('../assets/off.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                marginTop: 20,
              }}
            />
          )}
        </View>
      </Pressable> */}
    </View>
  );
}
export default NotificationHeader;
