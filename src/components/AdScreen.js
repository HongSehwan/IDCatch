import React, { useEffect } from "react";
import styled from "styled-components/native";
import { getTrackingStatus, requestTrackingPermission } from "react-native-tracking-transparency";
import { AdMobBanner } from "expo-ads-admob";

const AdMobContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

const AdScreen = () => {
    useEffect(() => {
        _getTrackingStatus();
    }, []);

    const _getTrackingStatus = async () => {
        const trackingStatus = await getTrackingStatus();
        if (trackingStatus === "not-determined") {
            requestTrackingPermission();
        }
    };
    return (
        <AdMobContainer>
            <AdMobBanner bannerSize="smartBannerPortrait" adUnitID="ca-app-pub-7375395662986319/2249891649" />
        </AdMobContainer>
    );
};

export default AdScreen;
