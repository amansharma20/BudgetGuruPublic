/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    FlatList,
    Platform,
    RefreshControl,
} from 'react-native';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import HomeScreenHeader from '../../components/headers/HomeScreenHeader';
import { FONTS } from '../../../constants';
import { useQuery } from '@apollo/client';
import { GQLQuery } from '../../persistence/query/Query';
import UserGoalsItem from '../../components/flatlistItems/UserGoalsItem';
import GoalsHeader from '../../components/headers/GoalsHeader';


export default function UserGoals() {
    const navigation = useNavigation();
    const { data: goalsDatas, refetch } = useQuery(GQLQuery.GET_GOALS);
    const Goals = goalsDatas && goalsDatas.GoalQuery && goalsDatas.GoalQuery.GetGoals;


    useEffect(() => {
        refetch()
    }, [])

    const [refresh, setIsRefresh] = useState(false)

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} backgroundColor={'white'} barStyle={'dark-content'} />
            <GoalsHeader onPress={() => navigation.navigate('AddNewGoal')} />
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <View>
                        <View style={styles.goalsContainer}>
                            <Text style={styles.goalsText}>
                                Goals
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                        data={Goals}
                        style={{ flex: 1, backgroundColor: '#ffff' }}
                        renderItem={({ item }) => <UserGoalsItem goal={item} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    refetch();
                                }}
                            />
                        }
                    />

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
    bodyContainer: {
        backgroundColor: '#364ffb',
        flex: 1,
        marginTop: Platform.select({
            ios: 30,
            android: 0,
        }),
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
