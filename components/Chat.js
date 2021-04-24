import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class Chat extends React.Component {
  render() {
    // import name from Start
    let name = this.props.route.params.name;
    // import background color from Start
    let bgColor = this.props.route.params.bgColor;

    return (
      <View
        style={[styles.container, { backgroundColor: bgColor }]}
      >
        <Text style={styles.chatGreeting}>
          Hello {name}! Are you ready to chat?
        </Text>
      </View>
    )
  }
}

//---------- Styles ----------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatGreeting: {
    color: 'white',
  },
});