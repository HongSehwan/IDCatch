import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import RectangleCamera from '../components/RectangleCamera'
import storage from '@react-native-firebase/storage'

const Container = styled.View`
  flex: 1;
`

const IDcardAuth = () => {
  const navigation = useNavigation()
  const [fileInfo, setFileInfo] = useState(null)

  onCapture = () => {
    this.camera.current.capture()
  }
  return (
    <Container>
      <RectangleCamera
        style={{ flex: 5 }}
        fileInfo={(ProfileName, ProfileFilePath) => {
          const dataToSubmit = {
            filename: ProfileName,
            filepath: ProfileFilePath,
          }
          setFileInfo(dataToSubmit)
        }}
      />
    </Container>
  )
}

export default IDcardAuth
