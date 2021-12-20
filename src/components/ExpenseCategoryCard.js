/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
} from 'react-native';
import _ from 'lodash';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window');
import * as Progress from 'react-native-progress';
import { FONTS, icons } from '../../constants';
import { Responsive } from '../utils/layouts/Layout';

export default function ExpenseCategoryCard(props) {
    return (
        <View style={styles.topCategoryItemContainer}>
            <View style={styles.topCategoryItemTopRowContainer}>
                <View style={styles.topCategoryItemTopRowContainerLeft}>
                    <Image source={icons.shoppingBag} style={styles.iconContainer} />
                    <Text style={styles.shoppingText}>
                        {props.item.CategoryName}
                    </Text>
                </View>
                <Text style={styles.amountText}>
                    {props.item.TotalGroupExpense}
                </Text>
            </View>
            <View style={styles.progressBarContainer}>
                <Progress.Bar
                    progress={30 / 100}
                    width={Responsive.width(300)}
                    unfilledColor={'#eff0f2'}
                    borderWidth={0}
                    height={3}
                    color={'#31D32E'}
                />
            </View>
            <View style={styles.topCategoryItemBottomRowContainer}>
                <Text style={styles.zeroPercentText}>
                    0%
                </Text>
                <Text style={styles.hundredPercentText}>
                    100%
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    bodyContainer: {
        backgroundColor: '#364ffb',
        flex: 1,
    },
    body: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingVertical: 16,
        marginTop: -70,
    },
    alignMonthlySpend: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    monthlySpendContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        elevation: 5,
        borderRadius: 16,
    },
    monthlySpendAmountText: {
        fontSize: 30,
        fontFamily: FONTS.montserrat700,
        color: '#343434',
    },
    monthlySpendText: {
        fontSize: 20,
        color: '#8f8f8f',
        fontFamily: FONTS.montserrat500,
    },
    topCategorySpendText: {
        fontFamily: FONTS.montserrat700,
        color: '#262626',
        fontSize: 18,
    },
    topCategorySpendMoreButtonText: {
        fontFamily: FONTS.montserrat700,
        fontSize: 15,
        color: '#223EFE',
    },
    topCategorySpendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 18,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    pieChartContainer: {
        marginBottom: 10,
    },
    topCategoryItemContainer: {
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 80,
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 10,
        marginVertical: 10,
    },
    topCategoryItemTopRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
    },
    topCategoryItemTopRowContainerLeft: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
    },
    shoppingText: {
        marginLeft: 25,
        color: '#455671',
        fontSize: 14,
        fontFamily: FONTS.montserrat700,
    },
    amountText: {
        fontSize: 18,
        fontFamily: FONTS.montserrat500,
        color: '#262626',
    },
    progressBarContainer: {
        marginTop: 6,
        alignItems: 'center',
    },
    topCategoryItemBottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    zeroPercentText: {
        marginLeft: 0,
        color: '#909090',
        fontSize: 12,
        fontFamily: FONTS.montserrat400,
    },
    hundredPercentText: {
        marginLeft: 0,
        color: '#909090',
        fontSize: 12,
        fontFamily: FONTS.montserrat400,
    },
    goalsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 26,
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    goalsText: {
        fontFamily: FONTS.montserrat700,
        color: '#262626',
        fontSize: 18,
    },
    goalsMoreButtonText: {
        fontFamily: FONTS.montserrat700,
        fontSize: 15,
        color: '#223EFE',
    },
    topThreeCategoryItemContainer: {
        paddingHorizontal: 16,
    },
});
