import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';

import AktiviteEkleAPI from '../../service/AktiviteEkleAPI';
import {Input} from 'react-native-elements';
class AktiviteEkle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gun: '',
      havadurumu: '',
      aciklama: '',
    };
  }

  submit = async () => {
    const {gun, havadurumu, aciklama} = this.state;
    if (gun == '') {
      this.setState({Error: 'Gün Giriniz.'});
    } else if (havadurumu == '') {
      this.setState({Error: 'Hava Durumu Giriniz.'});
    } else if (aciklama == '') {
      this.setState({Error: 'Açıklama Ekleyiniz.'});
    } else {
      {
        var toJSON =
          "{'gun': '" +
          this.state.gun +
          "', 'havadurumu': '" +
          this.state.havadurumu +
          "','aciklama': '" +
          this.state.aciklama +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await AktiviteEkleAPI(body);
        } catch (error) {
          alert(error);
        }
      }
    }
    Keyboard.dismiss();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.HeadText}>Aktivite Ekleme</Text>
          <View style={styles.LgnArea}>
            <Text style={{color: 'red', textAlign: 'center'}}>
              {this.state.Error}
            </Text>

            <View>
              <View style={{padding: 10}}>
                <Input label="Gün" onChangeText={gun => this.setState({gun})} />
              </View>
            </View>
            <View>
              <View style={{padding: 10}}>
                <Input
                  label="Hava Durumu"
                  onChangeText={havadurumu => this.setState({havadurumu})}
                />
              </View>
            </View>
            <View>
              <View style={{padding: 10}}>
                <Input
                  label="Açıklama"
                  onChangeText={aciklama => this.setState({aciklama})}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <Text style={styles.Btn1}>Tamamlandı</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
    textAlign: 'center',
  },
});
export default withNavigation(AktiviteEkle);
