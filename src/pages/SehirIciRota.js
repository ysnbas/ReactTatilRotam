import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as data from '../../json/iller.json';
const word = data;
import {Dropdown} from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import {Input} from 'react-native-elements';
import AraRotaEkle from '../../service/AraRotaEkleAPI';
import DatePicker from 'react-native-datepicker';

export default class SehirIciRota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      mekanAdi: '',
      mekanAciklama: '',
      aciklama: '',
      BasTarihi: '',
      BitisTarihi: '',
      textInput: [],
      mekanInput: [],
      AciklamaInput: [],
      dene: null,
      counter: 0,
      BasDate: '2020-01-01',
      BitDate: '2020-01-01',
      // dinamikIlce: [],
      // data,
    };
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(userId => {
      this.setState({userId});
      console.log(this.state.userId);
    });
  };
  submit = async () => {
    const {mekanAdi, mekanAciklama, aciklama} = this.state;
    if (mekanAdi == '') {
      this.setState({Error: 'Mekan giriniz.'});
    } else if (mekanAciklama == '') {
      this.setState({Error: 'Mekana Açıklama Ekleyiniz.'});
    } else if (aciklama == '') {
      this.setState({Error: 'Açıklama Ekleyiniz.'});
    } else {
      {
        try {
          AsyncStorage.setItem('id', this.state.userId);
          console.log(this.state.userId);
        } catch (error) {
          console.log('AsyncStorage', error);
        }
        var toJSON =
          "{'mekanAdi': '" +
          this.state.mekanAdi +
          "','mekanAciklama': '" +
          this.state.mekanAciklama +
          "','aciklama': '" +
          this.state.aciklama +
          "','userId': '" +
          this.state.userId +
          "','BasDate': '" +
          this.state.BasDate +
          "','BitDate': '" +
          this.state.BitDate +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await AraRotaEkle(body);
        } catch (error) {
          alert(error);
        }
      }
    }
    Keyboard.dismiss();
  };

  addMekanInput = key => {
    const {mekanAdi, mekanAciklama} = this.state;
    let mekanInput = this.state.mekanInput;
    mekanInput.push(
      <Input
        key={key}
        placeholder="Yeni Mekan Adı"
        onChangeText={value =>
          this.setState({
            mekanAdi: mekanAdi + ',' + value,
          })
        }
      />,
      <Input
        key={key + 1}
        placeholder="Yeni Açıklama"
        onChangeText={value =>
          this.setState({
            mekanAciklama: mekanAciklama + ',' + value,
          })
        }
      />,
    );
    this.setState({mekanInput});
  };
  deleteMekanInput = () => {
    let mekanInput = this.state.mekanInput;
    mekanInput.pop();
    this.setState({mekanInput});
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
              <View>
                <Input
                  label="Mekanlar"
                  placeholder="Mekan Adı"
                  onChangeText={mekanAdi => this.setState({mekanAdi})}
                />
                <Input
                  placeholder="Mekan Açıklama"
                  onChangeText={mekanAciklama => this.setState({mekanAciklama})}
                />
              </View>
            </View>
            {this.state.mekanInput.map(value => {
              return value;
            })}
            {/* {this.state.dene} */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.addMekanInput(this.state.mekanInput.length)}>
              <Text style={styles.Btn1}>Yeni Mekan Ekle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.deleteMekanInput()}>
              <Text style={styles.Btn1}>Sil</Text>
            </TouchableOpacity>
            <View>
              <View>
                <Input
                  label="Açıklama"
                  placeholder="..."
                  onChangeText={aciklama => this.setState({aciklama})}
                />
              </View>
            </View>
            <View style={{padding: 10}}>
              <Text>Başlangıç Tarihi</Text>
              <DatePicker
                style={{width: 250}}
                mode="date"
                date={this.state.BasDate}
                placeholder="Tarih Seçin"
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
                placeholder="Tarih Seçin"
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
