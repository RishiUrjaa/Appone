import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  PermissionsAndroid,
  NativeModules,
  BackHandler,
} from 'react-native';

import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class CompletedPuja extends React.Component {
  render() {
    return (
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#F97012" />

        <View
          style={{
            width: '100%',
            height: 60,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
            backgroundColor: '#F97012',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{height: 22, width: 12, resizeMode: 'contain'}}
                source={require('./backwhite.png')}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 20,
                fontFamily: 'Avenir',
                color: 'white',
                marginLeft: 20,
              }}>
              Completed Puja
            </Text>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

export default CompletedPuja;
