/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
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
  console.log(route);

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
        // console.log(result.image, 'image');

        if (result != null) {
          // Navigate to the full-screen image view with the edited image
          // console.log('sok');
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
      <RNCamera ref={cameraRef} style={{flex: 1}} captureAudio={false}>
        <ImageBackground
          source={{
            uri: route.params.imageUri,
          }}
          style={styles.image}
          onError={error => {
            console.log('Image load error:', error);
          }}>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={takePicture}>
              <View style={styles.button} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%', // Center horizontally
    transform: [{translateX: -30}],
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'grey',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
