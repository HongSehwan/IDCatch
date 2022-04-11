import React from 'react'
import { useNavigation } from '@react-navigation/native'
import * as MediaLibrary from 'expo-media-library'
import CEOCameraPreview from './CEOCameraPreview'

function CEOPhotoPreview({ route }) {
  const navigation = useNavigation()
  const { photo } = route.params
  const __retakePicture = () => {
    navigation.goBack()
  }
  const __savePicture = async (photoUri) => {
    try {
      const resPermission = await MediaLibrary.getPermissionsAsync()
      if (resPermission.granted) {
        const asset = await MediaLibrary.createAssetAsync(photoUri)
      } else {
        const res = await MediaLibrary.requestPermissionsAsync()
        if (res.granted) {
          const asset = await MediaLibrary.createAssetAsync(photoUri)
        }
      }
      navigation.navigate('RegistrationView', { uri: photoUri })
    } catch (error) {
      alert('사진을 저장하지 못했습니다.')
    }
  }
  return (
    <CEOCameraPreview
      photo={photo}
      retakePicture={__retakePicture}
      savePicture={__savePicture}
    />
  )
}

export default CEOPhotoPreview
