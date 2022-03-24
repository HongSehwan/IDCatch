import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Dimensions, useColorScheme, FlatList, Alert } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { BLACK_COLOR, GREEN_COLOR } from '../color'

const SettingContainer = styled.View`
  flex: 1;
  justify-content: center;
`

const SignOut = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 5px;
  margin: 0px 15px;
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-bottom-color: ${(props) => (props.isDark ? GREEN_COLOR : 'grey')};
`

const SignOutBtn = styled.TouchableOpacity``

const SignOutText = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`

const HistoryBtn = styled.TouchableOpacity`
  margin-top: 100px;
`

const History = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 5px;
  margin: 0px 15px;
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-bottom-color: ${(props) => (props.isDark ? GREEN_COLOR : 'grey')};
`

const HistoryText = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`

const RegularBtn = styled.TouchableOpacity`
  margin-top: 100px;
`

const Regular = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 5px;
  margin: 0px 15px;
  border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
  border-bottom-color: ${(props) => (props.isDark ? GREEN_COLOR : 'grey')};
`

const RegularText = styled.Text`
  color: ${(props) => (props.isDark ? 'white' : '#596275')};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`

const Setting = () => {
  const isDark = useColorScheme() === 'dark'
  const onPress = () => {
    if (auth().currentUser) {
      auth().signOut()
    }
  }
  return (
    <SettingContainer>
      <SignOutBtn onPress={onPress}>
        <SignOut isDark={isDark}>
          <SignOutText>Log Out</SignOutText>
        </SignOut>
      </SignOutBtn>
      <HistoryBtn>
        <History>
          <HistoryText>History</HistoryText>
        </History>
      </HistoryBtn>
      <RegularBtn>
        <Regular>
          <RegularText>A regular customer</RegularText>
        </Regular>
      </RegularBtn>
    </SettingContainer>
  )
}

export default Setting
