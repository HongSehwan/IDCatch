import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { useColorScheme } from "react-native";
import CryptoJS from "react-native-crypto-js";
import auth from "@react-native-firebase/auth";
import MessageModal from "../MessageModal";
import { firebase } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { BLACK_COLOR } from "../../color";
import { setMessageModal } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const HintText = styled.Text`
    font-size: 30px;
    color: grey;
`;

const ModifyBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 70%;
`;

const ModifyLine = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? "white" : "tomato")};
    background-color: ${(props) => (props.isDark ? "white" : "tomato")};
`;

const ModifyText = styled.Text`
    color: ${(props) => (props.isDark ? "#596275" : "white")};
    font-weight: 700;
    font-size: 18px;
`;

const HintLine = styled.View`
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

const HintTextInput = styled.TextInput`
    width: 100%;
    height: 40px;
    color: #596275;
    font-weight: 700;
    font-size: 16px;
    text-align: center;
`;

const FindPW = () => {
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const navigation = useNavigation();
    const hintRef = useRef(null);
    const [hint, setHint] = useState("");
    const [loading, setLoading] = useState(false);
    const { messageModal } = useSelector((state) => state.modalReducer);
    const isDark = useColorScheme() === "dark";

    const hintCheckEditing = () => {
        if (hint === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        setLoading(true);
        try {
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                .get()
                .then((data) => {
                    const cryptoHint = CryptoJS.AES.decrypt(
                        data.data().Hint,
                        0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                    );
                    let originalHint = cryptoHint.toString(CryptoJS.enc.Utf8);
                    if (originalHint === hint) {
                        navigation.navigate("Stack", {
                            screen: "Edit",
                        });
                    } else {
                        return dispatch(setMessageModal(true, "힌트를 잘못 입력하였습니다."));
                    }
                });
        } catch (e) {
            dispatch(setMessageModal(true, "간편 비밀번호 변경 오류입니다."));
        }
    };
    useEffect(() => {
        hintRef.current.focus();
    }, []);

    return (
        <Container isDark={isDark}>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            <HintText isDark={isDark}>간편 비밀번호 힌트 확인</HintText>
            <HintLine>
                <HintTextInput
                    ref={hintRef}
                    placeholder="힌트 입력"
                    placeholderTextColor="#bdc3c7"
                    autoCorrect={false}
                    maxLength={10}
                    value={hint}
                    onChangeText={(text) => setHint(text)}
                    onSubmitEditing={hintCheckEditing}
                />
            </HintLine>
            <ModifyBtn onPress={hintCheckEditing}>
                <ModifyLine isDark={isDark}>
                    <ModifyText isDark={isDark}>간편 비밀번호 변경하기</ModifyText>
                </ModifyLine>
            </ModifyBtn>
        </Container>
    );
};

export default FindPW;
