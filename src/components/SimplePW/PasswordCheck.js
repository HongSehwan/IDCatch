import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { useColorScheme, Alert } from "react-native";
import { BLACK_COLOR } from "../../color";
import { useSelector } from "react-redux";
import CryptoJS from "react-native-crypto-js";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const PasswordCheckLine = styled.View`
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

const PasswordCehckNum = styled.TextInput`
    letter-spacing: 20px;
    width: 100%;
    height: 40px;
    color: #596275;
    font-weight: 700;
    font-size: 23px;
    text-align: center;
`;

const CheckText = styled.Text`
    font-size: 30px;
    color: grey;
`;

const EditCheckBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 70%;
`;

const EditCheckLine = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "tomato")};
    background-color: ${(props) => (props.isDark ? "white" : "tomato")};
`;

const EditCheckText = styled.Text`
    color: ${(props) => (props.isDark ? "#596275" : "white")};
    font-weight: 700;
    font-size: 18px;
`;

const PasswordCheck = () => {
    const db = firebase.firestore();
    const navigation = useNavigation();
    const inputRef = useRef(null);
    const { editpw } = useSelector((state) => state.authReducer);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const checkEditing = () => {
        if (password === "") {
            return Alert.alert("항목이 비어 있습니다.");
        }
        if (password.length >= 1 && password.length < 6) {
            return Alert.alert("간편 비밀번호는 6자리입니다.");
        }
        setLoading(true);
        try {
            if (editpw === password) {
                const cryptoPW = CryptoJS.AES.encrypt(
                    password,
                    0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                ).toString();
                db.collection("Auth")
                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                    .update({ SimplePWEditState: true, SimplePW: cryptoPW });
                navigation.navigate("Stack", {
                    screen: "Password",
                });
            } else {
                return Alert.alert("간편 비밀번호가 일치하지 않습니다.");
            }
        } catch (e) {
            Alert.alert("간편 비밀번호 등록 오류입니다.");
        }
    };
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const isDark = useColorScheme() === "dark";
    return (
        <Container isDark={isDark}>
            <CheckText isDark={isDark}>간편 비밀번호 확인</CheckText>
            <PasswordCheckLine isDark={isDark}>
                <PasswordCehckNum
                    ref={inputRef}
                    autoCorrect={false}
                    maxLength={6}
                    secureTextEntry
                    keyboardType="number-pad"
                    value={password}
                    onChangeText={(num) => setPassword(num)}
                    onSubmitEditing={checkEditing}
                />
            </PasswordCheckLine>
            <EditCheckBtn onPress={checkEditing}>
                <EditCheckLine isDark={isDark}>
                    <EditCheckText isDark={isDark}>간편 비밀번호 등록</EditCheckText>
                </EditCheckLine>
            </EditCheckBtn>
        </Container>
    );
};

export default PasswordCheck;
