import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import Input from '../components/input';
import {withNavigation} from 'react-navigation';

class LoginForm extends Component {
  AllFunc() {
    this.myFun();
  }
  constructor(props) {
    super(props);
    this.state = {
      uname: '',
      password: '',
    };
  }
  myFun = () => {
    const {uname, password} = this.state;
    if (uname.trim() == '') {
      this.setState({Error: 'Lütfen Kullanıcı Adınızı Girin.'});
    } else if (password == '') {
      this.setState({Error: 'Lütfen Şifrenizi Girin.'});
    } else if (password.length < 5) {
      this.setState({Error: 'Şifre En Az 5 Karakter Olmalı.'});
    } else {
      axios
        .post('http://10.201.160.32:3000/users/girisK', {
          isim: this.state.uname,
          soyisim: this.state.password,
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function() {
          reject('Servis bağlantı hatası !');
        });
      this.props.navigation.navigate('RotaVeyaRehber');
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
        <Text style={styles.FormName}>Giriş</Text>

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
        <TouchableOpacity style={styles.button} onPress={() => this.AllFunc()}>
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
