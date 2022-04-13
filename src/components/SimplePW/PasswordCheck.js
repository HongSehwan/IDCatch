import React from 'react'
import styled from 'styled-components/native'
import { useColorScheme } from 'react-native'
import { BLACK_COLOR } from '../../color'
import { useSelector } from 'react-redux'
import CryptoJS from 'react-native-crypto-js'
import auth from '@react-native-firebase/auth'
import { firebase } from '@react-native-firebase/firestore'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
`

const PasswordCheckLine = styled.View``

const PasswordCehckNum = styled.TextInput``

const EditCheckBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const EditCheckLine = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const EditCheckText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const PasswordCheck = () => {
  const db = firebase.firestore()
  const { editpw } = useSelector((state) => state.AuthReducer)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const checkEditing = () => {
    if (password === null) {
      return Alert.alert('항목이 비어 있습니다.')
    }
    if (password.length < 6) {
      return Alert.alert('간편 비밀번호는 6자리입니다.')
    }
    setLoading(true)
    try {
      if (editpw === password) {
        const cryptoPW = CryptoJS.AES.encrypt(
          password,
          0 + auth().currentUser?.providerData[0].phoneNumber.split('+82')[1],
        ).toString()
        db.collection('IDcardAuth')
          .doc(
            0 + auth().currentUser?.providerData[0].phoneNumber.split('+82')[1],
          )
          .update({ SimplePWState: true, SimplePW: cryptoPW })
        navigation.navigate('Stack', {
          screen: 'Password',
        })
      }
    } catch (e) {
      Alert.alert('간편 비밀번호 등록 오류입니다.')
    }
  }
  //   const goToPW = () => {
  //     navigation.navigate('Stack', {
  //       screen: 'Password',
  //     })
  //   }
  const isDark = useColorScheme() === 'dark'
  return (
    <Container isDark={isDark}>
      <PasswordCheckLine>
        <PasswordCehckNum
          autoCorrect={false}
          maxLength={6}
          secureTextEntry
          keyboardType="number-pad"
          value={password}
          onChangeText={(num) => setPassword(num)}
          onSubmitEditing={checkEditing}
        />
      </PasswordCheckLine>
      <EditCheckBtn>
        <EditCheckLine isDark={isDark}>
          <EditCheckText>간편 비밀번호 등록</EditCheckText>
        </EditCheckLine>
      </EditCheckBtn>
    </Container>
  )
}

export default PasswordCheck
