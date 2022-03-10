import React, { useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { GlobalColors, GlobalStyles } from "../../App.style";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-native-phone-number-input";
import cryptoJs from "crypto-js";
import { SECRET_KEY } from "../../config";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/actions";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        register,
        setError,
    } = useForm({
        userName: "",
        email: "",
        password: "",
        cPassword: "",
        phoneNumber: null,
    });
    const phoneInputRef = useRef(null);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSubmit = ({
        userName,
        email,
        password,
        cPassword,
        phoneNumber,
    }) => {
        let _editedPhoneNumber = null;

        if (phoneInputRef) {
            if (phoneNumber && phoneNumber.length) {
                _editedPhoneNumber = `+${
                    phoneInputRef.current.getCallingCode(phoneNumber) +
                    phoneNumber.replace(/[\D0]/, "")
                }`;
            }
        }

        if (password !== cPassword) {
            setError("password", {
                message: "Passwrods do not match.",
            });
            setError("cPassword", {
                message: "Passwrods do not match.",
            });
            return false;
        }

        const submitData = {
            userName: userName.trim(),
            email: email.trim(),
            password: cryptoJs.HmacMD5(password.trim(), SECRET_KEY).toString(),
            phoneNumber: _editedPhoneNumber,
        };

        dispatch(updateUser(submitData));
        navigation.navigate("ProfileStack", { screen: "Profile" });
    };

    const checkedPhone = (value) => {
        if (value !== undefined && value.length) {
            if (phoneInputRef) {
                return phoneInputRef.current.isValidNumber(value);
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    return (
        <View style={styles.container}>
            {/* Left Rec */}
            <View style={styles.leftRec} />
            {/* Right Rec */}
            <View style={styles.rightRec} />

            {/* Content */}
            <ScrollView>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Register</Text>
                </View>

                {/* form */}
                <View style={styles.form}>
                    {/* userName */}
                    <Text style={[styles.label, { marginTop: 25 }]}>User Name</Text>
                    {errors.userName ? (
                        <Text style={styles.errorMessage}>
                            {errors.userName.message}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Controller
                        control={control}
                        name="userName"
                        render={({ field }) => (
                            <TextInput
                                {...register("userName", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                onChangeText={field.onChange}
                                value={field.value}
                                style={styles.textInput}
                                textContentType="username"
                            />
                        )}
                    />

                    {/* email */}
                    <Text style={styles.label}>Email Address</Text>
                    {errors.email ? (
                        <Text style={styles.errorMessage}>
                            {errors.email.message}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextInput
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                onChangeText={field.onChange}
                                value={field.value}
                                style={styles.textInput}
                                textContentType="emailAddress"
                            />
                        )}
                    />

                    {/* password */}
                    <Text style={styles.label}>Password</Text>
                    {errors.password ? (
                        <Text style={styles.errorMessage}>
                            {errors.password.message}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <TextInput
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                onChangeText={field.onChange}
                                value={field.value}
                                style={styles.textInput}
                                textContentType="password"
                                secureTextEntry={true}
                            />
                        )}
                    />

                    {/* cPassword */}
                    <Text style={styles.label}>Comfirm Password</Text>
                    {errors.cPassword ? (
                        <Text style={styles.errorMessage}>
                            {errors.cPassword.message}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Controller
                        control={control}
                        name="cPassword"
                        render={({ field }) => (
                            <TextInput
                                {...register("cPassword", {
                                    required: {
                                        value: true,
                                        message: "This field is required.",
                                    },
                                })}
                                onChangeText={field.onChange}
                                value={field.value}
                                style={styles.textInput}
                                textContentType="password"
                                secureTextEntry={true}
                            />
                        )}
                    />

                    {/* phoneNumber */}
                    <Text style={styles.label}>Phone Number (optional)</Text>
                    {errors.phoneNumber ? (
                        <Text style={styles.errorMessage}>
                            {errors.phoneNumber.message}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Controller
                        control={control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <PhoneInput
                                {...register("phoneNumber", {
                                    validate: {
                                        isValid: (v) =>
                                            checkedPhone(v) ||
                                            "Phone number is invalid",
                                    },
                                })}
                                ref={phoneInputRef}
                                defaultCode="MM"
                                onChangeText={field.onChange}
                                value={field.value}
                                containerStyle={styles.phoneInput}
                            />
                        )}
                    />

                    <TouchableOpacity
                        style={styles.signUp}
                        activeOpacity={0.8}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: GlobalStyles.px,
    },
    leftRec: {
        height: GlobalStyles.screenHeight * 0.3,
        width: GlobalStyles.screenHeight * 0.1,
        backgroundColor: GlobalColors.YELLOW,
        position: "absolute",
        bottom: 0,
        left: 0,
    },
    rightRec: {
        height: GlobalStyles.screenHeight * 0.5,
        width: GlobalStyles.screenHeight * 0.1,
        backgroundColor: GlobalColors.SLATEBLUE,
        position: "absolute",
        top: 0,
        right: 0,
    },
    header: {
        height: GlobalStyles.screenHeight * 0.18,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 30,
    },
    headerText: {
        fontFamily: "SansitaSwashed",
        fontSize: 28,
        color: GlobalColors.CRIMSON,
    },
    form: {
        paddingVertical: 9,
        paddingHorizontal: 18,
        backgroundColor: "#ffffff88",
        borderRadius: 5,
    },
    label: {
        fontFamily: "RobotoRegular",
    },
    textInput: {
        borderBottomColor: GlobalColors.SLATEBLUE,
        borderBottomWidth: 1,
        borderStyle: "solid",
        fontSize: 15,
        marginBottom: 25,
    },
    phoneInput: {
        marginBottom: 25,
        marginTop: 10,
        width: "100%",
    },
    signUp: {
        marginBottom: 25,
        backgroundColor: GlobalColors.SLATEBLUE,
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 5,
        width: GlobalStyles.screenWidth * 0.3,
        alignSelf: "center",
    },
    signUpText: {
        textAlign: "center",
        fontFamily: "RobotoRegular",
        color: GlobalColors.YELLOW,
        fontWeight: "bold",
    },
    errorMessage: {
        fontFamily: "SansitaSwashed",
        color: GlobalColors.CRIMSON,
        fontSize: 10,
    },
});
