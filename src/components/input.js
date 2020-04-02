import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default class Input extends Component {
  render() {
    return (
      <View>
        <TextInput
          {...this.props}
          placeholderTextColor="#7f8c8d"
          style={styles.input}
          ref={this.props.inputRef}
          keyboardType={this.props.keyboardType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 5,
    marginBottom: 8,
  },
});
