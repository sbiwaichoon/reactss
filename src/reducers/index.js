import {combineReducers,createStore} from 'redux';
import tabReducers from './navReducers';
import nicknameReducers from './loginReducers';
const allReducers= combineReducers({
  tabReducers,
  nicknameReducers
});

const  rootReducer = (state, action) => {

    if (action.type == 'RESET_APP') {
        state = undefined;
    }
    return allReducers(state, action);
  }

  let store = createStore(rootReducer);

  export default store;