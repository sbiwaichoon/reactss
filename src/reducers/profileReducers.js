
const initialState ={
  isFetching: false,
  err : false
}


export default function profileReducers (state=initialState , action) {
  switch (action.type) {
    case "FETCHING_UPDATE_EMAIL": 
    return {
      ...state,
      isFetching:true
    }
    case "FETCHING_UPDATE_EMAIL_SUCCESS": 
    return {
      ...state,
      isFetching:false
    }
    case "FETCHING_UPDATE_EMAIL_FAILURE": 
    return {
      ...state,
      isFetching:false
    }
    case "FETCHING_UPDATE_PHONE": 
    return {
      ...state,
      isFetching:true
    }
    case "FETCHING_UPDATE_PHONE_SUCCESS": 
    return {
      ...state,
      isFetching:false
    }
    case "FETCHING_UPDATE_PHONE_FAILURE": 
    return {
      ...state,
      isFetching:false
    }
    case "FETCHING_UPDATE_PROFILE_IMAGE": 
    return {
      ...state,
      isFetching:true
    }
    case "FETCHING_UPDATE_PROFILE_IMAGE_SUCCESS": 
    return {
      ...state,
      isFetching:false
    }
    case "FETCHING_UPDATE_PROFILE_IMAGE_FAILURE": 
    return {
      ...state,
      isFetching:false
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

