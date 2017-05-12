import { combineReducers } from 'redux';
import * as rolesReducer from './roles'
import * as sitesReducer from './sites'
import * as usersReducer from './users'

export default combineReducers(Object.assign(
  rolesReducer,
  sitesReducer,
  usersReducer,
));
