import React from "react";
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image } from "react-native";
import { images } from "../../../styled";
const CEOCameraPreview = ({ photo, retakePicture, savePicture }) => {
    const photoUri = String(photo.uri);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            />
            <TouchableOpacity onPress={retakePicture} style={[styles.option, styles.retake]}>
                <Image style={styles.imgCam} source={images.retake} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    savePicture(photoUri);
                }}
                style={[styles.option, styles.save]}
            >
                <Image style={[styles.imgCam, styles.imgSave]} source={images.save} />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
    },
    option: {
        position: "absolute",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 20,
        padding: 20,
    },
    retake: {
        bottom: 36,
        left: 20,
    },
    save: {
        bottom: 36,
        right: 20,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    imgCam: {
        width: 38,
        height: 38,
    },
    imgSave: {
        width: 32,
        height: 32,
        padding: 10,
    },
});
export default CEOCameraPreview;
