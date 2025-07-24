import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
const GLOBAL = require('./Global');
import {DeviceEventEmitter} from 'react-native';
import * as actions from '../redux/actions';
import SearchBar from 'react-native-search-bar';
import PujaHeader1 from './PujaHeader1';
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;

type props = {};
export default class SelectPlace1 extends Component<Props> {
  state = {
    location: '',
    data: [],
  };

  selectedProduct = (item, index) => {
    item.type = this.props.route.params == '0' ? false : true;
    DeviceEventEmitter.emit('event.testEvent', {item});
    this.props.navigation.goBack();
  };
  _renderItemproducts = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          let gg = {
            display_name: `${item.name},${item.state},${item.countryName}`,
            lat: item.latitude,
            lon: item.longitude,
          };

          this.selectedProduct(gg, index);

          // this.selectedProduct(item, index)}
        }}
        activeOpacity={0.9}>
        <View
          style={{
            backgroundColor: 'white',
            color: 'white',
            flexDirection: 'column',
            flex: 1,
            margin: 5,
            borderRadius: 6,
            width: windowW,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'DMSans-Bold',
              color: 'black',
              margin: 6,
            }}>
            {item.name}, {item.state},{item.countryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  componentDidMount() {}

  searchFilterFunction = text => {
    if (text.length < 2) {
      return;
    }
    let matchdata = {
      search: text,
    };
    console.log(JSON.stringify(matchdata));

    fetch('http://139.59.67.166/location_filter/api/filter_location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchdata),
    })
      .then(response => response.json())
      .then(data => {
        //  alert(JSON.stringify(data));
        this.setState({data: data.location});
        // alert(JSON.stringify(data));
        // let ff = {
        //   data: e,
        //   response: data,
        // };
        // //  navigation.navigate('BreakUp', ff);

        // navigation.navigate('MatchMakingDetail', ff);
      })
      .catch(err => {
        console.log(err);
      });

    // const data = new FormData();
    // data.append('place', text);
    // console.log(JSON.stringify(data));
    // const url =
    //   'https://www.theloveastro.com/admin/Theloveastro_admin/api/location-finder';
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(matchdata),
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     //   alert(JSON.stringify(responseJson));

    //     this.setState({data: responseJson.data?.data});

    //     // if (responseJson.data.length > 0) {
    //     //   this.setState({data: responseJson.data});
    //     // }
    //     //  else {
    //     //   this.setState({data: []});
    //     // }
    //     // if (responseJson.status == 'success') {
    //     //   this.setState({data: responseJson.data});
    //     // }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#FEBD57" />

        {/* <PujaHeader1 type={'Location'} /> */}
        <SearchBar
          style={{height: 45}}
          ref="searchBar"
          placeholder="Search"
          value={this.state.value}
          textColor="black"
          onChangeText={text => this.searchFilterFunction(text)}
        />
        <FlatList
          style={{flexGrow: 0, marginBottom: 5}}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItemproducts}
        />
      </SafeAreaView>
    );
  }
}
