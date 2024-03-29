import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import LoginForm from './screens/Login';
import SignupForm from './screens/Signup';
import Insight from './screens/Insights';
import Community from './screens/Community';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={SignupForm} />

        <Stack.Screen
          name="Insight"
          component={Insight}
        />

        <Stack.Screen
          name="Community"
          component={Community}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
