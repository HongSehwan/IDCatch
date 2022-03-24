import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { BLACK_COLOR, LIGHT_COLOR } from '../color'
import { ActivityIndicator, Alert, useColorScheme } from 'react-native'

const Container = styled.View`
  background-color: white;
  flex: 1;
  justify-content: center;
  color: white;
  padding: 60px 20px;
`
const Title = styled.Text`
  font-size: 21;
  font-weight: 700;
  color: tomato;
`
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #2c3e50;
  border-width: 5;
  border-color: white;
  border-bottom-color: tomato;
`
const InputLine = styled.View`
  align-items: center;
`
const PhoneCheckBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 70px;
  border-width: 1px;
  border-radius: 20px;
  border-color: tomato;
  justify-content: center;
  align-items: center;
`
const PasswordCheckBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 20px;
  border-color: tomato;
  justify-content: center;
  align-items: center;
`
const BtnText = styled.Text`
  color: tomato;
  font-size: 16px;
`
const Footer = styled.View`
  align-items: center;
`
const FooterText = styled.Text`
  color: black;
  font-size: 10;
  font-weight: 500;
`

const Login = ({ navigation: { navigate } }) => {
  const passwordInput = useRef()
  const [phoneNum, setPhoneNum] = useState('')
  const [phoneState, setPhoneState] = useState(false)
  const [password, setPassword] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [token, setToken] = useState('')
  const onSubmitPhoneEditing = async () => {
    if (phoneNum === '') {
      return Alert.alert('항목이 비어 있습니다.')
    }
    if (sendLoading) {
      return
    }
    setSendLoading(true)
    try {
      await auth()
        .signInWithPhoneNumber('+82' + phoneNum, true)
        .then((user) => {
          Alert.alert('인증번호가 전송되었습니다.')
          setToken(user._verificationId)
          setPhoneState(true)
          passwordInput.current.focus()
          setSendLoading(false)
        })
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-phone-number': {
          Alert.alert('유효한 전화번호가 아닙니다.')
          setSendLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/too-many-requests': {
          Alert.alert('잠시 후 다시 시도해 주세요.')
          setSendLoading(false)
        }
      }
    }
  }

  const onSubmitCheckEditing = async () => {
    if (password === '') {
      return Alert.alert('항목이 비어 있습니다.')
    }
    if (checkLoading) {
      return
    }
    setCheckLoading(true)
    try {
      const credential = await auth.PhoneAuthProvider.credential(
        token,
        password,
      )
      await auth()
        .signInWithCredential(credential)
        .then((user) => {
          Alert.alert('로그인에 성공했습니다.')
          setCheckLoading(false)
          setPhoneState(false)
        })
    } catch (e) {
      setCheckLoading(false)
      switch (e.code) {
        case 'auth/invalid-verification-code': {
          Alert.alert('인증번호가 유효하지 않습니다.')
          setCheckLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/session-expired': {
          Alert.alert('인증번호가 만료되었습니다.')
          setCheckLoading(false)
          setPhoneState(false)
        }
      }
      switch (e.code) {
        case 'auth/too-many-requests': {
          Alert.alert('잠시 후 다시 시도해 주세요.')
          setCheckLoading(false)
          setPhoneState(false)
        }
      }
      switch (e.code) {
        case 'missing-verification-id': {
          Alert.alert('인증 ID가 잘못되었습니다.')
          setCheckLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/operation-not-allowed': {
          Alert.alert('인증이 허용되지 않았습니다.')
          setSendLoading(false)
          setPhoneState(false)
        }
      }
    }
  }
  const isDark = useColorScheme() === 'dark'
  return (
    <>
      <Container>
        <Title>휴대폰 번호</Title>
        <InputLine>
          <TextInput
            placeholder="- 없이 입력"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="grey"
            keyboardType="number-pad"
            returnKeyType="next"
            value={phoneNum}
            onChangeText={(num) => setPhoneNum(num)}
            onSubmitEditing={onSubmitPhoneEditing}
          />
          <PhoneCheckBtn onPress={onSubmitPhoneEditing}>
            {sendLoading ? (
              <ActivityIndicator color="tomato" />
            ) : (
              <BtnText>Send</BtnText>
            )}
          </PhoneCheckBtn>
        </InputLine>
        {phoneState ? (
          <>
            <Title>인증번호</Title>
            <InputLine>
              <TextInput
                ref={passwordInput}
                placeholder="인증번호 6자리"
                placeholderTextColor="grey"
                keyboardType="number-pad"
                returnKeyType="done"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={onSubmitCheckEditing}
              />
              <PasswordCheckBtn onPress={onSubmitCheckEditing}>
                {checkLoading ? (
                  <ActivityIndicator color="tomato" />
                ) : (
                  <BtnText>Log In</BtnText>
                )}
              </PasswordCheckBtn>
            </InputLine>
          </>
        ) : null}
      </Container>
      <Footer>
        <FooterText>&trade; {new Date().getFullYear()} IDCatch</FooterText>
      </Footer>
    </>
  )
}

export default Login
