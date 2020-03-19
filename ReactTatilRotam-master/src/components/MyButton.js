import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import propsTypes from 'prop-types';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: this.props.bgcolor}]}
        onPress={this.props.deneme}>
        <Text style={{color: this.props.textcolor}}>{this.props.Text}</Text>
      </TouchableOpacity>
    );
  }
}

MyButton.propsTypes = {
  Text: propsTypes.string.isRequired,
  bgcolor: propsTypes.string,
  textcolor: propsTypes.string,
  // deneme: propsTypes.string,
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
});
