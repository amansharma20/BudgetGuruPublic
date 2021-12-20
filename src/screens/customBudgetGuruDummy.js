/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, images } from '../../../constants';

export default function CustomBudgetGuruDummy() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={images.homeBackground} imageStyle={{
                flex: 1,
                resizeMode: 'stretch',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                marginLeft: 160,
                width: 230,
            }} style={styles.containerHeader}>
                <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.leftIconContainer}>
                        <Image
                            source={icons.backButtonWhite}
                            style={{ width: 25, height: 20, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Header</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddExpense')}
                        style={styles.rightIconContainer}>
                        <Image
                            source={icons.addIcon}
                            style={{ width: 31, height: 31, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <View>
                        <Text>
                            text
                        </Text>
                    </View>
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
    containerHeader: {
        backgroundColor: '#364ffb',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: Platform.select({
            ios: 40,
            android: 16,
        }),
        marginTop: Platform.select({
            ios: 0,
            android: 0,
        }),
        height: 155,
    },
    leftIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 28,
        color: '#F3F5FF',
        fontFamily: FONTS.montserrat700,
    },
    bodyContainer: {
        backgroundColor: '#364ffb',
        flex: 1,
        paddingTop: 20
    },
    body: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 16,
        marginTop: -70,
    },
});
