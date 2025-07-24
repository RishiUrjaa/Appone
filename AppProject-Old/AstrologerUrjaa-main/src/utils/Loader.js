import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const Loader = () => (
  <View
    style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '100%',
      height: '90%',
      zIndex: 1,
    }}>
    <ActivityIndicator animating={true} size="large" color="#7ED321" />
  </View>
);

export default Loader;
