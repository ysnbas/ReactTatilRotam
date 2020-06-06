import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import SehirIcıIlceGuncelle from '../../service/SehirIciIlceGuncelleAPI';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

import * as data from '../../json/iller.json';
import {Input} from 'react-native-elements';
const word = data;
export default class SehirIciGuncelle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      sehirler: '',
      mekanlar: '',
      mekanAdi: '',
      mekanAciklama: '',
      aciklama: '',
      BasDate: '',
      BitDate: '',
      categoryList: [],
      subCategoryList: [],
      // dinamikIlce: [],
      // data,
      updateMekan: null,
      updateMekanAciklama: null,
    };
    this.getdata = this.getdata.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.getdata();
  }

  getdata() {
    var temp = [];

    // TODO: Json File data
    if (word) {
      var len = word.iller.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          var data = word.iller[i];
          var joined = {value: data.il};
          temp.push(joined);
        }
      }
      this.setState({
        categoryList: temp,
      });
    }
  }

  guncelle = async () => {
    let mekanID = this.props.navigation.getParam('mekanId', '');
    console.log(mekanID);
    var toJSON =
      "{'mekanAdi': '" +
      this.state.updateMekan +
      "','mekanAciklama': '" +
      this.state.updateMekanAciklama +
      "', 'aciklama': '" +
      this.state.aciklama +
      "', 'BasDate': '" +
      this.state.BasDate +
      "', 'BitDate': '" +
      this.state.BitDate +
      "'}";
    var body = eval('(' + toJSON + ')');
    try {
      await SehirIcıIlceGuncelle(body, mekanID);
    } catch (error) {
      alert(error);
    }
    Keyboard.dismiss();
  };
  // onChangeDropdown(vals) {
  //   this.setState({dinamikIlce: []});
  //   const {data, dinamikIlce} = this.state;
  //   data.iller.forEach(element => {
  //     if (element.il == vals) {
  //       const ilceler = element.ilceleri;
  //       ilceler.forEach(element => {
  //         dinamikIlce.push({value: element});
  //       });
  //     }
  //   });
  // }
  updateMekan(key, value) {
    var temp = this.state.updateMekan;
    temp[key] = value;
    this.setState({updateMekan: temp});
  }
  updateMekanAciklama(key, value) {
    var temp = this.state.updateMekanAciklama;
    temp[key] = value;
    this.setState({updateMekanAciklama: temp});
  }
  componentDidMount() {
    const {navigation} = this.props;
    let mekan = navigation.getParam('mekanlar', '');
    let mekanaciklama = navigation.getParam('mekanaciklama', '');

    this.setState({updateMekan: mekan});
    this.setState({updateMekanAciklama: mekanaciklama});
    let mekanID = this.props.navigation.getParam('mekanId', '');
    console.log(mekanID);
  }
  render() {
    const {navigation} = this.props;
    let mekan = navigation.getParam('mekanlar', '');
    let mekanaciklama = navigation.getParam('mekanaciklama', '');
    let aciklama = navigation.getParam('aciklama', '');

    let Baslangictarihi = navigation.getParam('baslangictarihi', '');
    let Bitistarihi = navigation.getParam('bitistarihi', '');

    const {mekanAdi, mekanAciklama} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.LgnArea}>
            <Text style={{marginTop: 15}}>Mekanlar</Text>
            {mekan.map((item, key) => (
              <Input
                key={key}
                onChangeText={value => this.updateMekan(key, value)}>
                {item}
              </Input>
            ))}
            <Text style={{marginTop: 15}}>Mekan Açıklamaları</Text>

            {mekanaciklama.map((item, key) => (
              <Input
                key={key}
                onChangeText={value => this.updateMekanAciklama(key, value)}>
                {item}
              </Input>
            ))}
            <Text style={{marginTop: 15}}>Açıklama</Text>
            <Input onChangeText={aciklama => this.setState({aciklama})}>
              {aciklama}
            </Input>
            <View style={{padding: 10}}>
              <Text>Başlangıç Tarihi</Text>
              <DatePicker
                style={{width: 250}}
                mode="date"
                date={this.state.BasDate}
                placeholder={Baslangictarihi}
                format="YYYY-MM-DD"
                minDate="2020-05-01"
                maxDate="2020-12-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={BasDate => {
                  this.setState({BasDate: BasDate});
                }}
              />
              <Text>Bitiş Tarihi</Text>
              <DatePicker
                style={{width: 250}}
                mode="date"
                date={this.state.BitDate}
                placeholder={Bitistarihi}
                format="YYYY-MM-DD"
                minDate="2020-05-01"
                maxDate="2020-12-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                }}
                onDateChange={BitDate => {
                  this.setState({BitDate: BitDate});
                }}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={this.guncelle}>
              <Text style={styles.Btn1}>Güncelle</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    paddingVertical: 100,
  },
  LgnArea: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 5,
    padding: 20,
    borderRadius: 5,

    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 4,
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#720b98',
  },
  Btn1: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
  },
});
