import React, { useState } from 'react'
import { useColorScheme, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import TouchID from 'react-native-touch-id'
import { useRef } from 'react'
import { useEffect } from 'react'
import RNRestart from 'react-native-restart'

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

const Timer = styled.View``

const TimerText = styled.Text`
  font-size: 20px;
  color: black;
`

const Check = () => {
  const navigation = useNavigation()
  const [min, setMin] = useState(3)
  const [sec, setSec] = useState(0)
  const [timeState, setTiemState] = useState(false)
  const time = useRef(180)
  const timerId = useRef(null)

  const startTimer = () => {
    clearInterval(timerId.current)
    time.current = 5
    setMin(3)
    setSec(0)
    timerId.current = setInterval(() => {
      time.current -= 1
      setSec(time.current % 60)
      setMin(parseInt(time.current / 60))
    }, 1000)
  }
  const stopTimer = () => {
    setMin(3)
    setSec(0)
    clearInterval(timerId.current)
  }
  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current)
      // RNRestart.Restart()
      // stopTimer()
    }
  }, [sec])

  const goToCheck = () => {
    navigation.navigate('Stack', {
      screen: 'Fingerprint',
    })
  }
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
    // startTimer()
    TouchID.authenticate('description', optionalConfigObject)
      .then((success) => {
        console.log('지문인식 성공')
      })
      .catch((error) => {
        // stopTimer()
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

  return (
    <CheckContainer>
      {/* <Timer>
        <TimerText>
          {min}분 {sec}초
        </TimerText>
      </Timer> */}
      <IdCheckBtn onPress={TouchId}>
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
