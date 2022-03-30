import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import TouchID from 'react-native-touch-id'

const Container = styled.View``

const Fingerprint = () => {
  // const optionalConfigObject = {
  //   title: 'Authentication Required', // 타이틀
  //   imageColor: '#e00606', // 지문인식 기본 컬러
  //   imageErrorColor: '#ff0000', // 지문인식 실패 컬러
  //   sensorDescription: 'Touch sensor', // 터치센서
  //   sensorErrorDescription: 'Failed', // 터치센서 Fail Text 변경
  //   cancelText: 'Cancel', // Android // 취소버튼 Text 변경
  //   fallbackLabel: 'Show Passcode', // ios ( 비어있으면 레이블이 숨겨짐 )
  //   unifiedErrors: false, // 통합 오류 메시지 사용 ( 기본값 false)
  //   passcodeFallback: false, // ios-faceId / touch 사용할 수 없는 경우 기기비밀번호 사용여부
  // }

  // TouchID.authenticate('description', optionalConfigObject)
  //   .then((success) => {
  //     console.log('지문인식 성공') // 지문인식 성공했을 때 코드를 넣으면 됨
  //   })
  //   .catch((error) => {
  //     console.log('지문인식 실패') // 실패했을 때 코드를 넣으면 됨.
  //   })
  return (
    <Container>
      <Text>Fingerprint</Text>
    </Container>
  )
}

export default Fingerprint
