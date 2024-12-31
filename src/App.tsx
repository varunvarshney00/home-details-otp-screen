
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Navigation
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

//screens
import Home from './screens/Home';
import Details from './screens/Details';
import otppage from './screens/otppage';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  otppage: {phoneNumber: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        />
        <Stack.Screen
        name='Details'
        component={Details}
        />
        <Stack.Screen
        name='otppage'
        component={otppage}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;