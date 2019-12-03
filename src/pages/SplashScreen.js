import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  async UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 700);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.IconImage}
          source={require('../../img/family-car.png')}
        />
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>Tatil Rotam</Text>
        </View>
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
  cardContainer: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 2,
  },
  IconImage: {
    width: 90,
    height: 70,
    marginBottom: 15,
  },
});
