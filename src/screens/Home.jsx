import { View, Text, Button } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to subify</Text>

      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate("Signup");
        }}
      />

      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login")
        }}
      />
    </View>
  );
};


