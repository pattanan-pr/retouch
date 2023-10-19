import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Video from 'react-native-video';

const ViewVideoScreen = ({route}) => {
  const {videoUri} = route.params;

  return (
    <View style={styles.container}>
      {videoUri ? (
        <Video source={{uri: videoUri}} style={styles.video} controls={true} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default ViewVideoScreen;
