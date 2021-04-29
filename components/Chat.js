import React from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
// asyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
// NetInfo
import NetInfo from '@react-native-community/netinfo';
// Gifted Chat
import { GiftedChat, Bubble, Day, InputToolbar } from 'react-native-gifted-chat';
// Firebase
require('firebase/firestore');
require('firebase/auth');

// web browser testing
import firebase from 'firebase';

// mobile app emulator testing
// const firebase = require('firebase');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
      isConnected: false,
      uid: 0,
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAyvkyUn9RB5kwAgGPJriNQF6lqPoPwDSY",
        authDomain: "chatterbox-app-76b76.firebaseapp.com",
        projectId: "chatterbox-app-76b76",
        storageBucket: "chatterbox-app-76b76.appspot.com",
        messagingSenderId: "88672132473",
        appId: "1:88672132473:web:4846085181594e786a23a8",
        measurementId: "G-HBW7WQBLNC"
      });
    }

    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  // collects data in database in real-time
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  // Adds messages to cloud storage
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  }

  // event handler for sending messages
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      // save previous chat log
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  // store messages
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // save messages
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  // change style of date
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
  }

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

  // hide input toolbar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(connection => {
      // online
      if (connection.isConnected) {
        console.log('online');
        // Authenticates user via Firebase
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }
          // update user state with currently active user data
          this.setState({
            isConnected: true,
            user: {
              _id: user.uid,
              name: this.props.route.params.name,
              avatar: 'https://placeimg.com/140/140/any'
            },
            messages: [],
          });
          this.referenceChatMessages = firebase.firestore().collection('messages');
          this.unsubscribeChatUser = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        });
        // offline
      } else {
        console.log('offline');
        this.setState({
          isConnected: false
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
    this.unsubscribeChatUser();
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
          renderInputToolbar={this.renderInputToolbar.bind(this)}
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