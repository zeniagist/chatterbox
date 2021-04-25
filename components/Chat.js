import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
// gifted chat for chat bubble
import { GiftedChat, Bubble, Day } from 'react-native-gifted-chat';


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  // send system message
  componentDidMount() {
    // import name from Start
    let name = this.props.route.params.name;
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello ${name}! Welcome to Chatterbox. I am the Chatterbox Bot.`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  // event handler for sending messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  // change style of day 
  renderDay(props) {
    return <Day {...props} textStyle={{ color: 'white' }} />
  }

  // change style of system message
  renderSystemMessage(props) {
    let name = this.props.route.params.name;
    return (
      <View>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {name} has entered the chat.
        </Text>
      </View>
    );
  };

  // change style of chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {

    // import background color from Start
    let bgColor = this.props.route.params.bgColor;

    return (
      <View
        style={[styles.container, { backgroundColor: bgColor }]}
      >
        <GiftedChat
          renderSystemMessage={this.renderSystemMessage.bind(this)}
          renderDay={this.renderDay}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    )
  }
}

//---------- Styles ----------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});