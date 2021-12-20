/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Platform, Modal, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, images, SIZES } from '../../../constants';
import CommonButton from '../../components/buttons/CommonButton';
import { TextInput } from 'react-native-gesture-handler';
import { Responsive } from '../../utils/layouts/Layout';
import { useMutation, useQuery } from '@apollo/client';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import { GQLQuery } from '../../persistence/query/Query';
import CommonLoading from '../../components/loading/CommonLoading';
import Toast from 'react-native-toast-message';
import Item from './FlatlistItem';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];



export default function AccountUsers() {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);
    const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
    const [showUserRemovedModal, setShowUserRemovedModal] = useState(false);
    const [showConfirmRemoveModal, setShowConfirmRemoveModal] = useState(false);

    // INVITE USER MUTATION

    const [emailId, setEmailId] = useState('');
    const [deleteUser, setDeleteUser] = useState('');
    const [submitEmail, { data, loading, error }] = useMutation(GQLMutation.INVITE_USER);

    const submitInput = () => {
        if (emailId === null) {
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
        submitEmail({
            variables: {
                Email: emailId,
            },
        }).then(({ data }) => {
            CommonLoading.hide();
            setShowModal(false);
            setShowCongratulationsModal(true);
        }).catch((e) => {
            const errorMessage = JSON.stringify(e.message);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Oops',
                text2: errorMessage,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
            setShowModal(false);
            CommonLoading.hide();
        });
        
        }
    };

    // GET GROUP USERS MUTATION

    const { data: groupUsers, refetch: refetchGroupUsers } = useQuery(GQLQuery.GET_GROUP_USERS);
    const GroupUsers = groupUsers
        && groupUsers.CustomerUserGroupInvitationQuery
        && groupUsers.CustomerUserGroupInvitationQuery.GetGroupUsers;
   
    // REMOVE USER MUTATION
    const [submitRemoveEmail,
        { data: removeData, loading: removeLoading, error: removeError }] = useMutation(GQLMutation.REMOVE_USER,
            {
                refetchQueries: [{ query: GQLQuery.GET_GROUP_INVITATION }],
            }
        );

    const renderItem = ({ item }) => (
        <Item firstName={item.FirstName} lastName={item.LastName} email={item.ApplicationUser.Email}
            isAdmin={item.IsCustomerUserGroupOwner} />
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={images.homeBackground} imageStyle={styles.headerImage} style={styles.containerHeader}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.leftIconContainer}>
                        <Image
                            source={icons.backButtonWhite}
                            style={styles.backButton}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Account Users</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        style={styles.rightIconContainer}>
                        <Image
                            source={icons.addIcon}
                            style={styles.addIcon}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    {/* PARTNER BLOCK */}
                    <FlatList
                        data={GroupUsers}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 10 }}
                    />
                </View>
            </View>
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
                                <Image source={images.inviteModalImage} style={{ width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        Invite
                                    </Text>
                                    <Text style={styles.subText}>
                                        Invite a user to your account
                                    </Text>
                                    <Text style={[styles.subText, { textAlign: 'left', alignSelf: 'flex-start', paddingTop: 14 }]}>
                                        What user can do?{'\n'}
                                        1. Add expenses{'\n'}
                                        2. Can participate in goal{'\n'}
                                        3. Can excess everything
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <View style={{ width: '100%' }}>
                                        <View style={{ marginVertical: 12 }}>
                                            <Text style={styles.inputTextTitle}>Email ID</Text>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="example@example.com"
                                                placeholderTextColor={'#8b8b8b'}
                                                onChangeText={(text) => setEmailId(text)}

                                            />
                                        </View>
                                    </View>
                                    <CommonButton
                                        onPress={submitInput}
                                        children="Send Invite" />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {/* Congratulations MODAL  */}
            {showCongratulationsModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showCongratulationsModal}
                    onRequestClose={() => setShowCongratulationsModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.congoUser} style={{ width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        Congratulations
                                    </Text>
                                    <Text style={styles.subText}>
                                        Invite sent
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Continue" onPress={() => setShowCongratulationsModal(false)} />
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
        marginTop: Platform.select({
            ios: 0,
            android: 0,
        }),
        height: 155,
    },
    headerImage: {
        flex: 1,
        resizeMode: 'stretch',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginLeft: 160,
        width: 230,
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
    },
    leftIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: { width: 25, height: 20, resizeMode: 'contain' },
    rightIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: { width: 31, height: 31, resizeMode: 'contain' },
    headerText: {
        fontSize: 28,
        color: '#F3F5FF',
        fontFamily: FONTS.montserrat700,
    },
    bodyContainer: {
        backgroundColor: '#364ffb',
        flex: 1,
        paddingTop: 20,
    },
    body: {
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 16,
        marginTop: -70,
    },
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
