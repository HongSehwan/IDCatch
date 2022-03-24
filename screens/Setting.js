import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Dimensions, useColorScheme, FlatList, Alert } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'

const SettingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const SettingText = styled.Text`
  color: white;
`

const SignOutBtn = styled.TouchableOpacity``

const SignOutText = styled.Text`
  color: white;
`

const Setting = () => {
  const onPress = () => {
    if (auth().currentUser) {
      auth().signOut()
    }
  }
  return (
    <SettingContainer>
      <SettingText>Setting</SettingText>
      <SignOutBtn onPress={onPress}>
        <SignOutText>LogOut</SignOutText>
      </SignOutBtn>
    </SettingContainer>
  )
}

export default Setting
