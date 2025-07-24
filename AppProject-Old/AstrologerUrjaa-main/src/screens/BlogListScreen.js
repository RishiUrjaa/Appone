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
import {FloatingAction} from 'react-native-floating-action';

const actions = [
  {
    text: 'Blog Post',
    icon: require('./blogPost.png'),
    name: 'bt_try',
    position: 1,
  },
];

class BlogListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      FlatListItems: [
        {
          key: '#1',

          image: require('./topimg.png'),

          bloggerName: 'Ganesh Abhishek',
          blogContent:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          button: 'Read More',
        },

        {
          key: '#2',

          image: require('./topimg.png'),

          bloggerName: 'Ganesh Abhishek',
          blogContent:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          button: 'Read More',
        },

        {
          key: '#3',

          image: require('./topimg.png'),

          bloggerName: 'Ganesh Abhishek',
          blogContent:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          button: 'Read More',
        },

        {
          key: '#4',

          image: require('./topimg.png'),

          bloggerName: 'Ganesh Abhishek',
          blogContent:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          button: 'Read More',
        },
      ],
    };
  }

  renderItem1 = ({item, index}) => {
    // alert(JSON.stringify(item))
    return (
      <View style={{}}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View
              style={{
                height: 118,
                width: '100%',
                flexDirection: 'row',
                backgroundColor: '#FFF',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}>
              <View style={{height: 118, width: 118, flexDirection: 'row'}}>
                <Image
                  style={{
                    height: 118,
                    width: 118,
                    resizeMode: 'cover',
                    borderRadius: 8,
                  }}
                  source={item.image}
                />
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 9,
                  width: '60%',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    lineHeight: 18,
                    fontSize: 14,
                    color: '#1E1F20',
                    fontFamily: 'Avenir',
                  }}>
                  {item.bloggerName}
                </Text>

                <Text
                  style={{
                    lineHeight: 16,
                    fontSize: 12,
                    fontWeight: 'normal',
                    textAlign: 'justify',
                    color: '#747A8D',
                    fontFamily: 'Avenir',
                    marginTop: 2,
                    marginRight: 10,
                  }}>
                  {item.blogContent}
                </Text>

                <TouchableOpacity style={{marginBottom: 40}}>
                  <View
                    style={{
                      height: 22,
                      width: 75,
                      backgroundColor: '#FA9219',
                      alignSelf: 'flex-end',
                      marginRight: 10,
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        lineHeight: 14,
                        marginTop: 2.5,
                        fontSize: 10,
                        fontWeight: 'bold',
                        color: '#FFF',
                        alignSelf: 'center',
                        fontFamily: 'Avenir',
                      }}>
                      {item.button}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  _keyExtractor = (item, index) => item.key;

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
              Blog List
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 70,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <FlatList
            style={{width: '100%'}}
            data={this.state.FlatListItems}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem1}
          />
        </View>

        <FloatingAction
          style={{marginTop: 50}}
          actions={actions}
          icon={require('./blogPost.png')}
          color={'#EA128B'}
          onPressItem={name => {
            this.props.navigation.navigate('PostBlog');
          }}
        />
      </SafeAreaProvider>
    );
  }
}

export default BlogListScreen;
