import React, { useState, useRef, useEffect } from "react";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CryptoJS from "react-native-crypto-js";
import auth from "@react-native-firebase/auth";
import MessageModal from "../MessageModal";
import BackgroundTimer from "react-native-background-timer";
import { firebase } from "@react-native-firebase/firestore";
import { BLACK_COLOR } from "../../color";
import { setMessageModal } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const PasswordLine = styled.View`
    width: 70%;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "grey")};
    background-color: white;
`;

const PasswordNum = styled.TextInput`
    letter-spacing: 20px;
    width: 100%;
    height: 40px;
    color: #596275;
    font-weight: 700;
    font-size: 23px;
    text-align: center;
`;

const PasswordText = styled.Text`
    font-size: 25px;
    color: grey;
`;

const CheckBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 70%;
`;

const CheckLine = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "tomato")};
    background-color: ${(props) => (props.isDark ? "white" : "tomato")};
`;

const CheckText = styled.Text`
    color: ${(props) => (props.isDark ? "#596275" : "white")};
    font-weight: 700;
    font-size: 18px;
`;

const EditBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 70%;
`;

const EditLine = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "tomato")};
    background-color: ${(props) => (props.isDark ? "white" : "tomato")};
`;

const EditText = styled.Text`
    color: ${(props) => (props.isDark ? "#596275" : "white")};
    font-weight: 700;
    font-size: 18px;
`;

const FindLine = styled.View`
    flex-direction: row;
`;

const FindBtn = styled.TouchableOpacity`
    margin-top: 15px;
`;

const Find = styled.View`
    margin: 15px 0px;
    padding: 0px 5px;
`;

const FindText = styled.Text`
    text-align: center;
    color: tomato;
    font-size: 13px;
`;

const GoToFind = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: tomato;
`;

const GoToFindText = styled.Text`
    text-align: center;
    color: tomato;
    font-size: 13px;
`;

const Password = () => {
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const { messageModal } = useSelector((state) => state.modalReducer);
    const inputRef = useRef(null);
    // const count = useRef(0);
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const passowrdAuth = () => {
        if (password === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (password?.length >= 1 && password?.length < 6) {
            return dispatch(setMessageModal(true, "간편 비밀번호는 6자리입니다."));
        }
        setLoading(true);
        try {
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                .get()
                .then((data) => {
                    if (data.data().SimplePW === undefined) {
                        dispatch(setMessageModal(true, "등록된 간편 비밀번호가 없습니다."));
                    }
                    const cryptoPW = CryptoJS.AES.decrypt(
                        data.data().SimplePW,
                        0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                    );
                    let originalPW = cryptoPW.toString(CryptoJS.enc.Utf8);
                    db.collection("Auth")
                        .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                        .update({ AuthState: false });
                    if (originalPW === password) {
                        dispatch(setMessageModal(true, "간편 인증을 완료했습니다."));
                        db.collection("Auth")
                            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                            .update({ AuthState: true });
                        // count.current = 0;
                        // const intervalId = BackgroundTimer.setInterval(() => {
                        //     console.log(count.current);
                        //     count.current += 1;
                        //     if (count.current >= 25) {
                        //         db.collection("Auth")
                        //             .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                        //             .update({ AuthState: false });
                        //         BackgroundTimer.clearInterval(intervalId);
                        //         count.current = 0;
                        //     }
                        // }, 1000);
                        navigation.navigate("Profile");
                    } else {
                        return dispatch(setMessageModal(true, "간편 비밀번호를 잘못 입력하였습니다."));
                    }
                });
        } catch (e) {
            dispatch(setMessageModal(true, "간편 비밀번호 인증 오류입니다."));
        }
    };
    const goToEditPW = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                if (data.data().SimplePWEditState === true) {
                    dispatch(setMessageModal(true, "이미 간편 비밀번호가 등록되어 있습니다."));
                } else {
                    navigation.navigate("Stack", {
                        screen: "Edit",
                    });
                }
            });
    };

    const goToFindPW = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                if (data.data().SimplePW === undefined) {
                    dispatch(setMessageModal(true, "등록된 간편 비밀번호가 없습니다."));
                } else {
                    navigation.navigate("Stack", {
                        screen: "FindPW",
                    });
                }
            });
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <Container isDark={isDark}>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            <PasswordText isDark={isDark}>간편 비밀번호 6자리 입력</PasswordText>
            <PasswordLine isDark={isDark}>
                <PasswordNum
                    ref={inputRef}
                    autoCorrect={false}
                    secureTextEntry
                    maxLength={6}
                    keyboardType="number-pad"
                    value={password}
                    onChangeText={(num) => setPassword(num)}
                    onSubmitEditing={passowrdAuth}
                />
            </PasswordLine>
            <CheckBtn onPress={passowrdAuth}>
                <CheckLine isDark={isDark}>
                    <CheckText isDark={isDark}>간편 비밀번호 인증</CheckText>
                </CheckLine>
            </CheckBtn>
            <EditBtn onPress={goToEditPW}>
                <EditLine isDark={isDark}>
                    <EditText isDark={isDark}>간편 비밀번호 등록하기</EditText>
                </EditLine>
            </EditBtn>
            <FindLine>
                <Find>
                    <FindText>간편 비밀번호를 잊으셨나요?</FindText>
                </Find>
                <FindBtn onPress={goToFindPW}>
                    <GoToFind>
                        <GoToFindText>터치하여 찾으러 가기</GoToFindText>
                    </GoToFind>
                </FindBtn>
            </FindLine>
        </Container>
    );
};

export default Password;
