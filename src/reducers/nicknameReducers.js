let nickname ='World';
export default function (state = nickname, action) {
  switch (action.type) {
    case "SetNickName": 
      nickname = action.nickname;
      return nickname;
      break;
      default:
        return state;
  }
 
}