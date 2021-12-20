/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { FONTS, images } from '../../../constants';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../persistence/actions/AuthActions';
import CommonButton from '../../components/buttons/CommonButton';
import Images from '../../../constants/Images';
import CommonLoading from '../../components/loading/CommonLoading';
import Toast from 'react-native-toast-message';

export default function OTPScreen(props) {

    console.log(props);

    const email = props.route.params.email;

    const navigation = useNavigation();

    const dispatch = useDispatch();


    const [otp, setOtp] = useState();
    const submitOtp = () => {
        CommonLoading.show();
        const forgotData = {
            'Email': email,
            'Code': otp
        };
        dispatch(AuthActions.signIn('Account/ForgotPasswordVerify', forgotData)).then((response) => {
            if (response && response.success === false) {
                CommonLoading.hide();
                Toast.show({
                    type: 'error',
                    text1: 'Oops👋',
                    text2: 'OTP is invalid',
                    visibilityTime: 2000,
                    autoHide: true,
                  });
            } else {
                CommonLoading.hide();
                navigation.navigate('VerifyOTP', {
                    email: email,
                    code: otp
                });
            }
        });
    };
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40, backgroundColor: 'white' }} style={styles.container}>
            <Image source={Images.otpBackground} style={styles.otpBackgroundImage} />

            <View style={{
                alignItems: 'center',
                marginTop: 50
            }}>
                <Text style={{
                    color: '#3A3A3A',
                    fontSize: 18,
                    fontFamily: FONTS.montserrat700,
                }}>
                    OTP Verification
                </Text>
                <Text style={{
                    color: '#3A3A3A',
                    fontSize: 18,
                    fontFamily: FONTS.montserrat500,
                    marginTop: 25,
                }}>
                    Enter the OTP sent to your email
                </Text>

            </View>
            <View style={styles.otpContainer}>
                <OTPInputView
                    pinCount={4}
                    autoFocusOnLoad
                    style={styles.otpInputContainer}
                    codeInputFieldStyle={styles.underlineStyleBase}
                    onCodeFilled={(code => {
                        setOtp(code);
                        console.log(`Code is ${code}, you are good to go!`);
                    })}
                />
            </View>
            <View style={{ marginTop: 40, flexDirection: 'row' }}>
                <Text style={{ color: '#b9b9b9', fontFamily: FONTS.montserrat500 }}>
                    Didn’t you recieve OTP?
                </Text>
                <Text style={{ color: '#2743FD', marginLeft: 4, fontFamily: FONTS.montserrat700 }}>
                    Resend OTP
                </Text>
            </View>

            <KeyboardAvoidingView style={styles.buttonContainer}>

                <CommonButton
                    onPress={() => submitOtp()}
                    children="Verify" />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    otpContainer: {
        alignItems: 'center',
        marginTop: '20%',
        justifyContent: 'center',
    },
    otpInputContainer: {
        height: 100,
        width: '60%',
    },
    underlineStyleBase: {
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        color: '#262626',
        borderColor: '#2743FD',
    },
    buttonContainer: {
        marginTop: 38,
    },
    otpBackgroundImage: {
        width: 225,
        height: 225,
    },
});
