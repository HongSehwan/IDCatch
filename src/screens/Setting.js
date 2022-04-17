import React, { useState } from "react";
import { Alert, useColorScheme } from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { BLACK_COLOR } from "../color";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/firestore";

const SettingContainer = styled.View`
    flex: 1;
    justify-content: center;
`;

const SignOut = styled.View`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: grey;
`;

const SignOutBtn = styled.TouchableOpacity``;

const SignOutText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const HistoryBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const History = styled.View`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: grey;
`;

const HistoryText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const RegularBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const Regular = styled.View`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: grey;
`;

const RegularText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ServiceBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const Service = styled.View`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: grey;
`;

const ServiceText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Setting = () => {
    const db = firebase.firestore();
    const navigation = useNavigation();
    const isDark = useColorScheme() === "dark";
    const onPress = () => {
        if (auth().currentUser) {
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "T")
                .delete();
            auth().signOut();
        }
    };
    const goToTerms = () => {
        navigation.navigate("Stack", {
            screen: "service",
        });
    };
    const Alarm = () => {
        Alert.alert("해당 기능을 준비중입니다.");
    };
    return (
        <SettingContainer>
            <SignOutBtn onPress={onPress}>
                <SignOut isDark={isDark}>
                    <SignOutText isDark={isDark}>로그아웃</SignOutText>
                </SignOut>
            </SignOutBtn>
            <HistoryBtn>
                <History isDark={isDark}>
                    <HistoryText isDark={isDark}>최근 이력</HistoryText>
                </History>
            </HistoryBtn>
            <RegularBtn onPress={Alarm}>
                <Regular isDark={isDark}>
                    <RegularText isDark={isDark}>단골 고객</RegularText>
                </Regular>
            </RegularBtn>
            <ServiceBtn onPress={goToTerms}>
                <Service isDark={isDark}>
                    <ServiceText isDark={isDark}>서비스 약관</ServiceText>
                </Service>
            </ServiceBtn>
        </SettingContainer>
    );
};

export default Setting;
