import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import RegisterForm from './RegisterForm';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Image
              style={styles.IconImage}
              source={require('../../img/icon.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.HeadText}>Tatil Rotam</Text>
          <View style={styles.LgnArea}>
            <RegisterForm></RegisterForm>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.Btn1}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  IconImage: {
    width: 35,
    height: 25,
    marginHorizontal: 10,
  },
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
  },
  LgnArea: {
    marginTop: 50,
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
});
