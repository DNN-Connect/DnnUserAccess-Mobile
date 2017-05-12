import { combineReducers } from 'redux';
import * as appReducer from './app'
import * as rolesReducer from './roles'
import * as sitesReducer from './sites'
import * as usersReducer from './users'

export default combineReducers(Object.assign(
  appReducer,
  rolesReducer,
  sitesReducer,
  usersReducer,
));
