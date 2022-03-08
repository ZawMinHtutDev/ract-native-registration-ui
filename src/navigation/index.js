import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../App.style";
import { Profile, Register } from "../screens";

const StackNav = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: GlobalStyles.bgColor,
            }
        }}>
            <StackNav.Screen name="Register" component={Register} />
        </StackNav.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <StackNav.Navigator screenOptions={{
            headerShown: false,
            contentStyle: {
                backgroundColor: GlobalStyles.bgColor,
            }
        }}>
            <StackNav.Screen name="Profile" component={Profile} />
        </StackNav.Navigator>
    );
};

export const AppNavigation = () => {
    const { User } = useSelector((state) => state);

    return (
        <NavigationContainer>
            { User.userName.length ? <ProfileStack /> : <AuthStack /> }
        </NavigationContainer>
    );
};
