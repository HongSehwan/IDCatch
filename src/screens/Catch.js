import React from 'react'
import { useColorScheme, Alert } from 'react-native'
import styled from 'styled-components/native'
import TouchID from 'react-native-touch-id'
import { useNavigation } from '@react-navigation/native'

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

const NoticeView = styled.View`
  margin: 0px 20px;
  padding: 20px 10px;
`

const Notice = styled.Text`
  color: tomato;
  font-size: 13px;
`

const Check = () => {
  const isDark = useColorScheme() === 'dark'
  const navigation = useNavigation()
  const optionalConfigObject = {
    title: 'Authentication Required', // 타이틀
    imageColor: '#e00606', // 지문인식 기본 컬러
    imageErrorColor: '#ff0000', // 지문인식 실패 컬러
    sensorDescription: 'Touch sensor', // 터치센서
    sensorErrorDescription: 'Failed', // 터치센서 Fail Text 변경
    cancelText: 'Cancel', // Android // 취소버튼 Text 변경
    fallbackLabel: '', // ios ( 비어있으면 레이블이 숨겨짐 )
    unifiedErrors: false, // 통합 오류 메시지 사용 ( 기본값 false)
    passcodeFallback: false, // ios-faceId / touch 사용할 수 없는 경우 기기비밀번호 사용여부
  }

  const TouchId = () => {
    TouchID.authenticate('description', optionalConfigObject)
      .then((success) => {
        console.log('지문인식 성공')
      })
      .catch((error) => {
        switch (error.name) {
          case 'LAErrorTouchIDNotEnrolled': {
            Alert.alert('등록된 지문이 없습니다. 휴대폰 지문 등록을 해주세요.')
          }
        }
        switch (error.name) {
          case 'LAErrorUserCancel': {
            Alert.alert('지문 인증을 취소했습니다.')
          }
        }
        switch (error.name) {
          case 'LAErrorSystemCancel': {
            Alert.alert('시스템에서 인증을 취소했습니다.')
          }
        }
        switch (error.name) {
          case 'LAErrorTouchIDNotAvailable': {
            Alert.alert('지문 인식 실행 오류입니다.')
          }
        }
        switch (error.name) {
          case 'LAErrorAuthenticationFailed': {
            Alert.alert(
              '유효한 자격 증명을 제공하지 못했습니다. 잠시후 다시 시도해주세요.',
            )
          }
        }
        switch (error.name) {
          case 'LAErrorPasscodeNotSet': {
            Alert.alert('암호가 설정되어 있지 않아 인증을 시작할 수 없습니다.')
          }
        }
        switch (error.name) {
          case 'LAErrorTouchIDLockout': {
            Alert.alert('실패 횟수가 초과되었습니다. 잠시후 다시 시도해주세요.')
          }
        }
        switch (error.name) {
          case 'RCTTouchIDNotSupported': {
            Alert.alert('지문 인식을 사용할 수 없는 기기입니다.')
          }
        }
        switch (error.name) {
          case 'LAErrorUserFallback': {
            Alert.alert('대체 비밀번호 입력을 선택하였습니다.')
          }
        }
        switch (error.details) {
          case 'cancelled': {
            Alert.alert('지문 인증을 취소했습니다.')
          }
        }
        switch (error.details) {
          case 'failed': {
            Alert.alert('지문 인증에 실패했습니다.')
          }
        }
        switch (error.details) {
          case 'Too many attempts. Try again Later.': {
            Alert.alert('실패 횟수가 초과되었습니다. 잠시후 다시 시도해주세요.')
          }
        }
        switch (error.details) {
          case 'Too many attempts. Fingerprint sensor disabled.': {
            Alert.alert(
              '시도 횟수가 너무 많아 지문 센서가 비활성화 되었습니다.',
            )
          }
        }
      })
  }
  const goToSimplePW = () => {
    navigation.navigate('Stack', {
      screen: 'Password',
    })
  }

  return (
    <CheckContainer>
      <IdCheckBtn onPress={TouchId}>
        <UserIdCheck>
          <IdCheckText>지문인식</IdCheckText>
        </UserIdCheck>
      </IdCheckBtn>
      <PasswordBtn onPress={goToSimplePW}>
        <Password>
          <PasswordText>간편 비밀번호</PasswordText>
        </Password>
      </PasswordBtn>
      <NoticeView isDark={isDark}>
        <Notice>최초 성인인증 후 사용 가능합니다.</Notice>
      </NoticeView>
    </CheckContainer>
  )
}

export default Check
