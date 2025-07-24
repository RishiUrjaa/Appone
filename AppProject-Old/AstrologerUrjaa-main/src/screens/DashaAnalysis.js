import {
  Button,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Dimensions,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import style from './Style';
import SelectDropdown from 'react-native-select-dropdown';
import React, {useContext, useState, useEffect} from 'react';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {useNavigation} from '@react-navigation/native';
import stringsoflanguages from './Language';
import Loader from '../utils/Loader';
function DashaAnalysis({data}) {
  const navigation = useNavigation();
  const window = Dimensions.get('window');
  const {width, height} = Dimensions.get('window');
  const [select, setSelect] = useState(0);
  const [detail, setDetail] = useState('');
  const [svg, setSvg] = useState('');
  const [state, setState] = useState({
    loading: false,
  });
  const toggleLoading = bol => setState({...state, loading: bol});
  const [chart, setChart] = useState([
    {
      key: '0',

      name: stringsoflanguages.birthchart,
      is_selected: '0',
      chart_id: 'D1',
      des: 'D1 - Body, Physical Matters',
    },
    {
      key: '1',
      name: stringsoflanguages.chalitchart,
      is_selected: '0',
      chart_id: 'chalit',
      des: 'Chalit - Body, Physical Matters',
    },
    {
      key: '2',
      name: stringsoflanguages.moonchart,
      is_selected: '0',
      chart_id: 'MOON',
      des: 'Moon - Body, Physical Matters',
    },
    {
      key: '3',
      name: stringsoflanguages.sunchart,
      is_selected: '0',
      chart_id: 'SUN',
      des: 'Sun - Body, Physical Matters',
    },
    {
      key: '4',
      name: stringsoflanguages.horachart,
      is_selected: '0',
      chart_id: 'D2',
      des: 'D2 - Wealth, Family',
    },
    {
      key: '5',
      name: stringsoflanguages.dreskhanchart,
      is_selected: '0',
      chart_id: 'D3',
      des: 'D3 - Siblings, Nature',
    },
    {
      key: '6',
      name: stringsoflanguages.chaturchart,
      is_selected: '0',
      chart_id: 'D4',
      des: 'D4 - Fortune and Property',
    },
    {
      key: '7',
      name: stringsoflanguages.panchmanshachart,
      is_selected: '0',
      chart_id: 'D5',
      des: 'D5 - Fame and Power',
    },
    {
      key: '8',
      name: stringsoflanguages.saptmanshachart,
      is_selected: '0',
      chart_id: 'D7',
      des: 'D7 - Children/Property',
    },

    {
      key: '10',
      name: stringsoflanguages.navmanshachart,
      is_selected: '0',
      chart_id: 'D9',
      des: 'D9 - Wife, Dharma and Relationships',
    },
    {
      key: '11',
      name: stringsoflanguages.dashmanshachart,
      is_selected: '0',
      chart_id: 'D10',
      des: 'D10 - Actions in Society, Profession',
    },
    {
      key: '12',
      name: stringsoflanguages.dwadashachart,
      is_selected: '0',
      chart_id: 'D12',
      des: 'D12 - Parents',
    },
    {
      key: '13',
      name: stringsoflanguages.shodashamnshachart,
      is_selected: '0',
      chart_id: 'D16',
      des: 'D16 - Vehicles, Travelling and Comforts',
    },
    {
      key: '14',
      name: stringsoflanguages.vishmnashachart,
      is_selected: '0',
      chart_id: 'D20',
      des: 'D20 - Spiritual Pursuits',
    },
    {
      key: '15',
      name: stringsoflanguages.chaturmanshachat,
      is_selected: '0',
      chart_id: 'D24',
      des: 'D24 - Education, Learning and Knowledge',
    },
    {
      key: '16',
      name: stringsoflanguages.bhamshachart,
      is_selected: '0',
      chart_id: 'D27',
      des: 'D27 - Strengths and Weakness',
    },
    {
      key: '17',
      name: stringsoflanguages.trishamanshachart,
      is_selected: '0',
      chart_id: 'D30',
      des: 'D30 - Evils, Failure, Bad Luck',
    },
    {
      key: '18',
      name: stringsoflanguages.khavedamshachart,
      is_selected: '0',
      chart_id: 'D40',
      des: 'D40 - Maternal Legacy',
    },
    {
      key: '19',
      name: stringsoflanguages.akshvedanshachart,
      is_selected: '0',
      chart_id: 'D45',
      des: 'D45 - Paternal Legacy',
    },
    {
      key: '20',
      name: stringsoflanguages.shashtymshachart,
      is_selected: '0',
      chart_id: 'D60',
      des: 'D60 - Past birth or Karma',
    },
  ]);

  useEffect(() => {
    console.log(JSON.stringify(data));
    const url =
      'https://astroapi-3.divineapi.com/indian-api/v1/horoscope-chart/D1';

    fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdHJvYXBpLTEuZGl2aW5lYXBpLmNvbS9hcGkvYXV0aC1hcGktdXNlciIsImlhdCI6MTcwODYwMTc1MiwibmJmIjoxNzA4NjAxNzUyLCJqdGkiOiJiRGpad2xTU1NzZ2tZa1Z2Iiwic3ViIjoiMTU1MiIsInBydiI6ImU2ZTY0YmIwYjYxMjZkNzNjNmI5N2FmYzNiNDY0ZDk4NWY0NmM5ZDcifQ.ewzPVCXkrWeFL1cIPXI_z8FEQM38AsYGgeL0GKxNvjg',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        if (responseJson.success == '1') {
          console.log(responseJson.data?.svg);
          setSvg(responseJson.data?.svg);
          //setDetail(responseJson.data?.base64_image);
          // setDetail(responseJson?.data?.planets);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          //   alert(responseJson.message);
        }
      });
  }, []);

  const getChart = ids => {
    toggleLoading(true);
    const url = `https://astroapi-3.divineapi.com/indian-api/v1/horoscope-chart/${ids}`;

    fetch(url, {
      method: 'post',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FzdHJvYXBpLTEuZGl2aW5lYXBpLmNvbS9hcGkvYXV0aC1hcGktdXNlciIsImlhdCI6MTcwODYwMTc1MiwibmJmIjoxNzA4NjAxNzUyLCJqdGkiOiJiRGpad2xTU1NzZ2tZa1Z2Iiwic3ViIjoiMTU1MiIsInBydiI6ImU2ZTY0YmIwYjYxMjZkNzNjNmI5N2FmYzNiNDY0ZDk4NWY0NmM5ZDcifQ.ewzPVCXkrWeFL1cIPXI_z8FEQM38AsYGgeL0GKxNvjg',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        toggleLoading(false);
        //  alert(JSON.stringify(responseJson));
        if (responseJson.success == '1') {
          // alert(responseJson.data?.base64_image);
          setSvg(responseJson.data?.svg);
          //setDetail(responseJson.data?.base64_image);
          // setDetail(responseJson?.data?.planets);
          // setResponse(responseJson.data);
          //alert(JSON.stringify(responseJson.data));
          //  navigation.navigate('Numerology2', responseJson.data);
        } else {
          //   alert(responseJson.message);
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      {state.loading && <Loader />}
      <View
        style={{margin: 2, width: '90%', alignSelf: 'center', marginTop: 5}}>
        <SelectDropdown
          data={chart}
          onSelect={(selectedItem, index) => {
            getChart(selectedItem.chart_id);
          }}
          defaultButtonText={stringsoflanguages.birthchart}
          buttonTextAfterSelection={(selectedItem, index) => {
            // getChart(selectedItem.chart_id);
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem.name;
          }}
          buttonStyle={style.dropdown1BtnStyle}
          buttonTextStyle={style.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return (
              <Image
                style={{width: 12, height: 12, resizeMode: 'contain'}}
                source={require('../assets/drop.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={style.dropdown1DropdownStyle}
          rowStyle={style.dropdown1RowStyle}
          rowTextStyle={style.dropdown1RowTxtStyle}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item.name;
          }}
        />
      </View>
      <View style={{height: 400}}>
        <AutoHeightWebView
          source={{html: svg}}
          style={{
            width: Dimensions.get('window').width - 20,
            height: 400,
            alignSelf: 'center',
          }}
          containerStyle={{margin: 7}}
          scalesPageToFit={true}
          scrollEnabled={false}
          viewportContent={'name=viewport,width=100px , user-scalable =yes'}
        />
      </View>
    </View>
  );
}
export default DashaAnalysis;

const styles = StyleSheet.create({
  viewstyle1: {
    backgroundColor: 'white',
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textstyle1: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Medium',
    marginLeft: 18,
  },
  textstyle2: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Heavy',
    marginRight: 18,
    textAlign: 'right',
    width: Dimensions.get('window').width - 220,
  },
  viewstyle2: {
    backgroundColor: '#FFF2D8',
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textstyle3: {
    fontSize: 14,
    color: '#191D2166',
    fontFamily: 'AvenirLTStd-Medium',
    marginLeft: 10,
  },
  textstyle4: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Heavy',
    marginRight: 10,
    textAlign: 'right',
    width: Dimensions.get('window').width - 200,
  },
  viewstyle3: {
    backgroundColor: 'white',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snotext: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Medium',
    marginTop: 15,
  },
  multitext: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
    fontFamily: 'AvenirLTStd-Roman',
  },
});
