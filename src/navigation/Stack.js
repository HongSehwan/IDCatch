import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BLACK_COLOR, LIGHT_COLOR, GREEN_COLOR, GREY_COLOR } from '../color'
import { useColorScheme } from 'react-native'
import IDcardAuth from '../screens/IDcardAuth'
import Iamport from '../components/kakaocert/Iamport'
import CertificationResult from '../components/kakaocert/CertificationResult'
import { IMPData } from 'iamport-react-native'

export const CertificationParams = {
  params: IMPData.CertificationData,
  tierCode: 'imp78021912',
}

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
      <NativeStack.Screen
        options={{ headerShown: false }}
        name="Iamport"
        component={Iamport}
      />
      <NativeStack.Screen
        options={{
          headerTitle: '아임포트 본인인증 결과',
        }}
        name="CertificationResult"
        component={CertificationResult}
      />
    </NativeStack.Navigator>
  )
}

export default Stack
