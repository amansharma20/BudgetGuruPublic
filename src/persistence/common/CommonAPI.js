/* eslint-disable prettier/prettier */
import axios from 'axios';
import { applicationProperties } from '../../application.properties';
//import CommonLoading from '../../components/CommonLoading';

const post = async (endPoint, data, header) => {
  try {
    let response = await axios.post(
      applicationProperties.baseUrl + '/' + endPoint,
      data,
      header,
    ); 
    if (response.data !== undefined) {
     
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  } finally {
   // if (loading) {
    //   // CommonLoading.hide();
    // }
  }
};
const get = async (endPoint, data, loading) => {
  if (loading) {
    //CommonLoading.show();
  }
  try {
    let response = await axios.get(
      applicationProperties.baseUrl + '/' + endPoint,
      data,
    );
    if (response.data !== undefined && response.data.status) {
      return {
        success: true,
        data: response,
      };
    } else {
      return {
        success: false,
        data: response,
      };
    }
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  } finally {
    if (loading) {
      // CommonLoading.hide();
    }
  }
};
export const api = {
  post,
  get,
};
