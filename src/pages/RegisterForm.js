import React, {Component} from 'react';
import axios from 'react-native-axios';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Input from '../components/input';
import {withNavigation} from 'react-navigation';
import registerAPI from '../../service/registerAPI';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      uname: '',
      password: '',
      passwordtwo: '',
      email: '',
    };
    this.submit = this.submit.bind(this);
  }

  submit = async () => {
    const {fname, lname, uname, password, passwordtwo, email} = this.state;
    if (fname == '') {
      this.setState({Error: 'Lütfen İsminizi Yazınız.'});
    } else if (lname == '') {
      this.setState({Error: 'Lütfen Soy İsminizi Yazınız.'});
    } else if (uname.trim() == '') {
      this.setState({Error: 'Lütfen Kullanıcı Adınızı Girin.'});
    } else if (password == '') {
      this.setState({Error: 'Lütfen Şifrenizi Girin.'});
    } else if (password.length < 5) {
      this.setState({Error: 'Şifre En Az 5 Karakter Olmalı'});
    } else if (passwordtwo == '') {
      this.setState({Error: 'Lütfen Şifrenizi Girin.'});
    } else if (password != passwordtwo) {
      this.setState({Error: 'Şifreler Aynı Değil.'});
    } else if (email == '') {
      this.setState({Error: 'Lütfen Mail Adresinizi Yazınız.'});
    } else {
      // Alert.alert(
      //   'Kayıt',
      //   'Başarılı Şekilde Kayıt Oldunuz.',
      //   [
      //     {
      //       text: 'Tamam',
      //       onPress: () => this.props.navigation.navigate('Login'),
      //     },
      //   ],
      //   {
      //     cancelable: false,
      //   },
      // );
      // return true;
      {
        var toJSON =
          "{'fname': '" +
          this.state.fname +
          "', 'lname': '" +
          this.state.lname +
          "','uname':'" +
          this.state.uname +
          "','password':'" +
          this.state.password +
          "','passwordtwo':'" +
          this.state.passwordtwo +
          "','email':'" +
          this.state.email +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await registerAPI(body);
        } catch (error) {
          this.props.navigation.navigate('Login');
        }
      }
    }
    Keyboard.dismiss();
  };

  render() {
    return (
      <ScrollView>
        <View>
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
            }}>
            {this.state.Error}
          </Text>

          <Text style={styles.FormName}>Giriş</Text>

          <Input
            placeholder="İsim"
            ReturnKeyType={'next'}
            onSubmitEditing={() => this.SurnameInput.focus()}
            onChangeText={fname => this.setState({fname})}
          />

          <Input
            placeholder="Soyisim"
            ReturnKeyType={'next'}
            inputRef={input => (this.SurnameInput = input)}
            onSubmitEditing={() => this.UsernameInput.focus()}
            onChangeText={lname => this.setState({lname})}
          />
          <Input
            placeholder="Kullanıcı Adı"
            autoCapitalize="none"
            ReturnKeyType={'next'}
            inputRef={input => (this.UsernameInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={uname => this.setState({uname})}
          />

          <Input
            placeholder="Şifre"
            autoCapitalize="none"
            secureTextEntry={true}
            inputRef={input => (this.passwordInput = input)}
            onSubmitEditing={() => this.passwordAgainInput.focus()}
            ReturnKeyType={'next'}
            onChangeText={password => this.setState({password})}
          />
          <Input
            placeholder="Şifre Tekrar"
            autoCapitalize="none"
            secureTextEntry={true}
            inputRef={input => (this.passwordAgainInput = input)}
            onSubmitEditing={() => this.emailInput.focus()}
            ReturnKeyType={'next'}
            onChangeText={passwordtwo => this.setState({passwordtwo})}
          />
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            ReturnKeyType={'go'}
            inputRef={input => (this.emailInput = input)}
            onChangeText={email => this.setState({email})}
          />
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.Btn1}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: '#720b98',
  },
  Btn1: {
    color: '#fff',
    width: '100%',
    textAlign: 'center',
  },
  FormName: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
export default withNavigation(RegisterForm);
