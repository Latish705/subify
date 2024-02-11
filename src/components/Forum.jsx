import * as React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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

      <View style={styles.add}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          ADD
        </Text>
      </View>
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
