import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { setIdcardData } from "../redux/actions";
import HomeBtn from "../components/Idcard/Camera/HomeBtn";

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const LogoImg = styled.Image`
    height: 65%;
    width: 100%;
`;

const CameraBtn = styled.View`
    align-items: center;
    justify-content: space-between;
    margin: 0;
    width: 100%;
`;

const IDcardAuth = () => {
    return (
        <Container>
            <CameraBtn>
                <LogoImg resizeMode="stretch" source={require("../assets/img/IDCatch_logo.png")} />
                <HomeBtn img="camera" text="신분증 촬영하기" />
            </CameraBtn>
        </Container>
    );
};

export default IDcardAuth;
