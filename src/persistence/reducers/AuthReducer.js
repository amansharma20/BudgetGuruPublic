/* eslint-disable prettier/prettier */
import {AuthConstants} from '../constants/AuthConstants';

const initialState = {
  status: '',
  data: {
    loggedIn: false,
    user: {},
  },
  error: {},
};

export function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AuthConstants.SIGNIN_REQUEST:
      return {
        status: AuthConstants.SIGNIN_REQUEST,
        data: {...state.data, ...{user: action.data}},
        error: {},
      };
    case AuthConstants.SIGNIN_SUCCESS:
      return {
        status: AuthConstants.SIGNIN_SUCCESS,
        data: {...state.data, ...{loggedIn: true, user: action.data}},
        error: {},
      };
    case AuthConstants.SIGNIN_FAILURE:
      return {
        status: AuthConstants.SIGNIN_FAILURE,
        data: {loggedIn: false, user: {}},
        error: action.data,
      };
    default:
      return state;
  }
}
