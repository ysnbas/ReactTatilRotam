import React, {Component} from 'react';
import {Dimensions} from 'react-native';

import SplashScreen from '../src/pages/SplashScreen';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import RotaVeyaRehber from '../src/pages/RotaVeyaRehber';
import ForgotPassAct from '../src/pages/ForgotPassAct';
import ForgotPass from '../src/pages/ForgotPass';
import WhellCity from '../src/pages/WhellCity';
import EnYakinRestoranlar from './pages/EnYakinRestoranlar';
import SelectCity from '../src/pages/SelectCity';
import RotaEkleme from '../src/pages/RotaEkleme';
import RotaDuzenle from '../src/pages/RotaDuzenle';
import YeniRotaEkleme from '../src/pages/YeniRotaEkleme';
import RotaGuncelleme from './pages/RotaGuncelleme';
import Rotalar from '../src/pages/Rotalar';
import RotaInceleme from '../src/pages/RotaInceleme';
import EnYakinMekan from '../src/pages/EnYakinMekan';
import EnYakinGezmelik from '../src/pages/EnYakinGezmelik';
import RotaSirala from '../src/pages/RotaSirala';

import RotayaKatilVeyaRotalarim from './pages/RotayaKatilVeyaRotalarim';
// import Ehue from '../src/pages/Ehue';
import OlusturVeyaDuzenle from '../src/pages/OlusturVeyaDuzenle';
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
    EnYakinRestoranlar: {
      screen: EnYakinRestoranlar,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaEkleme: {
      screen: RotaEkleme,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    OlusturVeyaDuzenle: {
      screen: OlusturVeyaDuzenle,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaDuzenle: {
      screen: RotaDuzenle,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaGuncelleme: {
      screen: RotaGuncelleme,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    YeniRotaEkleme: {
      screen: YeniRotaEkleme,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotayaKatilVeyaRotalarim: {
      screen: RotayaKatilVeyaRotalarim,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    Rotalar: {
      screen: Rotalar,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaInceleme: {
      screen: RotaInceleme,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    EnYakinMekan: {
      screen: EnYakinMekan,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    EnYakinGezmelik: {
      screen: EnYakinGezmelik,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    RotaSirala: {
      screen: RotaSirala,
      navigationOptions: {
        headerShown: false,
        headerLeft: null,
      },
    },
    // Ehue: {
    //   screen: Ehue,
    //   navigationOptions: {
    //     headerShown: false,
    //     headerLeft: null,
    //   },
    // },
  },
  {
    headerLayoutPreset: 'center',
    initialRouteName: 'SplashScreen',
  },
);
const AppContainer = createAppContainer(AppNavigator);
