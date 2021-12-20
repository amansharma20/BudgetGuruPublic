/* eslint-disable prettier/prettier */
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsInput from '../screens/profile/DetailsInput';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfile from '../screens/profile/EditProfile';
import TotalAmountScreen from '../screens/totalAmount/TotalAmount';
import AddNewGoal from '../screens/goals/AddNewGoal';
import GoalScreen from '../screens/goals/GoalScreen';
import About from '../screens/terms/About';
import PrivacyPolicy from '../screens/terms/PrivacyPolicy';
import TermsAndConditions from '../screens/terms/TermsAndConditions';
import KnowledgeDetails from '../screens/knowledge/KnowledgeDetails';
import AddExpense from '../screens/expense/AddExpense';
import TotalSpendDetails from '../screens/spendsDetails/TotalSpendDetails';
import SubCategoryGraphDetails from '../screens/spendsDetails/SubCategoryGraphDetails';
import UserGoals from '../screens/goals/UserGoals';
import CategoryLimit from '../screens/categoryLimit/CategoryLimit';
import MyAsyncStorage from '../persistence/storage/MyAsyncStorage';
import StaticOnBoarding from '../screens/onBoarding/StaticOnBoarding';
import AccountUsers from '../screens/accountUsers/AccountUsers';

const Stack = createStackNavigator();
export default function HomeNavigator({ style }) {

  const [signedUp, setIsSignedUp] = useState(null);

  useEffect(() => {
    (async () => {
      try{
        const isFirstLaunch = await MyAsyncStorage.getData('isSignedUp');
        if(isFirstLaunch === null){
          setIsSignedUp(false);
        }else{
          setIsSignedUp(isFirstLaunch);
        }
        
      }catch(e){
        setIsSignedUp(false);
        
      }
      
    })();
  }, []);

  if (signedUp == null) {
    return <StaticOnBoarding />;
  }

  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          keyboardHidesTabBar: true,
        }}
        initialRouteName={signedUp ? 'DetailsInput' : 'HomeScreen'}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CategoryLimit" component={CategoryLimit} />
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="GoalScreen" component={GoalScreen} />
        <Stack.Screen name="TotalAmountScreen" component={TotalAmountScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DetailsInput" component={DetailsInput} />
        <Stack.Screen name="AddNewGoal" component={AddNewGoal} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="KnowledgeDetails" component={KnowledgeDetails} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="SubCategoryGraphDetails" component={SubCategoryGraphDetails} />
        <Stack.Screen name="TotalSpendDetails" component={TotalSpendDetails} />
        <Stack.Screen name="UserGoals" component={UserGoals} />
        <Stack.Screen name="AccountUsers" component={AccountUsers} />

      </Stack.Navigator>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
});


