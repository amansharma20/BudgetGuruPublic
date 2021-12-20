/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { AuthActions } from '../../persistence/actions/AuthActions';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Responsive } from '../../../constants/Layout';
import SignUpBg from '../../../assets/svgs/SignUpScreenImgBg.svg';
import { Formik } from 'formik';
import CommonLoading from '../../components/loading/CommonLoading';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ForgotPassword() {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const schema = yup.object().shape({
        email: yup
            .string()
            .required('This field is' + ' ' + 'required.'),
    });

    const sendOTP = (values) => {
        CommonLoading.show();
        const forgotData = {
            'Email': values.email,
        };
        dispatch(AuthActions.signIn('Account/ForgotPasswordStart', forgotData)).then((response) => {
            CommonLoading.hide();
            navigation.navigate('OTPScreen', {
                email: values.email,
            });
        }
        );

    };

    return (
        <View style={styles.container}>
            <SignUpBg />
            <View style={{ marginTop: 40, padding: 16 }}>
                <View style={{
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: '#2743FE',
                        fontSize: 18,
                        fontFamily: FONTS.montserrat700,
                    }}>
                        Please Enter Email
                    </Text>

                </View>
                <View style={{}}>
                    <Formik
                        validationSchema={schema}
                        initialValues={{
                            email: '',
                        }}
                        onSubmit={values => sendOTP(values)}>

                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            isValid,
                            touched,
                        }) => (
                            <>
                                <Text style={styles.inputHeaderText}>Email</Text>
                                <View style={styles.checkMarkContainer}>
                                    <TextInput
                                        name="email"
                                        style={styles.textInput}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                    />
                                    {!errors.email && touched.email && (
                                        <Image source={icons.tick} style={styles.tickIcon} />
                                    )}
                                </View>
                                {errors.email && touched.email && (
                                    <Text style={styles.error}>{errors.email}</Text>
                                )}

                                <KeyboardAvoidingView style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}>

                                        <ImageBackground
                                            resizeMode="cover"
                                            source={images.buttonBg}
                                            style={styles.buttonImgBg}
                                            imageStyle={styles.buttonImgBgRadius}>
                                            <Text style={styles.loginBtnText}>Get OTP</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>

                                </KeyboardAvoidingView>
                            </>
                        )}
                    </Formik>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    background: { height: screenHeight / 1.25, resizeMode: 'cover', width: screenWidth },
    logoContainer: {
        alignItems: 'center', marginTop: -50,
    },
    logoIcon: { height: 180, resizeMode: 'contain', width: 180 },
    signUpButtonContainer: {
        alignItems: 'center',
        width: Responsive.width(245),
        height: Responsive.height(56),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2749FD',
        borderRadius: 28,
        marginTop: 20,
    },
    signupBtnText: {
        fontSize: SIZES.buttonText,
        color: '#2749FD',
        fontFamily: FONTS.montserrat400,
    },
    textInput: {
        height: Responsive.height(50),
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderBottomColor: COLORS.textInputBorder,
        borderBottomWidth: 1,
        color: '#000000',
        marginTop: 16,
        fontSize: 14,
    },
    tickIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: -28,
    },
    error: {
        fontSize: 10,
        color: 'red',
    },
    inputHeaderText: {
        marginLeft: 0,
        marginTop: 10,
        color: '#999999',
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: Responsive.height(60),
        alignItems: 'center',
    },
    buttonImgBg: {
        alignItems: 'center',
        width: Responsive.width(245),
        height: Responsive.height(56),
        justifyContent: 'center',
    },
    loginBtnText: {
        fontSize: SIZES.buttonText,
        color: COLORS.buttonTextWhite,
        fontFamily: FONTS.montserrat400,
    },
    buttonImgBgRadius: {
        borderRadius: 28,
    },

    checkMarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
