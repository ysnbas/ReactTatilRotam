import React, {Component} from 'react';
import loginAPI from '../../service/loginAPI';
import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import Input from '../components/input';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class LoginForm extends Component {
  // AllFunc() {
  //   this.myFun();
  // }

  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      password: '',
      uyeturu: '',
      isLogin: false,
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    this.readStore();
  }
  readStore = async () => {
    try {
      const uname = await AsyncStorage.getItem('userName');
      const password = await AsyncStorage.getItem('password');
      const uyeturu = await AsyncStorage.getItem('uyeturu');
      if (uname !== null && password !== null) {
        this.setState(
          {uname: uname, password: password, uyeturu: uyeturu},
          () => {
            this.props.navigation.navigate('OlusturVeyaDuzenle');
          },
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  submit = async () => {
    const {uname, password, uyeturu} = this.state;
    console.log(uyeturu);
    try {
      await AsyncStorage.setItem('uname', this.state.uname);
      await AsyncStorage.setItem('uyeturu', this.state.uyeturu);
    } catch (e) {
      console.log('AsyncStorage', error);
    }
    if (uname.trim() == '') {
      this.setState({Error: 'Lütfen Kullanıcı Adınızı Girin.'});
    } else if (password == '') {
      this.setState({Error: 'Lütfen Şifrenizi Girin.'});
    } else if (password.length < 5) {
      this.setState({Error: 'Şifre En Az 5 Karakter Olmalı.'});
    } else {
      {
        try {
          await AsyncStorage.setItem('uname', this.state.uname);
          await AsyncStorage.setItem('uyeturu', this.state.uyeturu);
        } catch (error) {
          console.log('AsyncStorage', error);
        }
        var toJSON =
          "{'uname': '" +
          this.state.uname +
          "', 'password': '" +
          this.state.password +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await loginAPI(body);
          AsyncStorage.setItem('userName', this.state.uname);
          AsyncStorage.setItem('password', this.state.password);
          AsyncStorage.setItem('userturu', this.state.uyeturu);
          if (uname == 'rehber1') {
            this.props.navigation.navigate('OlusturVeyaDuzenle');
          } else if (uname == 'depoyb') {
            this.props.navigation.navigate('RotaVeyaRehber');
          }
        } catch (error) {
          // this.props.navigation.navigate('RotaVeyaRehber');
          alert(error);
        }
      }
    }

    Keyboard.dismiss();
  };
  render() {
    // const {navigate} = this.props.navigation.navigate

    return (
      <View>
        <Text style={{color: 'red', textAlign: 'center'}}>
          {this.state.Error}
        </Text>
        <Text style={styles.FormName}>{this.state.isLogin}</Text>

        <Input
          placeholder="Kullanıcı Adı"
          autoCapitalize="none"
          ReturnKeyType={'next'}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={uname => this.setState({uname})}
        />

        <Input
          placeholder="Şifre"
          autoCapitalize="none"
          secureTextEntry={true}
          inputRef={input => (this.passwordInput = input)}
          ReturnKeyType={'go'}
          onChangeText={password => this.setState({password})}
        />
        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style={styles.Btn1}>Giriş</Text>
        </TouchableOpacity>
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
});
export default withNavigation(LoginForm);
