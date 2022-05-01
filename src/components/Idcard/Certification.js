import React from "react";
import styled from "styled-components";
import { firebase } from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import MessageModal from "../../components/MessageModal";
import { setMessageModal } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import RNRestart from "react-native-restart";
import auth from "@react-native-firebase/auth";

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

const Certification = ({ route }) => {
    const dispatch = useDispatch();
    const { userInfo } = route.params;
    const db = firebase.firestore();
    const navigation = useNavigation();
    const { messageModal } = useSelector((state) => state.modalReducer);
    const IDCardCertification = () => {
        try {
            if (userInfo === true) {
                db.collection("Auth")
                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1])
                    .update({ IDcardAuth: true });
                db.collection("Auth")
                    .doc(0 + auth().currentUser?.providerData[0].phoneNumber.split("+82")[1] + "User")
                    .delete();
                RNRestart.Restart();
            }
        } catch (err) {
            return dispatch(setMessageModal(true, err));
        }
    };

    const Failed = () => {
        navigation.navigate("IDcardAuth");
    };

    return (
        <Container>
            <MessageModal isOpen={messageModal.isModalOpen} content={messageModal.content} />
            {userInfo ? (
                <>
                    <Notice>인증 성공</Notice>
                    <CheckBtn onPress={IDCardCertification}>
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

export default Certification;
