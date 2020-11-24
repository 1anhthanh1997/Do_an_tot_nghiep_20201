import {combineReducers} from 'redux';
import userInfoReducer from './UserInfoReducer';

const allReducers = combineReducers({
  userInfoReducer,
  //you can add more reducers here, separated by , !
});
export default allReducers;
