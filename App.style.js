import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const GlobalColors = {
    SLATEBLUE: "rgb(113,112,179)",
    YELLOW: "rgb(254,240,0)",
    CRIMSON: "rgb(236,20,36)"
}

export const GlobalStyles = {
    statusBarHeight: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    px: 8,
    bgColor: "#f4f5f7",
    screenHeight: height,
    screenWidth: width
}