import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import RotalarimGet from '../../service/RotalarimGetAPI';
import RotalarimiSilAPI from '../../service/RotalarimiSilAPI';
import RotalarimIDGetAPI from '../../service/RotalarimIDGetAPI';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Rotalarim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      SilId: '',
      isEditable: false,
    };
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(userId => {
      this.setState({userId});
      console.log(this.state.userId);
    });
    {
      try {
        await RotalarimGet(this.state.userId).then(vals => {
          console.log('->', vals);
          this.setState({resData: vals});
        });
      } catch (error) {
        alert(error);
      }
    }
    {
      try {
        await RotalarimIDGetAPI().then(vals => {
          console.log('->', vals);
          this.setState({resData: vals});
        });
      } catch (error) {}
    }
  };
  sil = async silI => {
    try {
      await RotalarimiSilAPI(silI).then(vals => {
        console.log('->', vals);
      });
    } catch (error) {
      alert(error);
    }
  };
  renderContactItem = (item, index) => {
    var mekanlar = [];
    for (let index = 0; index < item.item.Mekanlar.length; index++) {
      const element = item.item.Mekanlar[index].mekanAdi;
      const element1 = item.item.Mekanlar[index].mekanAciklama;
      mekanlar.push(element, element1);
    }
    console.log('->' + mekanlar);
    console.log('->=_' + item.item._id);
    return (
      <View style={styles.LgnArea}>
        <Text>Mekanlar ve Açıklamalar Alt Alta Sıralanmıştır.</Text>
        {mekanlar.map((item, key) => (
          <Input key={key} editable={this.state.isEditable}>
            {item}
          </Input>
        ))}
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
        <Text>Başlangıç Tarihi</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BaslangicTarihi}
        />
        <Text>Bitiş Tarihi</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.BitisTarihi}
        />
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.sil(item.item._id)}>
          <Text style={styles.Btn1}>Kaldır</Text>
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
