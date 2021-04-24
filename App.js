import React, { Component } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';
import { StatusBar } from 'expo-status-bar';
// import react native gesture handler
import 'react-native-gesture-handler';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends React.Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Home"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            // import username from start
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>

    );
  }
}