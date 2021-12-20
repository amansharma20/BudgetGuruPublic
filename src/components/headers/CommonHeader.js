/* eslint-disable prettier/prettier */
import React, { Children, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    Modal,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTS, icons, SIZES } from '../../../constants';
import CommonButton from '../buttons/CommonButton';
import { Responsive } from '../../../constants/Layout';

const CommonHeader = ({Children, style}) => {
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
        <View style={[styles.container, style]}>
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
                onPress={() => setShowModal(true)}
                style={styles.rightIconContainer}>
                <Image
                    // source={icons.addIcon}
                    style={{ width: 31, height: 31, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            {/* MODAL  */}
            {showModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showModal}
                    onRequestClose={() => setShowModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 32,
                                            color: '#262626',
                                            
                                        }}>
                                        Add Spend
                                    </Text>
                                </View>
                                <View style={{ width: '100%' }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ marginVertical: 12 }}>
                                            <Text style={styles.inputTextTitle}>Amount</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Amount"
                                                keyboardType="numeric"
                                                placeholderTextColor={'#8b8b8b'}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '100%' }}>
                                        <View style={{ marginVertical: 12 }}>
                                            <Text style={styles.inputTextTitle}>Select Category</Text>
                                            <DropDownPicker
                                                open={openSelectCategory}
                                                value={categoryValue}
                                                items={selectCategory}
                                                setOpen={setOpenSelectCategory}
                                                setValue={setCategoryValue}
                                                setItems={setSelectCategory}
                                                placeholder="Options"
                                                style={styles.selectCategoryPickerContainer}
                                                placeholderStyle={styles.placeholderText}
                                                listMode="FLATLIST"
                                                dropDownContainerStyle={styles.dropDownContainerStyle}
                                                closeAfterSelecting={true}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: '100%' }}>
                                        <View style={{ marginVertical: 12 }}>
                                            <Text style={styles.inputTextTitle}>Date</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Date {mm-yyyy}"
                                                keyboardType="numeric"
                                                placeholderTextColor={'#8b8b8b'}
                                            />
                                        </View>
                                    </View>

                                </View>
                                <View>
                                   <CommonButton children="Add" onPress={() => setShowModal(false)}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CommonHeader;

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
        fontFamily: FONTS.montserrat700,
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
        height: Responsive.height(50),
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
