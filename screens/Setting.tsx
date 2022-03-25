import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import { BLACK_COLOR } from '../color';

const SettingContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

const SignOut = styled.View<{ isDark: boolean }>`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
    border-bottom-color: grey;
`;

const SignOutBtn = styled.TouchableOpacity``;

const SignOutText = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : '#596275')};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const HistoryBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const History = styled.View<{ isDark: boolean }>`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
    border-bottom-color: grey;
`;

const HistoryText = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : '#596275')};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const RegularBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const Regular = styled.View<{ isDark: boolean }>`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : 'white')};
    border-bottom-color: grey;
`;

const RegularText = styled.Text<{ isDark: boolean }>`
    color: ${(props) => (props.isDark ? 'white' : '#596275')};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Setting = () => {
    const isDark = useColorScheme() === 'dark';
    const onPress = () => {
        if (auth().currentUser) {
            auth().signOut();
        }
    };
    return (
        <SettingContainer>
            <SignOutBtn onPress={onPress}>
                <SignOut isDark={isDark}>
                    <SignOutText isDark={isDark}>Log Out</SignOutText>
                </SignOut>
            </SignOutBtn>
            <HistoryBtn>
                <History isDark={isDark}>
                    <HistoryText isDark={isDark}>History</HistoryText>
                </History>
            </HistoryBtn>
            <RegularBtn>
                <Regular isDark={isDark}>
                    <RegularText isDark={isDark}>A regular customer</RegularText>
                </Regular>
            </RegularBtn>
        </SettingContainer>
    );
};

export default Setting;
