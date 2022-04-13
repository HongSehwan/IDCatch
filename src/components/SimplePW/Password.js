import React, { useState } from 'react'
import { Alert, useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import CryptoJS from 'react-native-crypto-js'
import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/firestore'
import { BLACK_COLOR } from '../../color'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
`

const PasswordLine = styled.View``

const PasswordNum = styled.TextInput``

const CheckBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const CheckLine = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const CheckText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const EditBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const EditLine = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const EditText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const Password = () => {
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const isDark = useColorScheme() === 'dark'
  const navigation = useNavigation()
  const passowrdAuth = () => {
    if (password === null) {
      return Alert.alert('항목이 비어 있습니다.')
    }
    if (password.length < 6) {
      return Alert.alert('간편 비밀번호는 6자리입니다.')
    }
    setLoading(true)
    try {
    } catch (e) {
      Alert.alert('간편 비밀번호 인증 오류입니다.')
    }
  }
  const goToEditPW = () => {
    navigation.navigate('Stack', {
      screen: 'Edit',
    })
  }
  return (
    <Container isDark={isDark}>
      <PasswordLine>
        <PasswordNum
          autoCorrect={false}
          maxLength={6}
          keyboardType="number-pad"
          value={password}
          onChangeText={(num) => setPassword(num)}
          onSubmitEditing={passowrdAuth}
        />
      </PasswordLine>
      <CheckBtn>
        <CheckLine isDark={isDark}>
          <CheckText>간편 비밀번호 인증</CheckText>
        </CheckLine>
      </CheckBtn>
      <EditBtn onPress={goToEditPW}>
        <EditLine isDark={isDark}>
          <EditText>간편 비밀번호 등록하기</EditText>
        </EditLine>
      </EditBtn>
    </Container>
  )
}

export default Password
