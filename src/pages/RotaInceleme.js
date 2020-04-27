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
      Basnoktasi: '',
      Bitnoktasi: '',
      isEditable: false,
    };
  }
  _clickhandler() {
    this.setState({isEditable: !this.state.isEditable});
  }
  render() {
    const {navigation} = this.props;
    let Baslangic = navigation.getParam('Baslangic', '');
    let Bitis = navigation.getParam('Bitis', '');
    let AraYerler = navigation.getParam('Rotalar', '');
    return (
      <View style={styles.container}>
        <View style={styles.LgnArea}>
          <Input
            label="Başlangıç Noktası"
            data={this.state.categoryList}
            onChangeText={Basnoktasi => this.setState({Basnoktasi})}
            value={Baslangic}
            editable={this.state.isEditable}
          />
          <Input
            label="Başlangıç Noktası"
            onChangeText={Bitnoktasi => this.setState({Bitnoktasi})}
            data={this.state.categoryList}
            value={Bitis}
            editable={this.state.isEditable}
          />
          <Text style={{marginTop: 15}}>Ara Yerler</Text>
          {AraYerler.map((item, key) => (
            <Input key={key} editable={this.state.isEditable}>
              {item}
            </Input>
          ))}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.Btn1}>Katıl</Text>
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
});
