import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import LoginForm from './LoginForm';
export default class Login extends Component {
  state = {
    checked: false,
  };

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {};
    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  handleBackPress = () => {
    Alert.alert(
      'Çıkış',
      'Uygulamayı Kapatmak İstiyor Musunuz?',
      [
        {
          text: 'İptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.HeadText}>Tatil Rotam</Text>
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={styles.LgnArea}>
            <LoginForm />

            <CheckBox
              center
              title="Beni Hatırla"
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassAct')}>
              <Text style={styles.SifremiUnuttumTxt}>Şifremi Unuttum</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}>
              <Text style={styles.RegisterTxt}>
                Hâlâ Kayıtlı Değilsen! Üye Ol
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ChckBox: {
    color: '#4a4a4a',
    fontWeight: 'normal',
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
  RegisterTxt: {
    marginBottom: 8,
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 8,
    color: '#ffa259',
  },
  SifremiUnuttumTxt: {
    marginBottom: 8,
    fontSize: 15,
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 8,
    color: '#039BE5',
  },

  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    paddingVertical: 100,
    justifyContent: 'center',
  },
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
  },
  LgnArea: {
    marginTop: 120,
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
