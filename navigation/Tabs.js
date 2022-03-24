import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useColorScheme } from 'react-native'
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
        backgroundColor: isDark ? BLACK_COLOR : LIGHT_COLOR,
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? BLACK_COLOR : LIGHT_COLOR,
        },
        tabBarActiveTintColor: isDark ? GREEN_COLOR : GREY_COLOR,
        tabBarInactiveTintColor: isDark ? '#808e9b' : '#a4b0be',
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : LIGHT_COLOR,
        },
        headerTitleStyle: {
          color: isDark ? GREEN_COLOR : GREY_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
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
