/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useReducer, useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    Platform
} from 'react-native';
import _ from 'lodash';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { FONTS, icons, images } from '../../../constants';
import { useQuery } from '@apollo/client';
import { GQLQuery } from '../../persistence/query/Query';
import { CommonStyles } from '../../utils/CommonStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import SubCategoryGraphDetails from './SubCategoryGraphDetails';


const tempGraph = [
    {
        value: 21000,
        svg: {
            fill: '#0263FF',
        },
    },
    {
        value: 300,
        svg: {
            fill: '#FF7723',
        },
    },
    {
        value: 4000,
        svg: {
            fill: '#8E30FF',
        },
    },
    {
        value: 400,
        svg: {
            fill: '#313054',
        },
    },
    {
        value: 599,
        svg: {
            fill: '#FD7350',
        },
    },
];

export default function TotalSpendDetails() {

    const navigation = useNavigation();

    const { data: monthlySpend } = useQuery(GQLQuery.GET_CATEGORY_EXPENSE);
    const MonthlySpend = monthlySpend && monthlySpend.ExpenseQuery && monthlySpend.ExpenseQuery.GetUserMonthlyExpenses;

    const { data: userTopThreeExpenses } = useQuery(GQLQuery.GET_USER_EXPENSES,{
        onCompleted:()=>{
            bootstrapAsync();
        }
    });
    const UserTopExpenses = userTopThreeExpenses && userTopThreeExpenses.ExpenseQuery && userTopThreeExpenses.ExpenseQuery.GetUserExpenses;

    const [dropDownList, setDropDownList] = useState()
    const yAxisData = [0, 1000];

    const contentInset = { top: 10, bottom: 10 };
    const [graphState, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_GRAPH':
                    return {
                        ...prevState,
                        graphData: action.data,
                        isLoading: false,
                    };
                case 'GRAPH_LOADED':
                    return {
                        ...prevState,
                        graphData: action.data,
                    };
            }
        },
        {
            isLoading: true,
            graphData: tempGraph,
        },
    );


    const bootstrapAsync = async () => {
        let tempGraphData = [];
        let categoryDropDownArray = [];
        UserTopExpenses && UserTopExpenses.map((item) => {
            const categoryList = {
                isExpanded: false,
                category_name: item.CategoryName,
                category_Id: item.Id,
                subcategory: [{ id: 1, val: 'Sub' }],
            };
            categoryDropDownArray.push(categoryList)
            const values = {
                value: item.TotalGroupExpense,
                svg: {
                    fill: '#FF7723',
                },
            }
            tempGraphData.push(values)
        })
        setDropDownList(categoryDropDownArray)
        tempGraphData === [] ? dispatch({ type: 'RESTORE_GRAPH', data: tempGraph })
            : dispatch({ type: 'GRAPH_LOADED', data: tempGraphData })
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar hidden={false} backgroundColor={'white'} barStyle={'dark-content'} />
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
                        <Text style={styles.headerText}>Total Amount</Text>
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
                    <View style={{ alignItems: 'center', paddingTop: 24 }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={[styles.chartBackground, CommonStyles.appShadow]}>
                                <YAxis
                                    data={yAxisData}
                                    contentInset={contentInset}
                                    svg={{
                                        fill: '#333333',
                                        fontSize: 10,
                                        fontWeight: '600'
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `₹${value}`}
                                />
                                <View style={{
                                    flex: 1, height: 222, width: 222, paddingHorizontal: 10, backgroundColor: '#ffffff',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderRadius: 1,
                                    borderColor: '#cccccc',
                                    borderTopWidth: 0,
                                    borderRightWidth: 0,
                                    flexDirection: 'row',
                                }}>
                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={graphState.graphData}
                                        gridMin={0}
                                        yAccessor={({ item }) => item.value}
                                        spacingInner={0.5}
                                        contentInset={{ top: 0 }}
                                        yMin={0}
                                        yMax={MonthlySpend}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {dropDownList && <SubCategoryGraphDetails content={dropDownList} />}

        </ScrollView>
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
        // alignItems: 'center',,
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
    topCategoriesContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    topCategoryItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderColor: '#DFE1E5',
        paddingTop: 20,
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
    chartBackground: {
        padding: 20,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#ffff',

    }
});



// const CONTENT = [
//     {
//         id: '1',
//         categoryName: 'Shopping',
//         customItem: (
//             <TopCategoryItemShopping
//                 categoryName={'Shopping'}
//                 leftIcon={
//                     <Image source={Icons.shoppingBag} style={{
//                         width: 40,
//                         height: 40,
//                     }} />
//                 }
//                 percentage={'(20%)'}
//                 amountSpend={1000}
//             />
//         ),
//         subCategory: [
//             {
//                 customInnerItem: (
//                     <View style={{ paddingVertical: 10 }}>
//                         <TopCategorySubItem serialNumber={1} subCategoryName={'Travel'} subCategoryAmountSpend={1000} />
//                     </View>
//                 ),
//                 id: '1',
//                 name: '',
//             },
//             {
//                 customInnerItem: (
//                     <View style={{ paddingVertical: 10 }}>
//                         <TopCategorySubItem serialNumber={1} subCategoryName={'LifeStyle'} subCategoryAmountSpend={1000} />
//                     </View>
//                 ),
//                 id: '2',
//                 name: '',
//             },
//         ],
//     },
// ];