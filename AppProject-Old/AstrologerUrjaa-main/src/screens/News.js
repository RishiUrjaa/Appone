import {
  Button,
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import style from './StyleDocument/HomeStyles';
import style1 from '../Style';
import stringsoflanguages from '../Language';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

function News({news, type, screen = '0'}) {
  const navigation = useNavigation();
  return (
    <View>
      {screen == '0' && (
        <TouchableOpacity
          onPress={() => {
            if (type == 'blog') {
              navigation.navigate('ListBlog');
            }
            if (type == 'video') {
              navigation.navigate('ListVideo');
            }
            if (type == 'news') {
              navigation.navigate('ListNews');
            }
          }}>
          <View style={style1.consulation}>
            <Text style={style1.paymentdetail}>
              {type == 'blog'
                ? stringsoflanguages.blog
                : type == 'news'
                ? stringsoflanguages.astronews
                : stringsoflanguages.astrovideos}
            </Text>

            <Text
              style={[
                style1.paymentdetail,
                {
                  color: '#FFC613',
                  fontSize: 14,
                  fontFamily: 'AvenirLTStd-Roman',
                },
              ]}>
              {stringsoflanguages.viewAll}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <FlatList
        style={[style.newslist, {marginTop: -25, marginLeft: 0}]}
        data={news}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <Pressable
              onPress={() => {
                if (type == 'video' || type == 'news') {
                  Linking.openURL(item.url);
                } else {
                  navigation.navigate('BlogDetail', item);
                }
              }}>
              <View style={style.newsiew}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={[
                    style.newsimage,
                    {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                  ]}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 155,
                  }}>
                  <Text style={style1.authortext}>
                    {moment(item.added_on).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[style1.authortext, {marginLeft: 16}]}>
                    {moment(item.added_on).format('hh:mm a')}
                  </Text>
                </View>
                <Text numberOfLines={1} style={style1.newstext}>
                  {type == 'video' ? item.name : item.title}
                </Text>
                <View style={style1.paymentside}>
                  <Text numberOfLines={1} style={style1.authortext}>
                    {type == 'blog'
                      ? item.author_name
                      : type == 'news'
                      ? item.name
                      : ''}
                  </Text>
                </View>
                {type == 'video' && (
                  <Image
                    source={require('../../assets/homeicon/youtube.png')}
                    style={style1.youtube}
                  />
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
export default News;
