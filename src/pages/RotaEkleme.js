import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Dropdown} from 'react-native-material-dropdown';
import * as data from '../../json/iller.json';

const word = data;

import RotaEklemeAPI from '../../service/RotaEklemeAPI';
class RotaEkleme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Basnoktasi: '',
      Bitnoktasi: '',
      rotanoktasi: '',
      categoryList: [],
      subCategoryList: [],
      textInput: [],
    };
    this.getdata = this.getdata.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.submit = this.submit.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.getdata();
  }
  // rota=async()=>{
  //   const {arayer} = this.state;
  // else if (arayer=='') {
  //   this.setState({Error: 'Ara Yer Ekleyiniz.'});

  // }
  // Keyboard.dismiss();

  // }
  submit = async () => {
    const {Basnoktasi, Bitnoktasi, rotanoktasi} = this.state;
    if (Basnoktasi == '') {
      this.setState({Error: 'Başlangıç Noktası Giriniz.'});
    } else if (Bitnoktasi == '') {
      this.setState({Error: 'Bitiş Noktası Giriniz.'});
    } else if (rotanoktasi == '') {
      this.setState({Error: 'Ara Yer Ekleyiniz.'});
    } else {
      {
        var toJSON =
          "{'Basnoktasi': '" +
          this.state.Basnoktasi +
          "', 'Bitnoktasi': '" +
          this.state.Bitnoktasi +
          "','rotanoktasi': '" +
          this.state.rotanoktasi +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await RotaEklemeAPI(body);
        } catch (error) {
          alert(error);
        }
      }
    }
    Keyboard.dismiss();
  };

  //TODO: Popup Dropdown all Medication List get
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

  addTextInput = key => {
    const {rotanoktasi} = this.state;
    let textInput = this.state.textInput;
    textInput.push(
      <Dropdown
        key={key}
        label="Ara Yerler"
        placeholder="Seçiniz"
        data={this.state.categoryList}
        onChangeText={value =>
          this.setState({
            rotanoktasi: rotanoktasi + ',' + value,
          })
        }
      />,
    );
    this.setState({textInput});
  };
  removeTextInput = () => {
    let textInput = this.state.textInput;
    textInput.pop();
    this.setState({textInput});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.HeadText}>Rota Ekleme</Text>
          <View style={styles.LgnArea}>
            <Text style={{color: 'red', textAlign: 'center'}}>
              {this.state.Error}
            </Text>

            <View>
              <View style={{padding: 10}}>
                <Dropdown
                  label="Başlangıç Noktası"
                  onChangeText={Basnoktasi => this.setState({Basnoktasi})}
                  data={this.state.categoryList}
                />
              </View>
            </View>
            <View>
              <View style={{padding: 10}}>
                <Dropdown
                  label="Bitiş Noktası"
                  onChangeText={Bitnoktasi => this.setState({Bitnoktasi})}
                  data={this.state.categoryList}
                />
              </View>
            </View>
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
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
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
  LgnArea: {
    marginTop: 120,
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 40,
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
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
  },
});
export default withNavigation(RotaEkleme);
