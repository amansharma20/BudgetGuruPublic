/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { icons, SIZES } from '../../../constants';
import { Responsive } from '../../../constants/Layout';

const TermsHeader = ({Children}) => {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);

    const [openSelectCategory, setOpenSelectCategory] = useState(false);

    const [categoryValue, setCategoryValue] = useState(null);

    const [selectCategory, setSelectCategory] = useState([
        { label: 'Shopping', value: 'shopping' },
        { label: 'Travel', value: 'travel' },
        { label: 'Other', value: 'other' },
    ]);


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIconContainer}>
                <Image
                    source={icons.backButtonWhite}
                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>{Children}</Text>
            </View>
            <TouchableOpacity
                // onPress={() => setShowModal(true)}
                style={styles.rightIconContainer}>
                <Image
                    // source={icons.addIcon}
                    style={{ width: 31, height: 31, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default TermsHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#364ffb',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: SIZES.padding2,
        alignItems: 'center',
        marginTop: Platform.select({
            ios: 30,
            android: 0,
        }),
    },
    iconSizeLeft: { width: 34, height: 34 },
    iconSizeRight: { width: 28, height: 28 },
    headerText: {
        fontSize: 24,
        color: '#F3F5FF',
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
        height: '60%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: '55%',
        marginHorizontal: '12%',
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
        // backgroundColor: 'red',
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
});
