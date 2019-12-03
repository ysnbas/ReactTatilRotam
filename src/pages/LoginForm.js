import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Input from '../components/input';

export default class LoginForm extends Component {
  render() {
    // const {navigate} = this.props.navigation.navigate

    return (
      <View>
        <Text style={styles.FormName}>Giriş</Text>

        <Input
          placeholder="Kullanıcı Adı"
          autoCapitalize="none"
          ReturnKeyType={'next'}
          onSubmitEditing={() => this.passwordInput.focus()}
        />

        <Input
          placeholder="Şifre"
          autoCapitalize="none"
          secureTextEntry={true}
          inputRef={input => (this.passwordInput = input)}
          ReturnKeyType={'go'}
        />
        {/* <MyButton Text={'Giriş'} bgcolor={'black'} textcolor={'#fff'} /> */}
        {/* <Button title="selam" onPress={()=> this.props.navigation.navigate('Register')}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  FormName: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
