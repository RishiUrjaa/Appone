import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OtherApi} from '../service/Api';
import {globStyle} from '../styles/style';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {SimpleHeader} from '../utils/Header';

import HTMLView from 'react-native-htmlview';
import Loader from '../utils/Loader';
const HtmlScreen = ({navigation, route}) => {
  const [state, setState] = useState({
    isLoading: true,
    htmlcontent: '<p></p>',
    list: [],
  });
  useEffect(() => {
    if (route.params.key !== 'faq') {
      (async () => {
        console.log(route.params.key);
        const result = await OtherApi(route.params.key);
        setState({...state, htmlcontent: result, isLoading: false});
      })();
    } else {
      (async () => {
        console.log(route.params.key);
        const {status = false, list = []} = await OtherApi(route.params.key);
        console.log(list);
        setState({...state, list, isLoading: false});
        if (!status) {
          alert('Something went wrong');
        }
      })();
    }
  }, []);
  const renderHtml = () => (
    <HTMLView value={state.htmlcontent} stylesheet={styles} />
  );
  const renderHtml1 = data => <HTMLView value={data} stylesheet={styles} />;
  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {SimpleHeader(route.params.title, () => navigation.goBack())}
      {state.isLoading && <Loader />}
      <ScrollView>
        {['aboutus', 'terms', 'privacy'].includes(route.params.key) &&
          renderHtml()}
        {state.list.map(item => (
          <View style={styles2.container}>
            <Text style={styles2.text}>{renderHtml1(item.question)}</Text>
            <Text style={styles2.text}>{renderHtml1(item.answer)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default HtmlScreen;
const styles = StyleSheet.create({
  p: {
    fontWeight: '300',
    color: 'black', // make links coloured pink
    padding: 20,
  },
});

const styles2 = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    width: 300,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#747A8D',
    width: 200,
  },
});
