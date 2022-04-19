import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useColorScheme } from "react-native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { Provider } from "react-redux";
import store from "./redux/store";
import Root from "./navigation/Root";
import auth from "@react-native-firebase/auth";
import OutNav from "./navigation/OutNav";

const queryClient = new QueryClient();

export default function App() {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const onFinish = () => setLoading(true);
    const startLoading = async () => {
        await Asset.loadAsync(require("./assets/img/IDCatch_logo.png"));
        await Font.loadAsync(Ionicons.font);
    };
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const isDark = useColorScheme() === "dark";
    if (!loading) {
        return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
    }
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                    <NavigationContainer>{isLoggedIn ? <Root /> : <OutNav />}</NavigationContainer>
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}
