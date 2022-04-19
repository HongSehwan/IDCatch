import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import RNRestart from "react-native-restart";

function CertificationResult({ route, navigation }) {
    const success = route.params?.success;
    console.log("성공=>" + success);
    const imp_uid = route.params?.imp_uid;
    console.log("IMPUID=>" + imp_uid);
    const merchant_uid = route.params?.merchant_uid;
    console.log("merUID=>" + merchant_uid);
    const error_msg = route.params?.error_msg;
    console.log("에러=>" + error_msg);

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
            <Text fontSize={25} fontWeight={"bold"} mb={20}>{`본인인증에 ${success ? "성공" : "실패"}하였습니다`}</Text>
            <View width={"90%"} mb={50} borderRadius={3}>
                <View>
                    <Text w={"40%"}>아임포트 번호</Text>
                    <Text w={"60%"}>{imp_uid}</Text>
                </View>
                {success ? (
                    <View>
                        <Text w={"40%"}>주문번호</Text>
                        <Text w={"60%"}>{merchant_uid}</Text>
                    </View>
                ) : (
                    <View>
                        <Text w={"40%"}>에러메시지</Text>
                        <Text w={"60%"}>{error_msg}</Text>
                    </View>
                )}
            </View>
            <Button onPress={RNRestart.Restart()}>
                <Icon name={"arrow-left"} size={20}>
                    <Text>돌아가기</Text>
                </Icon>
            </Button>
        </View>
    );
}

export default CertificationResult;
