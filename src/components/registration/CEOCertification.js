import React from "react";
import styled from "styled-components";
import auth from "@react-native-firebase/auth";
import { firebase } from "@react-native-firebase/firestore";
import RNRestart from "react-native-restart";
import { useNavigation } from "@react-navigation/native";
import MessageModal from "../../components/MessageModal";
import { setMessageModal } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const Notice = styled.Text`
    font-size: 30;
`;

const CheckBtn = styled.TouchableOpacity`
    margin-top: 25px;
    width: 150px;
`;

const Check = styled.View`
    background-color: tomato;
    justify-content: center;
    border-radius: 10px;
    height: 35px;
`;

const CheckText = styled.Text`
    font-size: 20px;
    text-align: center;
    color: white;
`;

const CEOCertification = ({ route }) => {
    const dispatch = useDispatch();
    const { b_Result } = route.params;
    const db = firebase.firestore();
    const navigation = useNavigation();
    const { messageModal } = useSelector((state) => state.modalReducer);
    const Certification = () => {
        try {
            if (b_Result === true) {
                db.collection("Auth")
                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                    .update({ CEOAuth: true, Transform: true });
                RNRestart.Restart();
            }
        } catch (err) {
            return dispatch(setMessageModal(true, err));
        }
    };
    const Failed = () => {
        navigation.navigate("CEOAuth");
    };

    return (
        <Container>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            {b_Result ? (
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
