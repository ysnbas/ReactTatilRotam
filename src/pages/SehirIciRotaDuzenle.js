import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import GetIlIlceAPI from '../../service/GetIlIlceAPI';
import DeleteIlIlceAPI from '../../service/DeleteIlIlceAPI';

import Input from '../components/input';

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
      await DeleteIlIlceAPI().then(vals => {
        console.log('->', vals);
      });
    } catch (error) {
      alert(error);
    }
  };
  sirala = (mekanlar, aciklama, baslangictarihi, bitistarihi) => {
    this.props.navigation.navigate('IkiRotaSirala', {
      mekanlar,
      aciklama,
      baslangictarihi,
      bitistarihi,
    });
  };
  navigateRotaBilgileri = (
    mekanlar,
    aciklama,
    baslangictarihi,
    bitistarihi,
  ) => {
    this.props.navigation.navigate('SehirIciGuncelle', {
      mekanlar,
      aciklama,
      baslangictarihi,
      bitistarihi,
    });
  };

  componentDidMount = async () => {
    {
      try {
        await GetIlIlceAPI().then(vals => {
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
        <Text>Mekanlar</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.Mekanlar[0]}
        />
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.Aciklama}
        />
        <Text>Tarihler</Text>

        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BaslangicTarihi}
        />
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BitisTarihi}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.navigateRotaBilgileri(
              item.item.Mekanlar,
              item.item.Aciklama,
              item.item.BaslangicTarihi,
              item.item.BitisTarihi,
            )
          }>
          <Text style={styles.Btn1}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.sirala(
              item.item.Mekanlar,
              item.item.Aciklama,
              item.item.BaslangicTarihi,
              item.item.BitisTarihi,
            )
          }>
          <Text style={styles.Btn1}>Sırala</Text>
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
