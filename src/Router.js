import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import SplashScreen from '../src/pages/SplashScreen';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import RotaVeyaRehber from '../src/pages/RotaVeyaRehber';
import ForgotPassAct from '../src/pages/ForgotPassAct';
import ForgotPass from '../src/pages/ForgotPass';
import WhellCity from '../src/pages/WhellCity';
import SelectCity from '../src/pages/SelectCity';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const {width, height} = Dimensions.get('window');

export default class Router extends Component {
  render() {
    return <AppContainer />;
  }
}
const AppNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },

    Register: {
      screen: Register,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaVeyaRehber: {
      screen: RotaVeyaRehber,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    ForgotPassAct: {
      screen: ForgotPassAct,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    ForgotPass: {
      screen: ForgotPass,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    SelectCity: {
      screen: SelectCity,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    WhellCity: {
      screen: WhellCity,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'SplashScreen',
  },
);
const AppContainer = createAppContainer(AppNavigator);
