/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Camera from '../screen/Camera';
import ImageFullScreen from '../screen/ImageFullScreen';
import TakePhoto from '../screen/TakePhoto';
import Map from '../screen/Map';
import Account from '../screen/Account';
import ShowImage from '../screen/ShowImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewVideoScreen from '../screen/ViewVideoScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SquareTabBarIcon({route, focused}) {
  return (
    <View>
      <View
        style={{marginTop: 8, justifyContent: 'center', alignItems: 'center'}}>
        {route.name === 'Camera' ? (
          <Icon
            name="cube-scan"
            color={focused ? '#B02F00' : '#655C5A'}
            size={30}
          />
        ) : route.name === 'Map' ? (
          <Icon
            name="map-outline"
            color={focused ? '#B02F00' : '#655C5A'}
            size={30}
          />
        ) : route.name === 'Account' ? (
          <Icon
            name="account-circle-outline"
            color={focused ? '#B02F00' : '#655C5A'}
            size={30}
          />
        ) : null}
      </View>
    </View>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {height: 100},
        tabBarIcon: ({focused}) => (
          <SquareTabBarIcon route={route} focused={focused} />
        ),
        tabBarLabel: ({focused}) => {
          let label;
          if (route.name === 'Camera') {
            label = 'Retouch';
          } else if (route.name === 'Map') {
            label = ' Map';
          } else if (route.name === 'Account') {
            label = 'Account';
          }
          return (
            <Text style={{color: focused ? '#B02F00' : '#655C5A'}}>
              {label}
            </Text>
          );
        },
      })}>
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
        <Stack.Screen
          name="ShowImage"
          component={ShowImage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewVideoScreen"
          component={ViewVideoScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;
