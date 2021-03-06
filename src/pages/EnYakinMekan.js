import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
export default class EnYakinMekan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeadText}>Haritalar</Text>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('EnYakinRestoranlar')}>
          <Text style={styles.Btn1}>En Yakın Restoranlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('EnYakinGezmelik')}>
          <Text style={styles.Btn1}>En Yakın Gezmelik Yerler</Text>
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
