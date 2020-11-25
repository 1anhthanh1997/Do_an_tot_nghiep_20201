import {combineReducers} from 'redux';
import f01Reducer from './F01Reducer';
import f02Reducer from './F02Reducer';

const allReducers = combineReducers({
  f01Reducer,
  f02Reducer,
  //you can add more reducers here, separated by , !
});
export default allReducers;
