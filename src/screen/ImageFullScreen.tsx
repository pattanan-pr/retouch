import React from 'react';
import {Image, StyleSheet, ImageBackground, View, Text} from 'react-native';

const ImageFullScreen = ({route}) => {
  // const {image} = route.params.image;
  // const { bgImg } = route.params.bgImg;
  console.log(route.params);

  return (
    <ImageBackground
      source={{
        uri: route.params.bgImg,
      }}
      style={styles.container}>
      <Image source={{ uri: route.params.image }} style={styles.image} />
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
