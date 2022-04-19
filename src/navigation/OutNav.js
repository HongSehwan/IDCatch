import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import AgreementPage from "../components/AgreementPage";

const Nav = createNativeStackNavigator();

const OutNav = () => (
    <Nav.Navigator>
        <Nav.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Nav.Screen options={{ headerShown: false }} name="AgreementPage" component={AgreementPage} />
    </Nav.Navigator>
);

export default OutNav;
