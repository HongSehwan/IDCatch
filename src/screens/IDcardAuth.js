import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import RectangleCamera from '../components/Idcard/RectangleCamera'
import { useDispatch, useSelector } from 'react-redux'
import { setIdcardData, setFileData } from '../redux/actions'

const Container = styled.View`
  flex: 1;
`

const IDcardAuth = (props) => {
  const navigation = useNavigation()
  const { filename } = useSelector((state) => state.authReducer)
  const { filepath } = useSelector((state) => state.authReducer)
  useEffect(() => {
    console.log(filename)
    console.log(filepath)
  }, [filepath, filename])
  const dispatch = useDispatch()
  const [fileInfo, setFileInfo] = useState(null)

  return (
    <Container>
      <RectangleCamera
        navigation={navigation}
        style={{ flex: 5 }}
        setIdcardData={(fileName, filePath) => {
          const idcardData = {
            filename: fileName,
            filepath: filePath,
          }
          dispatch(setIdcardData(idcardData))
        }}
      />
    </Container>
  )
}

export default IDcardAuth
