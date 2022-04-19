import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BLACK_COLOR, LIGHT_COLOR, GREEN_COLOR, GREY_COLOR } from "../color";
import { useColorScheme } from "react-native";
import IDcardAuth from "../screens/IDcardAuth";
import CEOAuth from "../screens/CEOAuth";
import NICE from "../components/nice/NICE";
import CertificationResult from "../components/nice/CertificationResult";
import CameraHandler from "../components/Idcard/Camera/Camera";
import PhotoPreview from "../components/Idcard/Camera/PhotoPreview";
import FsView from "../components/Idcard/Camera/FsView";
import RegistrationView from "../components/registration/CEOCamera/RegistrationView";
import Certification from "../components/Idcard/Certification";
import CEOCameraHandler from "../components/registration/CEOCamera/CEOCamera";
import CEOPhotoPreview from "../components/registration/CEOCamera/CEOPhotoPreview";
import CEOCertification from "../components/registration/CEOCertification";
import Terms from "../components/Terms";
import Password from "../components/SimplePW/Password";
import Edit from "../components/SimplePW/Edit";
import PasswordCheck from "../components/SimplePW/PasswordCheck";
import FindPW from "../components/SimplePW/FindPW";
import History from "../components/History";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === "dark";
    return (
        <NativeStack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : "tomato",
                },
                headerTitleStyle: {
                    color: "white",
                },
            }}
        >
            <NativeStack.Screen options={{ headerShown: false }} name="IDcardAuth" component={IDcardAuth} />
            <NativeStack.Screen options={{ headerShown: false }} name="CEOAuth" component={CEOAuth} />
            <NativeStack.Screen
                options={{
                    headerTitle: "신분증 촬영",
                }}
                name="camera"
                component={CameraHandler}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "사진 확인",
                }}
                name="photo preview"
                component={PhotoPreview}
            />
            <NativeStack.Screen options={{ headerShown: false }} name="fsView" component={FsView} />
            <NativeStack.Screen
                options={{
                    headerTitle: "사업자등록증 촬영",
                }}
                name="ceocamera"
                component={CEOCameraHandler}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "사진 확인",
                }}
                name="ceo photo preview"
                component={CEOPhotoPreview}
            />
            <NativeStack.Screen options={{ headerShown: false }} name="RegistrationView" component={RegistrationView} />
            <NativeStack.Screen
                options={{
                    headerTitle: "인증 결과",
                }}
                name="Certification"
                component={Certification}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "인증 결과",
                }}
                name="CEOCertification"
                component={CEOCertification}
            />
            <NativeStack.Screen options={{ headerShown: false }} name="NICE" component={NICE} />
            <NativeStack.Screen
                options={{
                    headerTitle: "아임포트 본인인증 결과",
                }}
                name="CertificationResult"
                component={CertificationResult}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "서비스 약관",
                }}
                name="service"
                component={Terms}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "간편 비밀번호 확인",
                }}
                name="Password"
                component={Password}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "간편 비밀번호 등록",
                }}
                name="Edit"
                component={Edit}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "간편 비밀번호 등록",
                }}
                name="PasswordCheck"
                component={PasswordCheck}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "간편 비밀번호 변경하기",
                }}
                name="FindPW"
                component={FindPW}
            />
            <NativeStack.Screen
                options={{
                    headerTitle: "최근 인증 이력",
                }}
                name="History"
                component={History}
            />
        </NativeStack.Navigator>
    );
};

export default Stack;
