const initialState = {  
    currentLocation: [],
    isGpsReady:false
    // {'latitude':'','longitude':''}

};

export default function gpsReducers (state=initialState , action) {
    
  switch (action.type) {
    case "SetLocation": 
   
    return {
      ...state,
      currentLocation:action.data
    }
    case "SetGpsReady": 
    return {
      ...state,
      isGpsReady:true
    }

    
    default:
      return state;
  }

}





