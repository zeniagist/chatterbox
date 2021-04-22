import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  // alert the user input
  alertMyText(input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Screen1!</Text>

        {/* button go to Screen 2 */}
        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat')}
        />

        {/* text input */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder='Type here ...'
        />
        {/* button alert with text from text input */}
        <Button
          onPress={() => {
            this.alertMyText({ text: this.state.text });
          }}
          title="Press Me"
        />
        {/* copies what was written in text input */}
        <Text>You wrote: {this.state.text}</Text>

        {/* scrollview */}
        <ScrollView>
          <Text style={{ fontSize: 110 }}>This text is so big! And so long! You have to scroll!</Text>
        </ScrollView>
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