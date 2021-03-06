import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import GetRotalarAPI from '../../service/GetRotalarAPI';
import Input from '../components/input';
import DeleteRotalarAPI from '../../service/DeleteRotalarAPI';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      isEditable: false,
    };
  }
  _clickhandler() {
    this.setState({isEditable: !this.state.isEditable});
  }
  sil = async () => {
    try {
      await DeleteRotalarAPI().then(vals => {
        console.log('->', vals);
      });
    } catch (error) {
      alert(error);
    }
  };
  navigateRotaBilgileri = (Baslangic, Bitis, Rotalar) => {
    this.props.navigation.navigate('RotaGuncelleme', {
      Baslangic,
      Bitis,
      Rotalar,
    });
  };
  navigateRotaSirala = (Baslangic, Bitis, Rotalar) => {
    this.props.navigation.navigate('RotaSirala', {
      Baslangic,
      Bitis,
      Rotalar,
    });
  };
  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(userId => {
      this.setState({userId});
      console.log(this.state.userId);
    });
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
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 15, textAlign: 'center'}}>
          Rota bulunmamakta.
        </Text>
      </View>
    );
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
          onPress={() =>
            this.navigateRotaBilgileri(
              item.item.BaslangicNoktasi,
              item.item.BitisNoktasi,
              item.item.Rotalar,
            )
          }>
          <Text style={styles.Btn1}>Düzenle</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={this.RotaEkle}>
          <Text style={styles.Btn1}>Rota Şehir Ekle</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.navigateRotaSirala(
              item.item.BaslangicNoktasi,
              item.item.BitisNoktasi,
              item.item.Rotalar,
            )
          }>
          <Text style={styles.Btn1}>Tekrar Sırala</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.sil}>
          <Text style={styles.Btn1}>Sil</Text>
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
