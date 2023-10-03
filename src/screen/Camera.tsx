/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroARPlane,
  ViroMaterials,
  Viro3DObject,
  ViroButton,
} from '@viro-community/react-viro';
import {useNavigation} from '@react-navigation/native';
import {captureRef} from 'react-native-view-shot';

ViroMaterials.createMaterials({
  Material: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1151815345108168734/wat.png',
    },
  },
});

const HelloWorldSceneAR = () => {
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
  }

  function handleTextClick(clickedText) {
    if (clickedText === 'Hello hello world') {
      console.log('clicked');
      const url = 'https://www.hotels.com/go/thailand/wat-phra-kaew';
      Linking.openURL(url);
    } else {
      console.log(clickedText);
    }
  }

  function handleButtonClick() {
    const url = 'https://www.hotels.com/go/thailand/wat-phra-kaew';
    Linking.openURL(url);
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARPlane>
        <ViroButton
          source={require('../assets/baseButton.png')}
          position={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
          height={0.2}
          width={0.3}
          opacity={1}
          onClick={handleButtonClick}
        />
        <ViroText
          text={'Wat Pagay'}
          scale={[0.5, 0.5, 0.5]}
          position={[-2, 1, -4]}
          style={styles.helloWorldTextStyle}
          onClick={() => handleTextClick('Hello Wat Pagay')}
        />
        <ViroText
          text={'Prang sam yout'}
          scale={[0.5, 0.5, 0.5]}
          position={[-3, 1, -1]}
          style={styles.helloWorldTextStyle}
          onClick={() => handleTextClick('Hello Prang sam yout')}
        />
        <Viro3DObject
          source={require('../assets/sphere.obj')}
          position={[0, 0, 0]}
          scale={[10, 10, 10]}
          type="OBJ"
          materials={['Material']}
          opacity={1}
        />
      </ViroARPlane>
    </ViroARScene>
  );
};

const Camera = () => {
  const navigation = useNavigation();
  const savedPhoto = useRef(null);

  const savePhoto = async () => {
    try {
      if (savedPhoto && savedPhoto.current) {
        const photo = await captureRef(savedPhoto.current, {
          result: 'tmpfile',
          quality: 1,
          format: 'jpg',
        });
        if (photo) {
          const bg = `file:/${photo}`;
          navigation.navigate('TakePhoto', { imageUri: bg });
        } else {
          console.log('No captured photo received.');
        }
      } else {
        console.log('savedPhoto is not defined or null.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity onPress={savePhoto}>
          <View
            ref={savedPhoto}
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 4,
              borderColor: 'white',
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
