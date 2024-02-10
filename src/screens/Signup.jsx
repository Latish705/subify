import React, { useState } from 'react';
import { View, TextInput,Text,TouchableOpacity, StyleSheet } from 'react-native';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
    // Call the onSignup function passed from the parent component
    //onSignup(username, password, email);
    console.log('clicked');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="gray"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}  
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 0,
    borderBottomWidth:1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
  },
  buttonText:{
    color: 'white'
  }
});

export default SignupForm;
