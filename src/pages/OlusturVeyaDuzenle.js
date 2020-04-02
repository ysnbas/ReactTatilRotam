import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class RotaVeyaRehber extends Component {
  submit = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login');
    } catch (error) {}

    Keyboard.dismiss();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeadText}>Tatil Rotam</Text>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('RotaEkleme')}>
          <Text style={styles.Btn1}>Rota Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('RotaDuzenle')}>
          <Text style={styles.Btn1}>Rota Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.RehberBtn} onPress={this.submit}>
          <Text style={styles.Btn1}>çıkış</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  RehberBtn: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#720b98',
    margin: 10,
  },

  Btn1: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
  },
});
