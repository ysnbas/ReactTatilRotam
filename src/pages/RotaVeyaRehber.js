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
        <View style={styles.RehberYaziArea}>
          <Text style={styles.RehberYaziBtn}>
            Çark kısmında çevireceğiniz çark'a göre kendinize bir plan
            yapabilirsiniz.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('SelectCity')}>
          <Text style={styles.Btn1}>Çark</Text>
        </TouchableOpacity>
        <View style={styles.RehberYaziArea}>
          <Text style={styles.RehberYaziBtn}>
            Rehber kısmına tıklayarak gün içinde aktivite yapma fikirleri ve
            daha fazlasına ulaşabilirsiniz.
          </Text>
        </View>
        <TouchableOpacity style={styles.RehberBtn}>
          <Text style={styles.Btn1}>Rehber</Text>
        </TouchableOpacity>
        <View style={styles.RehberYaziArea}>
          <Text style={styles.RehberYaziBtn}>
            Rota kısmına tıklayarak oluşturacağınız rota ile artık yola
            hazırsınız.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() =>
            this.props.navigation.navigate('RotayaKatilVeyaRotalarim')
          }>
          <Text style={styles.Btn1}>Rota</Text>
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
  },

  RehberYaziArea: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 40,
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
  Btn1: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
  },
});
