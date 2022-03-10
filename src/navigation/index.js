import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../App.style";
import { Profile, Register } from "../screens";

const StackNav = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
    contentStyle: {
        backgroundColor: GlobalStyles.bgColor,
    },
};

const AuthStack = () => {
    return (
        <StackNav.Navigator screenOptions={screenOptions}>
            <StackNav.Screen name="Register" component={Register} />
        </StackNav.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <StackNav.Navigator screenOptions={screenOptions}>
            <StackNav.Screen name="Profile" component={Profile} />
        </StackNav.Navigator>
    );
};

export const AppNavigation = () => {
    const { User } = useSelector((state) => state);

    return (
        <NavigationContainer>
            <StackNav.Navigator
                screenOptions={screenOptions}
                initialRouteName={
                    !User.id? "AuthStack" : "ProfileStack"
                }
            >
                <StackNav.Screen name="AuthStack" component={AuthStack} />
                <StackNav.Screen name="ProfileStack" component={ProfileStack} />
            </StackNav.Navigator>
        </NavigationContainer>
    );
};
