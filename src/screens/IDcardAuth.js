import React, { useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import RectangleCamera from '../components/RectangleCamera'
import { useDispatch } from 'react-redux'
import { setIdcardData } from '../redux/actions'
import storage from '@react-native-firebase/storage'

const Container = styled.View`
  flex: 1;
`

const IDcardAuth = (props) => {
  const dispatch = useDispatch()
  const [fileInfo, setFileInfo] = useState(null)

  onCapture = () => {
    this.camera.current.capture()
  }

  return (
    <Container>
      <RectangleCamera
        style={{ flex: 5 }}
        setIdcardData={(profileName, profileFilePath) => {
          const idcardData = {
            filename: profileName,
            filepath: profileFilePath,
          }
          dispatch(setIdcardData(idcardData))
        }}
      />
    </Container>
  )
}

export default IDcardAuth
