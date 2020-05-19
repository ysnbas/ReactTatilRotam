import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class RotaVeyaRehber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
    };
  }

  submit = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Login');
    } catch (error) {}

    Keyboard.dismiss();
  };

  // componentDidMount = async () => {
  //   {
  //     try {
  //       await GetUserAPI().then(vals => {
  //         console.log('->', vals);
  //         this.setState({resData: vals});
  //       });
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  //  const kadi = await AsyncStorage.getItem('userName');

  // };

  // renderContactItem = (item, index) => {
  //   return console.log(item.item._id);

  // };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: 'red', textAlign: 'center'}} />
        <Text style={styles.HeadText}>Tatil Rotam</Text>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('RotaEkleme')}>
          <Text style={styles.Btn1}>Rota Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('SehirIciRota')}>
          <Text style={styles.Btn1}>Ayrıntılı Rota Oluştur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('RotaDuzenle')}>
          <Text style={styles.Btn1}>Rota Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RehberBtn}
          onPress={() => this.props.navigation.navigate('SehirIciRotaDuzenle')}>
          <Text style={styles.Btn1}>Ayrıntılı Rota Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.RehberBtn} onPress={this.submit}>
          <Text style={styles.Btn1}>Çıkış</Text>
        </TouchableOpacity>
        {/* <FlatList
          ref="flatList"
          //inverted ters cevirir listeyi
          renderItem={this.renderContactItem}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.resData}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeadText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  RehberBtn: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    backgroundColor: '#720b98',
    margin: 10,
  },

  Btn1: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
  },
});
