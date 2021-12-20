/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
    TextInput,
    Dimensions,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import CommonButton from '../../components/buttons/CommonButton';
import { Responsive } from '../../utils/layouts/Layout';
import { FONTS, SIZES } from '../../../constants';
import { format } from 'date-fns';
import { GQLQuery } from '../../persistence/query/Query';
import { useMutation, useQuery } from '@apollo/client';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import CommonLoading from '../../components/loading/CommonLoading';
import Toast from 'react-native-toast-message';
import CommonHeader from '../../components/headers/CommonHeader';
import DatePicker from 'react-native-date-picker';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function AddExpense() {

    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const screenHeight = Dimensions.get('screen').height;


    const [openSelectCategory, setOpenSelectCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectCategory, setSelectCategory] = useState();
    const [categoryMinHeight, setCategoryMinHeight] = useState(null);

    const [openSelectSubCategory, setOpenSelectSubCategory] = useState(false);
    const [subCategoryValue, setSubCategoryValue] = useState(null);
    const [selectSubCategory, setSubSelectCategory] = useState();
    const [subCategoryMinHeight, setSubCategoryMinHeight] = useState(null);

    const [showDateModal, setShowDateModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const formatedDate = (date) => {
        var formattedDate = format(date, 'MMMM do, yyyy');
        return formattedDate;
    };

    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(1);

    const [spendAmount, setSpendAmount] = useState(0);
    const [remark, setRemark] = useState('');

    const [submitExpenseData] = useMutation(GQLMutation.ADD_EXPENSE, {
        refetchQueries: [{ query: GQLQuery.GET_USER_EXPENSES },
        { query: GQLQuery.GET_CATEGORY_EXPENSE }],
        onCompleted: () => {
            CommonLoading.hide();
            navigation.goBack();
            Toast.show({
                type: 'success',
                text1: 'Expense Added',
                text2: 'Happy Budgeting!',
                visibilityTime: 2000,
                autoHide: true,
            });
        },
        onError: () => {
            CommonLoading.hide();
            Toast.show({
                type: 'error',
                text1: 'Something went wrong.',
                text2: 'Please Try Again!',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    });

    const { data: GqlCategoryData } = useQuery(GQLQuery.GET_CATEGORY);
    const CategoryData = GqlCategoryData && GqlCategoryData.CategoryQuery && GqlCategoryData.CategoryQuery.GetCategories;

    var categoryArray = [];
    function retriveCategories() {
        CategoryData && CategoryData.map((item) => {
            const tempName = {
                label: item.CategoryName,
                value: item.Id,
            };
            categoryArray.push(tempName);
        });
        setSelectCategory(categoryArray);
    }


    const submitData = () => {
        if (spendAmount === 0 || selectedCategoryId === 0 || selectedSubCategoryId === 0) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Fill Details',
                text2: 'Please Fill The Details.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        } else {
            CommonLoading.show();
            submitExpenseData({
                variables: {
                    CategoryId: selectedCategoryId,
                    SubCategoryId: selectedSubCategoryId,
                    Amount: spendAmount,
                    Remarks: remark,
                    Date: date.toISOString(),
                },
            })
        }
    };

    const { data: GqlSubCategoryData } = useQuery(GQLQuery.GET_SUBCATEGORY, {
        variables: {
            CategoryId: selectedCategoryId,
        },
    });
    const SubCategoryData = GqlSubCategoryData && GqlSubCategoryData.SubcategoryQuery && GqlSubCategoryData.SubcategoryQuery.GetSubcategoriesByCategoryId;

    var subcategoryArray = [];
    function getSelectedSubCategory() {
        SubCategoryData && SubCategoryData.map((item) => {
            const tempName = {
                label: item.SubcategoryName,
                value: item.Id,
            };
            subcategoryArray.push(tempName);
        });
        setSubSelectCategory(subcategoryArray);
    }


    useEffect(() => {
        retriveCategories();
    }, [GqlCategoryData, GqlSubCategoryData]);



    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#364ffb', height: screenHeight }} style={styles.modalBackground}>
            <CommonHeader Children="Add Spend" />
            <View style={styles.modalBody}>
                <View style={{ width: '100%', paddingHorizontal: SIZES.padding3 }}>
                    <View style={{ width: '100%' }}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.inputTextTitle}>Amount*</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Amount"
                                keyboardType="numeric"
                                placeholderTextColor={'#8b8b8b'}
                                onChangeText={(text) => setSpendAmount(text)}
                                maxLength={8}
                            />
                        </View>
                    </View>
                    <View style={{ width: '100%', }}>
                        <View style={{ marginVertical: 12, minHeight: categoryMinHeight }}>
                            <Text style={styles.inputTextTitle}>Select Category*</Text>
                            <DropDownPicker
                                open={openSelectCategory}
                                value={categoryValue}
                                items={selectCategory}
                                setOpen={setOpenSelectCategory}
                                onPress={() => setCategoryMinHeight(250)}
                                onClose={() => setCategoryMinHeight(0)}
                                setValue={setCategoryValue}
                                onChangeValue={(value) => {
                                    setSelectedCategoryId(value);
                                    getSelectedSubCategory();
                                }}
                                setItems={setSelectCategory}
                                placeholder="Options"
                                style={styles.selectCategoryPickerContainer}
                                placeholderStyle={styles.placeholderText}
                                listMode="FLATLIST"
                                dropDownContainerStyle={styles.dropDownContainerStyle}
                                closeAfterSelecting={true}
                                dropDownDirection="AUTO"
                                bottomOffset={100}
                                listItemContainerStyle={{ height: 40 }}
                                selectedItemContainerStyle={{
                                    backgroundColor: '#F1DBFF',
                                }}
                                selectedItemLabelStyle={{
                                    fontWeight: 'bold',
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', }}>
                        <View style={{ marginVertical: 12, minHeight: subCategoryMinHeight }}>
                            <Text style={styles.inputTextTitle}>Sub Category*</Text>
                            <DropDownPicker
                                open={openSelectSubCategory}
                                value={subCategoryValue}
                                items={selectSubCategory}
                                setOpen={setOpenSelectSubCategory}
                                setValue={setSubCategoryValue}
                                // onChangeValue={(value) => {
                                //     console.log(value);
                                // }}
                                onChangeValue={(value) => {
                                    setSelectedSubCategoryId(value);
                                }}
                                setItems={setSubSelectCategory}
                                placeholder="Options"
                                style={styles.selectCategoryPickerContainer}
                                placeholderStyle={styles.placeholderText}
                                listMode="FLATLIST"
                                dropDownContainerStyle={styles.dropDownContainerStyle}
                                closeAfterSelecting={true}
                                listItemContainerStyle={{ height: 40 }}
                                selectedItemContainerStyle={{
                                    backgroundColor: '#F1DBFF',
                                }}
                                selectedItemLabelStyle={{
                                    fontWeight: 'bold',
                                }}
                                onPress={() => setSubCategoryMinHeight(120)}
                                onClose={() => setSubCategoryMinHeight(0)}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <View style={{ marginVertical: 12 }}>
                            <Text style={styles.inputTextTitle}>Remark</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Remark"
                                placeholderTextColor={'#8b8b8b'}
                                onChangeText={() => setRemark()}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <View style={{ marginVertical: 0 }}>
                            <Text style={styles.inputTextTitle}>Date*</Text>
                            <TouchableOpacity onPress={() => setShowDateModal(true)}>
                                <View style={styles.dobContainer}>
                                    <Text style={styles.dobText}>{formatedDate(date)}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>

                    <CommonButton
                        children="Add"
                        onPress={submitData}
                    />
                </View>
                {/* <View >
                            <Button
                                title="Close"
                                onPress={() => {
                                    setShowModal(false);
                                    navigation.goBack();
                                }}
                            />
                        </View> */}
            </View>
            {showDateModal && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    showModal={showDateModal}
                    backgroundColor="black"
                    onRequestClose={() => setShowDateModal(false)}>
                    <DatePicker
                        date={date}
                        onDateChange={setDate}
                        mode="date"
                        style={styles.datePicker}
                    />
                    <View style={styles.dateSubmitContainer}>
                        <CommonButton
                            children="Submit Date"
                            onPress={() => {
                                setShowDateModal(false)
                            }}
                        />
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
}

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
        fontSize: 28,
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
        backgroundColor: '#364ffb',
    },
    modalContainer: {
        // backgroundColor: '#364ffb',
        // width: '100%',
        flex: 1,
    },
    modalBody: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    input: {
        height: Responsive.height(50),
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
        backgroundColor: '#f8f8ff',
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
        color: '#282828',
        fontSize: SIZES.h3,
    },
    submitDateButtonText: {
        fontSize: 16, color: '#4D2D8F',
        fontFamily: FONTS.montserrat700,
    },
    datePicker: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: screenWidth,
        height: screenHeight - 100,
    },
});
