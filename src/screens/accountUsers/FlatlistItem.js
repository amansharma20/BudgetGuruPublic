/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';
import { Responsive } from '../../utils/layouts/Layout';
import CommonLoading from '../../components/loading/CommonLoading';
import Toast from 'react-native-toast-message';
import { useMutation } from '@apollo/client';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import { GQLQuery } from '../../persistence/query/Query';

export default function Item({ firstName, lastName, email, isAdmin }) {
    const navigation = useNavigation();
    const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);
    const [showUserRemovedModal, setShowUserRemovedModal] = useState(false);


    const [submitRemoveEmail,
        { data: removeData, loading: removeLoading, error: removeError }] = useMutation(GQLMutation.REMOVE_USER,
            {
                refetchQueries: [{ query: GQLQuery.GET_GROUP_INVITATION }],
            }
        );

    const deleteUserSubmit = (val) => {
        CommonLoading.show();
        submitRemoveEmail({
            variables: {
                Email: val,
            },
        }).then(({ removeData }) => {
            CommonLoading.hide();
            setShowModal(false);
            setShowCongratulationsModal(true);
        }).catch(e => {
            //ERROR
            console.log(e);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Oops',
                text2: 'You are not a Group Owner!',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            CommonLoading.hide();
        });
    };

    return (
        <View style={styles.adminContainer}>
            <View style={styles.leftAdminContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.nameText}>
                        {firstName}
                    </Text>
                    <Text style={[styles.nameText, { marginLeft: 4 }]}>
                        {lastName}
                    </Text>
                </View>
                <Text style={styles.emailText}>
                    {email}
                </Text>
            </View>
            {
                isAdmin == true ?
                    <View style={styles.accountTypeConatiner}>
                        <Text style={styles.adminText}>
                            Admin
                        </Text>
                    </View>
                    :
                    <TouchableOpacity
                        // onPress={() => deleteUserSubmit(email)}
                        onPress={() => setShowConfirmRemoveModal(true)}
                    >
                        <Image
                            source={icons.bin}
                            style={[styles.addIcon, { alignSelf: 'center' }]}
                        />
                    </TouchableOpacity>
            }
            {showConfirmRemoveModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showConfirmRemoveModal}
                    onRequestClose={() => setShowConfirmRemoveModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.alone} style={{ width: 250, height: 250, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.subText}>
                                        Are you sure? you want to remove
                                    </Text>
                                    <Text style={[styles.subText, {
                                        fontSize: 14, fontFamily: FONTS.proxima500,
                                        textAlign: 'center', color: COLORS.textBlue,
                                    }]}>
                                        {firstName} {lastName} ({email})
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Confirm" onPress={
                                        () =>
                                            deleteUserSubmit(email)
                                            ||
                                            setShowConfirmRemoveModal(false)
                                            ||
                                            setShowUserRemovedModal(true)}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {/* user removed MODAL  */}
            {showUserRemovedModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showUserRemovedModal}
                    onRequestClose={() => setShowUserRemovedModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.alone} style={{ width: 250, height: 250, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        User removed
                                    </Text>
                                    <Text style={styles.subText}>
                                        You have removed the user from the goals
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Confirm" onPress={() => setShowUserRemovedModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    adminContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderRadius: 16,
        marginTop: 20,
    },
    leftAdminContainer: {

    },
    nameText: {
        color: '#343434',
        fontSize: 18,
        fontFamily: FONTS.proxima700,
    },
    emailText: {
        color: '#8F8F8F',
        fontSize: 14,
        fontFamily: FONTS.proxima500,
    },
    addIcon: { width: 31, height: 31, resizeMode: 'contain' },
    accountTypeConatiner: {
        borderWidth: 1,
        borderColor: '#00b207',
        borderRadius: 20,
        width: 72,
        height: 31,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    adminText: {
        color: '#20BC26',
        fontSize: 14,
        fontFamily: FONTS.proxima500,
        alignSelf: 'center',
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
        marginVertical: '60%',
        marginHorizontal: '12%',
        // paddingVertical: 24,
    },
    modalBody: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        width: '100%',
        paddingHorizontal: SIZES.padding3,
    },
    inviteText: {
        fontSize: 32,
        color: '#262626',
        fontFamily: FONTS.proxima700,
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        color: '#9D9D9D',
        fontFamily: FONTS.proxima500,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputTextTitle: {
        fontSize: 14,
        color: '#282828',
        fontFamily: FONTS.proxima500,
    },
    input: {
        height: Responsive.height(50),
        // backgroundColor: 'red',
        borderBottomWidth: 1,
        borderColor: '#282828',
        color: '#000000',
    },

});
