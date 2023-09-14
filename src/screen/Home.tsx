/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

interface HomeType {
  route: any;
  navigation: StackNavigationProp<any, any>;
}

const Home: React.FC<HomeType> = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Retouch Ar</Text>
      <View
        style={{
          marginTop: 20,
          backgroundColor: 'pink',
          padding: 10,
          borderWidth: 1,
          borderRadius: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          <Text>Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
