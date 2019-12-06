import {combineReducers} from 'redux';
import tabReducers from './tabReducers';
import nicknameReducers from './nicknameReducers';
const allReducers= combineReducers({
  page: tabReducers,
  nickname:nicknameReducers
});

const initialState = {  page: '',  nickname: ''};

export default  rootReducer = (state=initialState, action) => {

    if (action.type == 'RESET_APP') {
         return initialState;
    }

    return allReducers(state, action);
  }

