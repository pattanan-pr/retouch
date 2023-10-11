import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const ViewVideoScreen = ({route}) => {
  const {videoUri} = route.params;

  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUri}} // Use the URI of the recorded video
        style={styles.video}
        controls={true} // Show video controls (play, pause, etc.)
      />
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
