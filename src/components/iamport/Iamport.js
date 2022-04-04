import React from 'react'
/* 아임포트 본인인증 모듈을 불러옵니다. */
import IMP from 'iamport-react-native'
import auth from '@react-native-firebase/auth'

/* 로딩 컴포넌트를 불러옵니다. */
import Loading from './Loading'

const Iamport = ({ route, navigation }) => {
  console.log(IMP)
  const userCode = 'imp78021912'
  // IMP.init(userCode)
  function callback(response) {
    navigation.replace('CertificationResult', response)
  }

  /* [필수입력] 본인인증에 필요한 데이터를 입력합니다. */
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: 'IDCatch',
    carrier: 'SKT',
    name: '홍길동',
    phone: '0100000000',
    // phone: 0 + auth().currentUser?.providerData[0].phoneNumber.split('+82')[1],
    min_age: '19',
  }

  return (
    <IMP.Certification
      userCode={userCode} // 가맹점 식별코드
      loading={<Loading />} // 로딩 컴포넌트
      data={data} // 본인인증 데이터
      callback={callback} // 본인인증 종료 후 콜백
    />
  )
}

export default Iamport
