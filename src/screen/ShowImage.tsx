import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import React, { useState } from 'react';
import {Image, StyleSheet, ImageBackground, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';

const ShowImage = ({route}) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  const handleOpacityChange = (value) => {
    setOpacity(value);
  };

  const goBackToHome = () => {
    navigation.navigate('Camera');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToHome}>
          <Icon name="close" color={'#FFFFFF'} size={30} />
        </TouchableOpacity>
        <Text>Preview</Text>
        <TouchableOpacity>
          <Icons name="save-alt" color={'#FFFFFF'} size={30} />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: route.params.imageUri}}
        style={styles.imageBackground}
      />
      <View style={styles.opacityTextContainer}>
        <Text style={styles.opacityText}>Opacity</Text>
      </View>
      <View style={styles.sliderContainer}>
        <Icon name="circle-outline" color={'#7F7572'} size={30} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={opacity}
          onValueChange={handleOpacityChange}
          minimumTrackTintColor="white"
        />
        <Icons name="contrast" color={'#7F7572'} size={30} />
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
