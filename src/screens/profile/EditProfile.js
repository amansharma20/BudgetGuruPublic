/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Platform, ScrollView, Modal, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { icons, images, FONTS, SIZES, COLORS } from '../../../constants';
import { Responsive } from '../../utils/layouts/Layout';
import CommonButton from '../../components/buttons/CommonButton';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import { useMutation } from '@apollo/client';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { applicationProperties } from '../../application.properties';
import { GQLQuery } from '../../persistence/query/Query';
import { useQuery } from '@apollo/client';
import * as Keychain from 'react-native-keychain';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function EditProfile() {
    const navigation = useNavigation();

    const signUpValidationSchema = yup.object().shape({
        firstName: yup
            .string()
            .matches()
            .required('First Name is required.'),
        lastName: yup
            .string()
            .matches()
            .required(),
        mobile: yup
            .string()
            .matches()
            .required(),
        monthlyIncome: yup
            .string()
            .matches()
            .required(),
    });
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const mobileRef = useRef();
    const monthlyIncomeRef = useRef();


    const [editProfileMutation] = useMutation(GQLMutation.EDIT_PROFILE, {
        refetchQueries: [{ query: GQLQuery.GET_USER_PROFILE }],
        onError: (error) => {
            let e = JSON.stringify(error);
            console.log(e)
            alert(e);
        },
        onCompleted: () => {
            Alert.alert(
                'Updated',
                'Profile Updated',
                [
                    {
                        text: 'Okay',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        },
    });

    const submit = data => {
        editProfileMutation({
            variables: {
                FirstName: data.firstName,
                LastName: data.lastName,
                MonthlyIncome: data.monthlyIncome,
                DateOfBirth: date.toISOString(),
                MobileNumber: data.mobile,
            },
        });
    };

    const { data: userProfile } = useQuery(GQLQuery.GET_USER_PROFILE);
    const User = userProfile && userProfile.ProfileDetailsQuery && userProfile.ProfileDetailsQuery.GetProfileDetails;


    const profilePicture = userProfile && userProfile.ProfileDetailsQuery && userProfile.ProfileDetailsQuery.GetProfileDetails && userProfile.ProfileDetailsQuery.GetProfileDetails.ProfilePictureStoragePath;
    const [showDateModal, setShowDateModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const formatedDate = (date) => {
        var formattedDate = format(date, 'MMMM do, yyyy');
        return formattedDate;
    };




    const selectFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose file from Custom Option',
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            const FileName = response.assets && response.assets[0] && response.assets[0].fileName;
            const type = response.assets && response.assets[0] && response.assets[0].type;
            const uri = response.assets && response.assets[0] && response.assets[0].uri;

            const datas = new FormData();
            datas.append('ImageFile', {
                fileName: FileName,
                type: type,
                name: type,
                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
            });
            uploadImage(datas);
        });
    };


    async function uploadImage(data) {
        const client = axios.create({
            baseURL: applicationProperties.baseUrl,
        });
        const token = await Keychain.getGenericPassword();
        const header = {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        };
        client.post('Profile/ProfilePictureUpdate', data, {
            headers: header,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const ProfilePicture = applicationProperties.imageUrl + profilePicture;
    console.log(ProfilePicture);


    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingTop: Platform.select({
                        ios: 30,
                        android: 0,
                    }),
                }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.backButtonWhite}
                            style={{
                                width: Responsive.width(25),
                                height: Responsive.height(20),
                                resizeMode: 'contain',
                                marginLeft: 20,
                                marginTop: 24,
                                tintColor: '#5067FE',
                            }}
                        />
                    </TouchableOpacity>
                    {
                        ProfilePicture === 'https://budgetguru-staging-api.azurewebsites.net/files/GetImage/null'
                            ?
                            <TouchableOpacity onPress={() => selectFile()}>
                                <Image
                                    source={images.upload}
                                    style={{
                                        width: Responsive.width(100),
                                        height: Responsive.height(100),
                                        resizeMode: 'contain',
                                        marginLeft: 20,
                                        marginTop: 20,
                                    }}
                                />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => selectFile()}>
                                <Image
                                    source={{
                                        uri: applicationProperties.imageUrl + profilePicture,
                                    }}
                                    style={{
                                        width: Responsive.width(100),
                                        height: Responsive.height(100),
                                        resizeMode: 'contain',
                                        marginLeft: 20,
                                        marginTop: 20,
                                    }}
                                />
                            </TouchableOpacity>

                    }

                </View>
                <Image
                    source={images.detailsInputBg}
                    style={{
                        width: Responsive.width(150),
                        height: Responsive.height(150),
                        resizeMode: 'cover',
                    }}
                />
            </View>

            <Formik
                validationSchema={signUpValidationSchema}
                initialValues={{
                    firstName: (User && User.FirstName),
                    lastName: (User && User.LastName),
                    mobile: '',
                    monthlyIncome: '',
                }}
                onSubmit={values => submit(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <View style={styles.body}>
                            <View>
                                <Text style={styles.inputTextTitle}>First Name</Text>
                                <TextInput
                                    name="firstName"
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    style={styles.input}
                                    // placeholder={User && User.FirstName}
                                    keyboardType="default"
                                    placeholderTextColor={'#000000'}
                                    returnKeyType="next"
                                    onSubmitEditing={() => {
                                        lastNameRef.current.focus();
                                    }}
                                />
                                {errors.firstName && touched.firstName && (
                                    <Text style={styles.error}>{errors.firstName}</Text>
                                )}
                            </View>
                            <View>
                                <Text style={styles.inputTextTitle}>Last Name</Text>
                                <TextInput
                                    name="lastName"
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                    value={values.lastName}
                                    style={styles.input}
                                    // placeholder={User && User.LastName}
                                    keyboardType="default"
                                    placeholderTextColor={'#000000'}
                                    ref={lastNameRef}
                                    onSubmitEditing={() => {
                                        mobileRef.current.focus();
                                    }}
                                />
                                {errors.lastName && touched.lastName && (
                                    <Text style={styles.error}>{errors.lastName}</Text>
                                )}
                            </View>
                            <View style={{ width: '100%' }}>
                                <View>
                                    <Text style={styles.inputTextTitle}>Date</Text>
                                    <TouchableOpacity onPress={() => setShowDateModal(true)}>
                                        <View style={styles.dobContainer}>
                                            <Text style={styles.dobText}>{formatedDate(date)}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View>
                                <Text style={styles.inputTextTitle}>Mobile Number</Text>
                                <TextInput
                                    name="mobile"
                                    onChangeText={handleChange('mobile')}
                                    onBlur={handleBlur('mobile')}
                                    value={values.mobile}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholderTextColor={'#000000'}
                                    maxLength={10}
                                    ref={mobileRef}
                                    onSubmitEditing={() => {
                                        monthlyIncomeRef.current.focus();
                                    }}
                                />
                                {errors.mobile && touched.mobile && (
                                    <Text style={styles.error}>{errors.mobile}</Text>
                                )}
                            </View>

                            <View>
                                <Text style={styles.inputTextTitle}>Monthly Income</Text>
                                <TextInput
                                    name="monthlyIncome"
                                    onChangeText={handleChange('monthlyIncome')}
                                    onBlur={handleBlur('monthlyIncome')}
                                    value={values.monthlyIncome}
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholderTextColor={'#000000'}
                                    ref={monthlyIncomeRef}
                                />
                            </View>
                            {errors.monthlyIncome && touched.monthlyIncome && (
                                <Text style={styles.error}>{errors.monthlyIncome}</Text>
                            )}
                            <CommonButton children={'Continue'} onPress={handleSubmit} />
                        </View>
                    </>
                )}
            </Formik>
            {showDateModal && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    showModal={showDateModal}
                    backgroundColor="black"
                    onRequestClose={() => setShowDateModal(false)}>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        mode="date"
                        style={styles.datePicker}
                    />
                    <View style={styles.dateSubmitContainer}>
                        <TouchableOpacity
                            onPress={() => setShowDateModal(false)}>
                            <View>
                                <CommonButton
                                    children="Submit Date"
                                    onPress={() => setShowDateModal(false)}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
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
        // backgroundColor: 'red',
        borderBottomWidth: 1,
        borderColor: '#4159FA',
        color: COLORS.black,
    },
    textInput: {
        backgroundColor: '#ffffff',
        color: '#1C1B1B',
        paddingHorizontal: 16,
        fontSize: SIZES.h3,
        marginVertical: 16,
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
        marginTop: 10,
        color: '#4159FA',
    },
    datePicker: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: screenWidth,
        height: screenHeight - 100,
    },
    dobContainer: {
        height: 50,
        borderRadius: 0,
        marginTop: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#282828',
    },
    dateSubmitContainer: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff',
    },
    dobText: {
        marginLeft: 10,
        color: '#000000',
        fontSize: SIZES.h3,
    },
    submitDateButtonText: {
        fontSize: 16, color: '#4D2D8F',
        fontFamily: FONTS.montserrat700,
    },
    error: {
        fontSize: 10,
        color: 'red',
        marginTop: 2,
    },
});

