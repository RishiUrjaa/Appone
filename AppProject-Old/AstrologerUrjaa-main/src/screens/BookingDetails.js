import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

class Common extends React.Component {
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
                fontFamily: 'mulli',
                fontSize: 20,
                fontFamily: 'Montserrat-SemiBold',
                color: 'white',
                marginLeft: 20,
              }}>
              Booking Detail
            </Text>
          </View>
        </View>

        <View
          style={{justifyContent: 'center', alignSelf: 'center', width: '90%'}}>
          <View
            style={{
              height: 180,
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 8,
              marginTop: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <View
              style={{
                width: '100%',
                height: 80,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 2,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      height: 60,
                      width: 60,
                      backgroundColor: '#FFF',
                      borderRadius: 30,
                      marginTop: 15,
                    }}>
                    <Image
                      style={{height: 60, width: 60, resizeMode: 'contain'}}
                      source={require('./profile.png')}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 18,
                      height: 45,
                      flexDirection: 'column',
                    }}>
                    <Text
                      style={{
                        lineHeight: 20,
                        fontSize: 16,
                        color: '#F97012',
                        fontFamily: 'Avenir',
                      }}>
                      RaKul Sharma
                    </Text>

                    <Text
                      style={{
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#69707F',
                        fontFamily: 'Avenir',
                        marginTop: 6,
                      }}>
                      Male | 25 yrs
                    </Text>

                    <Text
                      style={{
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#69707F',
                        fontFamily: 'Avenir',
                        marginTop: 6,
                      }}>
                      Date of Birth : 14 July 1995
                    </Text>

                    <Text
                      style={{
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#69707F',
                        fontFamily: 'Avenir',
                        marginTop: 6,
                      }}>
                      Time of Birth : 02:40 PM
                    </Text>

                    <Text
                      style={{
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#69707F',
                        fontFamily: 'Avenir',
                        marginTop: 6,
                      }}>
                      Place of Birth : New Delhi
                    </Text>

                    <Text
                      style={{
                        lineHeight: 18,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#69707F',
                        fontFamily: 'Avenir',
                        marginTop: 6,
                      }}>
                      Relation : Brother
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{justifyContent: 'center', alignSelf: 'center', width: '90%'}}>
          <View
            style={{
              height: 140,
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 8,
              marginTop: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <View style={{width: '90%', flexDirection: 'row', marginTop: 10}}>
              <Image
                style={{
                  height: 32,
                  width: 32,
                  marginLeft: 20,
                  resizeMode: 'contain',
                }}
                source={require('./ic.png')}
              />

              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  marginLeft: 20,
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Avenir',
                }}>
                Date: 26/11/2020
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 0.3,
                borderColor: '#D1D1D1',
                marginTop: 10,
              }}></View>

            <Text
              style={{
                lineHeight: 18,
                fontSize: 16,
                fontWeight: 'normal',
                marginLeft: 20,
                color: '#1E1F20',
                fontFamily: 'Avenir',
                marginTop: 26,
              }}>
              Service : Video Call
            </Text>
          </View>
        </View>

        <View
          style={{justifyContent: 'center', alignSelf: 'center', width: '90%'}}>
          <View
            style={{
              height: 140,
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 8,
              marginTop: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}>
            <View style={{width: '90%', flexDirection: 'row', marginTop: 10}}>
              <Image
                style={{
                  height: 32,
                  width: 32,
                  marginLeft: 20,
                  resizeMode: 'contain',
                }}
                source={require('./ca.png')}
              />

              <Text
                style={{
                  lineHeight: 18,
                  fontSize: 14,
                  marginLeft: 20,
                  fontWeight: 'bold',
                  color: '#000',
                  fontFamily: 'Avenir',
                }}>
                Date: 26/11/2020
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                borderWidth: 0.3,
                borderColor: '#D1D1D1',
                marginTop: 10,
              }}></View>

            <Text
              style={{
                lineHeight: 18,
                fontSize: 16,
                fontWeight: 'normal',
                marginLeft: 20,
                color: '#1E1F20',
                fontFamily: 'Avenir',
                marginTop: 26,
              }}>
              Today, Nov 26, 2020
            </Text>
            <Text
              style={{
                lineHeight: 18,
                fontSize: 15,
                fontWeight: 'normal',
                marginLeft: 20,
                color: '#1E1F20',
                fontFamily: 'Avenir',
                marginTop: 10,
              }}>
              02:00 PM
            </Text>
          </View>
        </View>

        <TouchableOpacity style={{marginBottom: 40}}>
          <View
            style={{
              width: '83%',
              borderRadius: 25,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 45,
              backgroundColor: '#FA9219',
              height: 50,
            }}>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 18,
                color: 'white',
                alignSelf: 'center',
              }}>
              START VIDEO CALL
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaProvider>
    );
  }
}

export default Common;
