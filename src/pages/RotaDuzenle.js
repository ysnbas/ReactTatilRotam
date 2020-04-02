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
  Duzenle = async () => {
    try {
      this.props.navigation.navigate('RotaGuncelleme');
    } catch (error) {
      alert(error);
    }
  };
  RotaEkle = async () => {
    try {
      this.props.navigation.navigate('YeniRotaEkleme');
    } catch (error) {
      alert(error);
    }
  };
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
    return (
      <View>
        <Text>Rota bulunmamakta.</Text>
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
        <TouchableOpacity style={styles.button} onPress={this.Duzenle}>
          <Text style={styles.Btn1}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.RotaEkle}>
          <Text style={styles.Btn1}>Rota Şehir Ekle</Text>
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
