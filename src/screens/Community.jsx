import * as React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Pair from '../components/Pair';
import Forum from '../components/Forum';

export default function Community() {
  const [showForum, setShowForum] = React.useState(true);
  const [showPair, setShowPair] = React.useState(false);

  const forumClick = () => {
    setShowForum(true);
    setShowPair(false)
    return;
  };

  const pairClck = () => {
    setShowForum(false);
    setShowPair(true);
    return
  }

  return (
    <ScrollView style={{height: 'auto'}}>
      <Button title="Forum" onPress={forumClick} color="black" />
      <Button title="Pair" onPress={pairClck} color="black" />
      {showForum && (
        <View style={{overflow: 'scroll'}}>
          <Forum />
        </View>
      )}

      {showPair && (
        <View style={{overflow: 'scroll'}}>
          <Pair />
        </View>
      )}
    </ScrollView>
  );
}
