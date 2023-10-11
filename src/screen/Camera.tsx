/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import Geolocation from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Toggle from 'react-native-toggle-element';

ViroMaterials.createMaterials({
  Material: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1151815345108168734/wat.png',
    },
  },
  Material2: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://as1.ftcdn.net/v2/jpg/02/26/55/78/1000_F_226557861_fiqTpEq0SoV6i9ky0CgixZqrv508erw9.jpg',
    },
  },
});

const HelloWorldSceneAR = ({myValue}) => {
  const materials = myValue ? ['Material'] : ['Material2'];
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
          materials={materials}
          opacity={1}
        />
      </ViroARPlane>
    </ViroARScene>
  );
};

const Camera = () => {
  const navigation = useNavigation();
  const savedPhoto = useRef(null);

  const [forceRender, setForceRender] = useState(false);

  const [isInsidePolygon, setIsInsidePolygon] = useState(false);

  const [polygon, setPolygon] = useState({lat: 0, lng: 0});

  const [isVisible, setVisible] = useState(false);

  const [toggleValue, setToggleValue] = useState(false);

  const toggleModal = () => {
    setVisible(!isVisible);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setForceRender(true);
    });
    setForceRender(true);
  }, []);

  // const getCurrentLocation = () => {
  //   Geolocation.requestAuthorization('always');
  //   Geolocation.getCurrentPosition(
  //     async position => {
  //       let point = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       console.log(point);
  //       setPolygon(point);

  //       const lat = position.coords.latitude;
  //       const lng = position.coords.longitude;

  //       const squareSize = 0.000001;
  //       const polygon = [
  //         {
  //           lat: 13.741935729980469 + squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //         {
  //           lat: 13.741935729980469 + squareSize,
  //           lng: 100.58592027530723 - squareSize,
  //         },
  //         {
  //           lat: 13.741935729980469 - squareSize,
  //           lng: 100.58592027530723 - squareSize,
  //         },
  //         {
  //           lat: 13.741935729980469 - squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //         {
  //           lat: 13.741935729980469 + squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //       ];
  //       const polygon2 = [
  //         {
  //           lat: 13.541935729980469 + squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //         {
  //           lat: 13.541935729980469 + squareSize,
  //           lng: 100.58592027530723 - squareSize,
  //         },
  //         {
  //           lat: 13.541935729980469 - squareSize,
  //           lng: 100.58592027530723 - squareSize,
  //         },
  //         {
  //           lat: 13.541935729980469 - squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //         {
  //           lat: 13.541935729980469 + squareSize,
  //           lng: 100.58592027530723 + squareSize,
  //         },
  //       ];

  //       try {
  //         await GeoFencing.containsLocation(point, polygon);
  //         await setForceRender(false);
  //         await setIsInsidePolygon(true);
  //         await setForceRender(true);
  //       } catch (error) {
  //         console.log('point is NOT within polygon');
  //         await setForceRender(false);
  //         await setIsInsidePolygon(false);
  //         await setForceRender(true);
  //       }
  //     },
  //     error => console.log('err get location', error),
  //     {
  //       enableHighAccuracy: true,
  //       accuracy: {android: 'high', ios: 'bestForNavigation'},
  //       timeout: 200000,
  //       distanceFilter: 0,
  //     },
  //   );
  // };

  const getCurrentLocation = async () => {
    Geolocation.requestAuthorization('always');
    Geolocation.getCurrentPosition(
      async position => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(point);
        setPolygon(point);

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const squareSize = 0.000001;
        const polygon1 = [
          {
            lat: 13.741935729980469 + squareSize,
            lng: 100.58592027530723 + squareSize,
          },
          {
            lat: 13.741935729980469 + squareSize,
            lng: 100.58592027530723 - squareSize,
          },
          {
            lat: 13.741935729980469 - squareSize,
            lng: 100.58592027530723 - squareSize,
          },
          {
            lat: 13.741935729980469 - squareSize,
            lng: 100.58592027530723 + squareSize,
          },
          {
            lat: 13.741935729980469 + squareSize,
            lng: 100.58592027530723 + squareSize,
          },
        ];
        const polygon2 = [
          {
            lat: 13.541935729980469 + squareSize,
            lng: 100.58592027530723 + squareSize,
          },
          {
            lat: 13.541935729980469 + squareSize,
            lng: 100.58592027530723 - squareSize,
          },
          {
            lat: 13.541935729980469 - squareSize,
            lng: 100.58592027530723 - squareSize,
          },
          {
            lat: 13.541935729980469 - squareSize,
            lng: 100.58592027530723 + squareSize,
          },
          {
            lat: 13.541935729980469 + squareSize,
            lng: 100.58592027530723 + squareSize,
          },
        ];

        try {
          const isInside1 = await GeoFencing.containsLocation(point, polygon1);
          const isInside2 = await GeoFencing.containsLocation(point, polygon2);

          const isInsidePolygon = isInside1 || isInside2;

          setForceRender(false);
          setIsInsidePolygon(isInsidePolygon);
          setForceRender(true);
        } catch (error) {
          console.log('point is NOT within polygon');
          setForceRender(false);
          setIsInsidePolygon(false);
          setForceRender(true);
        }
      },
      error => console.log('err get location', error),
      {
        enableHighAccuracy: true,
        accuracy: {android: 'high', ios: 'bestForNavigation'},
        timeout: 200000,
        distanceFilter: 0,
      },
    );
  };

  const savePhoto = async () => {
    try {
      const photo = await captureRef(savedPhoto, {
        result: 'tmpfile',
        quality: 1,
        format: 'jpg',
      });
      const bg = `file:/${photo}`;
      setForceRender(false);
      navigation.navigate('TakePhoto', {imageUri: bg});
    } catch (error) {
      console.log(error);
    }
  };

  const showPhoto = async () => {
    try {
      const photo = await captureRef(savedPhoto, {
        result: 'tmpfile',
        quality: 1,
        format: 'jpg',
      });
      const bg = `file:/${photo}`;
      navigation.navigate('ShowImage', {imageUri: bg});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {forceRender && (
        <ViroARSceneNavigator
          ref={savedPhoto}
          autofocus={true}
          initialScene={{
            scene: () => <HelloWorldSceneAR myValue={isInsidePolygon} />,
          }}
          style={styles.f1}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 700,
          paddingHorizontal: 16,
        }}>
        <View />
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#fff',
            textAlign: 'center',
          }}>
          Wat Maha That
        </Text>
        <TouchableOpacity onPress={getCurrentLocation}>
          <Icon name="refresh" color={'#7F7572'} size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 500,
          paddingHorizontal: 16,
        }}>
        <Text style={{color: 'white'}}>{JSON.stringify(polygon)}</Text>
      </View>
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
        <TouchableOpacity onPress={showPhoto}>
          <View
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 39,
        }}>
        <TouchableOpacity onPress={toggleModal}>
          <View
            style={{
              marginLeft: 50,
            }}>
            <Icon name="tune" color={'#FFFFFF'} size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 50,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 39,
        }}>
        <TouchableOpacity onPress={savePhoto}>
          <Icon name="face-man-outline" color={'#FFFFFF'} size={30} />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 230,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <View style={{marginVertical: 16}}>
            <TouchableOpacity onPress={toggleModal}>
              <View
                style={{
                  height: 8,
                  width: 85,
                  backgroundColor: '#C8C3C2',
                  borderRadius: 16,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'flex-start', // Align the "Opacity" text to the left
              marginLeft: 32,
            }}>
            <Text>Opacity</Text>
            <View />
          </View>
          <View style={styles.sliderContainer}>
            <Icon name="circle-outline" color={'#686868'} size={30} />
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              // value={opacity}
              // onValueChange={handleOpacityChange}
              minimumTrackTintColor="#B02F00"
            />
            <Icons name="contrast" color={'#686868'} size={30} />
          </View>
          <View style={styles.sliderLine} />
          <View
            style={{
              alignSelf: 'flex-start', // Align the "Opacity" text to the left
              marginLeft: 32,
              marginTop: 16,
            }}>
            <Text>Label</Text>
            <Toggle value={toggleValue} onPress={val => setToggleValue(val)} />
          </View>
        </View>
      )}
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
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
    marginBottom: '25%',
  },
  Content: {
    backgroundColor: 'red',
    borderRadius: 32,
    padding: 16,
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    // marginBottom: 91,
  },
  slider: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
  },
  sliderLine: {
    height: 1.6, // Height of the line
    backgroundColor: '#C8C3C2', // Color of the line
    width: '90%', // Full width
    marginTop: 30,
  },
});
