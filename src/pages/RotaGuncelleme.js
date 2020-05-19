import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import RotaGuncelleAPI from '../../service/RotaGuncelleAPI';

import * as data from '../../json/iller.json';
const word = data;
export default class RotaGuncelleme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      Basnoktasi: '',
      Bitnoktasi: '',
      rotanoktasi: '',
      categoryList: [],
      subCategoryList: [],
    };
    this.getdata = this.getdata.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
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
  onChangeText = text => {
    var temp = [];
  };
  guncelle = async () => {
    var toJSON =
      "{'Basnoktasi': '" +
      this.state.Basnoktasi +
      "', 'Bitnoktasi': '" +
      this.state.Bitnoktasi +
      "', 'rotanoktasi': '" +
      this.state.rotanoktasi +
      "'}";
    var body = eval('(' + toJSON + ')');
    try {
      await RotaGuncelleAPI(body);
    } catch (error) {
      alert(error);
    }
    Keyboard.dismiss();
  };

  render() {
    const {navigation} = this.props;
    let Baslangic = navigation.getParam('Baslangic', '');
    let Bitis = navigation.getParam('Bitis', '');
    let AraYerler = navigation.getParam('Rotalar', '');
    const {rotanoktasi} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.LgnArea}>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Hepsiniz Tekrar Seçiniz.
          </Text>
          <Dropdown
            label="Başlangıç Noktası"
            data={this.state.categoryList}
            onChangeText={Basnoktasi => this.setState({Basnoktasi})}
            value={Baslangic}
          />
          <Dropdown
            label="Başlangıç Noktası"
            onChangeText={Bitnoktasi => this.setState({Bitnoktasi})}
            data={this.state.categoryList}
            value={Bitis}
          />
          <Text style={{marginTop: 15}}>Ara Yerler</Text>
          {AraYerler.map((item, key) => (
            <Dropdown
              key={key}
              value={item}
              data={this.state.categoryList}
              onChangeText={value =>
                this.setState({
                  rotanoktasi: rotanoktasi + ',' + value,
                })
              }
            />
          ))}

          <TouchableOpacity style={styles.button} onPress={this.guncelle}>
            <Text style={styles.Btn1}>Güncelle</Text>
          </TouchableOpacity>
        </View>
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
