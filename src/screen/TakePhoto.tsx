/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {
  PESDK,
  Configuration,
  CanvasAction,
  ImageFormat,
  ImageExportType,
} from 'react-native-photoeditorsdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const TakePhoto = ({route}) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);

  // const takePicture = async () => {
  //   console.log('take pic!');
  //   if (cameraRef.current) {
  //     const options = {quality: 0.5, base64: true};
  //     const data = await cameraRef.current.takePictureAsync(options);

  //     try {
  //       const configuration: Configuration = {
  //         mainCanvasActions: [
  //           CanvasAction.UNDO,
  //           CanvasAction.REDO,
  //           CanvasAction.REMOVE_BACKGROUND,
  //         ],
  //         export: {
  //           image: {
  //             exportType: ImageExportType.FILE_URL,
  //             format: ImageFormat.PNG,
  //           },
  //         },
  //       };
  //       const result = await PESDK.openEditor(data.uri, configuration);

  //       if (result != null) {
  //         navigation.navigate('ImageFullScreen', {
  //           image: result.image,
  //           bgImg: route.params.imageUri,
  //         });
  //       } else {
  //         console.log('User canceled editing.');
  //       }
  //     } catch (error) {
  //       console.log('Error while editing:', error);
  //     }
  //   }
  // };

  const takePicture = async () => {
    console.log('take pic!');
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const formData = new FormData();
      formData.append('image', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'image',
      });
      formData.append('background', {
        uri: route.params.imageUri,
        type: 'image/jpeg',
        name: 'image',
      });
      console.log(formData, 'from');
      console.log(route.params.imageUri, 'kiii');

      try {
        const response = await axios.post(
          'https://ecaa-2403-6200-88a2-4333-74ad-f545-df3e-72e6.ngrok-free.app/upload_image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.status === 200) {
          const responseData = response.data;
          console.log('Upload successful', responseData);
          // console.log(responseData.base64_image, 'hulay');
          navigation.navigate('ImageFullScreen', {
            image: responseData.image_url,
            // bgImg: route.params.imageUri,
          });
        } else {
          console.log('Upload failed');
        }
      } catch (error) {
        console.error('Error while uploading:', error);
      }
    }
  };

  const toggleRecording = async () => {
    console.log('take vdo!');
    if (cameraRef.current) {
      try {
        const option = {
          quality: RNCamera.Constants.VideoQuality['720p'],
          maxDuration: 2000,
        };
        const videoRecordPromise = cameraRef.current.recordAsync(option);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          console.log(source, 'this is path');

          navigation.navigate('ViewVideoScreen', {
            videoUri: source,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stopRecording = () => {
    if (isRecording) {
      setIsRecording(false);

      if (recordingPromise) {
        recordingPromise.cancel();
      }
    }
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
              <Icon name="close" color={'#FFFFFF'} size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={takePicture}
              onLongPress={toggleRecording}
              onPressOut={stopRecording}
              underlayColor="white">
              <View style={styles.button} />
            </TouchableHighlight>
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
    marginTop: 40,
    bottom: 20,
    left: '50%',
    transform: [{translateX: -30}],
  },
  buttonContainer2: {
    position: 'absolute',
    marginTop: 40,
    bottom: 20,
    left: '70%',
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
    top: 50,
    left: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
});
