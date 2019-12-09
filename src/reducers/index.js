import {combineReducers,createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import tabReducers from './navReducers';
import nicknameReducers from './loginReducers';
import peopleReducer from './peopleReducers';

const allReducers= combineReducers({
  tabReducers,
  nicknameReducers,
  peopleReducer
});

const  rootReducer = (state, action) => {

    if (action.type == 'RESET_APP') {
        state = undefined;
    }
    return allReducers(state, action);
  }

  let store = createStore(rootReducer,applyMiddleware(thunk));

  export default store;