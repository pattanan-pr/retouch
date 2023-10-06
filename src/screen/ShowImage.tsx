import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {Image, StyleSheet, ImageBackground, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ShowImage = ({route}) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  const handleOpacityChange = (value) => {
    setOpacity(value);
  };

  const goBackToHome = () => {
    navigation.navigate('Camera'); // Navigate back to the 'Home' page (adjust the name accordingly)
  };
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
      <Image
        source={{uri: route.params.imageUri}}
        style={styles.imageBackground}
      />
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
    paddingVertical: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 64,
    // marginTop: 114,
    marginBottom: 60,
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

export default ShowImage;
