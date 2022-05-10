import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import RNRestart from "react-native-restart";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import CryptoJS from "react-native-crypto-js";
import axios from "axios";
import Config from "react-native-config";

function CertificationResult({ route }) {
    const navigation = useNavigation();
    const db = firebase.firestore();
    const success = route.params?.success;
    const imp_uid = route.params?.imp_uid;
    const merchant_uid = route.params?.merchant_uid;
    const error_msg = route.params?.error_msg;

    useEffect(() => {
        if (success) {
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                .update({ SelfAuth: true });
            const data = {
                imp_key: Config.IMP_KEY,
                imp_secret: Config.IMP_SECRET,
            };
            axios
                .post("https://api.iamport.kr/users/getToken", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    if (res) {
                        axios
                            .get(`https://api.iamport.kr/certifications/${imp_uid}?_token=${res.data.response.access_token}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })
                            .then((res) => {
                                const nameData = res.data.response.name;
                                const cryptoName = CryptoJS.AES.encrypt(
                                    nameData,
                                    0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                                ).toString();
                                const birth =
                                    res.data.response.birthday.split("-")[0].slice(2) +
                                    res.data.response.birthday.split("-")[1] +
                                    res.data.response.birthday.split("-")[2];
                                const cryptoBirth = CryptoJS.AES.encrypt(
                                    birth,
                                    0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1]
                                ).toString();
                                db.collection("Auth")
                                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "User")
                                    .set({ name: cryptoName, birth_D: cryptoBirth });
                            });
                    }
                });
        } else {
            return;
        }
    }, []);

    const goToBack = () => {
        navigation.navigate("Profile");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                margin: 10,
                backgroundColor: "#fff",
                alignItems: "center",
            }}
        >
            {success ? <Icon name={"check-circle"} size={20} color={"#52c41a"} /> : <Icon name={"warning"} size={20} color={"#f5222d"} />}
            <Text style={{ marginBottom: 20 }} fontSize={25} fontWeight={"bold"} mb={20}>{`본인인증에 ${
                success ? "성공" : "실패"
            }하였습니다`}</Text>
            <View width={"90%"} mb={50} borderRadius={3}>
                {success ? null : (
                    <View style={{ alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ color: "tomato" }} w={"40%"}>
                            에러메시지
                        </Text>
                        <Text w={"60%"}>{error_msg}</Text>
                    </View>
                )}
            </View>
            {success ? (
                <Button title="인증 완료" onPress={goToBack}>
                    <Icon name={"arrow-left"} size={20}>
                        <Text>인증 완료</Text>
                    </Icon>
                </Button>
            ) : (
                <Button title="인증 실패" onPress={goToBack}>
                    <Icon name={"arrow-left"} size={20}>
                        <Text>인증 실패</Text>
                    </Icon>
                </Button>
            )}
        </View>
    );
}

export default CertificationResult;
