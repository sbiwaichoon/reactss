import {combineReducers,createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import tabReducers from './navReducers';
import nicknameReducers from './loginReducers';
import peopleReducer from './peopleReducers';
import profileReducer from './profileReducers';
import gpsReducers from './gpsReducers';
import attendanceReducers from './attendanceReducers';

const allReducers= combineReducers({
  tabReducers,
  nicknameReducers,
  peopleReducer,
  profileReducer,
  gpsReducers,
  attendanceReducers
});

const  rootReducer = (state, action) => {

    if (action.type == 'RESET_APP') {
        state = undefined;
    }
    return allReducers(state, action);
  }

  let store = createStore(rootReducer,applyMiddleware(thunk));

  export default store;