/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    Dimensions,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Responsive } from '../../utils/layouts/Layout';
import { FONTS, icons, images, SIZES } from '../../../constants';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function HomeScreenHeader({ children, onPress}) {

    const navigation = useNavigation();

    return (
        <ImageBackground source={images.homeBackground} imageStyle={{
            flex: 1,
            resizeMode: 'stretch',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginLeft: 160,
            width: 230,
        }} style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileScreen')}
                    style={styles.leftIconContainer}>
                    <Image
                        source={icons.pfpHome}
                        style={{ width: 44, height: 44, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText}>{children}</Text>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.rightIconContainer}>
                    <Image
                        source={icons.addIcon}
                        style={{ width: 31, height: 31, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#364ffb',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: Platform.select({
            ios: 40,
            android: 16,
        }),
        // alignItems: 'center',,
        marginTop: Platform.select({
            ios: 0,
            android: 0,
        }),
        height: 155,
    },
    iconSizeLeft: { width: 34, height: 34 },
    iconSizeRight: { width: 28, height: 28 },
    headerText: {
        fontSize: 28,
        color: '#F3F5FF',
        fontFamily: FONTS.proxima700
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
    modalBackground: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        width: '90%',
        height: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        width: '100%',
        paddingHorizontal: SIZES.padding3,
    },
    input: {
        height: Responsive.height(40),
        borderBottomWidth: 1,
        borderColor: '#282828',
        color: '#000000',
    },
    textInput: {
        backgroundColor: '#ffffff',
        color: '#1C1B1B',
        paddingHorizontal: 16,
        fontSize: SIZES.h3,
       
        marginVertical: 16,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#282828',
    },
    inputContainer: {
        //   backgroundColor: 'red',
        height: 60,
    },
    inputTextTitle: {
        fontSize: 14,
       
        color: '#282828',
    },
    selectCategoryPickerContainer: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderBottomWidth: 1,
        marginTop: 10,
    },
    placeholderText: {
        fontSize: SIZES.h3,
        color: '#B4B4B4',
    },
    dropDownContainerStyle: {
        backgroundColor: '#f4f5f7',
        borderWidth: 0,
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
        borderRadius: 8,
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
        color: '#B4B4B4',
        fontSize: SIZES.h3,
    },
    submitDateButtonText: {
        fontSize: 16, color: '#4D2D8F',
        fontFamily: FONTS.montserrat700,
    },
});
