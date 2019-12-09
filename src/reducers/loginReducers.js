const initialState = {  nickname: 'Kenny'};

export default function nicknameReducers (state=initialState , action) {
  switch (action.type) {
    case "SetNickName": 
    return {
      ...state,
      nickname:action.nickname
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

