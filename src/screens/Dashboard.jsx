import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Insight from './Insight';

const Stack = createNativeStackNavigator();

export default function Dashboard() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Insight"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: 'black',
                  },
                  headerTintColor: 'white',
            }}>
                <Stack.Screen
                    name='Insight'
                    component={Insight}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}