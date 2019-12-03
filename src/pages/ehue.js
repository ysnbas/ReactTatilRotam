import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';


export default class Navigate extends Component {
  render() {
    return (
      <View>
        <Button title="selam" onPress={()=> this.props.navigation.navigate('Register')}/>
      </View>
    );
  }
}
