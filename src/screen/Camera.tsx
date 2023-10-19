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
      uri: 'https://upload.wikimedia.org/wikipedia/commons/4/49/360_degree_View_of_the_Shore_temple.jpg',
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
    Geolocation.watchPosition(
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
            lat: 14.356216576408327,
            lng: 100.5666164229673,
          },
          {
            lat: 14.356410803988313,
            lng: 100.568496173953903,
          },
          {
            lat: 14.356805762875652,
            lng: 100.56845923327262,
          },
          {
            lat: 14.356807521885123,
            lng: 100.568483804559804,
          },
          {
            lat: 14.356870178502223,
            lng: 100.568479085139032,
          },
          {
            lat: 14.356872230991751,
            lng: 100.568509194699899,
          },
          {
            lat: 14.356935351236006,
            lng: 100.568504667529425,
          },
          {
            lat: 14.35694870357066,
            lng: 100.568513839558577,
          },
          {
            lat: 14.356995867503976,
            lng: 100.56851045682194,
          },
          {
            lat: 14.3570078455296,
            lng: 100.568499468021258,
          },
          {
            lat: 14.357047119848227,
            lng: 100.568496651147925,
          },
          {
            lat: 14.357063264237324,
            lng: 100.56851544075036,
          },
          {
            lat: 14.35711791706326,
            lng: 100.568511028965034,
          },
          {
            lat: 14.357130989058874,
            lng: 100.568489772707053,
          },
          {
            lat: 14.357170822311787,
            lng: 100.568486090371252,
          },
          {
            lat: 14.357184351418546,
            lng: 100.56849498568036,
          },
          {
            lat: 14.357231439663684,
            lng: 100.568490632665672,
          },
          {
            lat: 14.357243200267254,
            lng: 100.568479399477269,
          },
          {
            lat: 14.357300351484724,
            lng: 100.568474116197891,
          },
          {
            lat: 14.357297753710814,
            lng: 100.568437828313535,
          },
          {
            lat: 14.357368899747161,
            lng: 100.568432469426185,
          },
          {
            lat: 14.357366767538869,
            lng: 100.568402685011321,
          },
          {
            lat: 14.357769922147774,
            lng: 100.568364687888533,
          },
          {
            lat: 14.357574138111271,
            lng: 100.566437792440823,
          },
          {
            lat: 14.356923730156236,
            lng: 100.56652503605774,
          },
          {
            lat: 14.356909424254649,
            lng: 100.566506852067107,
          },
          {
            lat: 14.356856690436171,
            lng: 100.566513925592147,
          },
          {
            lat: 14.356847421046435,
            lng: 100.566535247806286,
          },
          {
            lat: 14.356216576408327,
            lng: 100.5666164229673,
          },
        ];

        // const polygon2 = [
        //   {
        //     lat: 13.741835729980469 + squareSize,
        //     lng: 100.58592027530723 + squareSize,
        //   },
        //   {
        //     lat: 13.741835729980469 + squareSize,
        //     lng: 100.58592027530723 - squareSize,
        //   },
        //   {
        //     lat: 13.741835729980469 - squareSize,
        //     lng: 100.58592027530723 - squareSize,
        //   },
        //   {
        //     lat: 13.741835729980469 - squareSize,
        //     lng: 100.58592027530723 + squareSize,
        //   },
        //   {
        //     lat: 13.741935729980469 + squareSize,
        //     lng: 100.58592027530723 + squareSize,
        //   },
        // ];

        try {
          const isInside1 = await GeoFencing.containsLocation(point, polygon1);
          // const isInside2 = await GeoFencing.containsLocation(point, polygon2);

          const isInsidePolygon = isInside1;

          setIsInsidePolygon(isInsidePolygon);
        } catch (error) {
          console.log('point is NOT within polygon');
          setIsInsidePolygon(false);
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
      console.log(photo, 'popo');
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
