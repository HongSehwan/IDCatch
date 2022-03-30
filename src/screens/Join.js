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
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
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

const Join = ({ navigation: { navigate } }) => {
  const passwordInput = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus()
  }
  const onSubmitPasswordEditing = async () => {
    if (email === '' || password === '') {
      return Alert.alert('빈 항목이 있습니다.')
    }
    if (loading) {
      return
    }
    setLoading(true)
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      await auth().currentUser.sendEmailVerification()
      Alert.alert('회원가입에 성공했습니다.')
      navigate('Login')
    } catch (e) {
      console.log(e.code)
      switch (e.code) {
        case 'auth/email-already-in-use': {
          Alert.alert('이미 가입되어 있는 이메일입니다.')
          setLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/weak-password': {
          Alert.alert('비밀번호를 6자리 이상 필요합니다.')
          setLoading(false)
        }
      }
      switch (e.code) {
        case 'auth/invalid-email': {
          Alert.alert('올바른 정보가 아닙니다.')
          setLoading(false)
        }
      }
    }
  }
  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="grey"
        keyboardType="email-address"
        returnKeyType="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
        returnKeyType="done"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  )
}

export default Join
