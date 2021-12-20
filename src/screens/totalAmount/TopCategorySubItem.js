/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../../constants/Icons';
import { FONTS, icons } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TopCategorySubItem({serialNumber, subCategoryName, subCategoryAmountSpend}) {
    const navigation = useNavigation();
    return (
        <View style={styles.subCategoryItemContainer}>
            <View style={styles.subCategoryBody}>
                <View style={styles.textContainer}>
                    <Text style={styles.serialNumberText}>{serialNumber}</Text>
                    <Text style={styles.subCategoryNameText}>{subCategoryName}</Text>
                </View>

                <Text style={styles.subCategoryAmountSpendText}>{subCategoryAmountSpend}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subCategoryItemContainer: {
        flexDirection: 'row',
        marginLeft: 15,
    },
    subCategoryBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
    },
    serialNumberText: {
        color: '#455671',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
    },
    subCategoryNameText:{
        marginLeft: 42,
        color: '#455671',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
    },
    subCategoryAmountSpendText:{
        color: '#455671',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
    },
});
