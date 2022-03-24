import React, { useRef, useState } from 'react'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { BLACK_COLOR } from '../color'
import { ActivityIndicator, Alert } from 'react-native'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`
const PhoneCheckBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`
const PasswordCheckBtn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`

const Login = ({ navigation: { navigate } }) => {
  const passwordInput = useRef()
  const [phoneNum, setPhoneNum] = useState('')
  const [phoneState, setPhoneState] = useState(true)
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
          console.log(user)
          Alert.alert('인증번호가 전송되었습니다.')
          setToken(user._verificationId)
          setPhoneState(true)
          passwordInput.current.focus()
          setSendLoading(false)
        })
      // navigate('Login')
    } catch (e) {
      console.log(e.code)
      switch (e.code) {
        case 'auth/invalid-phone-number': {
          Alert.alert('유효한 전화번호가 아닙니다.')
          setSendLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/session-expired': {
          Alert.alert('인증번호가 만료되었습니다.')
          setSendLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/too-many-requests': {
          Alert.alert('잠시 후 다시 시도해 주세요.')
          setSendLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/operation-not-allowed': {
          Alert.alert('인증이 허용되지 않았습니다.')
          setSendLoading(false)
        }
      }
    }

    setPhoneState(false)
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
      console.log('Data:' + auth.PhoneAuthProvider.credential(token, password))
      const credential = await auth.PhoneAuthProvider.credential(
        token,
        password,
      )
      await auth()
        .signInWithCredential(credential)
        .then((user) => {
          console.log('어떤 Data를 포함하니?:' + user)
          Alert.alert('로그인에 성공했습니다.')
          setPhoneState(true)
          setCheckLoading(false)
        })
    } catch (e) {
      console.log(e.code)
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
        }
      }
      switch (e.code) {
        case 'auth/too-many-requests': {
          Alert.alert('잠시 후 다시 시도해 주세요.')
          setCheckLoading(false)
        }
      }
      switch (e.code) {
        case 'missing-verification-id': {
          Alert.alert('인증 ID가 잘못되었습니다.')
          setCheckLoading(false)
        }
      }
    }
  }
  console.log('토큰:' + token)
  console.log('패스워드:' + password)
  return (
    <Container>
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
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Send</BtnText>
        )}
      </PhoneCheckBtn>
      <TextInput
        ref={passwordInput}
        placeholder="인증번호 6자리"
        placeholderTextColor="grey"
        // secureTextEntry
        keyboardType="number-pad"
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitCheckEditing}
      />
      <PasswordCheckBtn onPress={onSubmitCheckEditing}>
        {checkLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Log In</BtnText>
        )}
      </PasswordCheckBtn>
    </Container>
  )
}

export default Login
