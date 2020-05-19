import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Text} from 'react-native';
import GetRotalarAPI from '../../service/GetRotalarAPI';
import KullaniciyeRotaEkleAPI from '../../service/KullaniciyeRotaEkleAPI';
import Input from '../components/input';
import AsyncStorage from '@react-native-community/async-storage';

export default class Rotalar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      rotaId: '',
      userId: '',
      isEditable: false,
    };
  }
  _clickhandler() {
    this.setState({isEditable: !this.state.isEditable});
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
    await AsyncStorage.getItem('id').then(userId => {
      this.setState({userId});
      console.log(this.state.userId);
    });
  };
  _listEmptyComponent = () => {
    return (
      <View>
        <Text>Rota bulunmamakta.</Text>
      </View>
    );
  };
  navigateRotaBilgileri = (Baslangic, Bitis, Rotalar) => {
    this.props.navigation.navigate('RotaInceleme', {
      Baslangic,
      Bitis,
      Rotalar,
    });
  };
  IdleriKayitEt = async deger => {
    var toJSON =
      "{'userId': '" + this.state.userId + "', 'rotaId': '" + deger + "'}";
    console.log(toJSON);
    var body = eval('(' + toJSON + ')');
    try {
      await KullaniciyeRotaEkleAPI(body);
    } catch (error) {
      alert(error);
    }
    Keyboard.dismiss();
  };
  renderContactItem = (item, index) => {
    return (
      <View style={styles.LgnArea}>
        <Text>Başlangıç Noktası</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BaslangicNoktasi}
        />
        <Text>Bitiş Noktası</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BitisNoktasi}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.IdleriKayitEt(item.item._id)}>
          <Text style={styles.Btn1}>Katıl</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.navigateRotaBilgileri(
              item.item.BaslangicNoktasi,
              item.item.BitisNoktasi,
              item.item.Rotalar,
            )
          }>
          <Text style={styles.Btn1}>İncele</Text>
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
