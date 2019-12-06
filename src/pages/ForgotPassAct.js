import React, {Component} from 'react';
import Input from '../components/input';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default class ForgotPassAct extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.ButtonBir}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Image
            style={styles.IconImage}
            source={require('../../img/icon.png')}></Image>
        </TouchableOpacity>
        <Text style={styles.HeadText}>Tatil Rotam</Text>
        <Text style={styles.LgnArea}>
          Şifre Değişikliği İçin Size Gönderdiğimiz Kodu Giriniz.
        </Text>
        <View style={styles.LgnArea}>
          <Input placeholder="E-Mail" autoCapitalize="none" />
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('E-Posta Başarıyla Gönderildi.')}>
            <Text style={styles.Btn1}>Gönder</Text>
          </TouchableOpacity>
          <Input placeholder="Doğrulama Kodu" autoCapitalize="none" />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert('Doğrulandı.', 'Başarıyla Doğrulandı.', [
                {
                  text: 'Ok',
                  onPress: () => this.props.navigation.navigate('ForgotPass'),
                },
              ])
            }>
            <Text style={styles.Btn1}>Doğrula</Text>
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
    justifyContent: 'center',
  },
  ButtonBir: {
    position: 'absolute',
    top: 65,
  },
  IconImage: {
    width: 35,
    height: 25,
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
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
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
  },
  LgnArea: {
    marginTop: 20,
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 25,
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
});
