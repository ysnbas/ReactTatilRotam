import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import * as data from '../../json/iller.json';
import Input from '../components/input';
const word = data;
export default class RotaInceleme extends Component {
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

  go = rotaid => {
    this.props.navigation.navigate('YorumYap', {
      rotaid,
    });
  };
  render() {
    const {navigation} = this.props;

    let id = navigation.getParam('rotaid', '');
    let mekan = navigation.getParam('mekanlar', '');
    let aciklama = navigation.getParam('aciklama', '');
    let Baslangictarihi = navigation.getParam('baslangictarihi', '');
    let Bitistarihi = navigation.getParam('bitistarihi', '');
    return (
      <View style={styles.container}>
        <View style={styles.LgnArea}>
          <Text>Mekanlar ve Açıklamalar Alt Alta Sıralanmıştır.</Text>

          {mekan.map((item, key) => (
            <Input key={key} editable={this.state.isEditable}>
              {item}
            </Input>
          ))}
          <Text>Açıklama</Text>
          <Input value={aciklama} editable={this.state.isEditable} />
          <Text>Başlangıç Tarihi</Text>

          <Input
            label="Başlangıç Tarihi"
            value={Baslangictarihi}
            editable={this.state.isEditable}
          />
          <Text>Bitiş Tarihi</Text>

          <Input
            label="Bitiş Tarihi"
            value={Bitistarihi}
            editable={this.state.isEditable}
          />
          <TouchableOpacity style={styles.button} onPress={() => this.go(id)}>
            <Text style={styles.Btn1}>Yorum Yap</Text>
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
