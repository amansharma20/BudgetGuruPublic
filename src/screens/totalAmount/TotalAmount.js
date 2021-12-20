/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ScrollView,
    Image,
} from 'react-native';
import _ from 'lodash';
import HomeScreenHeader from '../../components/headers/HomeScreenHeader';
import { BarChart, YAxis } from 'react-native-svg-charts';
import Icons from '../../../constants/Icons';
import { FONTS } from '../../../constants';
import { ExpandableListView } from 'react-native-expandable-listview';
import TopCategorySubItem from './TopCategorySubItem';
import { useQuery } from '@apollo/client';
import { GQLQuery } from '../../persistence/query/Query';
import TopCategoryItemShopping from './categoryTotalAmount/TopCategoryItemShopping';
import TopCategoryItemTravel from './categoryTotalAmount/TopCategoryItemTravel';
import TopCategoryItemGroceries from './categoryTotalAmount/TopCategoryItemGroceries';
import TopCategoryItemEntertainment from './categoryTotalAmount/TopCategoryItemEntertainment';
import TopCategoryItemOther from './categoryTotalAmount/TopCategoryItemOther';


const CONTENT = [
    {
        id: '1',
        categoryName: 'Shopping',
        customItem: (
            <TopCategoryItemShopping
                categoryName={'Shopping'}
                leftIcon={
                    <Image source={Icons.shoppingBag} style={{
                        width: 40,
                        height: 40,
                    }} />
                }
                percentage={'(20%)'}
                amountSpend={1000}
            />
        ),
        subCategory: [
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Travel'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '1',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'LifeStyle'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '2',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Others'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '3',
                name: '',
            },
        ],
    },
    {
        id: '2',
        categoryName: 'Travel',
        customItem: (
            <TopCategoryItemTravel
                categoryName={'Travel'}
                leftIcon={
                    <Image source={Icons.travelIcon} style={{
                        width: 40,
                        height: 40,
                    }} />
                }
                percentage={'(20%)'}
                amountSpend={0}
            />
        ),
        subCategory: [
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '1',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '2',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '3',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '4',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '5',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '6',
                name: '',
            },
        ],
    },
    {
        id: '3',
        categoryName: 'Groceries',
        customItem: (
            <TopCategoryItemGroceries
                categoryName={'Groceries'}
                leftIcon={
                    <Image source={Icons.groceries} style={{
                        width: 40,
                        height: 40,
                    }} />
                }
                percentage={'(20%)'}
                amountSpend={1000}
            />
        ),
        subCategory: [
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '1',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '2',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '3',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '4',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '5',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '6',
                name: '',
            },
        ],
    },
    {
        id: '4',
        categoryName: 'Entertainment',
        customItem: (
            <TopCategoryItemEntertainment
                categoryName={'Entertainment'}
                leftIcon={
                    <Image source={Icons.entertainment} style={{
                        width: 40,
                        height: 40,
                    }} />
                }
                percentage={'(20%)'}
                amountSpend={1000}
            />
        ),
        subCategory: [
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '1',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '2',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '3',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '4',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '5',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '6',
                name: '',
            },
        ],
    },
    {
        id: '5',
        categoryName: 'Others',
        customItem: (
            <TopCategoryItemOther
                categoryName={'Others'}
                leftIcon={
                    <Image source={Icons.otherIcon} style={{
                        width: 40,
                        height: 40,
                    }} />
                }
                percentage={'(20%)'}
                amountSpend={1000}
            />
        ),
        subCategory: [
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '1',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '2',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />
                    </View>
                ),
                id: '3',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '4',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '5',
                name: '',
            },
            {
                customInnerItem: (
                    <View style={{ paddingVertical: 10 }}>
                        <TopCategorySubItem serialNumber={1} subCategoryName={'Shopping'} subCategoryAmountSpend={1000} />

                    </View>
                ),
                id: '6',
                name: '',
            },
        ],
    },
];

const contentInset = { top: 10, bottom: 10 };


