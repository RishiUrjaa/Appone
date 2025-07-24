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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AssignedPujaPriest from './AssignedPujaPriest';
import CompletedPuja from './CompletedPuja';

const initialLayout = {width: Dimensions.get('window').width};

const getTabBarIcon = props => {
  const {route} = props;
  const {focused} = props;

  let iconName;

  if (route.key === 'first') {
    iconName = focused;
    //  ? require('./ghar1.png')
    //   : require('./ghar.png')
  } else if (route.key === 'second') {
    iconName = focused;
    //  ? require('./discussion1.png')
    //   : require('./discussion.png')
  }

  // You can return any component that you like here!
  return <Image source={iconName} style={{height: 26, width: 26}} />;
};

class PriestHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageget: 0,
      imageget1: 0,
      imageget2: 0,
      email: '',
      loading: '',
      mobile: '',
      password: '',
      icon: '',
      index: 0,
      routes: [
        {key: 'first', title: 'Home'},
        {key: 'second', title: 'News'},
      ],
    };
  }

  _renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <AssignedPujaPriest navigation={this.props.navigation} />;
      case 'second':
        return <CompletedPuja navigation={this.props.navigation} />;

      default:
        return null;
    }
  };

  renderTabBar(props) {
    return (
      <TabBar
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: 54,
          activeColor: '#F2C1D7',
        }}
        scrollEnabled={true}
        activeColor={'#1357A2'}
        inactiveColor={'#75757580'}
        inactiveOpacity={0.5}
        activeOpacity={1.0}
        {...props}
        tabStyle={{width: 69, height: 54}}
        indicatorStyle={{backgroundColor: '#1357A2', height: 5}}
        renderIcon={props => getTabBarIcon(props)}
        labelStyle={{display: 'none', height: 0}}
      />
    );
  }

  render() {
    return (
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#F97012" />

        <View
          style={{
            width: '100%',
            height: 80,
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                }}>
                <Image
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                  source={require('./homelogo.png')}
                />
              </View>

              <View
                style={{
                  marginLeft: 18,
                  height: 45,
                  flexDirection: 'column',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    lineHeight: 15,
                    fontSize: 14,
                    color: 'white',
                    fontFamily: 'Avenir',
                  }}>
                  Welcome{' '}
                </Text>

                <Text
                  style={{
                    lineHeight: 18,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Avenir',
                  }}>
                  Vipul Pandey
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <TouchableOpacity
                style={{marginLeft: 21}}

                //onPress={() => this.props.navigation.navigate('Feedback')}
              >
                <Image
                  style={{height: 26, width: 23, resizeMode: 'contain'}}
                  source={require('./notificationBell.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 20}}
                //onPress={() => this.props.navigation.navigate('ProfileScreen')}
              >
                <Image
                  style={{height: 26, width: 23, resizeMode: 'contain'}}
                  source={require('./filter.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginLeft: 20}}
                // onPress={() => this.props.navigation.navigate('ProfileScreen')}
              >
                <Image
                  style={{height: 33, width: 30, resizeMode: 'contain'}}
                  source={require('./profile.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TabView
            navigationState={this.state}
            renderScene={this._renderScene}
            indicatorStyle={{backgroundColor: 'white'}}
            onIndexChange={index => this.setState({index})}
            renderTabBar={this.renderTabBar}
            initialLayout={initialLayout}
            tabBarPosition="top"
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

export default PriestHomeScreen;
