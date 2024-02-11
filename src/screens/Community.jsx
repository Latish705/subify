import * as React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Pair from '../components/Pair';
import Forum from '../components/Forum';

export default function Community() {
  const [showForum, setShowForum] = React.useState(true);
  const [showPair, setShowPair] = React.useState(false);

  const toggleState = () => {
    setShowForum(prev => !prev);
    setShowPair(prev => !prev);
    return;
  };

  return (
    <ScrollView style={{height: 'auto'}}>
      <Button title="Forum" onPress={toggleState} color="black" />
      <Button title="Pair" onPress={toggleState} color="black" />
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
