import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Dimensions, useColorScheme, FlatList, Alert } from 'react-native';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/native';

const CheckContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
const IdCheckBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const UserIdCheck = styled.View<{ isDark: boolean }>`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
    background-color: white;
`;

const IdCheckText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const PasswordBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const Password = styled.View<{ isDark: boolean }>`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? 'white' : 'grey')};
    background-color: white;
`;

const PasswordText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const Check = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <CheckContainer>
            <IdCheckBtn>
                <UserIdCheck isDark={isDark}>
                    <IdCheckText>지문인식</IdCheckText>
                </UserIdCheck>
            </IdCheckBtn>
            <PasswordBtn>
                <Password isDark={isDark}>
                    <PasswordText>간편 비밀번호</PasswordText>
                </Password>
            </PasswordBtn>
        </CheckContainer>
    );
};

export default Check;
