/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, images, SIZES } from '../../../constants';
import { Responsive } from '../../utils/layouts/Layout';
import { AuthContext } from '../../navigation/ApplicationNavigator';
import Toast from 'react-native-toast-message';
import { useQuery } from '@apollo/client';
import { GQLQuery } from '../../persistence/query/Query';
import { applicationProperties } from '../../application.properties';


export default function ProfileScreen() {
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);

    const { data: userProfile } = useQuery(GQLQuery.GET_USER_PROFILE);

    const User = userProfile
        && userProfile.ProfileDetailsQuery
        && userProfile.ProfileDetailsQuery.GetProfileDetails;


    const profilePicture = userProfile
        && userProfile.ProfileDetailsQuery
        && userProfile.ProfileDetailsQuery.GetProfileDetails
        && userProfile.ProfileDetailsQuery.GetProfileDetails.ProfilePictureStoragePath;


    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    backgroundColor: '#364ffb',
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.backButtonWhite}
                        style={{
                            width: Responsive.width(24),
                            height: Responsive.height(24),
                            resizeMode: 'contain',
                            marginLeft: 20,
                            marginTop: 16,
                        }}
                    />
                </TouchableOpacity>
                <Image
                    source={images.detailsInputBg}
                    style={{
                        width: Responsive.width(200),
                        height: Responsive.height(200),
                        resizeMode: 'cover',
                    }}
                />
            </View>
            <View style={styles.body}>
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#ffffff',
                        elevation: 10,
                        borderRadius: 15,
                        marginTop: -80,
                    }}>
                    <Image
                        source={{
                            uri: applicationProperties.imageUrl + profilePicture,
                        }}
                        style={{ width: 100, height: 100, marginTop: -50 }}
                    />
                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                            paddingHorizontal: 16,
                            marginRight: 16,
                            paddingVertical: 4,
                        }}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditProfile')} style={{
                                padding: 4,
                            }}
                        >
                            <Image
                                source={icons.editProfileIcon}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 8, alignItems: 'center' }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#262626',
                            }}>
                            {User && User.FirstName} {User && User.LastName}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#B8B8B8',
                            }}>
                            {User && User.MobileNumber}
                        </Text>
                    </View>
                    {/* SECTIONS  */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AccountUsers')}
                        style={{
                            width: '100%',
                            paddingHorizontal: 24,
                            marginTop: 16,
                            borderBottomWidth: 1,
                            borderColor: '#E2E2E2',
                            paddingVertical: 8,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.addUser}
                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                            />
                            <Text style={styles.profileItemText}>Users</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('TermsAndConditions')}
                        style={{
                            width: '100%',
                            paddingHorizontal: 24,
                            marginTop: 16,
                            borderBottomWidth: 1,
                            borderColor: '#E2E2E2',
                            paddingVertical: 8,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.termsIcon}
                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                            />
                            <Text style={styles.profileItemText}>Terms & Conditions</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('PrivacyPolicy')}
                        style={{
                            width: '100%',
                            paddingHorizontal: 24,
                            marginTop: 16,
                            borderBottomWidth: 1,
                            borderColor: '#E2E2E2',
                            paddingVertical: 8,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.privacyPolicyIcon}
                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                            />
                            <Text style={styles.profileItemText}>Privacy Policy</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('About')}
                        style={{
                            width: '100%',
                            paddingHorizontal: 24,
                            marginTop: 16,
                            borderBottomWidth: 1,
                            borderColor: '#E2E2E2',
                            paddingVertical: 8,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.aboutIcon}
                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                            />
                            <Text style={styles.profileItemText}>About</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={async () => {
                            signOut();
                            Toast.show({
                                type: 'error',
                                text1: 'Bbye👋',
                                text2: 'You have been logged out.',
                                visibilityTime: 2000,
                                autoHide: true,
                            });
                        }}
                        style={{
                            width: '100%',
                            paddingHorizontal: 24,
                            marginTop: 16,
                            paddingVertical: 8,
                            paddingBottom: 16,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={icons.logoutIcon}
                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                            />
                            <Text style={styles.profileItemText}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#364ffb',
        paddingTop: Platform.select({
            ios: 30,
            android: 0,
        }),
    },
    body: {
        padding: SIZES.padding,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: Dimensions.get('window').height,

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
        height: Responsive.height(40),
        // backgroundColor: 'red',
        borderBottomWidth: 1,
        borderColor: '#4159FA',
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
        color: '#4159FA',
    },
    profileItemText: {
        marginLeft: 16,
        color: '#484848',
        fontFamily: FONTS.montserrat500,
    },
});
