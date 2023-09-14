/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Camera = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Camera</Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: 'yellow',
          padding: 10,
          borderWidth: 1,
          borderRadius: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;
