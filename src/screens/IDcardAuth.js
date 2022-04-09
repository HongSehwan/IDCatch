import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { setIdcardData } from '../redux/actions'
import HomeBtn from '../components/Idcard/Camera/HomeBtn'

const Container = styled.View`
  flex: 1;
  background-color: white;
`

const LogoImg = styled.Image`
  height: 60%;
  width: 100%;
`

const Home = styled.View`
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
`

const IDcardAuth = () => {
  return (
    <Container>
      <Home>
        <LogoImg
          resizeMode="stretch"
          source={require('../assets/img/IDCatch_logo.png')}
        ></LogoImg>
        <HomeBtn img="camera" text="신분증 촬영하기" />
      </Home>
    </Container>
  )
}

export default IDcardAuth
