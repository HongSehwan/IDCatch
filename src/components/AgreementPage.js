import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #dfe6e9;
`;

const OkBtn = styled.TouchableOpacity``;

const OKView = styled.View`
    width: 60px;
    height: 35px;
    background-color: tomato;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const OKText = styled.Text`
    color: white;
`;

const AgreementView = styled.View`
    justify-content: center;
    padding-left: 25px;
    border-width: 2px;
`;

const AgreementLine = styled.View`
    margin: 15px 0px;
`;

const AgreementLineText = styled.Text`
    font-size: 30px;
    font-weight: 900;
    text-align: center;
`;

const AgreementTitle = styled.Text`
    font-size: 23px;
    font-weight: 800;
    margin-top: 25px;
`;

const AgreementSemiTitle = styled.Text`
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
`;

const AgreementText = styled.Text`
    padding-left: 17px;
    font-size: 16px;
`;

const NoticeText = styled.Text`
    margin-top: 10px;
    margin-right: 15px;
    font-size: 15px;
    width: 330px;
`;

const AgreementPage = () => {
    const navigation = useNavigation();
    const goToLogin = () => {
        navigation.navigate("Login");
    };
    return (
        <Container>
            <AgreementLine>
                <AgreementLineText>개인정보 수집 · 이용 안내</AgreementLineText>
            </AgreementLine>
            <AgreementView>
                <AgreementTitle>1. 개인정보의 수집 및 이용목적</AgreementTitle>
                <AgreementSemiTitle>가 성인인증 서비스 제공</AgreementSemiTitle>
                <AgreementText>- 만 19세 미만 여부 확인</AgreementText>
                <AgreementText>- 영업점에 성인인증 결과 통보</AgreementText>
                <AgreementText>- 이용자 본인확인, 개인식별, 공지사항의 전달 등</AgreementText>
                <AgreementText>- 새로운 정보와 고지사항의 안내</AgreementText>
                <NoticeText>※ IDCatch는 개인정보를 위의 목적으로처리하며, 동의받은 목적 이외의 용도로 처리하지 않습니다.</NoticeText>
                <AgreementTitle>2. 수집·이용하는 개인정보 항목</AgreementTitle>
                <AgreementSemiTitle>가. 이용자 정보</AgreementSemiTitle>
                <AgreementText>- 성명, 성별, 생년월일, 이동통신사, 휴대폰번호</AgreementText>
                <AgreementSemiTitle>나. 영업점(사업자) 정보</AgreementSemiTitle>
                <AgreementText>- 상호명, 사업자등록번호, 대표자명, 전화번호</AgreementText>
                <AgreementTitle>3. 개인정보의 보유 및 이용기간</AgreementTitle>
                <AgreementSemiTitle>IDCatch(성인인증 서비스) 회원 탈퇴시까지</AgreementSemiTitle>
                <NoticeText>
                    단, 관련 법령의 규정 또는 IDCatch 내부 방침에 의하여 보존할 필요가 있는 경우 개인정보 수집 연장에 대한 메일 전송 후
                    동의시 개인정보를 보유합니다.
                </NoticeText>
                <NoticeText></NoticeText>
            </AgreementView>
            <OkBtn onPress={goToLogin}>
                <OKView>
                    <OKText>확인</OKText>
                </OKView>
            </OkBtn>
        </Container>
    );
};

export default AgreementPage;
