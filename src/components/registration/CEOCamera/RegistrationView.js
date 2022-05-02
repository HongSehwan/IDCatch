import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import { callGoogleVIsionApi } from "../../Idcard/Camera/TextDetection";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BLACK_COLOR } from "../../../color";
import { useNavigation } from "@react-navigation/native";
import MessageModal from "../../MessageModal";
import { setMessageModal } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const RegistrationView = ({ route }) => {
    const navigation = useNavigation();
    const [loadingExtract, setLoadingExtract] = useState(true);
    const [extractData, setExtractData] = useState("");
    const [b_Result, setB_Result] = useState(false);
    const { messageModal } = useSelector((state) => state.modalReducer);
    const { uri } = route.params;
    useEffect(async () => {
        if (uri) {
            const result = await FileSystem.readAsStringAsync(uri, {
                encoding: "base64",
            });
            const extract = await callGoogleVIsionApi(result);
            setExtractData(extract.split("-")[0] + extract.split("-")[1] + extract.split("-")[2]);
            if (extract.includes("사업자등록증")) {
                const data = {
                    b_no: [extract.split("-")[0] + extract.split("-")[1] + extract.split("-")[2]], // 사업자번호 "xxxxxxx" 로 조회 시,
                };

                $.ajax({
                    url: "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=xxxxxx", // serviceKey 값을 xxxxxx에 입력
                    type: "POST",
                    data: JSON.stringify(data), // json 을 string으로 변환하여 전송
                    dataType: "JSON",
                    contentType: "application/json",
                    accept: "application/json",
                    success: function (result) {
                        setB_Result(true);
                    },
                    error: function (result) {
                        setB_Result(false);
                    },
                });
                setLoadingExtract(false);
            } else {
                dispatch(setMessageModal(true, "유효한 사업자등록증이 아닙니다."));
            }
        }
    }, []);

    const TryAgain = () => {
        navigation.navigate("CEOAuth");
    };

    const CertificationCheck = () => {
        navigation.navigate("CEOCertification", { b_Result: b_Result });
    };

    return (
        <SafeAreaView style={styles.container}>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            <Image style={styles.image} source={{ uri: uri }} />
            <Text style={styles.heading}>사업자등록증 촬영 결과</Text>
            <Text style={styles.extracted}>{loadingExtract ? "Loading..." : extractData ? extractData : null}</Text>
            <View style={styles.Btn}>
                <View style={styles.Again}>
                    <TouchableOpacity onPress={TryAgain}>
                        <Text style={styles.AgainText}>다시찍기</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Complete}>
                    <TouchableOpacity onPress={CertificationCheck}>
                        <Text style={styles.CompleteText}>인증하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 50,
        marginBottom: 30,
        borderRadius: 10,
    },
    heading: {
        fontSize: 25,
        color: BLACK_COLOR,
        marginBottom: 20,
    },
    extracted: {
        color: BLACK_COLOR,
    },
    Btn: {
        flexDirection: "row",
    },
    Again: {
        height: 50,
        width: 90,
        marginTop: 80,
        marginRight: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        borderRadius: 5,
    },
    AgainText: {
        color: "white",
        fontSize: 20,
    },
    Complete: {
        height: 50,
        width: 90,
        marginTop: 80,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato",
        borderRadius: 5,
    },
    CompleteText: {
        color: "white",
        fontSize: 20,
    },
});

export default RegistrationView;
