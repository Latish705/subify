import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const ip = ['172.16.30.20:8090', '172.16.30.27'];

const SignupForm = ({route, navigation}) => {
  console.log('route: ', route);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async () => {
    try {
      //const response = await client.createAccount({email, password, username});
      //console.log(response);
      //navigation.navigate('Home');
      //navigation.navigate('Dasboard', {username: 'example user'});
      const response = await axios.post(
        `http://${ip[1]}:8090/api/users/register`,
        {username, email, password},
      );
      console.log(response);
      navigation.navigate('Insight', { userId: response.data.user._id });
    } catch (error) {
      console.log('error sending the request', error);
    }
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
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
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.7,
  },
});

export default SignupForm;
