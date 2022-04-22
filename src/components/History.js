import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import { useColorScheme } from "react-native";
import { BLACK_COLOR } from "../color";

const Container = styled.View`
    flex: 1;
    background-color: white;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const EmptyView = styled.View`
    justify-content: center;
    align-items: center;
    width: 90%;
    border-width: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: tomato;
`;

const EmptyText = styled.Text`
    text-align: center;
    margin-bottom: 10px;
    width: 100%;
    font-size: 30px;
    font-weight: 700;
    color: ${(props) => (props.isDark ? "white" : BLACK_COLOR)};
`;
const HistoryScroll = styled.ScrollView`
    width: 100%;
`;
const HistoryLine = styled.View`
    width: 100%;
    background-color: white;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const HistoryView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 13px 30px;
    width: 65%;
`;

const HistoryText = styled.Text`
    width: 70%;
    font-size: 25px;
    font-weight: 700;
    color: ${(props) => (props.isDark ? "white" : "#636e72")};
    margin: 13px;
`;

const AuthResult = styled.View`
    width: 100px;
    height: 40px;
    margin-left: 10px;
    margin-top: 5px;
    border-radius: 30px;
    background-color: tomato;
    justify-content: center;
`;

const ResultText = styled.Text`
    font-size: 20px;
    color: white;
    text-align: center;
`;

const NoticeView = styled.View`
    width: 85%;
    margin: 0px 5%;
    margin-top: 50px;
    margin-bottom: 30px;
    padding: 5% 25px;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "grey")};
    background-color: ${(props) => (props.isDark ? "#2f3542" : " #f1f2f6")};
`;

const Notice = styled.Text`
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: tomato;
`;

const History = () => {
    const db = firebase.firestore();
    const isDark = useColorScheme() === "dark";
    const [historyData, setHistoryData] = useState([]);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
            .get()
            .then((data) => {
                if (data._data === undefined) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                    const stringNums = data.data().PhoneNumHistory[0];
                    const arrayNums = stringNums.split(",");
                    setHistoryData(arrayNums.reverse());
                }
            });
    }, []);
    return (
        <Container isDark={isDark}>
            {empty ? (
                <EmptyView isDark={isDark}>
                    <EmptyText isDark={isDark}>최근 인증 이력이 없습니다.</EmptyText>
                </EmptyView>
            ) : (
                <>
                    <NoticeView isDark={isDark}>
                        <Notice>최근 인증 이력 10개가 보여집니다.</Notice>
                    </NoticeView>
                    <HistoryScroll>
                        <HistoryLine isDark={isDark}>
                            {historyData.map((data) => (
                                <HistoryView>
                                    <HistoryText isDark={isDark}>{data}</HistoryText>
                                    <AuthResult>
                                        <ResultText>인증 완료</ResultText>
                                    </AuthResult>
                                </HistoryView>
                            ))}
                        </HistoryLine>
                    </HistoryScroll>
                </>
            )}
        </Container>
    );
};

export default History;
