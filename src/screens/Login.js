import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";
import RNRestart from "react-native-restart";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/firestore";
import CryptoJS from "react-native-crypto-js";
import CheckBox from "@react-native-community/checkbox";
import MessageModal from "../components/MessageModal";
import { useSelector, useDispatch } from "react-redux";
import { setMessageModal } from "../redux/actions";

const Container = styled.View`
    flex: 1;
    background-color: white;
    /* justify-content: center; */
`;
const InputContainer = styled.View`
    color: white;
    padding: 60px 20px;
    background-color: white;
`;
const AfterInputContainer = styled.View`
    margin-top: 30px;
    color: white;
    padding: 60px 20px;
    background-color: white;
`;
const Title = styled.Text`
    font-size: 21px;
    font-weight: 700;
    color: tomato;
`;
const PhoneTextInput = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #2c3e50;
    border-width: 5px;
    border-color: white;
    border-bottom-color: tomato;
`;
const PasswordTextInput = styled.TextInput`
    width: 85%;
    padding: 10px 20px;
    font-size: 16px;
    color: #2c3e50;
`;
const InputLine = styled.View`
    /* align-items: center; */
`;
const PhoneCheckBtn = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 40px;
    border-width: 1px;
    border-radius: 20px;
    border-color: tomato;
    justify-content: center;
    align-items: center;
`;
const PasswordCheckBtn = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-width: 1px;
    border-radius: 20px;
    border-color: tomato;
    justify-content: center;
    align-items: center;
`;
const BtnText = styled.Text`
    color: tomato;
    font-size: 16px;
`;
const Footer = styled.View`
    align-items: center;
`;
const FooterInfo = styled.View`
    align-items: center;
    background-color: white;
`;

const FooterText = styled.Text`
    color: black;
    font-size: 10px;
    font-weight: 500;
`;

const Timer = styled.View`
    margin-top: 10px;
`;

const TimerText = styled.Text`
    font-size: 17px;
    color: black;
`;
const CheckLine = styled.View`
    flex-direction: row;
    margin-bottom: 10px;
    border-width: 5px;
    border-color: white;
    border-bottom-color: tomato;
`;

const ImgView = styled.View`
    align-items: center;
    margin-top: 40px;
    /* margin-top: -10px; -> 안드로이드 전용*/
    /* margin-top: 20px; -> 아이폰 전용*/
`;

const Img = styled.Image`
    width: 100%;
    height: 200px;
    /* height: 300px; -> 안드로이드 전용*/
    /* height: 300px; -> 아이폰 전용*/
`;

const Agreement = styled.View`
    flex-direction: row;
    align-items: center;
    /* margin-left: 5px; */
    margin-bottom: 10px;
`;

const AgreementText = styled.Text`
    margin-left: 8px;
    font-size: 15px;
    color: #34495e;
`;

const Disabled = styled.View`
    width: 100%;
    padding: 10px 20px;
    margin-bottom: 40px;
    border-width: 1px;
    border-radius: 20px;
    border-color: #95a5a6;
    justify-content: center;
    align-items: center;
`;

const DisabledText = styled.Text`
    color: #95a5a6;
    font-size: 16px;
`;

const DetailBtn = styled.TouchableOpacity`
    margin-left: 10px;
`;

const Detail = styled.View`
    background-color: #747d8c;
    border-radius: 20px;
    width: 50px;
    height: 20px;
    justify-content: center;
    align-items: center;
`;

const DetailText = styled.Text`
    color: white;
    font-weight: 600;
