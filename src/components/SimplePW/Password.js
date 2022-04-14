import React, { useState, useRef, useEffect } from "react";
import { Alert, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import CryptoJS from "react-native-crypto-js";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import { BLACK_COLOR } from "../../color";

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

const Password = () => {
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const db = firebase.firestore();
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const passowrdAuth = () => {
        if (password === "") {
            return Alert.alert("항목이 비어 있습니다.");
        }
        if (password.length >= 1 && password.length < 6) {
            return Alert.alert("간편 비밀번호는 6자리입니다.");
        }
        setLoading(true);
        try {
            db.collection("Auth")
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        const cryptoPW = CryptoJS.AES.encrypt(
                            password,
                            0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                        ).toString();
                        if (doc.data().SimplePW === cryptoPW) {
                            Alert.alert("간편 인증을 완료했습니다. 간편 인증은 인증 후 10분 동안 유효합니다.");
                            db.collection("Auth")
                                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                                .update({ SimplePWState: true });
                            navigation.navigate("Profile");
                        }
                        console.log(doc.data().SimplePW);
                    });
                });
        } catch (e) {
            Alert.alert("간편 비밀번호 인증 오류입니다.");
        }
    };
    const goToEditPW = () => {
        navigation.navigate("Stack", {
            screen: "Edit",
        });
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);
    return (
        <Container isDark={isDark}>
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
        </Container>
    );
};

export default Password;
