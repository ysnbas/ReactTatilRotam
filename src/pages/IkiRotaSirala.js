import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import IkinciAraRotaGuncelleAPI from '../../service/IkinciAraRotaGuncelleAPI';

export default class RotaSirala extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    let AraYerler = navigation.getParam('mekanlar', '');
    this.state = {
      data: AraYerler.map((d, index) => ({
        key: `item-${d}`,
        label: d,
      })),
      BasTarihi: '',
      BitTarihi: '',
      aciklama: '',
      rotanoktasi: '',
    };
  }
  Guncelle = async data => {
    {
      const guncellenecekdeger = data.map((item, key) => item.label);
      const {navigation} = this.props;
      let BaslangicT = navigation.getParam('baslangictarihi', '');
      let BitisT = navigation.getParam('bitistarihi', '');
      let aciklama1 = navigation.getParam('aciklama', '');
      var toJSON =
        "{'BasTarihi': '" +
        BaslangicT +
        "', 'BitTarihi': '" +
        BitisT +
        "', 'rotanoktasi': '" +
        guncellenecekdeger +
        "','aciklama': '" +
        aciklama1 +
        "'}";
      var body = eval('(' + toJSON + ')');
      try {
        await IkinciAraRotaGuncelleAPI(body);
      } catch (error) {
        alert(error);
      }
      Keyboard.dismiss();
    }
  };
  renderItem = ({item, index, move, moveEnd, isActive}) => {
    return (
      <View style={styles.LgnArea}>
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#720b98',
          }}
          onLongPress={move}
          onPressOut={moveEnd}>
          <Text
            style={{
              color: '#fff',
              fontSize: 32,
            }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({data}) => this.setState({data})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.Guncelle(this.state.data)}>
          <Text style={styles.Btn1}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
    paddingVertical: 100,
  },
  LgnArea: {
    backgroundColor: '#fff',
    marginHorizontal: 60,
    marginVertical: 5,
    padding: 10,
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
    marginHorizontal: 40,
    marginVertical: 5,
  },
  Btn1: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1,
  },
});
// var toJSON = "{'rotanoktasi': '" + this.state.rotanoktasi + "'}";
// var body = eval('(' + toJSON + ')');
// try {
//   await RotaGuncelleAPI(body);
// } catch (error) {
//   alert(error);
// }
// Keyboard.dismiss();
