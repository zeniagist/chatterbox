import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '#474056',
    };
  }

  render() {
    // import image for Start background
    const image = require("../assets/backgroundimage.png");
    const { bgcolor } = this.state;

    return (
      <ImageBackground source={image} style={styles.backgroundImage} >
        <View style={styles.container} >

          {/* app title */}
          <View style={styles.appTitleContainer}>
            <Text style={styles.appTitle}>Chatterbox</Text>
          </View>

          <View style={styles.userContainer} >
            {/* username input */}
            <TextInput
              style={styles.textInput}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder='Type name here'
              accessible={true}
              accessibilityLabel="Enter name"
              accessibilityHint="Enter your name for the chat"
              accessibilityRole="keyboardkey"
            />

            {/* choose background color */}
            <View style={styles.colorContainer} >

              <Text style={styles.colorTitle} >
                Choose Background Color:
              </Text>
              {/* background color options */}
              <View style={styles.colorOptions} >

                <TouchableOpacity
                  onPress={() => this.setState({ bgcolor: '#090C08' })}
                  style={styles.colorOne}
                  accessible={true}
                  accessibilityLabel="Black background"
                  accessibilityHint="Choose background color for the chat"
                  accessibilityRole="button"
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ bgcolor: '#474056' })}
                  style={styles.colorTwo}
                  accessible={true}
                  accessibilityLabel="Dark purple background"
                  accessibilityHint="Choose background color for the chat"
                  accessibilityRole="button"
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ bgcolor: '#8A95A5' })}
                  style={styles.colorThree}
                  accessible={true}
                  accessibilityLabel="Light purple background"
                  accessibilityHint="Choose background color for the chat"
                  accessibilityRole="button"
                ></TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setState({ bgcolor: '#B9C6AE' })}
                  style={styles.colorFour}
                  accessible={true}
                  accessibilityLabel="Light green background"
                  accessibilityHint="Choose background color for the chat"
                  accessibilityRole="button"
                ></TouchableOpacity>
              </View>
            </View>         

            {/* navigate to chat screen */}
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => {
                  {/* name input blank */ }
                  if (this.state.name === "") {
                    Alert.alert("Please enter your name");
                  } else {
                    this.props.navigation.navigate("Chat",
                      {
                        name: this.state.name,
                        bgcolor: this.state.bgcolor,
                      }
                    )
                  }
                }}
              accessible={true}
              accessibilityLabel="Chat button"
              accessibilityHint="Start chatting"
              accessibilityRole="button"
            >
              <Text style={styles.chatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    )
  }
}

//---------- Styles ----------//
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },

  appTitleContainer: {
    width: '88%',
    height: '56%'
  },

  appTitle: {
    position: "relative",
    textAlign: "center",
    margin: 20,
    marginRight: "auto",
    marginLeft: "auto",
    color: "#FFFFFF",
    top: 100,
    height: "44%",
    fontSize: 45,
    fontWeight: "600",
  },

  userContainer: {
    top: -30,
    height: 'auto',
    backgroundColor: "white",
    padding: 'auto',
    borderRadius: 5,
  },

  textInput: {
    borderColor: 'gray',
    color: '#757083',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    opacity: 50,
    position: 'relative',
    padding: 5,
    margin: 20,
  },

  colorContainer: {
    margin: 20
  },

  colorTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },

  colorOptions: {
    flexDirection: 'row',
    marginRight: 5,
    position: 'relative'
  },

  colorOne: {
    backgroundColor: '#090C08',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorTwo: {
    backgroundColor: '#474056',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorThree: {
    backgroundColor: '#8A95A5',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorFour: {
    backgroundColor: '#B9C6AE',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  selectedColor: {
    marginBottom: 10,
    marginLeft: 20,
    color: '#757083',
    fontWeight: '300',
  },

  selectedColorOptions: {
    backgroundColor: '#090C08',
    width: 30,
    height: 30,
    borderRadius: 25,
    margin: 10,
  },

  chatButton: {
    width: "88%",
    backgroundColor: "#757083",
    margin: 20,
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    fontWeight: "600",
    padding: 15,
    borderRadius: 3,
  },

  chatButtonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

});

{/*https://github.com/zeniagist/chatterbox/blob/4c9321e51f74c0c4762c211f5612cf0d307bc9dc/components/Start.js*/}