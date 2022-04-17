import React, { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { BLACK_COLOR } from "../color";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import RNRestart from "react-native-restart";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const CEO = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "grey")};
    background-color: white;
`;

const CEOBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const CEOBtnText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const NoticeView = styled.View`
    margin: 0px 20px;
    margin-bottom: 10px;
    padding: 20px 10px;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "grey")};
    background-color: ${(props) => (props.isDark ? "#2f3542" : " #f1f2f6")};
`;

const Notice = styled.Text`
    color: tomato;
    font-size: 13px;
`;

const TitleView = styled.View`
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: tomato;
    border-width: 3px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    margin-top: 40px;
    font-size: 20px;
    font-weight: 700;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-width: 3px;
`;

const Certification = styled.View``;

const SelfAuthenticationBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const SelfAuthentication = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "grey")};
    background-color: white;
`;

const SelfAuthenticationText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const IdCertificationBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const IdCertification = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "grey")};
    background-color: white;
`;

const IdCertificationText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const Auth = styled.View`
    align-items: center;
    margin-top: 10px;
`;

const AuthText = styled.Text`
    color: tomato;
    font-size: 9.3px;
`;

const TransformBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const Transform = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "grey")};
    background-color: white;
`;

const TransformText = styled.Text`
    color: #596275;
    font-weight: 700;
    font-size: 18px;
`;

const NView = styled.View`
    align-items: center;
    margin-top: 10px;
`;

const NText = styled.Text`
    color: tomato;
    font-size: 13px;
`;

const Profile = () => {
    const db = firebase.firestore();
    const navigation = useNavigation();
    const isDark = useColorScheme() === "dark";
    const [certification, setCertification] = useState(false);
    const [transformResult, setTransformResult] = useState(false);
    const goToIDcardAuth = () => {
        navigation.navigate("Stack", {
            screen: "IDcardAuth",
        });
    };
    const goToCEOAuth = () => {
        if (certification === true) {
            Alert.alert("이미 사장님 인증을 완료했습니다. 인증 삭제 요청 시 gg9297@gmail.com으로 문의 바랍니다.");
        } else {
            navigation.navigate("Stack", {
                screen: "CEOAuth",
            });
        }
    };
    const TransformData = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .update({ Transform: !transformResult });
        RNRestart.Restart();
    };
    const goToIamport = () => {
        navigation.navigate("Stack", {
            screen: "Iamport",
            // params: {
            //   ...fullData,
            // },
        });
    };

    useEffect(() => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                setCertification(data.data().CEOAuth);
                setTransformResult(data.data().Transform);
            });
    }, []);

    return (
        <Container>
            <NoticeView isDark={isDark}>
                <Notice>
                    IDCatch는 주류 판매에 대한 성인 인증 APP 입니다. 해당 APP은 미성년자 주류 판매를 제한하는 다중 인증 시스템 APP으로
                    IDCatch는 법적인 책임을 가지고 있지 않습니다.
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
                    <AuthText>본인 인증과 신분증 인증은 최초 1회만 인증하며 모든 인증이 필요합니다.</AuthText>
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
            {certification ? (
                <>
                    <TransformBtn onPress={TransformData}>
                        <Transform isDark={isDark}>
                            <TransformText>모드 전환</TransformText>
                        </Transform>
                    </TransformBtn>
                    <NView>
                        <NText>사장님 / 고객님 모드 전환</NText>
                    </NView>
                </>
            ) : null}
        </Container>
    );
};

export default Profile;
