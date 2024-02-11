import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';

const ContentCard = ({content}) => {
  return (
    <View style={styles.box}>
      <View>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
          {content.post}
        </Text>
      </View>
    </View>
  );
};


export default function Forum() {
  const [contents, setContent] = React.useState([]); // Initialize as an array
  const [showInput, setShowInput] = React.useState(false);
  

  const InputForm = () => {
    const [post, setPost] = React.useState('')
    return (
      <View style={{width: 300, right: 0, left: 50, top: 20 , position: 'absolute', backgroundColor: 'gray', padding: 5}}>
        <TextInput
          placeholder="Your opinion here..."
          style={{ borderBottomWidth : 1, borderBottomColor: 'black' }}
          value={post}
          onChangeText={setPost}
        />
        <View>
          <TouchableOpacity style={{ backgroundColor: 'black', width: 70, height: 40, justifyContent: 'center', alignItems: 'center', display: 'flex', borderRadius: 5, marginTop: 5}}
            onPress={() => {handleSendPost(post)}}
          >
                <Text style={{ color: 'white', fontSize: 18, letterSpacing: 1 }}>
                  Send
                </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const handleSendPost = async (post) => {
    try {
      const response = await axios.post('http://172.16.30.27:8090/api/posts/addPost', {title: post})
      console.log(response);
      console.log(response.data.message);
      Alert.alert(response.data.message);
      return;
    } catch (error) {
      console.log(error);
      Alert.alert("error sending the error");
    }
  }

  const toggleShowInput = () => {
    setShowInput(prev => !prev);
  }

  React.useEffect(() => {
    const handleGetAllPost = async () => {
      try {
        const response = await axios.get(
          'http://172.16.30.27:8090/api/posts/getAllPosts',
        );
        setContent(response.data.posts); // Set contents as array of posts
      } catch (error) {
        console.log('error sending the request', error);
      }
    };
    handleGetAllPost();
  }, []);

  return (
    <ScrollView>
      <View>
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </View>

      <TouchableOpacity style={styles.add} onPress={toggleShowInput}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          ADD
        </Text>
      </TouchableOpacity>

      { showInput &&
        <InputForm/>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    display: 'flex',
    padding: 10,
    backgroundColor: '#ECECEC',
  },
  add: {
    backgroundColor: 'black',
    color: 'white',
    height: 80,
    width: 80,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
