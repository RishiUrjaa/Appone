import React from 'react';
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SimpleHeader = (title, callback) => (
  <View style={headerStyle.container}>
    <TouchableOpacity style={headerStyle.touch} onPress={callback}>
      <Image
        source={require('../assets/back.png')}
        style={headerStyle.backImage}
      />
    </TouchableOpacity>
    <Text style={headerStyle.title}>{title}</Text>
  </View>
);

const headerStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    paddingBottom: 10,
    backgroundColor: '#FFC613',
  },
  title: {
    fontFamily: 'AvenirLTStd-Heavy',
    fontSize: 20,
    color: '#000000',
    paddingHorizontal: 5,
    marginTop: Platform.OS == 'ios' ? 42 : 12,
  },
  backImage: {
    width: 12,
    height: 22,
    resizeMode: 'contain',
    marginTop: Platform.OS == 'ios' ? 36 : 12,
  },
  touch: {
    padding: 10,
  },
});
