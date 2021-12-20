/* eslint-disable prettier/prettier */
import MyAsyncStorage from '../storage/MyAsyncStorage';

export const SessionService = {
  setSession,
  getSession,
};

async function getSession() {
  let user = await MyAsyncStorage.getData('userData');
  if (user === null) {
    user = {
      loggedIn: false,
      user: {},
    };
  }
  return user;
}
async function setSession(user) {
  await MyAsyncStorage.storeData('userData', user);
}
