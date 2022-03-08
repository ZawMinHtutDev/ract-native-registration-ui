import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    View,
} from "react-native";
import { Provider } from "react-redux";
import { GlobalColors, GlobalStyles } from "./App.style";
import { AppNavigation } from "./src/navigation";
import { store } from "./src/redux/store";

export default function App() {
    const [isFontLoaded] = useFonts({
        RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
        SansitaSwashed: require("./assets/fonts/SansitaSwashed-Bold.ttf"),
    });

    return isFontLoaded ? (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <StatusBar style="auto" />
                <AppNavigation />
            </Provider>
        </SafeAreaView>
    ) : (
        <View
            style={{
                ...styles.container,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ActivityIndicator color={GlobalColors.SLATEBLUE} size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: GlobalStyles.statusBarHeight,
    },
});
