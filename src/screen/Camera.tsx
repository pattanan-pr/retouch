import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  PESDK,
  Configuration,
  CanvasAction,
  ImageFormat,
  ImageExportType,
} from 'react-native-photoeditorsdk';

const Camera = () => {
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [capturedImageUri, setCapturedImageUri] = useState(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);

      try {
        const configuration: Configuration = {
          mainCanvasActions: [
            CanvasAction.UNDO,
            CanvasAction.REDO,
            CanvasAction.REMOVE_BACKGROUND,
          ],
          export: {
            image: {
              exportType: ImageExportType.FILE_URL, // or ImageExportType.DATA_URL
              format: ImageFormat.PNG,
              // You can also specify other options like quality if needed
              // quality: 0.9,
            },
          },
        };
        // Open the photo editor and handle the export as well as any occurring errors.
        const result = await PESDK.openEditor(data.uri, configuration);
        console.log(result.image, 'ewjfpoih2werfgeywfgi;ue');

        if (result != null) {
          // Navigate to the full-screen image view with the edited image
          navigation.navigate('ImageFullScreen', {imageUri: result.image});
        } else {
          // The user tapped on the cancel button within the editor.
          console.log('User canceled editing.');
        }
      } catch (error) {
        // There was an error generating the edited photo.
        console.log('Error while editing:', error);
      }
    }
  };

  // export const openPhotoFromLocalPathExample = async (): Promise<void> => {
  //   try {
  //     // Add a photo from the assets directory.
  //     const photo = require("../../../../../assets/pesdk/LA.jpg");

  //     // Open the photo editor and handle the export as well as any occuring errors.
  //     const result = await PESDK.openEditor(photo);

  //     if (result != null) {
  //       // The user exported a new photo successfully and the newly generated photo is located at `result.image`.
  //       console.log(result.image);
  //     } else {
  //       // The user tapped on the cancel button within the editor.
  //       return;
  //     }
  //   } catch (error) {
  //     // There was an error generating the photo.
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    let timer;

    if (capturedImageUri) {
      // Set a timer to hide the image after 3 seconds
      timer = setTimeout(() => {
        setCapturedImageUri(null); // Hide the image
      }, 3000); // 3 seconds
    }

    // Cleanup the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [capturedImageUri]);

  return (
    <View style={{flex: 1}}>
      {/* Render the camera component */}
      <RNCamera ref={cameraRef} style={{flex: 1}} captureAudio={false}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={takePicture}>
            <Text style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      </RNCamera>

      {/* Display the captured image if available */}
      {/* {capturedImageUri && (
        <View style={styles.imageContainer}>
          <Image source={{uri: capturedImageUri}} style={styles.image} />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default Camera;

// import React, {useState, useRef} from 'react';
// import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
// import {RNCamera} from 'react-native-camera'; // Import the RNCamera component from react-native-camera
// // import Camera from './Camera'; // Import your Camera component

// export default function Camera() {
//   const cameraRef = useRef(null);
//   const [isCameraVisible, setIsCameraVisible] = useState(false);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const options = {quality: 0.5, base64: true};
//         const data = await cameraRef.current.takePictureAsync(options);
//         console.log('Picture data:', data);
//       } catch (error) {
//         console.error('Error taking picture:', error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {isCameraVisible ? (
//         <RNCamera ref={cameraRef} style={styles.camera} captureAudio={false}>
//           <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
//             <View style={styles.captureInnerButton} />
//           </TouchableOpacity>
//         </RNCamera>
//       ) : (
//         <View style={styles.cameraContainer}>
//           {/* <Camera /> */}
//           <TouchableOpacity
//             onPress={() => setIsCameraVisible(true)}
//             style={styles.showCameraButton}>
//             <View>
//               <Text>Show Camera</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   captureButton: {
//     flex: 0,
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     backgroundColor: 'white',
//     borderRadius: 50,
//     width: 70,
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   captureInnerButton: {
//     backgroundColor: 'red',
//     borderRadius: 40,
//     width: 60,
//     height: 60,
//   },
//   showCameraButton: {
//     backgroundColor: 'blue',
//     padding: 20,
//     borderRadius: 10,
//     marginTop: 20,
//   },
// });

// import React from 'react';
// import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {
//   ViroARScene,
//   ViroText,
//   ViroARSceneNavigator,
//   ViroARPlaneSelector,
//   ViroMaterials,
//   Viro3DObject,
//   ViroButton,
// } from '@viro-community/react-viro';
// import {useNavigation} from '@react-navigation/native';

// ViroMaterials.createMaterials({
//   Material: {
//     shininess: 2.0,
//     diffuseTexture: {
//       uri: 'https://cdn.discordapp.com/attachments/888067225217552385/1151815345108168734/wat.png',
//     },
//   },
// });

// const HelloWorldSceneAR = () => {
//   function onInitialized(state, reason) {
//     console.log('guncelleme', state, reason);
//   }

//   function handleTextClick(clickedText) {
//     if (clickedText === 'Hello hello world') {
//       console.log('clicked');
//       const url = 'https://www.hotels.com/go/thailand/wat-phra-kaew';
//       Linking.openURL(url);
//     } else {
//       console.log(clickedText);
//     }
//   }

//   function handleButtonClick() {
//     const url = 'https://www.hotels.com/go/thailand/wat-phra-kaew';
//     Linking.openURL(url);
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroARPlaneSelector>
//         <ViroButton
//           source={require('../assets/baseButton.png')}
//           position={[0, 0, 0]}
//           scale={[0.5, 0.5, 0.5]}
//           height={0.2}
//           width={0.3}
//           opacity={1}
//           onClick={handleButtonClick}
//         />
//         <ViroText
//           text={'Wat Pagay'}
//           scale={[0.5, 0.5, 0.5]}
//           position={[-2, 1, -4]}
//           style={styles.helloWorldTextStyle}
//           onClick={() => handleTextClick('Hello Wat Pagay')}
//         />
//         <ViroText
//           text={'Prang sam yout'}
//           scale={[0.5, 0.5, 0.5]}
//           position={[-3, 1, -1]}
//           style={styles.helloWorldTextStyle}
//           onClick={() => handleTextClick('Hello Prang sam yout')}
//         />
//         <Viro3DObject
//           source={require('../assets/sphere.obj')}
//           position={[0, 0, 0]}
//           scale={[10, 10, 10]}
//           type="OBJ"
//           materials={['Material']}
//           opacity={1}
//         />
//       </ViroARPlaneSelector>
//     </ViroARScene>
//   );
// };

// export default () => {
//   const navigation = useNavigation();
//   return (
//     <View style={{flex: 1}}>
//       <ViroARSceneNavigator
//         autofocus={true}
//         initialScene={{
//           scene: HelloWorldSceneAR,
//         }}
//         style={styles.f1}
//       />
//       <View>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text>Home</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   f1: {flex: 1},
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });
