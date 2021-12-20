/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    TextInput,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FONTS, icons, images, SIZES } from '../../../constants';
import * as Progress from 'react-native-progress';
import CommonButton from '../../components/buttons/CommonButton';
import { Responsive } from '../../utils/layouts/Layout';
import { useMutation } from '@apollo/client';
import { GQLMutation } from '../../persistence/mutation/Mutation';
const screenWidth = Dimensions.get('window').width;
import { format } from 'date-fns';
import { GQLQuery } from '../../persistence/query/Query';
import CommonLoading from '../../components/loading/CommonLoading';
import Toast from 'react-native-toast-message';

export default function GoalScreen(props) {
    const navigation = useNavigation();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const goalsDetails = props.route.params.goal;
    const [savedAmount, setSavedAmount] = useState();

    const [submitAddGoalMoney] = useMutation(GQLMutation.ADD_GOAL_MONEY, {
        refetchQueries: [{ query: GQLQuery.GET_GOALS }],
        onCompleted:()=>{
            setShowAddModal(false);
            CommonLoading.hide();

            Toast.show({
                type: 'success',
                text1: 'Congrats',
                text2: 'Amount Added to your goal.',
                visibilityTime: 2000,
                autoHide: true,
            });
            navigation.goBack();
            
        },
        onError:()=>{
            setShowAddModal(false);
            navigation.goBack();
            CommonLoading.hide();
        }
    }
    );
    const submitAddData = () => {
        CommonLoading.show();
        submitAddGoalMoney({
            variables: {
                Id: goalsDetails.Id,
                SavedAmount: savedAmount,
            },
        })
    };

    const [submitWithdrawGoalMoney] = useMutation(GQLMutation.WITHDRAW_GOAL_MONEY, {
        refetchQueries: [{ query: GQLQuery.GET_GOALS }],
        onCompleted:()=>{
            setShowWithdrawModal(false);
            navigation.goBack();
            CommonLoading.hide();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Amount withdrawn from your goal.',
                visibilityTime: 2000,
                autoHide: true,
            });
        },
        onError:()=>{
            setShowWithdrawModal(false);
            CommonLoading.hide();
        }
    });
    const submitWithdrawData = () => {
        if (goalsDetails.TargetAmount >= savedAmount) {
            CommonLoading.show();
            submitWithdrawGoalMoney({
                variables: {
                    Id: goalsDetails.Id,
                    SavedAmount: savedAmount,
                },
            })
        } else {
            setShowWithdrawModal(false);
            Toast.show({
                type: 'error',
                text1: 'Withdraw Amount',
                text2: 'Withdraw Amount must be greater than current goal amount.',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    };

    const [deleteGoal] = useMutation(GQLMutation.DELETE_GOAL, {
        refetchQueries: [{ query: GQLQuery.GET_GOALS }],
        onCompleted:()=>{
            CommonLoading.hide();
            navigation.goBack();
            Toast.show({
                type: 'success',
                text1: '',
                text2: 'Goal Deleted!',
                visibilityTime: 2000,
                autoHide: true,
            });
        },
        onError:()=>{
            CommonLoading.hide();
            Toast.show({
                type: 'error',
                text1: '',
                text2: 'please try again!',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    });

    const deleteUserGoal = () => {
        CommonLoading.show();
        deleteGoal({ variables: { Id: goalsDetails.Id } })
    };


    const getRemaningGoalYearLeft = () => {
        let endYear = new Date(goalsDetails.EndDate);
        var formatedEndYear = format(endYear, 'yyyy');

        let currentYear = new Date();
        var formatedcurrentYear = format(currentYear, 'yyyy');
        return formatedEndYear - formatedcurrentYear;
    };


    const [showAcceptModal, setShowAcceptModal] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(null);


    return (
        <ScrollView contentContainerStyle={{ flex: 1 }} style={styles.container}>
            <View style={styles.body}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.backButtonWhite}
                            style={styles.backButtonSize}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => {
                        //     deleteUserGoal();
                        // }}
                        onPress={() => setShowRejectModal(true)}
                        style={styles.deleteButtonContainer}>
                        <Image
                            source={icons.deleteButton}
                            style={styles.deleteButtonSize}
                        />
                    </TouchableOpacity>
                </View>
                {/* IMAGE  */}
                <View style={styles.imageContainer}>
                    <Image source={images.goalImage} style={styles.imageSize} />
                    <View style={styles.goalTitleContainer}>
                        <Text style={styles.goalTitleText}>{goalsDetails.GoalName}</Text>
                        <Text style={styles.goalSubTitleText}>{getRemaningGoalYearLeft()} Years Left</Text>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsContainer}>
                <View style={styles.progressBarContainer}>
                    <Progress.Bar
                        progress={goalsDetails.SavedAmount / goalsDetails.TargetAmount}
                        // width={Responsive.width(300)}
                        width={screenWidth - 48}
                        unfilledColor={'#eff0f2'}
                        borderWidth={0}
                        height={6}
                        color={'#364FFB'}
                    />
                    <View style={styles.topCategoryItemBottomRowContainer}>
                        <Text style={styles.zeroPercentText}>₹ {goalsDetails.SavedAmount}</Text>
                        <Text style={styles.hundredPercentText}>₹ {goalsDetails.TargetAmount}</Text>
                    </View>
                </View>
                <View style={styles.subDetailsContainer}>
                    <View style={styles.detailsRowContainer}>
                        <View>
                            <Text style={styles.detailsTitleText}>Amount</Text>
                            <Text style={styles.detailsInputText}>₹ {goalsDetails.TargetAmount}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.detailsTitleText}>Goal End Date</Text>
                        <Text style={styles.detailsInputText}>{format(new Date(goalsDetails.EndDate), 'MMMM do, yyyy')}</Text>
                    </View>

                    {/* <View style={styles.detailsRowContainer}>
                        <View>
                            <Text style={styles.detailsTitleText}>Period</Text>
                            <Text style={styles.detailsInputText}>{goalsDetails.Period}</Text>
                        </View>

                    </View> */}

                    <View style={styles.detailsRowContainer}>
                        <View>
                            <Text style={styles.detailsTitleText}>Inflated Rate ({goalsDetails.InflationRate}%)</Text>
                            <View style={styles.inflatedRateContainer}>
                                <Text style={styles.detailsInputText}>₹{goalsDetails.InflatedRate}</Text>
                                <Text style={styles.estimatedRatesText}>(Estimated)</Text>
                            </View>
                        </View>

                    </View>
                    <View>
                        <Text style={styles.detailsTitleText}>
                            How do you want to save?
                        </Text>
                        <Text style={styles.detailsInputText}>{goalsDetails.HowDoYouWantToSave}</Text>
                    </View>

                </View>

                <View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.detailsInputText}>Description</Text>
                        <Text style={styles.detailsTitleText}>
                            {goalsDetails.Description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={() => setShowWithdrawModal(true)}
                    style={styles.withdrawButtonContainer}>
                    <Text
                        style={styles.withdrawButtonText}>
                        Withdraw
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowAddModal(true)}
                    style={styles.addButtonContainer}>
                    <Text
                        style={styles.addButtonText}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>
            {/* ADD MODAL  */}
            {showAddModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showAddModal}
                    onRequestClose={() => setShowAddModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 }}>
                                <TouchableOpacity
                                    onPress={() => setShowAddModal(false)}
                                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={icons.cross} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBody}>

                                <View style={{ alignItems: 'center' }}>
                                    <Image source={images.addMoneyModalImage} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
                                    <Text
                                        style={{
                                            fontSize: 32,
                                            color: '#262626',
                                            fontFamily: FONTS.montserrat700,
                                        }}>
                                        Add Money
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#9D9D9D',
                                            fontFamily: FONTS.montserrat500,
                                            textAlign: 'center',
                                        }}>
                                        Keep going{'\n'}
                                        You are getting close to your goal
                                    </Text>
                                </View>

                                <View style={{ marginVertical: 12, width: '100%' }}>
                                    <Text style={styles.inputTextTitle}>Amount</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Amount"
                                        keyboardType="numeric"
                                        placeholderTextColor={'#8b8b8b'}
                                        onChangeText={(text) => setSavedAmount(text)}
                                    />
                                </View>


                                <View>
                                    <CommonButton
                                        children="Add"
                                        onPress={() => submitAddData()}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            )}

            {/* WITHDRAW MODAL  */}
            {showWithdrawModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showWithdrawModal}
                    onRequestClose={() => setShowWithdrawModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 }}>
                                <TouchableOpacity
                                    onPress={() => setShowWithdrawModal(false)}
                                    style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={icons.cross} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBody}>

                                <View style={{ alignItems: 'center' }}>
                                    <Image source={images.amico} style={{ width: 220, height: 220, resizeMode: 'contain' }} />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 30,
                                            color: '#262626',
                                            textAlign: 'center',
                                            fontFamily: FONTS.montserrat700,
                                        }}>
                                        Withdraw Money
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#9D9D9D',
                                            fontFamily: FONTS.montserrat500,
                                            textAlign: 'center',
                                        }}>
                                        Maybe you need{'\n'}
                                        to rethink about your goal
                                    </Text>
                                </View>

                                <View style={{ marginVertical: 12, width: '100%' }}>
                                    <Text style={styles.inputTextTitle}>Amount</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Amount"
                                        keyboardType="numeric"
                                        placeholderTextColor={'#8b8b8b'}
                                        onChangeText={(text) => setSavedAmount(text)}
                                    />
                                </View>
                                <View>
                                    <CommonButton
                                        children="Withdraw"
                                        onPress={() => submitWithdrawData()}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            )}
            {showAcceptModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showAcceptModal}
                    onRequestClose={() => setShowAcceptModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.congoUser} style={{ width: 250, height: 250, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        Account Invitation
                                    </Text>
                                    <Text style={styles.subText}>
                                        You will be added to the account of Shashwat Singh
                                        And Your all data will be deleted permanently
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Confirm" onPress={() => setShowAcceptModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {showRejectModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showRejectModal}
                    onRequestClose={() => setShowRejectModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.depression} style={{ width: 250, height: 250, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        Are you sure?
                                    </Text>
                                    <Text style={styles.subText}>
                                        You want to give up on your goal?
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Delete"
                                        onPress={() => deleteUserGoal() || setShowRejectModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
            {showAcceptModal && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    statusBarTranslucent={true}
                    showModal={showAcceptModal}
                    onRequestClose={() => setShowAcceptModal(false)}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalBody}>
                                <Image source={images.congoUser} style={{ width: 250, height: 250, resizeMode: 'contain', alignSelf: 'center' }} />
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.inviteText}>
                                        Are you sure?
                                    </Text>
                                    <Text style={styles.subText}>
                                        You want to give up on your goal?
                                    </Text>
                                </View>

                                <View style={{ width: '100%' }}>
                                    <CommonButton children="Confirm" onPress={() => setShowAcceptModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#364ffb',
    },
    body: {
        padding: 10,
        paddingTop: Platform.select({
            ios: 40,
            android: 0,
        }),
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    backButtonContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonSize: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    deleteButtonContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonSize: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    imageContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    imageSize: {
        width: 200,
        height: 140,
        resizeMode: 'contain',
    },
    goalTitleContainer: {
        alignItems: 'center',
    },
    goalTitleText: {
        paddingVertical: 2,
        fontFamily: FONTS.montserrat700,
        fontSize: 26,
        color: '#ffffff',
        textAlign: 'center',
    },
    goalSubTitleText: {
        fontFamily: FONTS.montserrat700,
        fontSize: 11,
        color: '#949fe9',
    },
    detailsContainer: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 24,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    subDetailsContainer: {
        paddingVertical: 16,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1.5,
    },
    detailsRowContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 16,
    },
    progressBarContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topCategoryItemBottomRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 5,
    },
    zeroPercentText: {
        marginLeft: 0,
        color: '#364ffb',
        fontSize: 14,
        fontFamily: FONTS.montserrat700,
    },
    hundredPercentText: {
        marginLeft: 0,
        color: '#262626',
        fontSize: 14,
        fontFamily: FONTS.montserrat700,
    },
    detailsTitleText: {
        color: '#8B8B8B',
        fontFamily: FONTS.montserrat500,
        fontSize: 14,
    },
    inflatedRateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsInputText: {
        color: '#3A3A3A',
        fontFamily: FONTS.montserrat700,
        fontSize: 18,
    },
    estimatedRatesText: {
        fontSize: 12,
        fontFamily: FONTS.montserrat400,
        color: '#8B8B8B',
        paddingHorizontal: 4,
    },
    descriptionContainer: { paddingVertical: 8 },
    buttonsContainer: {
        paddingVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1.5,
        borderColor: '#E1E1E1',
        backgroundColor: '#ffffff',
    },
    withdrawButtonContainer: {
        width: 150,
        height: 40,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#304bfc',
        borderWidth: 1.5,
        elevation: 5,
        shadowColor: '#304bfc',
    },
    withdrawButtonText: {
        color: '#2D48FD',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
    },
    addButtonContainer: {
        width: 150,
        height: 40,
        backgroundColor: '#2D48FD',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#304bfc',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: FONTS.montserrat500,
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
        height: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
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
        color: '#282828',
    },
    inviteText: {
        fontSize: 32,
        color: '#262626',
        fontFamily: FONTS.proxima700,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#9D9D9D',
        fontFamily: FONTS.proxima500,
        textAlign: 'center',
        alignSelf: 'center',
    },
});
