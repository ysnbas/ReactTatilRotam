import React, {Component} from 'react';
import {Text, View, FlatList, Image, StyleSheet} from 'react-native';
import GetRotalarAPI from '../../service/GetRotalarAPI';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: null,
    };
  }

  componentDidMount = async () => {
    {
      try {
        await GetRotalarAPI().then(vals => {
          console.log('->', vals);
          this.setState({resData: vals});
        });
      } catch (error) {
        alert(error);
      }
    }
  };
  _listEmptyComponent = () => {
    return (
      <View>
        <Text>Rota bulunmamakta.</Text>
      </View>
    );
  };
  renderContactItem = (item, index) => {
    return (
      <View>
        <Text>{item.item.BaslangicNoktasi}</Text>
        <Text>{item.item.BaslangicNoktasi}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
