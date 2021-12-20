/* eslint-disable prettier/prettier */
import { gql } from '@apollo/client';

export const GQLQuery = {
  GET_CATEGORY: gql`
  query MyQuery {
    CategoryQuery {
      GetCategories {
        Id
        CategoryName
      }
    }
  }
  `,
  GET_SUBCATEGORY: gql`
  query MyQuery($CategoryId: Long!) {
    SubcategoryQuery {
      GetSubcategoriesByCategoryId(CategoryId: $CategoryId) {
        Id
        SubcategoryName
      }
    }
  }
  `,
  GET_KNOWLEDGE: gql`
  query MyQuery {
    KnowledgeQuery {
      GetKnowledge {
        Id
        Description
        LogoStoragePath
        Link
        SubTitle
        Title
        CreatedDateTimeUtc
      }
    }
  }`,
  GET_GOALS: gql`
  query MyQuery {
    GoalQuery {
      GetGoals {
        Id
        CustomerUserGroupId
        GoalName
        InflationRate
        SavedAmount
        TargetAmount
        GoalStoragePath
        HowDoYouWantToSave
        Description
        EndDate
        InflatedRate
        StartDate
      }
    }
  }
  `,
  GET_CATEGORY_EXPENSE: gql`
  query MyQuery {
      ExpenseQuery {
        GetUserMonthlyExpenses
      }
    }
  `,
  GET_USER_EXPENSES: gql`
  query MyQuery {
    ExpenseQuery {
    GetUserExpenses {
    Id
    CategoryName
    TotalGroupExpense
    }
    }
    }
  `,
  GET_USER_PROFILE: gql`
  query MyQuery {
      ProfileDetailsQuery {
        GetProfileDetails {
          FirstName
          LastName
          ProfilePictureStoragePath
        }
      }
    }
  `,
  GET_SUBCATEGORY_BY_ID: gql`
  query ($CategoryId: Long!){
    ExpenseQuery{
      GetUserSubCategoryExpenses(CategoryId: $CategoryId){
        Id
        SubCategoryName
        TotalGroupExpense
      }
    }
    }
  `,
  GET_GROUP_INVITATION: gql`
  query MyQuery {
      CustomerUserGroupInvitationQuery {
        GetGroupInvitation {
          InvitedByCustomerUser{
            FirstName
            LastName
            ApplicationUser{
              Email
              }
          }
      }
      }
    }
  `,
  GET_GROUP_USERS: gql`
  query MyQuery {
    CustomerUserGroupInvitationQuery {
      GetGroupUsers {
        FirstName
        LastName
        IsCustomerUserGroupOwner
      ApplicationUser{
        Email
      }
    }
    }
    }
  `,
};




