import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from '../components/input';

export default class RegisterForm extends Component {
  render() {
    return (
      <View>
        <Text style={styles.FormName}>Giriş</Text>

        <Input
          placeholder="İsim"
          ReturnKeyType={'next'}
          onSubmitEditing={() => this.SurnameInput.focus()}
        />
        <Input
          placeholder="Soyisim"
          ReturnKeyType={'next'}
          inputRef={input => (this.SurnameInput = input)}
          onSubmitEditing={() => this.UsernameInput.focus()}
        />
        <Input
          placeholder="Kullanıcı Adı"
          autoCapitalize="none"
          ReturnKeyType={'next'}
          inputRef={input => (this.UsernameInput = input)}
          onSubmitEditing={() => this.passwordInput.focus()}
        />

        <Input
          placeholder="Şifre"
          autoCapitalize="none"
          secureTextEntry={true}
          inputRef={input => (this.passwordInput = input)}
          onSubmitEditing={() => this.passwordAgainInput.focus()}
          ReturnKeyType={'next'}
        />
        <Input
          placeholder="Şifre Tekrar"
          autoCapitalize="none"
          secureTextEntry={true}
          inputRef={input => (this.passwordAgainInput = input)}
          onSubmitEditing={() => this.emailInput.focus()}
          ReturnKeyType={'next'}
        />
        <Input
          placeholder="Email"
          autoCapitalize="none"
          ReturnKeyType={'go'}
          inputRef={input => (this.emailInput = input)}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'black',
  },
  Btn1: {
    color: '#fff',
    width:'100%',
    textAlign:'center'
  },
  FormName: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
