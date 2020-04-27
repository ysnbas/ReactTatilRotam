import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Permissions from 'react-native-permissions';
import React, {Component} from 'react';
import {API_ENDPOINT, API_KEY} from '../../../constants';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import PlacesIndex from '../places/placesIndex';

export default class Index extends Component {
  state = {
    region: {
      latitude: 41.0087,
      longitude: 29.0173,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0421,
    },
    places: [],
    fetching: false,
  };
  async componentDidMount() {
    try {
      const {
        coords: {latitude, longitude},
      } = await this.getCurrentPosition();

      this.setState({
        region: {
          ...this.state.region,
          latitude,
          longitude,
        },
        fetching: true,
      });

      const {
        data: {results},
      } = await axios.get(
        `${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=museum&key=${API_KEY}`,
      );
      this.setState({
        places: results,
        fetching: false,
      });
    } catch (e) {
      this.setState({
        fetching: false,
      });
      console.log(e);
      alert(e);
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        }, // success
        () => reject('konum izni veriniz.'), // fail
        {
          timeout: 5000,
          maximumAge: 1000,
          enableHighAccuracy: false,
        },
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          loadingEnabled={true}
          showsUserLocation={true}
          style={styles.map}
          region={this.state.region}
          ref={ref => (this.map = ref)}>
          {this.state.places.map(places => {
            const {
              geometry: {
                location: {lat, lng},
              },
            } = places;

            return (
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: lng,
                }}
                title={places.name}
              />
            );
          })}
        </MapView>
        <View style={styles.placesContainer}>
          {/* {
            this.state.fetching ? <Text style={styles.loading}>yükleniyor...</Text>
          } */}
          <PlacesIndex places={this.state.places} map={this.map} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
  },
  placesContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
