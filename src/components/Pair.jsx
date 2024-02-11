
import * as React from 'react';
import { View, Text, TextInput, Touchable, TouchableOpacity } from "react-native"

export default function Pair({ userId }) {

    const [input, setInput] = React.useState('');
    
    const findPair = async () => {
        try {
            const response = await axios.post('http://172.16.30.27:8090/api/users/addPlatformInterest', {
                userId,
                platform: { input },
            });

            const users = response.data.users;

            console.log(users);
        } catch (error) {
            return Alert('unknow error occured')
        }
        
    }


    return (
        <View>
            <Text style={{ width: '100%', marginTop: 20, fontSize: 20, color: 'black', textAlign: 'center', }}>Find the partners, with ease..</Text>
            <View style={{ width: '100', height: 400, display: 'flex', flexDirection: 'column', gap: 80, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                    placeholder='Platform here..'
                    style={{ borderBottomWidth: 1, borderBottomColor: 'black', fontSize: 20, fontWeight: 'bold', width: 150 }}
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    style={{
                        backgroundColor: 'black', padding: 10, borderRadius: 5
                    }}
                    onPress={findPair}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }}>Find Pair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}