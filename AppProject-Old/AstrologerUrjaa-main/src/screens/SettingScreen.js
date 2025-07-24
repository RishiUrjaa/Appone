import {View, Text, TouchableOpacity, Image, Share} from 'react-native';

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SimpleHeader} from '../utils/Header';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';

const SettingScreen = ({navigation}) => {
  const shareApp = () => {
    var a =
      'Please Download Devvani get better Astrologer service with reasonable rate.';

    Share.share(
      {
        message: a,
        url: '',
      },
      {
        tintColor: 'green',
        dialogTitle: 'Share this Puja via....',
      },
    );
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {SimpleHeader('Settings', () => navigation.goBack())}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HtmlScreen', {title: 'About Us', key: 'aboutus'})
        }>
        <View
          style={{
            marginTop: 34,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 33, width: 33, resizeMode: 'contain'}}
              source={require('../assets/about.png')}
            />

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 20,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              About Us
            </Text>
          </View>
          <Image
            style={{height: 14, width: 8, resizeMode: 'contain'}}
            source={require('../assets/rightArrow.png')}
          />
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '90%',
          borderColor: '#C8C8D3',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.3,
          marginTop: 16,
        }}></View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HtmlScreen', {
            title: 'FAQ',
            key: 'faq',
          });
        }}>
        <View
          style={{
            marginTop: 30,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 33, width: 33, resizeMode: 'contain'}}
              source={require('../assets/faq.png')}
            />

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 20,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              FAQ
            </Text>
          </View>
          <Image
            style={{height: 14, width: 8, resizeMode: 'contain'}}
            source={require('../assets/rightArrow.png')}
          />
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: '90%',
          borderColor: '#C8C8D3',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.3,
          marginTop: 16,
        }}></View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HtmlScreen', {
            title: 'Privacy Policy',
            key: 'privacy',
          });
        }}>
        <View
          style={{
            marginTop: 30,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 33, width: 33, resizeMode: 'contain'}}
              source={require('../assets/privacy.png')}
            />

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 20,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              Privacy Policy
            </Text>
          </View>
          <Image
            style={{height: 14, width: 8, resizeMode: 'contain'}}
            source={require('../assets/rightArrow.png')}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          borderColor: '#C8C8D3',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.3,
          marginTop: 16,
        }}></View>

      <TouchableOpacity>
        <View
          style={{
            marginTop: 30,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 33, width: 33, resizeMode: 'contain'}}
              source={require('../assets/versoin.png')}
            />

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 20,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              App Version
            </Text>
          </View>

          <Text
            style={{
              fontFamily: 'AvenirLTStd-Medium',
              fontWeight: 'bold',
              fontSize: 20,
              color: '#000',
              marginLeft: 20,
              alignSelf: 'center',
            }}>
            1.0
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          borderColor: '#C8C8D3',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.3,
          marginTop: 16,
        }}></View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HtmlScreen', {
            title: 'Terms & Conditions',
            key: 'terms',
          })
        }>
        <View
          style={{
            marginTop: 30,
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 33, width: 33, resizeMode: 'contain'}}
              source={require('../assets/terms.png')}
            />

            <Text
              style={{
                fontFamily: 'AvenirLTStd-Medium',
                fontSize: 20,
                color: '#000',
                marginLeft: 20,
                alignSelf: 'center',
              }}>
              Terms & Conditions
            </Text>
          </View>
          <Image
            style={{height: 14, width: 8, resizeMode: 'contain'}}
            source={require('../assets/rightArrow.png')}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '90%',
          borderColor: '#C8C8D3',
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 0.3,
          marginTop: 16,
        }}></View>
    </SafeAreaProvider>
  );
};

export default SettingScreen;
