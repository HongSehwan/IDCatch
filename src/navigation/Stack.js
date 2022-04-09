import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BLACK_COLOR, LIGHT_COLOR, GREEN_COLOR, GREY_COLOR } from '../color'
import { useColorScheme } from 'react-native'
import IDcardAuth from '../screens/IDcardAuth'
import Iamport from '../components/iamport/Iamport'
import CertificationResult from '../components/iamport/CertificationResult'
import { IMPData } from 'iamport-react-native'
import CameraHandler from '../components/Idcard/Camera/Camera'
import PhotoPreview from '../components/Idcard/Camera/PhotoPreview'
import FsView from '../components/Idcard/Camera/FsView'
import Certification from '../components/Idcard/Certification'

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
        options={{ headerShown: false }}
        name="IDcardAuth"
        component={IDcardAuth}
      />
      <NativeStack.Screen
        options={{
          headerTitle: '신분증 촬영',
        }}
        name="camera"
        component={CameraHandler}
      />
      <NativeStack.Screen
        options={{
          headerTitle: '사진 확인',
        }}
        name="photo preview"
        component={PhotoPreview}
      />
      <NativeStack.Screen
        options={{ headerShown: false }}
        name="fsView"
        component={FsView}
      />
      <NativeStack.Screen
        options={{
          headerTitle: '인증 결과',
        }}
        name="Certification"
        component={Certification}
      />
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
