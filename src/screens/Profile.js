import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useDispatch, useSelector } from "react-redux";
import { GlobalColors, GlobalStyles } from "../../App.style";
import { resetUser } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";

const convertToInfo = (obj) => {
    let _string = "";
    let i = 0;

    for (const key in obj) {
        if (obj[key] && key !== "password") {
            _string = _string.concat(
                i == 0 ? `${key}: ${obj[key]}` : `\n${key}: ${obj[key]}`
            );
        }
        i++;
    }

    return _string;
};

export const Profile = () => {
    const { User } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        return () => {
            dispatch(resetUser());
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* intro */}
            <Text style={[styles.label, styles.title]}>{User.userName}</Text>
            <Text style={[styles.label, styles.subTitle]}>{User.email}</Text>
            <Text style={[styles.label]}>
                Scan the QR code below for your profile information.
            </Text>

            <View style={styles.qrWrapper}>
                <QRCode
                    value={convertToInfo(User)}
                    size={GlobalStyles.screenWidth * 0.6}
                />
            </View>

            <TouchableOpacity
                style={styles.logoutBtn}
                activeOpacity={0.8}
                onPress={() => {
                    dispatch(resetUser());
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        navigation.navigate("AuthStack", {
                            screen: "Register",
                        });
                    }
                }}
            >
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.bgColor,
        paddingVertical: 20,
        paddingHorizontal: GlobalStyles.px,
    },
    label: {
        fontFamily: "RobotoRegular",
        fontSize: 15,
        marginBottom: 20,
    },
    title: {
        fontFamily: "SansitaSwashed",
        fontSize: 24,
        textAlign: "center",
        color: GlobalColors.CRIMSON,
    },
    subTitle: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },
    qrWrapper: {
        paddingVertical: 40,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    logoutBtn: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: GlobalColors.SLATEBLUE,
        borderRadius: 5,
        marginTop: 25,
    },
    logoutText: {
        fontFamily: "RobotoRegular",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
});
