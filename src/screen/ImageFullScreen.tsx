import React from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';

const ImageFullScreen = ({route}) => {
  const {imageUri} = route.params;

  return (
    <ImageBackground
      source={{
        uri: 'https://media.discordapp.net/attachments/888067225217552385/1151815345108168734/wat.png?ex=65135061&is=6511fee1&hm=52ea1de054c0bac3017c4e549c09f4d4290f17209bf09148474742d657756440&=&width=2124&height=1062',
      }}
      style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.image} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue', // Background color for full-screen view
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ImageFullScreen;
