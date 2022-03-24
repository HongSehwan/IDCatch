import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Dimensions, useColorScheme, FlatList, Alert } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components/native'

const UserContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const UserId = styled.View``

const UserIdText = styled.Text`
  color: white;
`

const Profile = () => {
  return (
    <UserContainer>
      <UserId>
        <UserIdText>Profile</UserIdText>
      </UserId>
    </UserContainer>
  )
}

export default Profile
