import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Text, Dimensions, useColorScheme, FlatList, Alert } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import styled from 'styled-components/native'

const CheckContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const UserId = styled.View``

const UserIdText = styled.Text`
  color: white;
`

const Check = () => {
  return (
    <CheckContainer>
      <UserId>
        <UserIdText>Check</UserIdText>
      </UserId>
    </CheckContainer>
  )
}

export default Check
