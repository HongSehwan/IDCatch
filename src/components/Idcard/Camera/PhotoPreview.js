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
            console.log(resPermission);
            console.log("photoUri11111=>" + photoUri);
            if (resPermission.granted && photoUri) {
                const asset = await MediaLibrary.createAssetAsync(photoUri);
                console.log("photoUri=>" + photoUri);
                console.log("111111=>" + asset);
            } else {
                const res = await MediaLibrary.requestPermissionsAsync();
                console.log("222000=>" + res);
                if (res.granted) {
                    const asset = await MediaLibrary.createAssetAsync(photoUri);
                    console.log("222222=>" + asset);
                }
            }
            navigation.navigate("fsView", { uri: photoUri });
        } catch (error) {
            console.log(error);
            alert("사진을 저장하지 못했습니다.");
        }
    };
    return <CameraPreview photo={photo} retakePicture={__retakePicture} savePicture={__savePicture} />;
}

export default PhotoPreview;
