/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { FONTS, images, SIZES } from '../../../constants';
import { Responsive } from '../../utils/layouts/Layout';
import CommonButton from '../../components/buttons/CommonButton';
import { Formik } from 'formik';
import CustomInput from '../../components/inputs/CustomInput';
import { useMutation } from '@apollo/client';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import MyAsyncStorage from '../../persistence/storage/MyAsyncStorage';
import CommonLoading from '../../components/loading/CommonLoading';

export default function DetailsInput() {

    const navigation = useNavigation();

    useEffect(() => {
        return () => {
            clearNewSignedUpDetails();
        };
    });

    async function clearNewSignedUpDetails() {
        await MyAsyncStorage.storeData('isSignedUp', null);
    }

    const signUpValidationSchema = yup.object().shape({
        firstName: yup
            .string()
            // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('First name is required'),
        lastName: yup
            .string()
            // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('Last name is required'),
        mobileNumber: yup
            .string()
            .matches(/(\d){10}\b/, 'Enter a valid phone number')
            .required('Phone number is required'),
        monthlyIncome: yup
            .string()
            .required('Monthly Income is required'),
    });
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const mobileNumberRef = useRef();
    const monthlyIncomeRef = useRef();


    const [submitBasicDetails] = useMutation(GQLMutation.SAVE_USER_BASIC_DETAIL, {
        onCompleted: (data) => {
            CommonLoading.hide();
            navigation.navigate('CategoryLimit');
        }, onError: (error => {
            CommonLoading.hide();
            alert(error);
        }),
    });

    const submitData = values => {
        CommonLoading.show();
        var date = new Date();
        console.log(date.toISOString());
        submitBasicDetails({
            variables: {
                MobileNumber: values.mobileNumber,
                FirstName: values.firstName,
                LastName: values.lastName,
                MonthlyIncome: values.monthlyIncome,
                DateOfBirth: date.toISOString(),
            },
        });
    };


    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}>
                {/* <Image
                    source={images.profilePic}
                    style={{
                        width: Responsive.width(100),
                        height: Responsive.height(100),
                        resizeMode: 'contain',
                        marginLeft: 20,
                        marginTop: 60,
                    }}
                /> */}
                <Image
                    source={images.detailsInputBg}
                    style={{
                        height: Responsive.height(150),
                        resizeMode: 'contain',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                    }}
                />
            </View>
            <View style={styles.body}>

                <Formik
                    validationSchema={signUpValidationSchema}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        mobileNumber: '',
                        monthlyIncome: '',

                    }}
                    onSubmit={values => submitData(values)}>
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
                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.inputTextTitle}>First Name</Text>
                                <TextInput
                                    component={CustomInput}
                                    style={styles.input}
                                    placeholder="Your First Name"
                                    keyboardType="default"
                                    placeholderTextColor={'#8b8b8b'}
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    onSubmitEditing={() => {
                                        lastNameRef.current.focus();
                                    }}
                                />
                            </View>
                            {errors.firstName && touched.firstName && (
                                <Text style={styles.error}>{errors.firstName}</Text>
                            )}

                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.inputTextTitle}>Last Name</Text>
                                <TextInput
                                    component={CustomInput}
                                    style={styles.input}
                                    placeholder="Your Last Name"
                                    keyboardType="default"
                                    placeholderTextColor={'#8b8b8b'}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                    ref={lastNameRef}
                                    onSubmitEditing={() => {
                                        mobileNumberRef.current.focus();
                                    }}
                                />
                            </View>
                            {errors.lastName && touched.lastName && (
                                <Text style={styles.error}>{errors.lastName}</Text>
                            )}

                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.inputTextTitle}>Mobile Number</Text>
                                <TextInput
                                    component={CustomInput}
                                    style={styles.input}
                                    placeholder="Mobile Number"
                                    keyboardType="numeric"
                                    placeholderTextColor={'#8b8b8b'}
                                    onChangeText={handleChange('mobileNumber')}
                                    onBlur={handleBlur('mobileNumber')}
                                    value={values.mobileNumber}
                                    maxLength={10}
                                    ref={mobileNumberRef}
                                    onSubmitEditing={() => {
                                        monthlyIncomeRef.current.focus();
                                    }}
                                />
                            </View>
                            {errors.mobileNumber && touched.mobileNumber && (
                                <Text style={styles.error}>{errors.mobileNumber}</Text>
                            )}

                            <View style={{ marginVertical: 12 }}>
                                <Text style={styles.inputTextTitle}>Monthly Income</Text>
                                <TextInput
                                    component={CustomInput}
                                    style={styles.input}
                                    placeholder="Monthly Income(₹)"
                                    keyboardType="numeric"
                                    placeholderTextColor={'#8b8b8b'}
                                    onChangeText={handleChange('monthlyIncome')}
                                    onBlur={handleBlur('monthlyIncome')}
                                    value={values.monthlyIncome}
                                    ref={monthlyIncomeRef}
                                />
                            </View>
                            {errors.monthlyIncome && touched.monthlyIncome && (
                                <Text style={styles.error}>{errors.monthlyIncome}</Text>
                            )}

                            {
                                isValid === true ?
                                    <CommonButton children={'Continue'}
                                        onPress={handleSubmit}
                                        style={{ marginTop: 70 }}
                                    />
                                    :
                                    <View style={{ alignItems: 'center', marginTop: 70 }}>
                                        <View style={styles.disabledButtonContainer}>
                                            <Text style={styles.continueText}>
                                                Continue
                                            </Text>
                                        </View>
                                    </View>

                            }


                        </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    body: {
        padding: SIZES.padding,
    },
    header: {},
    backButtonSize: { width: 24, height: 24 },
    headerTextContainer: {
        paddingVertical: 20,
    },
    headerText: {
        fontSize: SIZES.h1,

    },
    input: {
        height: Responsive.height(50),
        borderBottomWidth: 1,
        borderColor: '#4159FA',
        color: '#1C1B1B',

    },
    textInput: {
        backgroundColor: '#ffffff',
        color: '#1C1B1B',
        paddingHorizontal: 16,
        fontSize: SIZES.h3,
        marginVertical: 8,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#4159FA',
    },
    inputContainer: {
        //   backgroundColor: 'red',
        height: 60,
    },
    inputTextTitle: {
        fontSize: 14,

        color: '#4159FA',
    },
    checkMarkIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: -28,
        tintColor: '#CB3EF9',
        marginBottom: Responsive.height(8),
    },
    error: {
        fontSize: 10,
        color: 'red',
    },
    disabledButtonContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f3ff',
        width: Responsive.width(245),
        height: Responsive.height(56),
        justifyContent: 'center',
        borderRadius: 28,
        elevation: 5,
        shadowColor: '#d8ddff',
    },
    continueText: {
        fontSize: 20,
        color: '#2743FD',
        fontFamily: FONTS.montserrat500,
    },
});
