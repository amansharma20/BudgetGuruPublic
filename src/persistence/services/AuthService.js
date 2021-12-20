/* eslint-disable prettier/prettier */
import {applicationProperties} from '../../application.properties';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { api } from '../common/CommonAPI';

export const AuthService = {
  signIn,
  signUp,
  signOut,
  resetPassword,
};

async function signIn(url, data) {
  try {
    let loginResponse = await axios.post(
      applicationProperties.loginUrl + url,
      data,
    );
    return loginResponse;
  } catch (e) {
    // Toast.show({
    //   type: 'error',
    //   position: 'top',
    //   text1: '',
    //   text2: e.response.data,
    //   visibilityTime: 4000,
    //   autoHide: true,
    //   topOffset: 30,
    //   bottomOffset: 40,
    // });
    return {
      success: false,
      data: e,
    };
  }
}

async function signUp(url, data) {
  try {
    let loginResponse = await axios.post(
      applicationProperties.baseUrl + url,
      data,
    );
    return loginResponse;
  } catch (e) {
    let errorMessage = e.toString();
    console.log(errorMessage.includes('400'));
    if (errorMessage.includes('400')){
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please Login.',
        text2: 'User Already Exist.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    return {
      success: false,
      data: e,
    };
  }
}

async function signOut() {
  return await applicationProperties.baseUrl('/signout', {});
}

async function resetPassword(url, data) {
  // return await applicationProperties.baseUrl('/resetPassword', {});
  return await api.post(url, data);
}
