import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ImageBackground } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: '',
    };
  }

  render() {
    // import image for Start background
    const image = require("../assets/startBackground.png");

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
              placeholder='Type username here'
            />
            <Text style={styles.usernameText}>{this.state.name} </Text>

            {/* choose background color */}
            <View style={styles.colorContainer} >

              <Text style={styles.colorTitle} >
                Choose Background Color:
              </Text>
              {/* background color options */}
              <View style={styles.colorOptions} >

                <View
                  onPress={() => this.setState({ bgColor: '#090C08' })}
                  style={styles.colorOne}
                ></View>

                <View
                  onPress={() => this.setState({ bgColor: '#474056' })}
                  style={styles.colorTwo}
                ></View>

                <View
                  onPress={() => this.setState({ bgColor: '#8A95A5' })}
                  style={styles.colorThree}
                ></View>

                <View
                  onPress={() => this.setState({ bgColor: '#B9C6AE' })}
                  style={styles.colorFour}
                ></View>
              </View>
            </View>

            {/* navigate to chat screen */}
            <Button
              style={styles.chatButton}
              title="Start Chatting"
              onPress={() => this.props.navigation.navigate('Chat',
                {
                  name: this.state.name,
                  bgColor: this.state.bgColor
                }
              )}
            />
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
    width: "88%",
    height: '44%',
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

  usernameText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorTwo: {
    backgroundColor: '#474056',
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorThree: {
    backgroundColor: '#8A95A5',
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  colorFour: {
    backgroundColor: '#B9C6AE',
    width: 50,
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10
  },

  chatButton: {
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: '#757083',
    color: 'white',
  },

});