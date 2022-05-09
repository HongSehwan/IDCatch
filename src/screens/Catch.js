import React, { useEffect, useRef, useState } from "react";
import { AppState, useColorScheme, ActivityIndicator, Linking, Platform } from "react-native";
import styled from "styled-components/native";
import TouchID from "react-native-touch-id";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import BackgroundTimer from "react-native-background-timer";
import MessageModal from "../components/MessageModal";
import { BLACK_COLOR, GREEN_COLOR } from "../color";
import { setMessageModal } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { AdMobBanner } from "expo-ads-admob";
import LocalNotification from "../components/notification/Notification";
import SplashScreen from "react-native-splash-screen";

const CheckContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    margin-top: 70px;
`;

const IdCheckBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const UserIdCheck = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? GREEN_COLOR : "grey")};
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const IdCheckText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-weight: 700;
    font-size: 18px;
`;

const PasswordBtn = styled.TouchableOpacity`
    margin: 0px 100px;
    width: 285px;
`;

const Password = styled.View`
    height: 40px;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${(props) => (props.isDark ? GREEN_COLOR : "grey")};
    background-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
`;

const PasswordText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "#596275")};
    font-weight: 700;
    font-size: 18px;
`;

const FNoticeView = styled.View`
    margin: 0px 20px;
    padding: 10px 10px;
    padding-bottom: 5px;
`;

const FNotice = styled.Text`
    text-align: center;
    color: tomato;
    font-size: 13px;
`;

const SNoticeView = styled.View`
    margin: 0px 20px;
    padding: 0px 10px;
`;

const SNotice = styled.Text`
    text-align: center;
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

const NoticeView = styled.View`
    margin: 0px 20px;
    margin-bottom: 20px;
    padding: 15px 10px;
    border-width: 1px;
    border-radius: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "grey")};
    background-color: ${(props) => (props.isDark ? "#2f3542" : " #f1f2f6")};
`;

const Notice = styled.Text`
    color: tomato;
    font-size: 13.9px;
`;

const SMSNotice = styled.Text`
    color: tomato;
    font-size: 15px;
    margin-top: 13px;
`;

const Caution = styled.Text`
    text-align: center;
    margin-bottom: 5px;
    color: tomato;
    font-size: 18.5px;
    font-weight: 700;
`;

const ClientPhoneNum = styled.View`
    margin-top: 30px;
    margin-bottom: 10px;
    padding-left: 55px;
`;

const ClientPhoneText = styled.Text`
    font-size: 25px;
    font-weight: 700;
    color: ${(props) => (props.isDark ? "white" : " #57606f")};
`;

const InputContainer = styled.View`
    color: white;
    /* margin-top: 10px; */
    padding: 5px 20px;
    /* background-color: white; */
`;

const InputLine = styled.View`
    /* align-items: center; */
`;
const FirstPhoneNumTextInput = styled.TextInput`
    width: 70%;
    padding: 10px 20px;
    margin-left: 15px;
    margin-bottom: 60px;
    font-size: 20px;
    color: #2c3e50;
    border-width: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: tomato;
`;

const SecondPhoneNumTextInput = styled.TextInput`
    width: 70%;
    padding: 10px 20px;
    margin-bottom: 60px;
    margin-left: 15px;
    font-size: 20px;
    color: #2c3e50;
    border-width: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: tomato;
`;

const ThirdPhoneNumTextInput = styled.TextInput`
    width: 70%;
    padding: 10px 20px;
    margin-left: 15px;
    margin-bottom: 10px;
    font-size: 20px;
    color: #2c3e50;
    border-width: 5px;
    border-color: ${(props) => (props.isDark ? BLACK_COLOR : "white")};
    border-bottom-color: tomato;
`;

const FirstView = styled.View`
    flex-direction: row;
`;

const SecondView = styled.View`
    flex-direction: row;
`;

const ThirdView = styled.View`
    flex-direction: row;
`;

const SendBtn = styled.TouchableOpacity``;

