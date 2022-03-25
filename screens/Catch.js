import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import styled from 'styled-components/native'

const CheckContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const IdCheckBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const UserIdCheck = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? GREEN_COLOR : 'grey')};
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
`

const IdCheckText = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  font-weight: 700;
  font-size: 18px;
`

const PasswordBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const Password = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? GREEN_COLOR : 'grey')};
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
`

const PasswordText = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  font-weight: 700;
  font-size: 18px;
`

const Check = () => {
  return (
    <CheckContainer>
      <IdCheckBtn>
        <UserIdCheck>
          <IdCheckText>지문인식</IdCheckText>
        </UserIdCheck>
      </IdCheckBtn>
      <PasswordBtn>
        <Password>
          <PasswordText>간편 비밀번호</PasswordText>
        </Password>
      </PasswordBtn>
    </CheckContainer>
  )
}

export default Check
