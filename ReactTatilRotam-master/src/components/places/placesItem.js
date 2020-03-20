import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {API_ENDPOINT, API_KEY} from '../../../constants';
export default class placesItem extends Component {
  onPress = () => {
    const {lat, lng} = this.props.item.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
    this.props.map.animateToRegion(newRegion, 1000);
  };
  render() {
    console.log(this.props);
    const {photos} = this.props.item;
    let source;
    if (photos) {
      source = {
        uri: `${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}`,
      };
    } else {
      source = require('../../../img/resim-yok-png-.png');
    }
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.itemContainer}>
          <Text style={styles.text} numberOfLines={1}>
            {this.props.item.name}
          </Text>
          <Image style={styles.photos} source={source} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 240,
    height: 120,
    backgroundColor: '#fff',
  },
  text: {
    padding: 10,
    backgroundColor: '#fff',
    top: 0,
    left: 0,
    zIndex: 2,
    position: 'absolute',
  },
  photos: {
    width: '100%',
    height: 120,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
