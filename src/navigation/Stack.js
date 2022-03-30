import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BLACK_COLOR, LIGHT_COLOR, GREEN_COLOR, GREY_COLOR } from '../color'
import { useColorScheme } from 'react-native'
import IDcardAuth from '../screens/IDcardAuth'

const NativeStack = createNativeStackNavigator()

const Stack = () => {
  const isDark = useColorScheme() === 'dark'
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : 'tomato',
        },
        headerTitleStyle: {
          color: 'white',
        },
      }}
    >
      <NativeStack.Screen name="신분증 인증" component={IDcardAuth} />
    </NativeStack.Navigator>
  )
}

export default Stack
