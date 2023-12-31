/* eslint-disable react-hooks/exhaustive-deps */
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
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407992159060008/14.35719369100.5678566.png?ex=65431a72&is=6530a572&hm=4f892ff6c307071c143ef6d0402c7d3b0fb43d133dd1487321385b4e818645ff&',
    },
  },
  Material2: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407993996156980/14.35719369100.56787514.png?ex=65431a73&is=6530a573&hm=7b3143adb93bf1f962be5b6d379bb1c65b6fcbf0ee329c9895fca4584bf244c6&',
    },
  },
  Material3: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407995426422815/14.35721176100.56776389.png?ex=65431a73&is=6530a573&hm=5435bbe0a62479d3f7320c441f9e726a9b3d4cf288d5bcb03ae0788c75b7a703&',
    },
  },
  Material4: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407996772786176/14.35722984100.56774535.png?ex=65431a74&is=6530a574&hm=5ba1af29076c31a16d46e32f026efd06757024c9a67226e773ced1bd5c601345&',
    },
  },
  Material5: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407998400172032/14.35722984100.56776389.png?ex=65431a74&is=6530a574&hm=66fedb8fc3773182c4982d1019256226901a46d68a11f3c9824176c6f21e3d22&',
    },
  },
  Material6: {
    shininess: 2.0,
    diffuseTexture: {
      uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1164407999947882537/14.35724791100.56774535.png?ex=65431a74&is=6530a574&hm=668a295f7c3d2fa16e0d8c7ea33847f418814f8537507c1693a339084bc54f33&',
    },
  },
});

const HelloWorldSceneAR = ({myValue}) => {
  console.log(myValue, 'w');
  const materials = myValue ? myValue : 'Material';

  function onInitialized(state: any, reason: any) {
    console.log('guncelleme', state, reason);
  }

  function handleTextClick(clickedText: string) {
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

  const [materialin, setMaterialin] = useState(0);

  const [material, setMaterial] = useState('');

  const [isVisible, setVisible] = useState(false);

  const [toggleValue, setToggleValue] = useState(false);

  const points = [
    {
      lat: 13.8161234357452,
      lng: 100.56228161857784,
      imageName: '14.35719369,100.5678566.png',
      Material: 'Material',
    },
    {
      lat: 13.816100533185969,
      lng: 100.56258070051004,
      imageName: '14.35719369,100.56787514.png',
      Material: 'Material2',
    },
    {
      lat: 14.35722984,
      lng: 100.56774535,
      imageName: '14.35719369,100.56787514.png',
      Material: 'Material3',
    },
    {
      lat: 14.35722984,
      lng: 100.56774535,
      imageName: '14.35719369,100.56787514.png',
      Material: 'Material4',
    },
    {
      lat: 14.35722984,
      lng: 100.56776389,
      imageName: '14.35719369,100.56787514.png',
      Material: 'Material5',
    },
    {
      lat: 14.35724791,
      lng: 100.56774535,
      imageName: '14.35719369,100.56787514.png',
      Material: 'Material6',
    },
  ];

  const toggleModal = () => {
    setVisible(true);
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

  const squareSize = 0.000004;

  const formattedPoints = points.map(point => [
    {
      lat: point.lat + squareSize,
      lng: point.lng + squareSize,
    },
    {
      lat: point.lat + squareSize,
      lng: point.lng - squareSize,
    },
    {
      lat: point.lat - squareSize,
      lng: point.lng - squareSize,
    },
    {
      lat: point.lat - squareSize,
      lng: point.lng + squareSize,
    },
    {
      lat: point.lat + squareSize,
      lng: point.lng + squareSize,
    },
  ]);

  // const materialsArray = [
  //   'Material',
  //   'Material2',
  //   'Material3',
  //   'Material4',
  //   'Material5',
  //   'Material6',
  // ];
  // const getCurrentLocation = async () => {
  //   Geolocation.requestAuthorization('always');
  //   Geolocation.watchPosition(
  //     async position => {
  //       const userLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };

  //       console.log(userLocation, 'loc');

  //       formattedPoints.forEach(async (point, index) => {
  //         // const material = materialsArray[index];
  //         // console.log(material, 'mat');
  //         // setMaterial(material);
  //         GeoFencing.containsLocation(userLocation, point)
  //           .then(() => {
  //             console.log('Point is within polygon');
  //             setMaterialin(index);
  //             console.log(materialin, 'in');
  //             // Set the material based on the point
  //             // console.log('Index:', index);
  //             // const material = materialsArray[index];
  //             // console.log(index, 'mat');
  //             // setMaterial(material);
  //             // console.log(point, 'pp');
  //             // setMaterial(point);
  //           })
  //           .catch(() => console.log('point is NOT within polygon'));
  //       });
  //       setMaterial(materialsArray[materialin]);
  //       console.log(material, 'lp');
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
  // console.log(material, 'klnh;ohuliglu');
  const getCurrentLocation = async () => {
    Geolocation.requestAuthorization('always');
    Geolocation.watchPosition(
      async position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log(userLocation, 'loc');
        formattedPoints.forEach(async (point, index) => {
          GeoFencing.containsLocation(userLocation, point)
            .then(async () => {
              console.log(index);
              console.log('Point is within polygon');
              if (index === 0) {
                await setMaterial('Material');
              } else if (index === 1) {
                await setMaterial('Material2');
              } else if (index === 2) {
                await setMaterial('Material3');
              } else if (index === 3) {
                await setMaterial('Material4');
              } else if (index === 4) {
                await setMaterial('Material5');
              } else if (index === 5) {
                await setMaterial('Material6');
              } else {
                console.log('none');
              }
            })
            .catch(() => console.log('point is NOT within polygon'));
        });
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

  console.log(material, 'this is');

  const savePhoto = async () => {
    try {
      const photo = await captureRef(savedPhoto, {
        result: 'tmpfile',
        quality: 1,
        format: 'jpg',
      });
      const bg = `file:/${photo}`;
      setForceRender(false);
      // console.log(photo, 'popo');
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
      {forceRender && material && (
        <ViroARSceneNavigator
          ref={savedPhoto}
          autofocus={true}
          initialScene={{
            scene: () => <HelloWorldSceneAR myValue={material} />,
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
          marginBottom: 500,
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
              alignSelf: 'flex-start',
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
              minimumTrackTintColor="#B02F00"
            />
            <Icons name="contrast" color={'#686868'} size={30} />
          </View>
          <View style={styles.sliderLine} />
          <View
            style={{
              alignSelf: 'flex-start',
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
  },
  slider: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
  },
  sliderLine: {
    height: 1.6,
    backgroundColor: '#C8C3C2',
    width: '90%',
    marginTop: 30,
  },
});