`;

const Login = () => {
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const navigation = useNavigation();
    const passwordInput = useRef();
    const time = useRef(180);
    const timerId = useRef(null);
    const [phoneNum, setPhoneNum] = useState("");
    const [phoneState, setPhoneState] = useState(false);
    const [password, setPassword] = useState("");
    const [sendLoading, setSendLoading] = useState(false);
    const [checkLoading, setCheckLoading] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [token, setToken] = useState("");
    const [min, setMin] = useState(3);
    const [sec, setSec] = useState(0);
    const { messageModal } = useSelector((state) => state.modalReducer);

    const startTimer = () => {
        clearInterval(timerId.current);
        time.current = 180;
        setMin(3);
        setSec(0);
        timerId.current = setInterval(() => {
            time.current -= 1;
            setSec(time.current % 60);
            setMin(parseInt(time.current / 60));
        }, 1000);
    };
    const stopTimer = () => {
        setMin(3);
        setSec(0);
        clearInterval(timerId.current);
    };
    useEffect(() => {
        if (time.current <= 0) {
            clearInterval(timerId.current);
            RNRestart.Restart();
            stopTimer();
        }
    }, [sec]);

    const onSubmitPhoneEditing = async () => {
        if (phoneNum === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (sendLoading) {
            return;
        }
        setSendLoading(true);
        try {
            await auth()
                .signInWithPhoneNumber("+82" + phoneNum, true)
                .then((user) => {
                    dispatch(setMessageModal(true, "인증번호가 전송되었습니다."));
                    startTimer();
                    setToken(user._verificationId);
                    setPhoneState(true);
                    passwordInput.current.focus();
                    setSendLoading(false);
                    db.collection("Auth")
                        .doc(phoneNum)
                        .get()
                        .then((data) => {
                            if (data._data === undefined) {
                                db.collection("Auth").doc(phoneNum).set({
                                    Existing: true,
                                    IDcardAuth: false,
                                    SelfAuth: false,
                                    CEOAuth: false,
                                    SimplePWEditState: false,
                                    Transform: false,
                                });
                            } else {
                                return;
                            }
                        });
                });
        } catch (e) {
            switch (e.code) {
                case "auth/invalid-phone-number": {
                    dispatch(setMessageModal(true, "유효한 전화번호가 아닙니다."));
                    setSendLoading(false);
                }
            }
            switch (e.code) {
                case "auth/too-many-requests": {
                    dispatch(setMessageModal(true, "잠시 후 다시 시도해 주세요."));
                    setSendLoading(false);
                }
            }
        }
    };

    const onSubmitCheckEditing = async () => {
        if (password === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (checkLoading) {
            return;
        }
        setCheckLoading(true);
        try {
            const credential = await auth.PhoneAuthProvider.credential(token, password);
            await auth()
                .signInWithCredential(credential)
                .then((user) => {
                    dispatch(setMessageModal(true, "로그인에 성공했습니다."));
                    setCheckLoading(false);
                    setPhoneState(false);
                    stopTimer();
                });
        } catch (e) {
            stopTimer();
            setCheckLoading(false);
            switch (e.code) {
                case "auth/invalid-verification-code": {
                    dispatch(setMessageModal(true, "인증번호가 유효하지 않습니다."));
                    setCheckLoading(false);
                    startTimer();
                }
            }
            switch (e.code) {
                case "auth/session-expired": {
                    dispatch(setMessageModal(true, "인증번호가 만료되었습니다."));
                    setCheckLoading(false);
                    setPhoneState(false);
                }
            }
            switch (e.code) {
                case "auth/too-many-requests": {
                    dispatch(setMessageModal(true, "잠시 후 다시 시도해 주세요."));
                    setCheckLoading(false);
                    setPhoneState(false);
                }
            }
            switch (e.code) {
                case "missing-verification-id": {
                    dispatch(setMessageModal(true, "인증 ID가 잘못되었습니다."));
                    setCheckLoading(false);
                }
            }
            switch (e.code) {
                case "auth/operation-not-allowed": {
                    dispatch(setMessageModal(true, "인증이 허용되지 않았습니다."));
                    setSendLoading(false);
                    setPhoneState(false);
                }
            }
        }
    };

    const goToAgreement = () => {
        navigation.navigate("AgreementPage");
    };
    return (
        <>
            <Container>
                <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
                {phoneState ? null : (
                    <ImgView>
                        <Img resizeMode="stretch" source={require("../assets/img/IDCatch_logo.png")} />
                    </ImgView>
                )}
                {phoneState ? (
                    <AfterInputContainer>
                        <Title>휴대폰 번호</Title>
                        <InputLine>
                            <PhoneTextInput
                                placeholder="- 없이 입력"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="grey"
                                keyboardType="number-pad"
                                returnKeyType="next"
                                value={phoneNum}
                                onChangeText={(num) => setPhoneNum(num)}
                                onSubmitEditing={onSubmitPhoneEditing}
                            />
                            <Agreement>
                                <CheckBox
                                    disabled={false}
                                    tintColor={"#b2bec3"}
                                    onTintColor={"white"}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                />
                                <AgreementText>개인정보 수집·이용 동의</AgreementText>
                                <DetailBtn onPress={goToAgreement}>
                                    <Detail>
                                        <DetailText>보기</DetailText>
                                    </Detail>
                                </DetailBtn>
                            </Agreement>
                            {toggleCheckBox ? (
                                <PhoneCheckBtn onPress={onSubmitPhoneEditing}>
                                    {sendLoading ? <ActivityIndicator color="tomato" /> : <BtnText>Send</BtnText>}
                                </PhoneCheckBtn>
                            ) : (
                                <Disabled>
                                    <DisabledText>Send</DisabledText>
                                </Disabled>
                            )}
                        </InputLine>
                        {phoneState ? (
                            <>
                                <Title>인증번호</Title>
                                <InputLine>
                                    <CheckLine>
                                        <PasswordTextInput
                                            ref={passwordInput}
                                            placeholder="인증번호 6자리"
                                            placeholderTextColor="grey"
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                            onSubmitEditing={onSubmitCheckEditing}
                                        />
                                        <Timer>
                                            <TimerText>
                                                {min}분 {sec}초
                                            </TimerText>
                                        </Timer>
                                    </CheckLine>
                                    <PasswordCheckBtn onPress={onSubmitCheckEditing}>
                                        {checkLoading ? <ActivityIndicator color="tomato" /> : <BtnText>Log In</BtnText>}
                                    </PasswordCheckBtn>
                                </InputLine>
                            </>
                        ) : null}
                    </AfterInputContainer>
                ) : (
                    <InputContainer>
                        <Title>휴대폰 번호</Title>
                        <InputLine>
                            <PhoneTextInput
                                placeholder="- 없이 입력"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor="grey"
                                keyboardType="number-pad"
                                returnKeyType="next"
                                value={phoneNum}
                                onChangeText={(num) => setPhoneNum(num)}
                                onSubmitEditing={onSubmitPhoneEditing}
                            />
                            <Agreement>
                                <CheckBox
                                    disabled={false}
                                    tintColor={"#b2bec3"}
                                    onTintColor={"white"}
                                    value={toggleCheckBox}
                                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                />
                                <AgreementText>개인정보 수집·이용 동의</AgreementText>
                                <DetailBtn onPress={goToAgreement}>
                                    <Detail>
                                        <DetailText>보기</DetailText>
                                    </Detail>
                                </DetailBtn>
                            </Agreement>
                            {toggleCheckBox ? (
                                <PhoneCheckBtn onPress={onSubmitPhoneEditing}>
                                    {sendLoading ? <ActivityIndicator color="tomato" /> : <BtnText>Send</BtnText>}
                                </PhoneCheckBtn>
                            ) : (
                                <Disabled>
                                    <DisabledText>Send</DisabledText>
                                </Disabled>
                            )}
                        </InputLine>
                        {phoneState ? (
                            <>
                                <Title>인증번호</Title>
                                <InputLine>
                                    <CheckLine>
                                        <PasswordTextInput
                                            ref={passwordInput}
                                            placeholder="인증번호 6자리"
                                            placeholderTextColor="grey"
                                            keyboardType="number-pad"
                                            returnKeyType="done"
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                            onSubmitEditing={onSubmitCheckEditing}
                                        />
                                        <Timer>
                                            <TimerText>
                                                {min}분 {sec}초
                                            </TimerText>
                                        </Timer>
                                    </CheckLine>
                                    <PasswordCheckBtn onPress={onSubmitCheckEditing}>
                                        {checkLoading ? <ActivityIndicator color="tomato" /> : <BtnText>Log In</BtnText>}
                                    </PasswordCheckBtn>
                                </InputLine>
                            </>
                        ) : null}
                    </InputContainer>
                )}
            </Container>
            <Footer>
                <FooterText>&copy; {new Date().getFullYear()} IDCatch. All rights reserved.</FooterText>
            </Footer>
        </>
    );
};

export default Login;
