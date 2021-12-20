/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { FONTS, images, SIZES } from '../../../constants';
import * as Progress from 'react-native-progress';
import { Responsive } from '../../utils/layouts/Layout';
import { useNavigation } from '@react-navigation/core';
import { CommonStyles } from '../../utils/CommonStyles';

const UserGoalsItem = (props) => {
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 14 }}>
                <View>
                    <View style={styles.textContainerName}>
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
                    progress={(goal.SavedAmount) / (goal.TargetAmount)}
                    width={Responsive.width(280)}
                    unfilledColor={'#eff0f2'}
                    borderWidth={0}
                    height={3}
                    color={'#FFE600'}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.textContainer}>
                    <Text style={styles.amountDoneText}>{goal.SavedAmount}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.totalAmountText}>{goal.TargetAmount}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.padding,
        marginVertical: 10,
        elevation: 7,
        borderRadius: 12,
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 20,
        justifyContent: 'space-between',
    },
    textContainerName: {
        width: '100%',
    },
    goalText: {
        fontSize: 22,
        color: '#262626',
        fontFamily: FONTS.montserrat700,
    },
    monthsLeftText: {
        fontSize: 12,
        color: '#B8B8B8',
        fontFamily: FONTS.montserrat700,
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
});

export default UserGoalsItem;
