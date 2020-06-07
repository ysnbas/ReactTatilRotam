import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import KimlerKatilmisAPI from '../../service/KimlerKatilmisAPI';

import Input from '../components/input';
import AsyncStorage from '@react-native-community/async-storage';

export default class KimlerKatilmis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      isEditable: false,
    };
  }
  componentDidMount = async () => {
    let id = this.props.navigation.getParam('mekanId', '');
    console.log(id);
    {
      try {
        await KimlerKatilmisAPI(id).then(vals => {
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
          Yükleniyor... Eğer 5 saniyeden fazla sürerse katılan kişi
          bulunmamaktadır.
        </Text>
      </View>
    );
  };
  renderContactItem = (item, index) => {
    return (
      <View style={styles.LgnArea}>
        <Text>Kullanıcı Adı</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.kullaniciAdi}
        />

        <Text>Adı</Text>
        <Input editable={this.state.isEditable} placeholder={item.item.isim} />
        <Text>Soyadı</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.soyisim}
        />
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
    justifyContent: 'center',
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
  RehberBtn: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
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
