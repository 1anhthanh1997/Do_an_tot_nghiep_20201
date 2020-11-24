import {combineReducers} from 'redux';
import f01Reducer from './F01Reducer';

const allReducers = combineReducers({
  f01Reducer,
  //you can add more reducers here, separated by , !
});
export default allReducers;
