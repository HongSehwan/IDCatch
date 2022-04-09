import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'

const Nav = createNativeStackNavigator()

const OutNav = () => (
  <Nav.Navigator>
    <Nav.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
  </Nav.Navigator>
)

export default OutNav
