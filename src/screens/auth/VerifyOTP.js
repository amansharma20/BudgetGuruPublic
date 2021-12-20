/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SignUpBg from '../../../assets/svgs/SignUpScreenImgBg.svg';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';
import { AuthActions } from '../../persistence/actions/AuthActions';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { Field, Formik } from 'formik';
import CustomInput from '../../components/inputs/CustomInput';
import { Responsive } from '../../../constants/Layout';
import CommonLoading from '../../components/loading/CommonLoading';

export default function VerifyOTP(props) {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    
  const details = props.route.params;

    const submitPassword = (values) => {
        CommonLoading.show();
        const forgotData = {
          "Email": details.email,
          "Code": details.code,
          "NewPassword": values.password
        }
    
        dispatch(AuthActions.resetPassword('Account/ForgotPasswordComplete', forgotData)).then((response)=>{
            CommonLoading.hide();
          if (response && response.success === false) {alert('Something Went Wrong')} else {
            navigation.navigate('LoginScreen')
          }
        })
        
    
      }

      const validation = yup.object().shape({
        password: yup
          .string()
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Password does not match')
          .required('Confirm Password is required'),
      });
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);

    return (
        <View style={styles.container}>
            <SignUpBg />
            <View style={{
                marginTop: 50,
                padding: 24,
            }}>
                <Text style={{
                    color: '#3A3A3A',
                    fontSize: 28,
                    fontFamily: FONTS.montserrat700,
                }}>
                    New Password
                </Text>

                <Formik
                    validationSchema={validation}
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={values => submitPassword(values)}>
              
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
                            <View style={styles.inputContainer}>
                                <Text
                                    style={{ fontSize: SIZES.h4, color: COLORS.textInputTitle }}>
                                    New Password
                                </Text>
                                <View style={styles.checkMarkContainer}>
                                    <View style={styles.checkMarkContainerField}>
                                        <Field
                                            component={CustomInput}
                                            name="password"
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            style={styles.textInput}
                                            secureTextEntry={secureTextEntry}
                                            value={values.password}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                                        style={styles.eyeContainer}>
                                        <Image source={icons.eye} style={styles.eyeDimensions} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text
                                    style={{ fontSize: SIZES.h4, color: COLORS.textInputTitle }}>
                                    Confirm Password
                                </Text>
                                <View style={styles.checkMarkContainer}>
                                    <View style={styles.confirmPasswordField}>
                                        <Field
                                            component={CustomInput}
                                            name="confirmPassword"
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            style={styles.textInput}
                                            secureTextEntry={secureTextEntryConfirmPassword}
                                            value={values.confirmPassword}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSecureTextEntryConfirmPassword(
                                                !secureTextEntryConfirmPassword,
                                            )
                                        }
                                        style={styles.eyeContainer}>
                                        <Image source={icons.eye} style={styles.eyeDimensions} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{marginTop: 158}}>
                                <CommonButton onPress={handleSubmit} children="Save" />

                            </View>
                        </>
                    )}
                </Formik>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    headerTextContainer: {
        paddingHorizontal: SIZES.padding2,
        paddingBottom: SIZES.padding3,
    },
    headerText: {
        fontSize: SIZES.h1,
        fontFamily: FONTS.montserrat700,
    },
    error: {
        padding: 4,
        color: '#cc0000',
      },
    signupContainer: {
        width: '80%',
        alignItems: 'center',
        padding: 10,
        elevation: 10,
        backgroundColor: '#e6e6e6',
    },
    inputContainer: {
        width: '100%',
        paddingVertical: 2,
    },
    textInput: {
        height: Responsive.height(50),
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderBottomColor: COLORS.textInputBorder,
        borderBottomWidth: 1,
        color: '#000000',
    },
    buttonContainer: {
        marginTop: Responsive.height(10),
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
    checkMarkIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: -28,
        tintColor: '#CB3EF9',
        marginBottom: Responsive.height(8),
    },
    checkMarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    eyeContainer: {
        marginLeft: Responsive.width(-28),
        marginBottom: Responsive.height(12),
    },
    eyeDimensions: {
        width: Responsive.width(20),
        height: Responsive.height(20),
    },
    emailInputField: {
        width: '100%',
    },
    checkMarkContainerField: { width: '100%' },
    loginText: {
        marginLeft: 2,
        color: COLORS.textBlue,
        
    },
    footerTextContainer: { flexDirection: 'row', paddingTop: SIZES.padding3 },
    footerText: { },
    confirmPasswordField: { width: '100%' },
});
