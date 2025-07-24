import moment from 'moment';
import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import {FetchVideo} from '../service/Api';
import Loader from '../utils/Loader';

const ListVideo = ({navigation, route}) => {
  const [blog, setBlog] = React.useState([]);
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  useEffect(() => {
    FetchVideo()
      .then(data => {
        if (data.status) {
          setBlog(data.lists);
        }
      })
      .catch(error => {
        toggleLoading(false);
        console.log('error', error);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {state.loading && <Loader />}
      <>
        <ScrollView>
          <FlatList
            style={[{marginTop: 5, marginLeft: 0}]}
            data={blog}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').width / 2 - 20,
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowRadius: 4,
                      elevation: 5,
                      backgroundColor: 'white',
                      margin: 10,
                    }}>
                    <Image
                      source={{uri: item.image_url}}
                      style={[
                        {
                          width: Dimensions.get('window').width / 2 - 20,
                          height: 120,
                          resizeMode: 'contain',
                        },
                        {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                      ]}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 155,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: 'AvenirLTStd-Medium',
                        }}>
                        {moment(item.added_on).format('DD MMM YYYY')}
                      </Text>
                      <Text
                        style={[
                          {fontSize: 15, fontFamily: 'AvenirLTStd-Medium'},
                          {marginLeft: 16},
                        ]}>
                        {moment(item.added_on).format('hh:mm a')}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{fontSize: 15, fontFamily: 'AvenirLTStd-Medium'}}>
                      {item.name}
                    </Text>

                    {/* {type == 'video' && (
                      <Image
                        source={require('../../assets/homeicon/youtube.png')}
                        style={style1.youtube}
                      />
                    )} */}
                  </View>
                </Pressable>
              );
            }}
          />
        </ScrollView>
      </>
    </SafeAreaView>
  );
};
export default ListVideo;
