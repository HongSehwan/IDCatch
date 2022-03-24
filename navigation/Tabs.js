import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Animated, useColorScheme } from 'react-native'
import { LIGHT_COLOR, BLACK_COLOR, GREEN_COLOR, GREY_COLOR } from '../color'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import Catch from '../screens/Catch'
import Setting from '../screens/Setting'
import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  const isDark = useColorScheme() === 'dark'
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : 'white',
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : '#ff4d4d',
        },
        tabBarActiveTintColor: isDark ? GREEN_COLOR : 'white',
        tabBarInactiveTintColor: isDark ? '#808e9b' : '#f1f2f6',
        headerShown: false,
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 1,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <FontAwesome
                name={focused ? 'user-circle' : 'user-circle-o'}
                color={color}
                size={size}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Catch"
        component={Catch}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
                color={color}
                size={size}
              />
            )
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                color={color}
                size={size}
              />
            )
          },
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs
