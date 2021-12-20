/* eslint-disable prettier/prettier */
import {AuthService} from '../services/AuthService';
import {AuthConstants} from '../constants/AuthConstants';
import {RequestConstant, ResponseConstant} from '../constants/CommanConstants';
export const AuthActions = {
  signIn,
  signUp,
  signOut,
  resetPassword,
};

function signIn(url, data) {
  return async dispatch => {
    dispatch(RequestConstant(AuthConstants.SIGNIN_REQUEST, data));
    const result = await AuthService.signIn(url, data);
    dispatch(
      ResponseConstant(
        AuthConstants.SIGNIN_SUCCESS,
        AuthConstants.SIGNIN_FAILURE,
        result,
      ),
    );
    return result;
  };
}

function signUp(url, data) {
  return async (dispatch) => {
    dispatch(RequestConstant(AuthConstants.SIGNUP_REQUEST, data));
    const result = await AuthService.signUp(url, data);
    dispatch(
      ResponseConstant(
        AuthConstants.SIGNUP_SUCCESS,
        AuthConstants.SIGNUP_FAILURE,
        result,
      ),
    );
    return result;
  };
}

function signOut() {
  return async (dispatch) => {
    dispatch(RequestConstant(AuthConstants.SIGNOUT_REQUEST, {}));
    const result = {
      success: true,
      data: {},
    };
    dispatch(
      ResponseConstant(
        AuthConstants.SIGNOUT_SUCCESS,
        AuthConstants.SIGNOUT_FAILURE,
        result,
      ),
    );
  };
}

function resetPassword(url, data) {
  return async dispatch => {
    dispatch(RequestConstant(AuthConstants.RESET_PASSWORD_REQUEST, data));
    const result = await AuthService.resetPassword(url, data);
    dispatch(
      ResponseConstant(
        AuthConstants.RESET_PASSWORD_SUCCESS,
        AuthConstants.RESET_PASSWORD_FAILURE,
        result,
      ),
    );
    return result;
  };
}