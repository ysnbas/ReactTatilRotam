import React, {Component} from 'react';
import {View} from 'react-native-animatable';
import {StyleSheet, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import PlacesItem from './placesItem';
export default class placesIndex extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.places}
          keyExtractor={(item, key) => item.id.toString()}
          renderItem={({item}) => (
            <PlacesItem map={this.props.map} item={item} />
          )}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{marginRight: 10}} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 140,
    padding: 10,
  },
});
