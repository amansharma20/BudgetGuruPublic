/* eslint-disable prettier/prettier */
import {SessionConstant} from '../constants/SessionConstant';
import {SessionService} from '../services/SessionService';
import {
  RequestConstant,
  ResponseConstant,
} from '../constants/CommanConstants';

export const SessionAction = {getSession};

function getSession() {
  return async dispatch => {
    dispatch(RequestConstant(SessionConstant.SESSION_REQUEST, {}));
    var result = await SessionService.getSession();
    const resultJson = {
      success: true,
      data: result,
    };
    dispatch(
      ResponseConstant(
        SessionConstant.SESSION_SUCCESS,
        SessionConstant.SESSION_FAILURE,
        resultJson,
      ),
    );
  };
}
