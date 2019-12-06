import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

export default class SelectCity extends Component {
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };
  //handling onPress action
  getListViewItem = item => {
    Alert.alert(item.key);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.CityTxt}>
          Etkinlik Çarkını Hangi Şehir İçin Çevirmek İstersiniz?
        </Text>
        <FlatList
          data={[
            {key: 'İstanbul'},
            {key: 'Ankara'},
            {key: 'İzmir'},
            {key: 'Adana'},
            {key: 'Adıyaman'},
            {key: 'Afyonkarahisar'},
            {key: 'Ağrı'},
            {key: 'Aksaray'},
            {key: 'Amasya'},
            {key: 'Antalya'},
            {key: 'Ardahan'},
            {key: 'Artvin'},
            {key: 'Aydın'},
            {key: 'Balıkesir'},
            {key: 'Bartın'},
            {key: 'Batman'},
            {key: 'Bayburt'},
            {key: 'Bilecik'},
            {key: 'Bingöl'},
            {key: 'Bitlis'},
            {key: 'Bolu'},
            {key: 'Burdur'},
            {key: 'Bursa'},
            {key: 'Çanakkale'},
            {key: 'Çankırı'},
            {key: 'Çorum'},
            {key: 'Denizli'},
            {key: 'Diyarbakır'},
            {key: 'Düzce'},
            {key: 'Edirne'},
            {key: 'Elazığ'},
            {key: 'Erzincan'},
            {key: 'Erzurum'},
            {key: 'Eskişehir'},
            {key: 'Gaziantep'},
            {key: 'Giresun'},
            {key: 'Gümüşhane'},
            {key: 'Hakkari'},
            {key: 'Hatay'},
            {key: 'Iğdır'},
            {key: 'Isparta'},
            {key: 'Kahramanmaraş'},
            {key: 'Karabük'},
            {key: 'Karaman'},
            {key: 'Kars'},
            {key: 'Kastamonu'},
            {key: 'Kayseri'},
            {key: 'Kırıkkale'},
            {key: 'Kırklareli'},
            {key: 'Kırşehir'},
            {key: 'Kilis'},
            {key: 'Kocaeli'},
            {key: 'Konya'},
            {key: 'Kütahya'},
            {key: 'Malatya'},
            {key: 'Manisa'},
            {key: 'Mardin'},
            {key: 'Mersin'},
            {key: 'Muğla'},
            {key: 'Muş'},
            {key: 'Nevşehir'},
            {key: 'Niğde'},
            {key: 'Ordu'},
            {key: 'Osmaniye'},
            {key: 'Rize'},
            {key: 'Sakarya'},
            {key: 'Samsun'},
            {key: 'Siirt'},
            {key: 'Sinop'},
            {key: 'Sivas'},
            {key: 'Şırnak'},
            {key: 'Tekirdağ'},
            {key: 'Tokat'},
            {key: 'Trabzon'},
            {key: 'Tunceli'},
            {key: 'Şanlıurfa'},
            {key: 'Uşak'},
            {key: 'Van'},
            {key: 'Yalova'},
            {key: 'Yozgat'},
            {key: 'Zonguldak'},
          ]}
          renderItem={({item}) => (
            <Text
              style={styles.item}
              onPress={this.getListViewItem.bind(this, item)}>
              {item.key}
            </Text>
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFEB3B',
    flex: 1,
  },
  CityTxt: {
    backgroundColor: '#fff',
    marginHorizontal: 40,
    marginVertical: 40,
    padding: 20,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
