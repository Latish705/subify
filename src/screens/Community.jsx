import * as React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import Pair from '../components/Pair';
import Forum from '../components/Forum';

export default function Community({route}) {
  const userId = route.params.userId;
  console.log(userId);
  const [showForum, setShowForum] = React.useState(true);
  const [showPair, setShowPair] = React.useState(false);

  const forumClick = () => {
    setShowForum(true);
    setShowPair(false);
    return;
  };

  const pairClck = () => {
    setShowForum(false);
    setShowPair(true);
    return;
  };

  return (
    <ScrollView style={{height: 'auto'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
        }}>
        <View style={{marginTop: 1, width: 196}}>
          <Button title="Forum" onPress={forumClick} color="black" />
        </View>
        <View style={{marginTop: 1, width: 196}}>
          <Button title="Pair" onPress={pairClck} color="black" />
        </View>
      </View>
      {showForum && (
        <View style={{overflow: 'scroll'}}>
          <Forum />
        </View>
      )}

      {showPair && (
        <View style={{overflow: 'scroll'}}>
          <Pair userId={userId} />
        </View>
      )}
    </ScrollView>
  );
}