const SendView = styled.View`
    width: 80px;
    height: 38px;
    margin-top: 20px;
    margin-left: 20px;
    background-color: tomato;
    border-color: tomato;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`;

const SendText = styled.Text`
    color: white;
`;

const AdMobContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

const HistoryBtn = styled.TouchableOpacity`
    width: 205px;
`;

const HistoryView = styled.View`
    border-width: 1px;
    border-color: grey;
    align-items: center;
    margin-top: 5px;
`;

const HistoryText = styled.Text`
    font-size: 15px;
    color: grey;
`;

const Check = () => {
    const dispatch = useDispatch();
    const db = firebase.firestore();
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const SMSDivider = Platform.OS === "android" ? "?" : "&";
    // const count = useRef(0);
    const firstCount = useRef(0);
    const secondCount = useRef(0);
    const thirdCount = useRef(0);
    const fCount = useRef(0);
    const sCount = useRef(0);
    const tCount = useRef(0);
    const [transformState, setTransformState] = useState(false);
    const [firstPhoneNum, setFirstPhoneNum] = useState("");
    const [secondPhoneNum, setSecondPhoneNum] = useState("");
    const [thirdPhoneNum, setThirdPhoneNum] = useState("");
    const [firstsendLoading, setFirstSendLoading] = useState(false);
    const [secondsendLoading, setSecondSendLoading] = useState(false);
    const [thirdsendLoading, setThirdSendLoading] = useState(false);
    const { messageModal } = useSelector((state) => state.modalReducer);

    const optionalConfigObject = {
        title: "Authentication Required", // 타이틀
        imageColor: "#e00606", // 지문인식 기본 컬러
        imageErrorColor: "#ff0000", // 지문인식 실패 컬러
        sensorDescription: "Touch sensor", // 터치센서
        sensorErrorDescription: "Failed", // 터치센서 Fail Text 변경
        cancelText: "Cancel", // Android // 취소버튼 Text 변경
        fallbackLabel: "", // ios ( 비어있으면 레이블이 숨겨짐 )
        unifiedErrors: false, // 통합 오류 메시지 사용 ( 기본값 false)
        passcodeFallback: false, // ios-faceId / touch 사용할 수 없는 경우 기기비밀번호 사용여부
    };

    const TouchId = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                if (!data.data().SelfAuth || !data.data().IDcardAuth) {
                    return dispatch(setMessageModal(true, "성인 인증(본인 인증 / 신분증 인증)이 필요합니다."));
                } else {
                    db.collection("Auth")
                        .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                        .update({ AuthState: false });
                    TouchID.authenticate("description", optionalConfigObject)
                        .then((success) => {
                            dispatch(setMessageModal(true, "간편 인증을 완료했습니다."));
                            db.collection("Auth")
                                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                                .update({ AuthState: true });
                            // count.current = 0;
                            // const intervalId = BackgroundTimer.setInterval(() => {
                            //     count.current += 1;
                            //     console.log(count.current);
                            //     if (count.current >= 25) {
                            //         db.collection("Auth")
                            //             .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "A")
                            //             .update({ AuthState: false });
                            //         BackgroundTimer.clearInterval(intervalId);
                            //         count.current = 0;
                            //     }
                            // }, 1000);
                        })
                        .catch((error) => {
                            switch (error.name) {
                                case "LAErrorTouchIDNotEnrolled": {
                                    dispatch(setMessageModal(true, "등록된 지문이 없습니다. 휴대폰 지문 등록 바랍니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorUserCancel": {
                                    dispatch(setMessageModal(true, "지문 인증을 취소했습니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorSystemCancel": {
                                    dispatch(setMessageModal(true, "시스템에서 인증을 취소했습니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorTouchIDNotAvailable": {
                                    dispatch(setMessageModal(true, "지문 인식 실행 오류입니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorAuthenticationFailed": {
                                    dispatch(setMessageModal(true, "유효한 자격 증명을 제공하지 못했습니다. 잠시후 다시 시도해주세요."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorPasscodeNotSet": {
                                    dispatch(setMessageModal(true, "암호가 설정되어 있지 않아 인증을 시작할 수 없습니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorTouchIDLockout": {
                                    dispatch(setMessageModal(true, "실패 횟수가 초과되었습니다. 잠시후 다시 시도해주세요."));
                                }
                            }
                            switch (error.name) {
                                case "RCTTouchIDNotSupported": {
                                    dispatch(setMessageModal(true, "지문 인식을 사용할 수 없는 기기입니다."));
                                }
                            }
                            switch (error.name) {
                                case "LAErrorUserFallback": {
                                    dispatch(setMessageModal(true, "대체 비밀번호 입력을 선택하였습니다."));
                                }
                            }
                            switch (error.details) {
                                case "cancelled": {
                                    dispatch(setMessageModal(true, "지문 인증을 취소했습니다."));
                                }
                            }
                            switch (error.details) {
                                case "failed": {
                                    dispatch(setMessageModal(true, "지문 인증에 실패했습니다."));
                                }
                            }
                            switch (error.details) {
                                case "Too many attempts. Try again Later.": {
                                    dispatch(setMessageModal(true, "실패 횟수가 초과되었습니다. 잠시후 다시 시도해주세요."));
                                }
                            }
                            switch (error.details) {
                                case "Too many attempts. Fingerprint sensor disabled.": {
                                    dispatch(setMessageModal(true, "시도 횟수가 너무 많아 지문 센서가 비활성화 되었습니다."));
                                }
                            }
                        });
                }
            });
    };
    const goToSimplePW = () => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                if (!data.data().SelfAuth || !data.data().IDcardAuth) {
                    return dispatch(setMessageModal(true, "성인 인증(본인 인증 / 신분증 인증)이 필요합니다."));
                } else {
                    navigation.navigate("Stack", {
                        screen: "Password",
                    });
                }
            });
    };

    useEffect(() => {
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .get()
            .then((data) => {
                setTransformState(data.data().Transform);
            });
    }, []);

    const firstCheck = async () => {
        if (firstPhoneNum === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (firstPhoneNum.length !== 11) {
            return dispatch(setMessageModal(true, "휴대폰 번호 형식이 아닙니다."));
        }
        if (firstsendLoading) {
            return;
        }
        setFirstSendLoading(true);
        try {
            // Alert.alert("SMS (APP 링크)의 본문 내용을 수정하지 마십시오.");
            db.collection("Auth")
                .doc(firstPhoneNum + "A")
                .set({ AuthState: false });
            Linking.openURL(
                `sms:${firstPhoneNum}${SMSDivider}body=https://idcatch.page.link/IDCatch 해당 링크를 이용해 IDCatch 앱을 실행 후 인증 바랍니다.`
            );
            const firstInterval = BackgroundTimer.setInterval(() => {
                firstCount.current += 1;
                db.collection("Auth")
                    .doc(firstPhoneNum + "A")
                    .get()
                    .then((data) => {
                        try {
                            console.log(firstCount.current);
                            if (data.data().AuthState) {
                                db.collection("Auth")
                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                    .get()
                                    .then((data) => {
                                        if (data._data === undefined) {
                                            db.collection("Auth")
                                                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                .set({
                                                    PhoneNumHistory: ["" + firstPhoneNum],
                                                })
                                                .then((res) => {
                                                    LocalNotification.register();
                                                    if (AppState.currentState === "active") {
                                                        dispatch(setMessageModal(true, `${firstPhoneNum}님이 인증에 성공하였습니다.`));
                                                    }
                                                });
                                        } else {
                                            const firstNums = data.data().PhoneNumHistory[0];
                                            const firstArr = firstNums.split(",");
                                            if (firstArr.length >= 10) {
                                                const firstList = firstArr.slice(1);
                                                const firstText = firstList.join(",");
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [firstText + "," + firstPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${firstPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            } else {
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [data.data().PhoneNumHistory + "," + firstPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${firstPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                const fInterval = BackgroundTimer.setInterval(() => {
                                    fCount.current += 1;
                                    if (fCount.current >= 1) {
                                        db.collection("Auth")
                                            .doc(firstPhoneNum + "A")
                                            .update({ AuthState: false });
                                        BackgroundTimer.clearInterval(fInterval);
                                        fCount.current = 0;
                                    }
                                }, 1000);
                                BackgroundTimer.clearInterval(firstInterval);
                                firstCount.current = 0;
                            }
                            if (firstCount.current >= 600) {
                                db.collection("Auth")
                                    .doc(firstPhoneNum + "A")
                                    .update({ AuthState: false });
                                BackgroundTimer.clearInterval(firstInterval);
                                firstCount.current = 0;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
            }, 1000);
            setFirstSendLoading(false);
        } catch (error) {
            SplashScreen.hide();
            setFirstSendLoading(false);
        }
    };

    const secondCheck = async () => {
        if (secondPhoneNum === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (secondPhoneNum.length !== 11) {
            return dispatch(setMessageModal(true, "휴대폰 번호 형식이 아닙니다."));
        }
        if (secondsendLoading) {
            return;
        }
        setSecondSendLoading(true);
        try {
            // Alert.alert("SMS (APP 링크)의 본문 내용을 수정하지 마십시오.");
            db.collection("Auth")
                .doc(secondPhoneNum + "A")
                .set({ AuthState: false });
            Linking.openURL(
                `sms:${secondPhoneNum}${SMSDivider}body=https://idcatch.page.link/IDCatch 해당 링크를 이용해 IDCatch 앱을 실행 후 인증 바랍니다.`
            );
            const secondInterval = BackgroundTimer.setInterval(() => {
                secondCount.current += 1;
                db.collection("Auth")
                    .doc(secondPhoneNum + "A")
                    .get()
                    .then((data) => {
                        try {
                            console.log(secondCount.current);
                            if (data.data().AuthState) {
                                db.collection("Auth")
                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                    .get()
                                    .then((data) => {
                                        if (data._data === undefined) {
                                            db.collection("Auth")
                                                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                .set({
                                                    PhoneNumHistory: ["" + secondPhoneNum],
                                                })
                                                .then((res) => {
                                                    LocalNotification.register();
                                                    if (AppState.currentState === "active") {
                                                        dispatch(setMessageModal(true, `${secondPhoneNum}님이 인증에 성공하였습니다.`));
                                                    }
                                                });
                                        } else {
                                            const secondNums = data.data().PhoneNumHistory[0];
                                            const secondArr = secondNums.split(",");
                                            if (secondArr.length >= 10) {
                                                const secondList = secondArr.slice(1);
                                                const secondText = secondList.join(",");
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [secondText + "," + secondPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${secondPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            } else {
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [data.data().PhoneNumHistory + "," + secondPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${secondPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                const sInterval = BackgroundTimer.setInterval(() => {
                                    sCount.current += 1;
                                    if (sCount.current >= 1) {
                                        db.collection("Auth")
                                            .doc(secondPhoneNum + "A")
                                            .update({ AuthState: false });
                                        BackgroundTimer.clearInterval(sInterval);
                                        sCount.current = 0;
                                    }
                                }, 1000);
                                BackgroundTimer.clearInterval(secondInterval);
                                secondCount.current = 0;
                            }
                            if (secondCount.current >= 600) {
                                db.collection("Auth")
                                    .doc(secondPhoneNum + "A")
                                    .update({ AuthState: false });
                                BackgroundTimer.clearInterval(secondInterval);
                                secondCount.current = 0;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
            }, 1000);
            setSecondSendLoading(false);
        } catch (error) {
            SplashScreen.hide();
            setSecondSendLoading(false);
        }
    };

    const thirdCheck = async () => {
        if (thirdPhoneNum === "") {
            return dispatch(setMessageModal(true, "항목이 비어 있습니다."));
        }
        if (thirdPhoneNum.length !== 11) {
            return dispatch(setMessageModal(true, "휴대폰 번호 형식이 아닙니다."));
        }
        if (thirdsendLoading) {
            return;
        }
        setThirdSendLoading(true);
        try {
            // Alert.alert("SMS (APP 링크)의 본문 내용을 수정하지 마십시오.");
            db.collection("Auth")
                .doc(thirdPhoneNum + "A")
                .set({ AuthState: false });
            Linking.openURL(
                `sms:${thirdPhoneNum}${SMSDivider}body=https://idcatch.page.link/IDCatch 해당 링크를 이용해 IDCatch 앱을 실행 후 인증 바랍니다.`
            );
            const thirdInterval = BackgroundTimer.setInterval(() => {
                thirdCount.current += 1;
                db.collection("Auth")
                    .doc(thirdPhoneNum + "A")
                    .get()
                    .then((data) => {
                        try {
                            console.log(thirdCount.current);
                            if (data.data().AuthState) {
                                db.collection("Auth")
                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                    .get()
                                    .then((data) => {
                                        if (data._data === undefined) {
                                            db.collection("Auth")
                                                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                .set({
                                                    PhoneNumHistory: ["" + thirdPhoneNum],
                                                })
                                                .then((res) => {
                                                    LocalNotification.register();
                                                    if (AppState.currentState === "active") {
                                                        dispatch(setMessageModal(true, `${thirdPhoneNum}님이 인증에 성공하였습니다.`));
                                                    }
                                                });
                                        } else {
                                            const thirdNums = data.data().PhoneNumHistory[0];
                                            const thirdArr = thirdNums.split(",");
                                            if (thirdArr.length >= 10) {
                                                const thirdList = thirdArr.slice(1);
                                                const thirdText = thirdList.join(",");
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [thirdText + "," + thirdPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${thirdPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            } else {
                                                db.collection("Auth")
                                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                                                    .update({
                                                        PhoneNumHistory: [data.data().PhoneNumHistory + "," + thirdPhoneNum],
                                                    })
                                                    .then((res) => {
                                                        LocalNotification.register();
                                                        if (AppState.currentState === "active") {
                                                            dispatch(setMessageModal(true, `${thirdPhoneNum}님이 인증에 성공하였습니다.`));
                                                        }
                                                    });
                                            }
                                        }
                                    });
                                const tInterval = BackgroundTimer.setInterval(() => {
                                    tCount.current += 1;
                                    if (tCount.current >= 1) {
                                        db.collection("Auth")
                                            .doc(thirdPhoneNum + "A")
                                            .update({ AuthState: false });
                                        BackgroundTimer.clearInterval(tInterval);
                                        tCount.current = 0;
                                    }
                                }, 1000);
                                BackgroundTimer.clearInterval(thirdInterval);
                                thirdCount.current = 0;
                            }
                            if (thirdCount.current >= 600) {
                                db.collection("Auth")
                                    .doc(thirdPhoneNum + "A")
                                    .update({ AuthState: false });
                                BackgroundTimer.clearInterval(thirdInterval);
                                thirdCount.current = 0;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    });
            }, 1000);
            setThirdSendLoading(false);
        } catch (error) {
            SplashScreen.hide();
            setThirdSendLoading(false);
        }
    };

    const goToHistory = () => {
        navigation.navigate("Stack", {
            screen: "History",
        });
    };

    return (
        <>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            {!transformState ? (
                <>
                    <CheckContainer>
                        {/* <NoticeView isDark={isDark}>
                            <Caution>주 의</Caution>
                            <Notice>
                                간편 인증 오류 최소화를 위해 인증 후 30초 동안 스마트폰 화면 하단에 내비게이션 버튼 클릭 후 모두 닫기 또는
                                로그아웃 버튼을 누르지 마십시오. 백그라운드 실행이 종료될 경우 다시 인증을 해주셔야 합니다.
                            </Notice>
                        </NoticeView> */}
                        <TitleView isDark={isDark}>
                            <Title isDark={isDark}>간편 인증</Title>
                        </TitleView>
                        <IdCheckBtn onPress={TouchId}>
                            <UserIdCheck>
                                <IdCheckText>지문인식</IdCheckText>
                            </UserIdCheck>
                        </IdCheckBtn>
                        <PasswordBtn onPress={goToSimplePW}>
                            <Password>
                                <PasswordText>간편 비밀번호</PasswordText>
                            </Password>
                        </PasswordBtn>
                        <FNoticeView isDark={isDark}>
                            <FNotice>지문인식 / 간편 비밀번호 중 하나의 인증만 필요하며</FNotice>
                        </FNoticeView>
                        <SNoticeView isDark={isDark}>
                            <SNotice>이용시마다 간편 인증이 필요합니다. (제한시간: 10분)</SNotice>
                        </SNoticeView>
                    </CheckContainer>
                </>
            ) : (
                <>
                    <Container>
                        <NoticeView isDark={isDark}>
                            <Caution>주 의</Caution>
                            <Notice>
                                고객의 간편 인증 결과를 실시간 알림으로 받기 위해 SMS (IDCatch 링크) 발송 후 10분 동안 스마트폰 화면 하단에
                                내비게이션 바 터치 후 모두 닫기 또는 로그아웃 버튼을 누르지 마십시오. 백그라운드 실행이 종료될 경우 인증
                                결과 PUSH 알림이 수신 않을 수도 있습니다.
                            </Notice>
                            <SMSNotice>※ SMS (APP 링크)의 본문 내용을 수정하지 마십시오.</SMSNotice>
                        </NoticeView>
                        <ClientPhoneNum>
                            <ClientPhoneText isDark={isDark}>고객 휴대폰 번호</ClientPhoneText>
                            <HistoryBtn onPress={goToHistory}>
                                <HistoryView>
                                    <HistoryText>지나간 인증 성공 내역 확인하기</HistoryText>
                                </HistoryView>
                            </HistoryBtn>
                        </ClientPhoneNum>
                        <InputContainer>
                            <InputLine>
                                <FirstView>
                                    <FirstPhoneNumTextInput
                                        isDark={isDark}
                                        placeholder="- 없이 입력"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor="grey"
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                        value={firstPhoneNum}
                                        onChangeText={(num) => setFirstPhoneNum(num)}
                                        onSubmitEditing={firstCheck}
                                    />
                                    <SendBtn onPress={firstCheck}>
                                        <SendView>
                                            {firstsendLoading ? <ActivityIndicator color="white" /> : <SendText>SMS 전송</SendText>}
                                        </SendView>
                                    </SendBtn>
                                </FirstView>
                                <SecondView>
                                    <SecondPhoneNumTextInput
                                        isDark={isDark}
                                        placeholder="- 없이 입력"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor="grey"
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                        value={secondPhoneNum}
                                        onChangeText={(num) => setSecondPhoneNum(num)}
                                        onSubmitEditing={secondCheck}
                                    />
                                    <SendBtn onPress={secondCheck}>
                                        <SendView>
                                            {secondsendLoading ? <ActivityIndicator color="white" /> : <SendText>SMS 전송</SendText>}
                                        </SendView>
                                    </SendBtn>
                                </SecondView>
                                <ThirdView>
                                    <ThirdPhoneNumTextInput
                                        isDark={isDark}
                                        placeholder="- 없이 입력"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholderTextColor="grey"
                                        keyboardType="number-pad"
                                        returnKeyType="done"
                                        value={thirdPhoneNum}
                                        onChangeText={(num) => setThirdPhoneNum(num)}
                                        onSubmitEditing={thirdCheck}
                                    />
                                    <SendBtn onPress={thirdCheck}>
                                        <SendView>
                                            {thirdsendLoading ? <ActivityIndicator color="white" /> : <SendText>SMS 전송</SendText>}
                                        </SendView>
                                    </SendBtn>
                                </ThirdView>
                            </InputLine>
                        </InputContainer>
                    </Container>
                </>
            )}
            <AdMobContainer>
                <AdMobBanner bannerSize="smartBannerPortrait" adUnitID="ca-app-pub-7375395662986319/4570214489" />
            </AdMobContainer>
        </>
    );
};

export default Check;
