import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
export default class RotaVeyaRehber extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeadText}>Rotalarım</Text>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('Rotalar')}>
          <Text style={styles.Btn1}>Rotalar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('Rotalarim')}>
          <Text style={styles.Btn1}>Rotalarım</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('Yorumlarim')}>
          <Text style={styles.Btn1}>Yorumlarım</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('EnYakinMekan')}>
          <Text style={styles.Btn1}>Harita</Text>
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
