/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../constants';
import Icons from '../../../constants/Icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function StaticOnBoarding() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View>
                <Image source={images.staticOnBoarding} style={styles.background} />
            </View>
            <View style={styles.logoContainer}>
                <Image source={Icons.budgetGuruLogo} style={styles.logoIcon} />
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
    logoContainer: { alignItems: 'center', marginTop: -160 },
    logoIcon: { height: 180, resizeMode: 'contain', width: 180 },
});
