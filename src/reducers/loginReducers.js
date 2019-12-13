
const initialState ={
  nickname:'Kenny',
  session:'defaultsession',
  isFetching: false,
  err : false
}


export default function nicknameReducers (state=initialState , action) {
  switch (action.type) {
    case "SetNickName": 
    return {
      ...state,
      nickname:action.nickname
    }
    case "FETCHING_LOGIN": 
    return {
      ...state,
      isFetching:true
    }
    case "FETCHING_LOGIN_SUCCESS": 
    return {
      ...state,
      isFetching:false,
      session:action.data[0]['session']
    }
    case "FETCHING_LOGIN_FAILURE": 
    return {
      ...state,
      isFetching:false,
      err:true
    }
    default:
      return state;
  }

}


// const initialState = {  nickname: 'World'};
// export default function nicknameReducers (state = initialState, action) {
//   switch (action.type) {
//     case "SetNickName": 
//       return action.nickname;
//     default:
//         return state;
//   }
// }

