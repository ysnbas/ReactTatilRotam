import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import AktiviteGetAPI from '../../service/AktiviteGetAPI';
import Input from '../components/input';
import DeleteAktiviteAPI from '../../service/DeleteAktiviteAPI';
export default class AktiviteDuzenle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
      isEditable: false,
    };
  }
  _clickhandler() {
    this.setState({isEditable: !this.state.isEditable});
  }
  componentDidMount = async () => {
    {
      try {
        await AktiviteGetAPI().then(vals => {
          console.log('->', vals);
          this.setState({resData: vals});
        });
      } catch (error) {
        alert(error);
      }
    }
  };
  sil = async id => {
    try {
      await DeleteAktiviteAPI(id).then(vals => {
        console.log('->', vals);
      });
    } catch (error) {
      alert(error);
    }
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 50,
          paddingHorizontal: 20,
        }}>
        <Text style={{fontSize: 15, textAlign: 'center'}}>
          Aktivite bulunmamakta veya yükleniyor...
        </Text>
      </View>
    );
  };
  renderContactItem = (item, index) => {
    return (
      <View style={styles.LgnArea}>
        <Text>Gün</Text>

        <Input editable={this.state.isEditable} placeholder={item.item.Gun} />
        <Text>Hava Durumu</Text>
        <Input
          editable={this.state.isEditable}
          placeholder={item.item.HavaDurumu}
        />
        <Text>Açıklama</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            editable={this.state.isEditable}
            placeholder={item.item.Aciklama}
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.sil(item.item._id)}>
          <Text style={styles.Btn1}>Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref="flatList"
          //inverted ters cevirir listeyi
          renderItem={this.renderContactItem}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.resData}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    paddingVertical: 100,
  },
  LgnArea: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 5,
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
  button: {
    paddingVertical: 9,
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
