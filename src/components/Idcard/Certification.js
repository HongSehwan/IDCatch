import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.View``;

const Notice = styled.Text``;

const CheckBtn = styled.TouchableOpacity``;

const Check = styled.View``;

const CheckText = styled.Text``;

const Certification = ({ message }) => {
    const [result, setResult] = useState(false);
    const IDCardCertification = () => {
        const db = firebase.firestore();
        db.collection("Auth")
            .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
            .update({ IDcardAuth: true });
        RNRestart.Restart();
    };

    useEffect(() => {
        if (message === "인증 성공") {
            setResult(true);
            db.collection("Auth")
                .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                .update({ IDcardAuth: true });
        } else {
            setResult(false);
        }
    }, []);
    return (
        <Container>
            <Notice>인증 성공</Notice>
            <CheckBtn onPress={IDCardCertification}>
                <Check>
                    <CheckText>완료하기</CheckText>
                </Check>
            </CheckBtn>
            <Notice>인증 실패</Notice>
            <CheckBtn onPress={IDCardCertification}>
                <Check>
                    <CheckText>다시찍기</CheckText>
                </Check>
            </CheckBtn>
        </Container>
    );
};

export default Certification;
