import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {
  PESDK,
  Configuration,
  CanvasAction,
  ImageFormat,
  ImageExportType,
} from 'react-native-photoeditorsdk';

const TakePhoto = ({route}) => {
  const cameraRef = useRef(null);
  const navigation = useNavigation();

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
          navigation.navigate('ImageFullScreen', {
            image: result.image,
            bgImg: route.params.imageUri,
          });
        } else {
          // The user tapped on the cancel button within the editor.
          console.log('User canceled editing.');
        }
      } catch (error) {
        // There was an error generating the edited photo.
        console.log('Error while editing:', error);
      }
    }
    //   };
  };
  return (
    <View style={{flex: 1}}>
      {/* Render the camera component */}

      <RNCamera ref={cameraRef} style={{flex: 1}} captureAudio={false}>
        <ImageBackground
          source={{
            uri: route.params.imageUri,
          }}
          style={styles.image}>
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
        </ImageBackground>
      </RNCamera>
    </View>
  );
};

export default TakePhoto;

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
    opacity: 0.3,
  },
});
