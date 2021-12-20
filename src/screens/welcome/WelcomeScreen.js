/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, images, SIZES } from '../../../constants';
import Icons from '../../../constants/Icons';
import CommonButton from '../../components/buttons/CommonButton';
import { Responsive } from '../../../constants/Layout';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={images.staticOnBoarding} style={styles.background}>
                <Text style={{fontSize: 36, fontFamily: FONTS.montserrat700, color: '#F8F6FF', top: 80, left: 40}}>Welcome</Text>
            </ImageBackground>
            <View style={{marginTop: -50}}>
                <CommonButton onPress={() => navigation.navigate('LoginScreen')} children="Login" />
                <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')} style={{ alignItems: 'center', marginTop: 20 }}>
                    <View style={styles.signUpButtonContainer}>
                        <Text style={styles.signupBtnText}>
                            Sign Up
                        </Text>
                    </View>
                </TouchableOpacity>
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
});
