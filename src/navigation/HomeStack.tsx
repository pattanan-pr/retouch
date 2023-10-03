/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screen/Home';
import Camera from '../screen/Camera';
import ImageFullScreen from '../screen/ImageFullScreen';
import TakePhoto from '../screen/TakePhoto';
import Map from '../screen/Map';
import Account from '../screen/Account';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Your individual screens
function SquareTabBarIcon({route, focused}) {
  return (
    <View>
      <View style={{marginTop: 8}}>
        <Text>{route.name}</Text>
      </View>
    </View>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {height: 72},
        tabBarIcon: ({focused}) => (
          <SquareTabBarIcon route={route} focused={focused} />
        ),
        tabBarLabel: () => null,
      })}>
      {/* <Tab.Screen name="Home" component={Home} /> */}
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Map" component={Map} options={{headerShown: false}} />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigator">
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ImageFullScreen"
          component={ImageFullScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TakePhoto"
          component={TakePhoto}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
