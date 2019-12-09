export function setpage(pagename){
    return{
      type: "Setpage",
      pageName:pagename
    };
  }

export function userLogout(){
    return{
      type: "RESET_APP"
    };
  }