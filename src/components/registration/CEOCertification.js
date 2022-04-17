import React, { useEffect, useState } from "react";
import styled from "styled-components";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import RNRestart from "react-native-restart";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View``;

const Notice = styled.Text``;

const CheckBtn = styled.TouchableOpacity``;

const Check = styled.View``;

const CheckText = styled.Text``;

const CEOCertification = ({ route }) => {
    const { message } = route.params;
    const db = firebase.firestore();
    const navigation = useNavigation();
    const [result, setResult] = useState(false);
    const Certification = () => {
        RNRestart.Restart();
    };
    const Failed = () => {
        navigation.navigate("CEOAuth");
    };

    useEffect(() => {
        console.log(message);
        if (message === "인증 성공") {
            setResult(true);
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                .update({ CEOAuth: true, Transform: true });
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "NUM")
                .set({ "000": "000" });
        } else {
            setResult(false);
        }
    }, []);
    return (
        <Container>
            {result ? (
                <>
                    <Notice>인증 성공</Notice>
                    <CheckBtn onPress={Certification}>
                        <Check>
                            <CheckText>완료하기</CheckText>
                        </Check>
                    </CheckBtn>
                </>
            ) : (
                <>
                    <Notice>인증 실패</Notice>
                    <CheckBtn onPress={Failed}>
                        <Check>
                            <CheckText>다시찍기</CheckText>
                        </Check>
                    </CheckBtn>
                </>
            )}
        </Container>
    );
};

export default CEOCertification;
