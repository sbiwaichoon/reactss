 export function setpage(pagename){
    return{
      type: "Setpage",
      pageName:pagename
    };
  }


  export function setNickName(nickname){
    return{
      type: "SetNickName",
      nickname:nickname
    };
  }

  export function userLogout(){
    return{
      type: "RESET_APP"
    };
  }


