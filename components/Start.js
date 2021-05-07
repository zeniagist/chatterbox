import React from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Icon } from "react-native-elements";

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bgcolor: "#090C08",
    };
  }

  render() {
    // backgourn color button options
    const bgProps = (bgColor) => {
      return (
        <TouchableOpacity
          key={bgColor}
          style={[
            { backgroundColor: bgColor },
            styles.bgColorNotSelected,
            this.state.bgcolor === bgColor && styles.bgColorSelected,
          ]}
          onPress={() => this.setState({ bgcolor: bgColor })}
        >
          <View
            key={bgColor}
            style={[
              { backgroundColor: bgColor },
              { zIndex: 1 },
              styles.bgColorOptions,
              this.state.bgcolor === bgColor &&
              styles.bgColorSelected,
            ]}
          ></View>
        </TouchableOpacity>
      );
    };

    // import image for Start background
    const image = require("../assets/startBackground.png");

    return (
      <ImageBackground source={image} style={styles.backgroundImage} >
        <View style={styles.container}>

          {/* app title */}
          <View style={styles.appTitleContainer}>
            <Text style={styles.appTitle}>Chatterbox</Text>
          </View>

          <View style={styles.userBoxContainer}>
            <View style={styles.userContainer}>
              <View style={styles.userInputContainer} >
                {/* username icon */}
                <Icon
                  style={styles.userIcon}
                  name="user"
                  type="antdesign"
                  color="gray"
                />
                {/* username input */}
                <TextInput
                  style={styles.userInput}
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  placeholder='Type name here'
                  accessible={true}
                  accessibilityLabel="Enter name"
                  accessibilityHint="Enter your name for the chat"
                  accessibilityRole="keyboardkey"
                />
              </View>

              {/* choose background color */}
              <View style={styles.colorContainer}>
                <Text style={styles.colorTitle} >
                  Choose Background Color:
                </Text>
                {/* background color options */}
                <TouchableOpacity
                  style={styles.colorOptions}
                  accessible={true}
                  accessibilityLabel="Background color option"
                  accessibilityHint="Choose background color for the chat"
                  accessibilityRole="button"
                >
                  {["#090C08", "#474056", "#8A95A5", "#B9C6AE"].map(bgProps)}
                </TouchableOpacity>
              </View>

              {/* navigate to chat screen */}
              <TouchableOpacity
                style={styles.chatButton}
                onPress={() => {
                  {/* name input blank */ }
                  if (this.state.name === "") {
                    Alert.alert("Please input a name!");
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
                <Text
                  style={styles.chatButtonText}
                >
                  Start Chatting
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}

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
    flex: 0.33,
    alignItems: "center",
    // alignContent: "center", //how does this not work for the content that is within the box???
    // justifyContent: "center",//how does this not work for the content that is within the box???
  },

  appTitle: {
    flex: 1,
    // textAlign: "center",//This works like align self and justify self, WTF???
    // textAlignVertical: "center",//This works like align self and justify self, WTF???
    fontSize: 45,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 30,
  },

  userBoxContainer: {
    flex: 0.44,
    backgroundColor: "#fff",
    width: "88%",
    alignSelf: "center",
  },

  userContainer: {
    flex: 1,
    width: "88%",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },

  userInputContainer: {
    flex: 0.2,
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  userIcon: {
    marginLeft: 15,
    marginRight: 10,
  },

  userInput: {
    flex: 0.95,
    color: "#757083",
    opacity: 50,
    fontWeight: "300",
    fontSize: 16,
  },

  colorContainer: {
    flex: 0.33,
    justifyContent: "center",
  },

  colorTitle: {
    color: "#757083",
    opacity: 1,
    fontWeight: "300",
    fontSize: 16,
    paddingBottom: 15,
    textAlign: "center",
  },

  colorOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  chatButton: {
    flex: 0.2,
    backgroundColor: "#757083",
    opacity: 1,
    color: "#ffffff",
    justifyContent: "center",
  },

  chatButtonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ffffff",
    alignSelf: "center",
  },

  bgColorNotSelected: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
  },

  bgColorSelected: {
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
    transform: [{ scale: 1.5 }],
  },

  bgColorOptions: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});