function handleItemClick({ index }) {
   
}

function handleInnerItemClick({ innerIndex }) {
   
}


export default function TotalAmountScreen() {

    const { data: monthlySpend } = useQuery(GQLQuery.GET_CATEGORY_EXPENSE);
    const MonthlySpend = monthlySpend && monthlySpend.ExpenseQuery && monthlySpend.ExpenseQuery.GetUserMonthlyExpenses;

    const { data: userTopThreeExpenses } = useQuery(GQLQuery.GET_USER_EXPENSES);


    const yAxisData = [0, 1200];

    const [pieChartData, setPieChartData] = useState(data)


    const data = [
        {
            value: 200,
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
            value: 400,
            svg: {
                fill: '#8E30FF',
            },
        },
        {
            value: 466,
            svg: {
                fill: '#313054',
            },
        },
        {
            value: 5000,
            svg: {
                fill: '#FD7350',
            },
        },
    ];


    return (
        <ScrollView style={styles.container}>
            <StatusBar hidden={false} backgroundColor={'white'} barStyle={'dark-content'} />
            <HomeScreenHeader children="Total Amount" />
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <View style={{ alignItems: 'center', paddingTop: 24 }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>


                            <View style={{
                                padding: 20, alignItems: 'center', elevation: 5, width: '75%', flexDirection: 'row', borderRadius: 10, backgroundColor: '#ffffff',
                                marginLeft: 40,
                            }}>
                                <YAxis
                                    data={yAxisData}
                                    contentInset={contentInset}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => `$${value}`}
                                />
                                <View style={{
                                    flex: 1, height: 222, width: 222, paddingHorizontal: 10, backgroundColor: '#ffffff',
                                    borderWidth: 1, borderStyle: 'dashed',
                                    borderRadius: 0.05,
                                    borderColor: '#cccccc',
                                    borderTopWidth: 0,
                                    borderRightWidth: 0,
                                    flexDirection: 'row',
                                }}>

                                    <BarChart
                                        style={{ flex: 1 }}
                                        data={data}
                                        gridMin={0}
                                        yAccessor={({ item }) => item.value}
                                        spacingInner={0.5}
                                        contentInset={{ top: 0 }}
                                        yMin={0}
                                        yMax={MonthlySpend}
                                    />
                                </View>
                            </View>
                            {/* <TouchableOpacity style={{ marginLeft: 20 }}>
                                <Image source={icons.filter} style={{ width: 21, height: 21 }} />

                            </TouchableOpacity> */}
                        </View>



                    </View>

                    <View style={{ flex: 1 }}>
                        <ExpandableListView
                            // ExpandableListViewStyles={{borderTopWidth:1}} // styles to expandable listview
                            // renderInnerItemSeparator={false} // true or false, render separator between inner items
                            // renderItemSeparator={false} // true or false, render separator between Items
                            // itemContainerStyle={{}} // add your styles to all item container of your list
                            // itemLabelStyle={{}} // add your styles to all item text of your list
                            // customChevron={{}} // your custom image to the indicator
                            // chevronColor="white" // color of the default indicator
                            // innerItemContainerStyle={{}} // add your styles to all inner item containers of your list
                            // itemLabelStyle={{}} // add your styles to all inner item text of your list
                            // itemImageIndicatorStyle={{}} // add your styles to the image indicator of your list
                            // animated={true} // sets all animations on/off, default on
                            // defaultLoaderStyles?: ViewStyle; // Set your styles to default loader (only for animated={true})
                            // customLoader?: JSX.Element; Pass your custom loader, while your content is measured and rendered (only for animated={true})
                            data={CONTENT}
                            // data={listDataSource}
                            onInnerItemClick={handleInnerItemClick}
                            onItemClick={handleItemClick}
                            itemContainerStyle={{ backgroundColor: '#ffffff', padding: 0 }}
                        />
                    </View>



                </View>
            </View>
        </ScrollView>
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
        paddingTop:30
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
});
