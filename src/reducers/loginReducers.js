
const initialState ={
  nickname:'Kenny',
  firstName:'Tan',
  phone:'00000000',
  userId:'',
  gender:'',
  nric:'',
  emergencyContact:'',
  address:'',
  jobTitle:'',
  email:'',
  profileImage:'',
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
    case "SetFirstName": 
    return {
      ...state,
      firstName:action.firstName
    }
    case "SetPhone": 
    return {
      ...state,
      phone:action.phone
    }
    case "SetUserId": 
    return {
      ...state,
      userId:action.userId
    }
    case "SetGender": 
    return {
      ...state,
      gender:action.gender
    }
    case "SetNric": 
    return {
      ...state,
      nric:action.nric
    }
    case "SetEmergencyContact": 
    return {
      ...state,
      emergencyContact:action.emergencyContact
    }
    case "SetAddress": 
    return {
      ...state,
      address:action.address
    }
    case "SetJobTitle": 
    return {
      ...state,
      jobTitle:action.jobTitle
    }
    case "SetEmail": 
    return {
      ...state,
      email:action.email
    }
    case "SetProfileImage": 
    return {
      ...state,
      profileImage:action.profileImage
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

