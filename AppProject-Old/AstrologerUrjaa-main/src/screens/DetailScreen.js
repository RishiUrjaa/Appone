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
//import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <StatusBar backgroundColor="orange" />
        <ScrollView style={{marginBottom: 20}}>
          <View style={{width: '100%', height: 293}}>
            <ImageBackground
              style={{height: 293, width: '100%', resizeMode: 'contain'}}
              source={require('./topimg.png')}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  style={{
                    height: 22,
                    width: 12,
                    marginLeft: 20,
                    marginTop: 20,
                    resizeMode: 'contain',
                  }}
                  source={require('./backwhite.png')}
                />
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 220,
                  marginLeft: 14,
                  height: 28,
                  width: 146,
                  borderRadius: 7,
                  justifyContent: 'center',
                }}>
                {/* <Text style={{color:'#FF9445',fontSize:14,lineHeight:13,fontStyle:'normal',alignSelf:'center'}}>Available online</Text> */}
              </View>

              <View
                style={{
                  width: '100%',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                  height: 20,
                  marginTop: 29,
                  backgroundColor: '#FFF',
                }}></View>
            </ImageBackground>
          </View>

          <Text
            style={{
              color: '#1A051D',
              fontSize: 26,
              lineHeight: 30,
              fontStyle: 'normal',
              marginLeft: 16,
            }}>
            Ganesh Abhishek
          </Text>

          <Text
            style={{
              color: '#747A8D',
              fontSize: 14,
              lineHeight: 24,
              fontStyle: 'normal',
              marginTop: 5,
              marginLeft: 16,
            }}>
            10/11/2020 | 10:00 AM
          </Text>

          <Text
            style={{
              color: '#747A8D',
              fontFamily: 'Avenir',
              fontSize: 16,
              textAlign: 'justify',
              lineHeight: 24,
              fontStyle: 'normal',
              marginTop: 4,
              marginLeft: 16,
              marginRight: 16,
            }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Contrary to popular
            belief, Lorem Ipsum is not simply random text. It has roots in a
            piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden-Sydney
            College in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source.{' '}
          </Text>
        </ScrollView>
      </SafeAreaProvider>
    );
  }
}

export default DetailScreen;
