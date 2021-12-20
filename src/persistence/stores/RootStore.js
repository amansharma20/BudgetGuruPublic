/* eslint-disable prettier/prettier */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {AuthReducer} from '../reducers/AuthReducer';
import {SessionReducer} from '../reducers/SessionReducer';

const allReducers = combineReducers({
  AuthReducer,
  SessionReducer,
});
const applicationStore = createStore(
  allReducers,
  applyMiddleware(thunkMiddleware),
);
export default applicationStore;
