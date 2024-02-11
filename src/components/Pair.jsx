import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
export const ip = ['172.16.30.20', '172.16.30.27'];

export default function Pair({userId}) {
  console.log(userId);
  const [input, setInput] = React.useState('');

  const findPair = async () => {
    try {
      console.log(userId);
      console.log(input);
      const response = await axios.post(
        `http://${ip[0]}:8090/api/users/findUserPlatform`,
        {
          userId,
          platform: input,
        },
      );

      const users = response.data.users;
      const username = users.map(user => user.username);
      Alert.alert(JSON.stringify(username));

      console.log(response);
      console.log(users);
    } catch (error) {
      console.log(error);
      return Alert.alert('unknow error occured');
    }
  };

  return (
    <View>
      <Text
        style={{
          width: '100%',
          marginTop: 20,
          fontSize: 20,
          color: 'black',
          textAlign: 'center',
        }}>
        Find the partners, with ease..
      </Text>
      <View
        style={{
          width: '100',
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Platform here.."
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'black',
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            width: 150,
          }}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
          }}
          onPress={findPair}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1,
            }}>
            Find Pair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
