import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Screen</Text>
      </View>
    )
  }
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});