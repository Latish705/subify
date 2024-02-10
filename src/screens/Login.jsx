import axios from 'axios';
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import { User } from '../../server/src/models/userModel';

const LoginForm = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async () => {
    try {
      console.log("clicked");

      console.log("email: ", email, "  Password: ", password)

      const response = await axios.post(
        'http://192.168.211.76:8090/api/users/login',
        { email: email, password: password }
      );

      console.log(response.data.user._id)

      if (response.data.success) navigation.navigate('Insight', { userId: response.data.user._id })
    } catch (error) {
      console.log("error sending receiveing the request", error);  
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default LoginForm;
