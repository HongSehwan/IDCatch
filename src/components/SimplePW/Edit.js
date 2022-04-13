import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { useColorScheme } from 'react-native'
import { setEditPassword } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { BLACK_COLOR } from '../../color'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
`

const PasswordEditLine = styled.View`
  width: 70%;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const PasswordEditNum = styled.TextInput`
  letter-spacing: 26px;
  width: 70%;
  height: 40px;
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const EditText = styled.Text`
  font-size: 25px;
`

// const EditPWBtn = styled.TouchableOpacity`
//   margin: 0px 100px;
//   width: 285px;
// `

// const EditPWLine = styled.View`
//   height: 40px;
//   align-items: center;
//   justify-content: center;
//   margin-top: 20px;
//   border-radius: 20px;
//   border-width: 1px;
//   border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
//   background-color: white;
// `

// const EditPWText = styled.Text`
//   color: #596275;
//   font-weight: 700;
//   font-size: 18px;
// `

const Edit = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const passowrdEditing = () => {
    if (password === null) {
      return Alert.alert('항목이 비어 있습니다.')
    }
    if (password.length < 6) {
      return Alert.alert('간편 비밀번호는 6자리입니다.')
    }
    setLoading(true)
    try {
      if (password.length === 6) {
        dispatch(setEditPassword(password))
        navigation.navigate('Stack', {
          screen: 'Edit',
        })
      }
    } catch (e) {
      Alert.alert('간편 비밀번호 등록 오류입니다.')
    }
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  //   const goToEditPW = () => {
  //     navigation.navigate('Stack', {
  //       screen: 'Edit',
  //     })
  //   }
  const isDark = useColorScheme() === 'dark'
  return (
    <Container isDark={isDark}>
      <EditText>간편 비밀번호를 입력 바랍니다.</EditText>
      <PasswordEditLine isDark={isDark}>
        <PasswordEditNum
          ref={inputRef}
          autoCorrect={false}
          maxLength={6}
          secureTextEntry
          keyboardType="number-pad"
          value={password}
          onChangeText={(num) => setPassword(num)}
          onSubmitEditing={passowrdEditing}
        />
      </PasswordEditLine>
      {/* <EditPWBtn>
        <EditPWLine isDark={isDark}>
          <EditPWText>간편 비밀번호 확인</EditPWText>
        </EditPWLine>
      </EditPWBtn> */}
    </Container>
  )
}

export default Edit
