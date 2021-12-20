/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

export const GQLMutation = {
  SAVE_USER_BASIC_DETAILS: gql`
  mutation MyMutation ($Address: String!, $FirstName: String!, $LastName: String!, $MonthlyIncome: Int!){
    ProfileDetailsMutation {
      ProfileDetails(Address: $Address, FirstName: $FirstName, LastName: $LastName, MonthlyIncome: $MonthlyIncome)
    }
  }
  `
  ,
  ADD_EXPENSE: gql`
  mutation MyMutation ($CategoryId: Long!, $SubCategoryId: Long!, $Amount: Decimal!, $Remarks: String, $Date: DateTime!){
    AddExpenseMutation {
      AddExpense(CategoryId: $CategoryId, SubCategoryId: $SubCategoryId, Amount: $Amount, Remarks: $Remarks, Date: $Date)
    }
  }
  `
  ,
  ADD_GOAL: gql`
  mutation MyMutation ($GoalName: String!, $TargetAmount: Decimal!, $Description: String!,
    $InflationRate: Decimal!, $StartDate: DateTime!, $EndDate: DateTime!){
    GoalMutation {
      AddGoal(
      GoalName: $GoalName,
      TargetAmount: $TargetAmount,
      Description: $Description,
      InflationRate: $InflationRate,
      StartDate: $StartDate,
      EndDate: $EndDate,
      )
  }
}
  `
  ,
  EDIT_PROFILE: gql`
  mutation MyMutation($FirstName: String!,$LastName: String!,$MonthlyIncome: Decimal!,$DateOfBirth: DateTime!,$MobileNumber: String!) {
    ProfileDetailsMutation {
      ProfileDetail(
        FirstName: $FirstName,
        LastName: $LastName,
        MonthlyIncome:$MonthlyIncome ,
        DateOfBirth: $DateOfBirth,
        MobileNumber: $MobileNumber)
    }
  }
  `,
  ADD_GOAL_MONEY: gql`
  mutation MyMutation ($SavedAmount: Decimal!, $Id: Long!){
      GoalMutation {
        AddMoney(
          Id: $Id, 
          SavedAmount: $SavedAmount,
          ) 
      }
  }
  `,
  WITHDRAW_GOAL_MONEY: gql`
  mutation MyMutation ($SavedAmount: Decimal!, $Id: Long!){
      GoalMutation {
        WithdrawMoney(
          Id: $Id, 
          SavedAmount: $SavedAmount,
          ) 
      }
  }
  `,
  DELETE_GOAL: gql`
  mutation MyMutation ($Id: Long!){
      GoalMutation {
        DeleteGoal(
          Id: $Id, 
          ) 
      }
  }
  `,
  SAVE_USER_BASIC_DETAIL: gql`
  mutation MyMutation ($MobileNumber: String!, $FirstName: String!, $LastName: String!, $MonthlyIncome: Decimal!, $DateOfBirth:DateTime){
    ProfileDetailsMutation {
      ProfileDetail(MobileNumber: $MobileNumber, FirstName: $FirstName, LastName: $LastName, MonthlyIncome: $MonthlyIncome, DateOfBirth: $DateOfBirth)
    }
  }
  `,
  INVITE_USER: gql`
  mutation MyMutation ($Email: String!){
    CustomerUserGroupMutation{
        InviteUser(Email: $Email)
    }
  }
  `,
  REMOVE_USER: gql`
  mutation MyMutation ($Email: String!){
    CustomerUserGroupMutation{
      RemoveUser(Email: $Email)
    }
  }
  `,
  ACCEPT_INVITATION: gql`
  mutation MyMutation{
    CustomerUserGroupMutation{
      AcceptInvitation
    }
  }
  `,
  REJECT_INVITATION: gql`
  mutation MyMutation{
    CustomerUserGroupMutation{
      RejectInvitation
    }
  }
  `,
};
