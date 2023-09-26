import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../screen/Home';
import Camera from '../screen/Camera';
import ImageFullScreen from '../screen/ImageFullScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ImageFullScreen" component={ImageFullScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default HomeStack;
