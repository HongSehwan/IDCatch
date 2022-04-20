import React from "react";
import styled from "styled-components/native";
import { useDispatch } from "react-redux";
import { setMessageModal } from "../redux/actions";

const Background = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 990;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    z-index: 999;
    position: absolute;
    width: 280px;
    height: 160px;
    display: flex;
    padding-top: 18px;
    align-items: center;
    background-color: white;
    border-radius: 20px;
`;

const MainText = styled.Text`
    font-size: 17px;
    font-weight: 700;
    color: #353b48;
    text-align: center;
`;

const BtnText = styled.Text`
    color: white;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;

const Modal = styled.View`
    position: absolute;
    width: 100%;
    height: 55px;
    margin-top: 105px;
    background-color: tomato;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    justify-content: center;
`;

const ModalBtn = styled.TouchableOpacity``;

const ModalBtnView = styled.View`
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;

const TextView = styled.View`
    height: 70px;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
`;

const MessageModal = ({ isOpen, content }) => {
    const dispatch = useDispatch();
    const closeModal = () => {
        dispatch(setMessageModal(false, ""));
    };
    return (
        <>
            {isOpen ? (
                <Background>
                    <Container>
                        <TextView>
                            <MainText>{content}</MainText>
                        </TextView>
                        <Modal>
                            <ModalBtn onPress={closeModal}>
                                <ModalBtnView>
                                    <BtnText>확인</BtnText>
                                </ModalBtnView>
                            </ModalBtn>
                        </Modal>
                    </Container>
                </Background>
            ) : null}
        </>
    );
};

export default MessageModal;
