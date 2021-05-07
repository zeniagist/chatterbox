import React from "react";
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, Alert, LogBox } from 'react-native';
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";
// Gifted Chat
import { GiftedChat, Bubble, InputToolbar, Day } from "react-native-gifted-chat";
// asyncStorage
import AsyncStorage from "@react-native-community/async-storage";
// Netinfo
import NetInfo from "@react-native-community/netinfo";
// Firebase
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      image: null,
      location: null,
      uid: "",
      user: {
        _id: "",
        name: "",
      },
      isConnected: null,
    };
    // Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyAyvkyUn9RB5kwAgGPJriNQF6lqPoPwDSY",
      authDomain: "chatterbox-app-76b76.firebaseapp.com",
      projectId: "chatterbox-app-76b76",
      storageBucket: "chatterbox-app-76b76.appspot.com",
      messagingSenderId: "88672132473",
      appId: "1:88672132473:web:4846085181594e786a23a8",
      measurementId: "G-HBW7WQBLNC"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  // collects data in database in real-time
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  // event handler for sending messages
  onSend(messages = []) {
    messages.forEach((message) => this.referenceChatMessages.add(message));

    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
      }
    );
  }

  // store messages
  async getMessages() {
    try {
      const messages = (await AsyncStorage.getItem("messages")) || "[]";
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // save messages
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // delete messages
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // hide input toolbar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  // change style of date
  renderDay(props) {
    return <Day {...props} textStyle={{ color: 'white' }} />
  }

  // change style of chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
        }}
      />
    );
  }

  // action button for choose picture, take picture, and send location
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  componentDidMount() {
    // use netinfo to check if machine is online or offline
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        // connect to messages collection
        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");

        // this unfortunatelly named method (authUnsubscribe) listens for changes in auth state and signs in user if no user is already signed in.
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            //update user state with currently active user data
            this.setState({
              uid: user._id,
              user: {
                _id: user.uid,
                name: name,
                avatar: "http://placeimg.com/140/140/any",
              },
              image: this.state.image,
              location: {
                latitude: 48.864601,
                longitude: 2.398704,
              },
            });

            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
        this.saveMessages();
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
        Alert.alert("You are offline, no messages can be sent!");
      }
    });

    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
    this.authUnsubscribe && this.authUnsubscribe();
  }

  render() {
    let { bgcolor } = this.props.route.params;
    const { user } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: bgcolor }}>
        <Text>{this.state.loggedInText}</Text>
        <GiftedChat
          renderDay={this.renderDay}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* check if android and do not let keyboard cover input field */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}