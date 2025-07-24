import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';

import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {StatusBarDark} from '../utils/CustomStatusBar';
import {SubmitButton} from '../utils/Button';
import {MasterCityApi, OtpApi, SignUpApi} from '../service/Api';
import {useStore} from 'react-redux';

const SignUp = ({navigation}) => {
  const store = useStore();
  const [name, onChangeName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [state, setState] = useState({
    stateList: store.getState().states || [],
    cityList: [],
  });
  const [form, setForm] = useState({
    name: 'test',
    email: 'test7@gmail.com',
    mobile: '8882772627',
    altmobile: '8882772627',
    gender: '',
    dob: '25/02/1996',
    address: 'asdfsdf',
    state: '',
    city: '',
    pincode: '123456',
    password: '123456',
    otp: Math.floor(1000 + Math.random() * 9000).toString(),
  });

  const submitHandler = async () => {
    const body = {
      email: form.email,
      mobile: form.mobile,
      otp: form.otp,
    };
    console.log(JSON.stringify(body, null, 2));
    const {status = false, msg = 'Something went wrong'} = await OtpApi(body);
    if (status) {
      console.log('next step');
      navigation.replace('OtpScreen', form);
    } else {
      alert(msg);
    }
  };

  const cityHandler = async state_id => {
    console.log(state_id);
    const {status = false, list = []} = await MasterCityApi({state_id});
    if (status) {
      setState({...state, cityList: list});
      setForm({...form, city: ''});
    } else {
      console.log('city failed');
    }
  };
  useEffect(() => {
    if (form.state) {
      cityHandler(form.state);
    } else {
      setForm({...form, city: ''});
      setState({...state, cityList: []});
    }
  }, [form.state]);
  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
      <StatusBarDark />

      <KeyboardAwareScrollView>
        <Image
          style={{
            height: 110,
            width: 145,
            marginTop: 35,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          source={require('../assets/splogo.png')}
        />

        <Text style={{fontSize: 51, marginTop: 37, color: '#F7F7FB'}}>
          REGISTRATION
        </Text>

        <View style={{width: '60%', marginLeft: 32}}>
          <Text
            style={{
              fontSize: 24,
              marginTop: -40,
              color: '#1D1E2C',
              fontWeight: 'bold',
            }}>
            Welcome to Shaktipeeth Digital!
          </Text>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Name"
              value={form.name}
              onChangeText={name => setForm({...form, name})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Email"
              value={form.email}
              onChangeText={email => setForm({...form, email})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Mobile Number"
              keyboardType="numeric"
              value={form.mobile}
              onChangeText={mobile => setForm({...form, mobile})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Alternate Number"
              value={form.altmobile}
              onChangeText={altmobile => setForm({...form, altmobile})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Dropdown
              containerStyle={{
                width: '100%',
                alignSelf: 'center',
                height: 70,
                marginTop: 25,
              }}
              icon={require('../assets/dropdownimg.png')}
              labelFontSize={18}
              label="Gender"
              underlineColor={{borderBottomColor: 'white'}}
              data={[
                {
                  value: 'Male',
                },
                {
                  value: 'Female',
                },
                {
                  value: 'Other',
                },
              ]}
              onChangeText={gender => setForm({...form, gender})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Date Of Birth (DD/MM/YYYY)"
              value={form.dob}
              onChangeText={dob => setForm({...form, dob})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Address"
              value={form.address}
              onChangeText={address => setForm({...form, address})}
            />
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            backgroundColor: '#FFF',
            marginTop: 32,
            height: 54,
            width: '90%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '45%',
                backgroundColor: '#F7F7FB',
                marginRight: 5,
                borderRadius: 6,
              }}>
              <Dropdown
                containerStyle={{
                  width: '100%',
                  alignSelf: 'center',
                  height: 70,
                  marginTop: 25,
                }}
                icon={require('../assets/dropdownimg.png')}
                labelFontSize={18}
                label="State"
                underlineColor={{borderBottomColor: 'white'}}
                data={state.stateList}
                onChangeText={value => setForm({...form, state: value})}
                labelExtractor={item => item.state_name}
                valueExtractor={item => item.id}
              />
            </View>

            <View
              style={{
                width: '45%',
                backgroundColor: '#F7F7FB',
                marginLeft: 5,
                borderRadius: 6,
              }}>
              <Dropdown
                containerStyle={{
                  width: '100%',
                  alignSelf: 'center',
                  height: 70,
                  marginTop: 25,
                }}
                icon={require('../assets/dropdownimg.png')}
                labelFontSize={18}
                label="City"
                underlineColor={{borderBottomColor: 'white'}}
                data={state.cityList}
                onChangeText={value => setForm({...form, city: value})}
                labelExtractor={item => item.city_name}
                valueExtractor={item => item.id}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="PinCode"
              keyboardType="number-pad"
              value={form.pincode}
              onChangeText={pincode => setForm({...form, pincode})}
            />
          </View>
        </View>

        <View
          style={{
            width: '83%',
            borderRadius: 6,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 32,
            backgroundColor: '#F7F7FB',
            height: 54,
          }}>
          <View
            style={{
              width: '90%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <TextInput
              placeholder="Password"
              value={form.password}
              onChangeText={password => setForm({...form, password})}
            />
          </View>
        </View>
        {SubmitButton('Submit', submitHandler)}
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <View
            style={{
              marginTop: -10,
              marginBottom: 18,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              width: '90%',
            }}>
            <Text style={{fontSize: 14, color: '#000521', alignSelf: 'center'}}>
              Already have an account?
            </Text>
            <Text style={{fontSize: 14, color: '#F97012', alignSelf: 'center'}}>
              Login Now
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default SignUp;
