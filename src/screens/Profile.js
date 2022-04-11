import React, { useState } from 'react'
import { useColorScheme } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { BLACK_COLOR } from '../color'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CEO = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const CEOBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const CEOBtnText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const NoticeView = styled.View`
  margin: 0px 20px;
  padding: 20px 10px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'grey')};
  background-color: ${(props) => (props.isDark ? '#2f3542' : ' #f1f2f6')};
`

const Notice = styled.Text`
  color: tomato;
  font-size: 13px;
`

const TitleView = styled.View`
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-bottom-color: tomato;
  border-width: 3px;
`

const Title = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  margin-top: 40px;
  font-size: 20px;
  font-weight: 700;
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-width: 3px;
`

const Certification = styled.View``

const SelfAuthenticationBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const SelfAuthentication = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const SelfAuthenticationText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const IdCertificationBtn = styled.TouchableOpacity`
  margin: 0px 100px;
  width: 285px;
`

const IdCertification = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
  background-color: white;
`

const IdCertificationText = styled.Text`
  color: #596275;
  font-weight: 700;
  font-size: 18px;
`

const Auth = styled.View`
  align-items: center;
  margin-top: 10px;
`

const AuthText = styled.Text`
  color: tomato;
  font-size: 9.3px;
`

const Profile = () => {
  const navigation = useNavigation()
  const isDark = useColorScheme() === 'dark'
  const goToIDcardAuth = () => {
    navigation.navigate('Stack', {
      screen: 'IDcardAuth',
    })
  }
  const goToCEOAuth = () => {
    navigation.navigate('Stack', {
      screen: 'CEOAuth',
    })
  }
  const goToIamport = () => {
    navigation.navigate('Stack', {
      screen: 'Iamport',
      // params: {
      //   ...fullData,
      // },
    })
  }
  return (
    <Container>
      <NoticeView isDark={isDark}>
        <Notice>
          IDCatch는 주류 판매에 대한 성인 인증 APP 입니다. 해당 APP은 미성년자
          주류 판매를 제한하는 다중 인증 시스템 APP으로 IDCatch는 법적인 책임을
          가지고 있지 않습니다.
        </Notice>
      </NoticeView>
      <TitleView isDark={isDark}>
        <Title isDark={isDark}>성인 인증</Title>
      </TitleView>
      <Certification>
        <SelfAuthenticationBtn onPress={goToIamport}>
          <SelfAuthentication isDark={isDark}>
            <SelfAuthenticationText>본인 인증</SelfAuthenticationText>
          </SelfAuthentication>
        </SelfAuthenticationBtn>
        <IdCertificationBtn onPress={goToIDcardAuth}>
          <IdCertification isDark={isDark}>
            <IdCertificationText>신분증 인증</IdCertificationText>
          </IdCertification>
        </IdCertificationBtn>
        <Auth>
          <AuthText>
            본인 인증과 신분증 인증은 최초 1회만 인증하며 모든 인증이
            필요합니다.
          </AuthText>
        </Auth>
      </Certification>
      <TitleView isDark={isDark}>
        <Title isDark={isDark}>사장님 모드</Title>
      </TitleView>
      <CEOBtn onPress={goToCEOAuth}>
        <CEO isDark={isDark}>
          <CEOBtnText>사장님 인증</CEOBtnText>
        </CEO>
      </CEOBtn>
    </Container>
  )
}

export default Profile
