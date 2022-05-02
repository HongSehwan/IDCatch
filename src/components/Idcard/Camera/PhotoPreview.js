import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import CameraPreview from "./CameraPreview";

function PhotoPreview({ route }) {
    const navigation = useNavigation();
    const { photo } = route.params;
    const __retakePicture = () => {
        navigation.navigate("IDcardAuth");
    };
    const __savePicture = async (photoUri) => {
        try {
            const resPermission = await MediaLibrary.getPermissionsAsync();
            if (resPermission.granted && photoUri) {
                const asset = await MediaLibrary.createAssetAsync(photoUri);
            } else {
                const res = await MediaLibrary.requestPermissionsAsync();
                if (res.granted) {
                    const asset = await MediaLibrary.createAssetAsync(photoUri);
                }
            }
            navigation.navigate("fsView", { uri: photoUri });
        } catch (error) {
            alert("사진을 저장하지 못했습니다.");
        }
    };
    return <CameraPreview photo={photo} retakePicture={__retakePicture} savePicture={__savePicture} />;
}

export default PhotoPreview;
