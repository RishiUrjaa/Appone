import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import StepIndicator from 'react-native-step-indicator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Your Gallery',
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const optionsSecond = {
  title: 'Select Your Data',
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const optionsPanCard = {
  title: 'Select Your Gallery',
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const optionsUploadPhoto = {
  title: 'Select Your Gallery',
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const customStyles = {
  marginBottom: 10,
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#F97012',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#F97012',
  stepStrokeUnFinishedColor: '#e5e5e5',
  separatorFinishedColor: '#F97012',
  separatorUnFinishedColor: '#e5e5e5',
  stepIndicatorFinishedColor: '#F97012',
  stepIndicatorUnFinishedColor: '#e5e5e5',
  stepIndicatorCurrentColor: '#F97012',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#F97012',
  stepIndicatorLabelFinishedColor: '#F97012',
  stepIndicatorLabelUnFinishedColor: 'black',
  labelColor: 'black',
  labelSize: 13,
  currentStepLabelColor: '#F97012',
};

const UploadDocuments = ({navigation}) => {
  const [state, setState] = useState({
    text: '',
    avatarSource: '',
    avatarSourceSecond: '',
    avatarSourcePanCard: '',
    avatarSourceUploadPhoto: '',
    loading: '',
    image: '',
    flag: 0,
    briefDocument: '',
  });

  const changeImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const changeImageSecond = () => {
    ImagePicker.showImagePicker(optionsSecond, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setState({...state, flag: 1});
        setState({...state, avatarSourceSecond: source});
      }
    });
  };

  const changeImagePanCard = () => {
    ImagePicker.showImagePicker(optionsPanCard, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setState({...state, flag: 1});
        setState({...state, avatarSourcePanCard: source});
      }
    });
  };

  const changeImageUploadPhoto = () => {
    ImagePicker.showImagePicker(optionsUploadPhoto, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setState({...state, flag: 1});
        setState({...state, avatarSourceUploadPhoto: source});
      }
    });
  };

  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <StatusBar backgroundColor="orange" />

      <KeyboardAwareScrollView>
        <View style={{marginTop: 40}}>
          <StepIndicator
            customStyles={customStyles}
            //  currentPosition={parseInt(getStatus)}
            //  labels={labels}
            stepCount={4}
          />
        </View>

        <Text style={{fontSize: 51, marginTop: 42, color: '#F7F7FB'}}>
          REGISTRATION
        </Text>

        <View style={{width: '70%', marginLeft: 32}}>
          <Text
            style={{
              fontSize: 24,
              marginTop: -48,
              color: '#1D1E2C',
              fontFamily: 'Avenir',
              fontWeight: 'bold',
            }}>
            Upload Documents / other information
          </Text>
        </View>

        <View
          style={{
            width: '80%',
            backgroundColor: '#F7F7FB',
            height: 182,
            marginTop: 23,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
              marginLeft: 20,
              marginRight: 10,
            }}>
            <TextInput
              style={{
                color: '#1D1E2C',
                fontWeight: 'normal',
                textAlign: 'justify',
                fontSize: 14,
                fontFamily: 'Avenir',
              }}
              underlineColorAndroid="transparent"
              multiline={true}
              placeholder="Write Brief Profile"></TextInput>
          </View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 20,
            fontFamily: 'Avenir',
            color: '#060417',
            marginLeft: 33,
            marginTop: 25,
          }}>
          Aadhar Card
        </Text>

        <View
          style={{
            width: Dimensions.get('window').width,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 8,
              marginTop: 8,
              justifyContent: 'center',
              marginLeft: 25,
              height: 100,
              width: '87%',
            }}>
            <View
              style={{
                borderRadius: 8,
                justifyContent: 'center',
                height: 93,
                width: 150,
              }}>
              <ImageBackground
                style={{
                  height: 93,
                  width: 150,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  justifyContent: 'center',
                }}
                source={require('../assets/upload.png')}>
                <View>
                  {state.avatarSource == '' && (
                    <View>
                      <TouchableOpacity onPress={() => changeImage()}>
                        <ImageBackground
                          style={{
                            height: 93,
                            width: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          source={require('../assets/upload.png')}>
                          {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadimg.png')} />
</TouchableOpacity> */}

                          <Text
                            style={{
                              fontFamily: 'Avenir',
                              lineHeight: 20,
                              marginTop: 60,
                              marginLeft: 45,
                              fontSize: 14,
                              fontStyle: 'normal',
                              color: '#1E1F20',
                            }}>
                            Front Side
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}

                  {state.avatarSource != '' && (
                    <View>
                      <TouchableOpacity onPress={() => changeImage()}>
                        <ImageBackground
                          style={{
                            height: 93,
                            width: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          imageStyle={{borderRadius: 6}}
                          source={state.avatarSource}>
                          {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadbg.png')} />
</TouchableOpacity> */}
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </ImageBackground>
            </View>

            <View
              style={{
                borderRadius: 8,
                justifyContent: 'center',
                marginLeft: 10,
                height: 93,
                width: 150,
              }}>
              <ImageBackground
                style={{
                  height: 93,
                  width: 150,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  justifyContent: 'center',
                }}
                source={require('../assets/upload.png')}>
                <View>
                  {state.avatarSourceSecond == '' && (
                    <View>
                      <TouchableOpacity onPress={() => changeImageSecond()}>
                        <ImageBackground
                          style={{
                            height: 93,
                            width: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          source={require('../assets/upload.png')}>
                          {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImageSecond()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadimg.png')} />
</TouchableOpacity>
 */}

                          <Text
                            style={{
                              fontFamily: 'Avenir',
                              lineHeight: 20,
                              marginTop: 60,
                              marginLeft: 45,
                              fontSize: 14,
                              fontStyle: 'normal',
                              color: '#1E1F20',
                            }}>
                            Back Side
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}

                  {state.avatarSourceSecond != '' && (
                    <View>
                      <TouchableOpacity onPress={() => changeImageSecond()}>
                        <ImageBackground
                          style={{
                            height: 93,
                            width: 150,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                          }}
                          imageStyle={{borderRadius: 6}}
                          source={state.avatarSourceSecond}>
                          {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImageSecond()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadbg.png')} />
</TouchableOpacity>  */}
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </ImageBackground>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 20,
            fontFamily: 'Avenir',
            color: '#060417',
            marginLeft: 33,
            marginTop: 25,
          }}>
          Pan Card
        </Text>

        <View
          style={{
            borderRadius: 8,
            justifyContent: 'center',
            height: 93,
            width: 150,
            marginTop: 8,
            marginLeft: 25,
          }}>
          <ImageBackground
            style={{
              height: 93,
              width: 150,
              alignSelf: 'center',
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
            source={require('../assets/upload.png')}>
            <View>
              {state.avatarSourcePanCard == '' && (
                <View>
                  <TouchableOpacity onPress={() => changeImagePanCard()}>
                    <ImageBackground
                      style={{
                        height: 93,
                        width: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      source={require('../assets/upload.png')}>
                      {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadimg.png')} />
</TouchableOpacity> */}

                      <Text
                        style={{
                          fontFamily: 'Avenir',
                          lineHeight: 20,
                          marginTop: 60,
                          marginLeft: 45,
                          fontSize: 14,
                          fontStyle: 'normal',
                          color: '#1E1F20',
                        }}>
                        Front Side
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}

              {state.avatarSourcePanCard != '' && (
                <View>
                  <TouchableOpacity onPress={() => changeImagePanCard()}>
                    <ImageBackground
                      style={{
                        height: 93,
                        width: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      imageStyle={{borderRadius: 6}}
                      source={state.avatarSourcePanCard}>
                      {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadbg.png')} />
</TouchableOpacity> */}
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ImageBackground>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            lineHeight: 20,
            fontFamily: 'Avenir',
            color: '#060417',
            marginLeft: 33,
            marginTop: 25,
          }}>
          Upload a colour profile photo{' '}
        </Text>

        <View
          style={{
            borderRadius: 8,
            justifyContent: 'center',
            height: 93,
            width: 150,
            marginTop: 8,
            marginLeft: 25,
          }}>
          <ImageBackground
            style={{
              height: 93,
              width: 150,
              alignSelf: 'center',
              resizeMode: 'contain',
              justifyContent: 'center',
            }}
            source={require('../assets/upload.png')}>
            <View>
              {state.avatarSourceUploadPhoto == '' && (
                <View>
                  <TouchableOpacity onPress={() => changeImageUploadPhoto()}>
                    <ImageBackground
                      style={{
                        height: 93,
                        width: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      source={require('../assets/upload.png')}>
                      {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadimg.png')} />
</TouchableOpacity> */}

                      <Text
                        style={{
                          fontFamily: 'Avenir',
                          lineHeight: 20,
                          marginTop: 60,
                          marginLeft: 45,
                          fontSize: 14,
                          fontStyle: 'normal',
                          color: '#1E1F20',
                        }}>
                        Front Side
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}

              {state.avatarSourceUploadPhoto != '' && (
                <View>
                  <TouchableOpacity onPress={() => changeImageUploadPhoto()}>
                    <ImageBackground
                      style={{
                        height: 93,
                        width: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                      }}
                      imageStyle={{borderRadius: 6}}
                      source={state.avatarSourceUploadPhoto}>
                      {/* <TouchableOpacity style={{marginTop:68,alignSelf:'flex-end'}} onPress={()=> changeImage()}>
<Image style={{height:32,width:32,resizeMode:'contain'}} source={require('./uploadbg.png')} />
</TouchableOpacity> */}
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ImageBackground>
        </View>

        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: 22,
          }}>
          <Image
            style={{height: 15, width: 15, borderRadius: 3, marginTop: 7}}
            source={require('../assets/rightcheck.png')}
          />

          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 12,
              lineHeight: 22,
              fontFamily: 'Avenir',
              color: '#060417',
              marginLeft: 10,
            }}>
            By submitting this form, you agree to work only with Shaktipeeth
            Digital in Online category of business{' '}
          </Text>
        </View>

        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <Image
            style={{height: 15, width: 15, borderRadius: 3, marginTop: 7}}
            source={require('../assets/rightcheck.png')}
          />

          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 12,
              lineHeight: 22,
              fontFamily: 'Avenir',
              color: '#060417',
              marginLeft: 10,
            }}>
            By submitting this form, you agree to work only with Shaktipeeth
            Digital in Online category of business{' '}
          </Text>
        </View>

        <TouchableOpacity
          style={{marginBottom: 40}}
          onPress={() => navigation.navigate('HomeScreen')}>
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
              SUBMIT
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default UploadDocuments;
