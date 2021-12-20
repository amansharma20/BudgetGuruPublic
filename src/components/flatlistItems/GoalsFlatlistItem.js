/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FONTS, SIZES } from '../../../constants';
import * as Progress from 'react-native-progress';
import { Responsive } from '../../utils/layouts/Layout';
import { useNavigation } from '@react-navigation/core';
import { CommonStyles } from '../../utils/CommonStyles';

const Goals = (props) => {
    const navigation = useNavigation();
    const goal = props.goal;

    const getPercentage = () => {
        const percentage = (goal.SavedAmount * 100) / goal.TargetAmount;
        const nanPer = percentage / 100;
        return Number.isNaN(nanPer) ? 0 : nanPer;
    };
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.container, CommonStyles.appShadow]}
            onPress={() => navigation.navigate('GoalScreen', { goal: goal })}
        >
            <View style={styles.topContainer}>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.goalText}>{goal.GoalName}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.monthsLeftText}>{goal.monthsLeft}</Text>
                    </View>
                </View>
                <View>
                    <Progress.Circle
                        progress={getPercentage()}
                        width={40}
                        unfilledColor={'#eff0f2'}
                        borderWidth={0}
                        height={52}
                        color={'#0263FF'}
                    />
                    <Text style={styles.percentageCircle}>{getPercentage().toFixed(2) * 100}%</Text>
                </View>
            </View>
            <View style={styles.progressBarContainer}>
                <Progress.Bar
                    progress={getPercentage()}
                    width={Responsive.width(260)}
                    unfilledColor={'#eff0f2'}
                    borderWidth={0}
                    height={3}
                    color={'#FFE600'}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.textContainer}>
                    <Text style={styles.amountDoneText}>{goal.SavedAmount}</Text>
                </View><View style={styles.textContainer}>
                    <Text style={styles.totalAmountText}>{goal.TargetAmount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginRight: 16,
        paddingHorizontal: SIZES.padding,
        marginVertical: SIZES.padding2,
        elevation: 7,
        borderRadius: 12,
        width: 280,
        height: 128,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    topContainer: {
        flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14,
    },
    textContainer: {
    },
    goalText: {
        fontSize: 22,
        color: '#262626',
        fontFamily: FONTS.montserrat700,

    },
    monthsLeftText: {
        fontSize: 12,
        color: '#B8B8B8',
    },
    percentageCircle: {
        fontFamily: FONTS.montserrat700,
        marginTop: 12,
        fontSize: 10,
        alignSelf: 'center',
        position: 'absolute',
    },
    amountDoneText: {
        color: '#364FFB',
        fontSize: 12,
        fontFamily: FONTS.montserrat700,
    },
    totalAmountText: {
        fontSize: 12,
        color: '#262626',
        fontFamily: FONTS.montserrat700,
    },
    progressBarContainer: {
        marginTop: 6,
        alignItems: 'center',
        marginBottom: 4,
    },
    footer: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default Goals;
