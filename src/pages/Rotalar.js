import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import GetIlIlceAPI from '../../service/AyrintiliGetAPI';
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
    await AsyncStorage.getItem('id').then(userId => {
      this.setState({userId});
      console.log(this.state.userId);
    });
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
          Rota bulunmamakta veya yükleniyor...
        </Text>
      </View>
    );
  };
  navigateRotaBilgileri = (
    rotaid,
    mekanlar,
    aciklama,
    baslangictarihi,
    bitistarihi,
  ) => {
    this.props.navigation.navigate('RotaInceleme', {
      rotaid,
      mekanlar,
      aciklama,
      baslangictarihi,
      bitistarihi,
    });
  };
  rotaidsi = rotaid => {
    this.props.navigation.navigate('Yorumlar', {
      rotaid,
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
    var mekanlar = [];
    for (let index = 0; index < item.item.Mekanlar.length; index++) {
      const element = item.item.Mekanlar[index].mekanAdi;
      const element1 = item.item.Mekanlar[index].mekanAciklama;
      mekanlar.push(element, element1);
    }
    console.log('->' + mekanlar);

    return (
      <View style={styles.LgnArea}>
        <Text>Açıklama</Text>

        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            editable={this.state.isEditable}
            placeholder={item.item.Aciklama}
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
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
              item.item._id,
              mekanlar,
              item.item.Aciklama,
              item.item.BaslangicTarihi,
              item.item.BitisTarihi,
            )
          }>
          <Text style={styles.Btn1}>İncele</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.IdleriKayitEt(item.item._id)}>
          <Text style={styles.Btn1}>Katıl</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.rotaidsi(item.item._id)}>
          <Text style={styles.Btn1}>Yorumlar</Text>
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
  textAreaContainer: {
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});
