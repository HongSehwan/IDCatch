import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import MessageModal from "../components/MessageModal";
import { BLACK_COLOR } from "../color";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/firestore";
import { setMessageModal } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

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

const InquiryBtn = styled.TouchableOpacity`
    margin-top: 100px;
`;

const Inquiry = styled.View`
    align-items: center;
    justify-content: center;
    border-width: 5px;
    margin: 0px 40px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: grey;
`;

const InquiryText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Setting = () => {
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const navigation = useNavigation();
    const isDark = useColorScheme() === "dark";
    const { messageModal } = useSelector((state) => state.modalReducer);
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
        dispatch(setMessageModal(true, "해당 기능을 준비중입니다."));
    };
    const goToHistory = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                if (data.data().CEOAuth) {
                    navigation.navigate("Stack", {
                        screen: "History",
                    });
                } else {
                    return dispatch(setMessageModal(true, "사장님 모드 전용입니다."));
                }
            });
    };

    const InquiryMail = () => {
        dispatch(setMessageModal(true, "gg9297@gmail.com으로 문의 바랍니다."));
    };
    return (
        <SettingContainer>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            <SignOutBtn onPress={onPress}>
                <SignOut isDark={isDark}>
                    <SignOutText isDark={isDark}>로그아웃</SignOutText>
                </SignOut>
            </SignOutBtn>
            <HistoryBtn onPress={goToHistory}>
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
            <InquiryBtn onPress={InquiryMail}>
                <Inquiry isDark={isDark}>
                    <InquiryText isDark={isDark}>이용 문의</InquiryText>
                </Inquiry>
            </InquiryBtn>
        </SettingContainer>
    );
};

export default Setting;
