import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import YorumEkleAPI from '../../service/YorumEkleAPI';
import {Input} from 'react-native-elements';
class YorumYap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kullaniciadi: '',
      yorum: '',
      rotaId: '',
      userId: '',
    };
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('id').then(id => {
      this.setState({id});
      console.log(this.state.id);
    });
    await AsyncStorage.getItem('uname').then(userName => {
      this.setState({userName});
      console.log(this.state.userName);
    });
  };
  submit = async () => {
    const {yorum} = this.state;
    let id = this.props.navigation.getParam('rotaid', '');
    if (yorum == '') {
      this.setState({Error: 'Yorum Giriniz.'});
    } else {
      {
        var toJSON =
          "{'kullaniciadi': '" +
          this.state.userName +
          "', 'yorum': '" +
          this.state.yorum +
          "', 'rotaId': '" +
          id +
          "', 'userId': '" +
          this.state.id +
          "'}";
        var body = eval('(' + toJSON + ')');

        try {
          await YorumEkleAPI(body);
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
          <Text style={styles.HeadText}>Yorum Ekleme</Text>
          <View style={styles.LgnArea}>
            <Text style={{color: 'red', textAlign: 'center'}}>
              {this.state.Error}
            </Text>

            <View>
              <View style={{padding: 10}}>
                <Input
                  label="Yorum"
                  onChangeText={yorum => this.setState({yorum})}
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
export default withNavigation(YorumYap);
