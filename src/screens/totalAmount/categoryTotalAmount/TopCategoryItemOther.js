/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../../../constants/Icons';
import { FONTS, icons } from '../../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GQLQuery } from '../../../persistence/query/Query';

export default function TopCategoryItemOther({ categoryName, leftIcon, percentage, amountSpend }) {
    const navigation = useNavigation();
    const { data: categoryExpense } = useQuery(GQLQuery.GET_USER_EXPENSES);
    const CategoryExpense = categoryExpense && categoryExpense.ExpenseQuery && categoryExpense.ExpenseQuery.GetUserExpenses;
    return (
        <View style={styles.topCategoryItemContainer}>
            <View style={styles.topCategoryItemLeftContainer}>
                <View>
                    {leftIcon}

                </View>
                <Text style={styles.topCategoryItemText}>
                {CategoryExpense[3].CategoryName}

                </Text>
                <Text style={styles.topCategoryItemPercentageText}>
                    {percentage}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={styles.topCategoryItemAmountSpendText}>
                    {CategoryExpense[3].TotalGroupExpense}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Image source={Icons.dropDown} style={{ width: 12, height: 6, marginLeft: 16 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topCategoryItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderColor: '#DFE1E5',
        paddingTop: 20,
        backgroundColor: '#ffffff',
    },
    topCategoryItemLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSize: {
        width: 40,
        height: 40,
    },
    topCategoryItemText: {
        marginLeft: 26,
        color: '#455671',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
    },
    topCategoryItemPercentageText: {
        marginLeft: 4,
        color: '#262626',
        fontSize: 12,
        fontFamily: FONTS.montserrat500,
    },
    topCategoryItemAmountSpendText: {
        marginLeft: 4,
        color: '#262626',
        fontSize: 18,
        fontFamily: FONTS.montserrat500,
    },
});
