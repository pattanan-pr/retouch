import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, ImageBackground, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImageFullScreen = ({ route }) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleOpacityChange = (value) => {
    setOpacity(value);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [opacity])

  const goBackToHome = () => {
    navigation.navigate('Camera');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToHome}>
          <Image source={require('../assets/Close.png')} />
        </TouchableOpacity>
        <Text>Preview</Text>
        <TouchableOpacity>
          <Image source={require('../assets/Save.png')} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: route.params.bgImg }}
            style={{
              ...styles.imageBackground,
              backgroundColor: `rgba(0, 0, 0, ${opacity})`,
            }}>
            <View style={styles.imageContent}>
              <Image source={{ uri: route.params.image }} style={styles.image} />
            </View>
          </ImageBackground>
        </View>
      )}
      <View style={styles.opacityTextContainer}>
        <Text style={styles.opacityText}>Opacity</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Image source={require('../assets/circle.png')} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={opacity}
          onValueChange={handleOpacityChange}
          minimumTrackTintColor="white"
        />
        <Image source={require('../assets/contrast.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#686868',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'pink',
    // marginHorizontal: 64,
    // marginTop: 114,
    // marginBottom: 60,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 64,
    // marginTop: 114,
    // marginBottom: 60,
  },
  imageContent: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  opacityTextContainer: {
    paddingHorizontal: 32,
  },
  opacityText: {
    color: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    marginBottom: 91,
  },
  slider: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default ImageFullScreen;
