import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroARSceneNavigator,
  ViroARPlaneSelector,
  ViroMaterials,
  Viro3DObject,
  ViroButton,
} from '@viro-community/react-viro';
import {useNavigation} from '@react-navigation/native';

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
      <ViroARPlaneSelector>
        <ViroButton
          source={require('../assets/baseButton.png')}
          position={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
          height={0.2}
          width={0.3}
          opacity={0.1}
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
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: HelloWorldSceneAR,
        }}
        style={styles.f1}
      />
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
