import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

const LoginForm = ({route, navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const client = route.params?.client;
  const handleLogin = async () => {
    // Call the onLogin function passed from the parent component
    //onLogin(email, password);
    // const response = await client.login({email, password});
    // console.log(response);r
    // navigation.navigate('Home');
    console.log('clicked');
    navigation.navigate('Dasboard', {username: 'example user'});
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
