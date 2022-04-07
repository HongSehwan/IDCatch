import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BLACK_COLOR, LIGHT_COLOR, GREEN_COLOR, GREY_COLOR } from '../color'
import { useColorScheme } from 'react-native'
import IDcardAuth from '../screens/IDcardAuth'
import Iamport from '../components/iamport/Iamport'
import CertificationResult from '../components/iamport/CertificationResult'
import Result from '../components/Idcard/Result'
import Temp from '../components/Idcard/Temp'
import RectangleCamera from '../components/Idcard/RectangleCamera'
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
      <NativeStack.Screen
        options={{
          headerTitle: '신분증 인증',
        }}
        name="IDcardAuth"
        component={IDcardAuth}
      />
      <NativeStack.Screen
        options={{
          headerTitle: '카메라 촬영',
        }}
        name="RectangleCamera"
        component={RectangleCamera}
      />
      <NativeStack.Screen name="Result" component={Result} />
      <NativeStack.Screen name="Temp" component={Temp} />
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
