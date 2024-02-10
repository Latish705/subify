import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SignupForm = ({navigation}) => {
  const handleLogin = () => {
    // Navigate to the login page
    navigation.navigate('Login'); // Replace 'Login' with the appropriate screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Subify</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('Sign Up clicked')}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.linkText}>
          Already have an account? <Text style={styles.loginText}>Login</Text>
        </Text>
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
  heading: {
    marginBottom: 30,
    fontSize: 28,
    color: 'black',
    fontWeight: 'bold',
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
    marginTop: 80,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  linkText: {
    marginTop: 15,
    fontSize: 18,
    color: 'black',
    textDecorationLine: 'underline',
  },
  loginText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignupForm;
