import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import GetRotalarAPI from '../../service/GetRotalarAPI';
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
      categoryList: [],
      subCategoryList: [],
    };
    this.getdata = this.getdata.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.submit = this.submit.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.getdata();
  }

  componentDidMount = async () => {
    {
      try {
        await GetRotalarAPI().then(vals => {
          console.log('->', vals);
          this.setState({resData: vals});
        });
      } catch (error) {
        alert(error);
      }
    }
  };
  _listEmptyComponent = () => {
    return <View></View>;
  };
  getdata() {
    var temp = [];

    // TODO: Json File data
    if (word) {
      var len = word.iller.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          var data = word.iller[i];
          var joined = {value: data.sehirAdi};
          temp.push(joined);
        }
      }
      this.setState({
        categoryList: temp,
      });
    }
  }
  onChangeText(text) {
    var temp = [];
  }
  submit = async () => {};
  guncelle = async () => {
    var toJSON =
      "{'Basnoktasi': '" +
      this.state.Basnoktasi +
      "', 'Bitnoktasi': '" +
      this.state.Bitnoktasi +
      "'}";
    var body = eval('(' + toJSON + ')');
    try {
      await RotaGuncelleAPI(body);
      this.props.navigation.navigate('RotaDuzenle');
    } catch (error) {
      alert(error);
    }
    Keyboard.dismiss();
  };

  renderContactItem = (item, index) => {
    return (
      <View style={styles.LgnArea}>
        <Dropdown
          label="Başlangıç Noktası"
          onChangeText={Basnoktasi => this.setState({Basnoktasi})}
          data={this.state.categoryList}
          value={item.item.BaslangicNoktasi}
        />
        <Dropdown
          label="Başlangıç Noktası"
          onChangeText={Bitnoktasi => this.setState({Bitnoktasi})}
          data={this.state.categoryList}
          value={item.item.BitisNoktasi}
        />
        <TouchableOpacity style={styles.button} onPress={this.guncelle}>
          <Text style={styles.Btn1}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref="flatList"
          //inverted ters cevirir listeyi
          renderItem={this.renderContactItem}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.resData}
        />
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
