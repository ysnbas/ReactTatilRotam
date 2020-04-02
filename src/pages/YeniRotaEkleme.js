import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import AraYerlerEkleAPI from '../../service/AraYerlerEkleAPI';
import Input from '../components/input';
import * as data from '../../json/iller.json';
const word = data;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: [],
      categoryList: [],
      subCategoryList: [],
      AraYerler: '',
    };
    this.getdata = this.getdata.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.submit = this.submit.bind(this);
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
  addTextInput = index => {
    let textInput = this.state.textInput;
    textInput.push(
      <Dropdown
        data={this.state.categoryList}
        onChangeText={
          (text => this.addValues(text, index),
          AraYerler => this.setState({AraYerler}))
        }
        placeholder="Seçiniz"
      />,
    );
    this.setState({textInput});
  };
  submit = async () => {
    const {AraYerler} = this.state;
    if (AraYerler == '') {
      this.setState({Error: 'Ara Yer Noktası Giriniz.'});
    } else {
      {
        var toJSON = "{'AraYerler': '" + this.state.AraYerler + "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await AraYerlerEkleAPI(body);
        } catch (error) {
          alert(error);
        }
      }
    }
    Keyboard.dismiss();
  };
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({textInput, inputData});
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.LgnArea}>
          <Text>Eklenecek Rotaları Giriniz.</Text>
          {this.state.textInput.map(value => {
            return value;
          })}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addTextInput(this.state.textInput.length)}>
            <Text style={styles.Btn1}>Yeni Girdi Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.removeTextInput()}>
            <Text style={styles.Btn1}>Girdiyi Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.Btn1}>Tamamlandı</Text>
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
