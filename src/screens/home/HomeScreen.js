/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
  Modal,
} from 'react-native';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import HomeScreenHeader from '../../components/headers/HomeScreenHeader';
import GoalsFlatlistItem from '../../components/flatlistItems/GoalsFlatlistItem';
import KnowledgeFlatlistItem from '../../components/flatlistItems/KnowledgeFlatlistItem';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import HomeScreenGoalsEmptyState from '../../components/emptyStates/HomeScreenGoalsEmptyState';
import { PieChart } from 'react-native-svg-charts';
import PIECHARTDATA from '../../../assets/data/PieChartData';
import PIECHARTDATANULL from '../../../assets/data/PieChartDataNull';
import { useMutation, useQuery } from '@apollo/client';
import { GQLQuery } from '../../persistence/query/Query';
import { CommonStyles } from '../../utils/CommonStyles';
import * as Progress from 'react-native-progress';
import { Responsive } from '../../utils/layouts/Layout';
import CommonButton from '../../components/buttons/CommonButton';
import CommonLoading from '../../components/loading/CommonLoading';
import { GQLMutation } from '../../persistence/mutation/Mutation';
import { AuthContext } from '../../navigation/ApplicationNavigator';
import Toast from 'react-native-toast-message';

export default function HomeScreen() {
  const navigation = useNavigation();

  const pieChartData = PIECHARTDATA;
  const pieChartDataNull = PIECHARTDATANULL;

  const { signOut } = useContext(AuthContext);


  const { data: monthlySpend, refetch: refetchMontlySpend } = useQuery(GQLQuery.GET_CATEGORY_EXPENSE);
  const MonthlySpend = monthlySpend && monthlySpend.ExpenseQuery && monthlySpend.ExpenseQuery.GetUserMonthlyExpenses;

  const { data: userTopThreeExpenses, refetch: refetchExpenses } = useQuery(GQLQuery.GET_USER_EXPENSES);
  const UserTopThreeExpenses = userTopThreeExpenses && userTopThreeExpenses.ExpenseQuery && userTopThreeExpenses.ExpenseQuery.GetUserExpenses;

  const { data: knowldegeData } = useQuery(GQLQuery.GET_KNOWLEDGE);
  const Knowldeges = knowldegeData && knowldegeData.KnowledgeQuery && knowldegeData.KnowledgeQuery.GetKnowledge;

  const { data: goalsDatas } = useQuery(GQLQuery.GET_GOALS);
  const Goals = goalsDatas && goalsDatas.GoalQuery && goalsDatas.GoalQuery.GetGoals;

  const { data: invitation, loading: invitationLoading, error: invitationError } = useQuery(GQLQuery.GET_GROUP_INVITATION);
  const Invitation = invitation
    && invitation.CustomerUserGroupInvitationQuery
    && invitation.CustomerUserGroupInvitationQuery.GetGroupInvitation
    && invitation.CustomerUserGroupInvitationQuery.GetGroupInvitation.InvitedByCustomerUser;

  useEffect(() => {
    refetchMontlySpend();
    refetchExpenses();
  }, []);


  useEffect(() => {
    if (!invitationLoading && invitation) {
      setShowRejectModal(false);
    }
  }, [invitation, invitationError]);

  const getPercentage = (val) => {
    let percentage = (val * 100) / MonthlySpend;
    let nanPer = percentage / 100;
    return Number.isNaN(nanPer) ? 0 : nanPer;
  };

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [acceptInviteMutation] = useMutation(GQLMutation.ACCEPT_INVITATION,
    {
      refetchQueries: [{ query: GQLQuery.GET_GROUP_INVITATION }],
    });

  const [rejectInviteMutation] = useMutation(GQLMutation.REJECT_INVITATION,
    {
      refetchQueries: [{ query: GQLQuery.GET_GROUP_INVITATION }],
    });

  const acceptInvite = () => {
    CommonLoading.show();
    acceptInviteMutation().then(() => {
      CommonLoading.hide();
      setShowAcceptModal(false);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Congratulations',
        text2: 'Thankyou for accepting the Invitation. Please login again to use it.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      signOut();
    }).catch(e => {
      console.log(e);
      CommonLoading.hide();
      setShowAcceptModal(false);
    });
  };

  const rejectInvite = () => {
    CommonLoading.show();
    rejectInviteMutation().then(() => {
      CommonLoading.hide();
      setShowRejectModal(false);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Uh oh',
        text2: 'Invitation Rejected',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }).catch(e => {
      console.log(e);
      CommonLoading.hide();
      setShowRejectModal(false);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar hidden={false} backgroundColor={COLORS.textBlue} barStyle={'dark-content'} />
      <HomeScreenHeader children="Home" onPress={() => navigation.navigate('AddExpense')} />
      <View style={styles.bodyContainer}>
        <View style={styles.body}>
          {/* Account Invitation */}
          <View style={[styles.alignMonthlySpend, { marginBottom: 26 }]}>
            {
              Invitation == null ?
                <View />
                :
                <View style={[styles.monthlySpendContainer]}>
                  <Text style={[styles.monthlySpendAmountText, { fontSize: 20 }]}>
                    Account Invitation
                  </Text>
                  <Text style={[styles.monthlySpendText, { fontSize: 14, fontFamily: FONTS.proxima500, textAlign: 'center', paddingTop: 10, paddingHorizontal: 4 }]}>
                    You have been invited by the user
                  </Text>
                  <Text style={[styles.monthlySpendText, {
                    fontSize: 14, fontFamily: FONTS.proxima500,
                    textAlign: 'center', color: COLORS.textBlue,
                  }]}>
                    {Invitation.FirstName} {Invitation.LastName} ({Invitation.ApplicationUser.Email})

                  </Text>
                  <Text style={[styles.monthlySpendText, { fontSize: 14, fontFamily: FONTS.proxima500, textAlign: 'center' }]}>
                    to share their account.
                  </Text>
                  <View style={styles.acceptContainer}>
                    <TouchableOpacity onPress={() => setShowRejectModal(true)}>
                      <Text style={{ fontSize: 20, fontFamily: FONTS.proxima700, color: '#CD0000' }}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowAcceptModal(true)}>
                      <Text style={{ fontSize: 20, fontFamily: FONTS.proxima700, color: '#008C06' }}>Accept</Text>
                    </TouchableOpacity>

                  </View>

                </View>
            }

          </View>
          {/*  */}
          <View style={styles.alignMonthlySpend}>
            <View style={styles.monthlySpendContainer}>
              {
                monthlySpend === undefined ?
                  <Text style={styles.monthlySpendAmountText}>
                    ₹ No Data
                  </Text>
                  :
                  <Text style={styles.monthlySpendAmountText}>
                    ₹ {MonthlySpend}
                  </Text>
              }
              <Text style={styles.monthlySpendText}>
                Monthly Spend
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.topCategorySpendContainer}>
              <Text style={styles.topCategorySpendText}>
                Top Category Spend
              </Text>
              {(UserTopThreeExpenses && UserTopThreeExpenses.length === 0 || UserTopThreeExpenses && UserTopThreeExpenses.length === undefined) ?
                <Text style={[styles.topCategorySpendMoreButtonText, { color: '#AEAEAE' }]}>
                  More
                </Text>
                :
                <TouchableOpacity onPress={() => navigation.navigate('TotalSpendDetails')}>
                  <Text style={styles.topCategorySpendMoreButtonText}>
                    More
                  </Text>
                </TouchableOpacity>
              }
            </View>
            <View>
              <View style={[styles.pieChartContainer, CommonStyles.appShadow]}>
                {/* <HomeScreenPieChart /> */}
                <View style={{ alignItems: 'center' }}>
                  {(UserTopThreeExpenses && UserTopThreeExpenses.length === 0 || UserTopThreeExpenses && UserTopThreeExpenses.length === undefined) ?
                    <PieChart style={{ position: 'relative', height: 200, backgroundColor: '#ffffff', borderRadius: 1000, width: 200, padding: 8, elevation: 5 }}
                      valueAccessor={({ item }) => item.amount}
                      data={pieChartDataNull}
                      spacing={0}
                      innerRadius={'70%'}
                      outerRadius={'95%'}>
                      {/* <Labels /> */}
                    </PieChart>
                    :
                    <PieChart style={{ position: 'relative', height: 200, backgroundColor: '#ffffff', borderRadius: 1000, width: 200, padding: 8, elevation: 5 }}
                      valueAccessor={({ item }) => item.amount}
                      data={pieChartData}
                      spacing={0}
                      innerRadius={'70%'}
                      outerRadius={'95%'}>
                      {/* <Labels /> */}
                    </PieChart>
                  }
                </View>
              </View>
            </View>
            <View style={styles.topThreeCategoryItemContainer}>
              {_.slice(UserTopThreeExpenses, 0, 3).map((item) => {
                return (
                  <View style={[styles.topCategoryItemContainer, CommonStyles.appShadow]}>
                    <View style={styles.topCategoryItemTopRowContainer}>
                      <View style={styles.topCategoryItemTopRowContainerLeft}>
                        <Image source={icons.shoppingBag} style={styles.iconContainer} />
                        <Text style={styles.shoppingText}>
                          {item.CategoryName}
                        </Text>
                      </View>
                      <Text style={styles.amountText}>
                        ₹ {item.TotalGroupExpense}
                      </Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                      <Progress.Bar
                        progress={getPercentage(item.TotalGroupExpense)}
                        width={Responsive.width(300)}
                        unfilledColor={'#eff0f2'}
                        borderWidth={0}
                        height={3}
                        color={'#31D32E'}
                      />
                    </View>
                    <View style={styles.topCategoryItemBottomRowContainer}>
                      <Text style={styles.zeroPercentText}>
                        0%
                      </Text>
                      <Text style={styles.hundredPercentText}>
                        100%
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View>
            <View style={styles.goalsContainer}>
              <Text style={styles.goalsText}>
                Goals
              </Text>
              {
                Goals === undefined ?
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddNewGoal')}
                  >
                    <Text style={styles.goalsMoreButtonText}>
                      Add
                    </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => navigation.navigate('UserGoals')}>
                    <Text style={styles.goalsMoreButtonText}>
                      More
                    </Text>
                  </TouchableOpacity>
              }
            </View>
            <View>
              {
                Goals === undefined ?
                  <HomeScreenGoalsEmptyState />
                  :
                  <FlatList
                    data={Goals}
                    horizontal={true}
                    renderItem={({ item }) => <GoalsFlatlistItem goal={item} />}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    showsHorizontalScrollIndicator={false}
                  />
              }
            </View>
          </View>

          <View style={{}}>
            <View style={styles.goalsContainer}>
              <Text style={styles.goalsText}>
                Knowledge
              </Text>
            </View>
            <FlatList
              data={Knowldeges}
              horizontal={true}
              renderItem={({ item }) => <KnowledgeFlatlistItem knowledge={item} />}
              keyExtractor={(item) => item.Id.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>


        </View>
      </View>
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
                    You will be added to the account of {Invitation.FirstName} {Invitation.LastName}
                    And Your all data will be deleted permanently
                  </Text>
                </View>

                <View style={{ width: '100%' }}>
                  <CommonButton children="Confirm" onPress={acceptInvite} />
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
                    You want to reject the account invitation from {Invitation.FirstName} {Invitation.LastName}
                  </Text>
                </View>

                <View style={{ width: '100%' }}>
                  <CommonButton children="Delete" onPress={rejectInvite} />
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
    elevation: 5,
    borderRadius: 16,
    paddingVertical: 8,
  },
  acceptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 8,
    paddingTop: 20,
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
    fontSize: 16,
    color: '#9D9D9D',
    fontFamily: FONTS.proxima500,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
