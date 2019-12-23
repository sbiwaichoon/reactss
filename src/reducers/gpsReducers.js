const initialState = {  
    currentLocation: []
    // {'latitude':'','longitude':''}

};

export default function gpsReducers (state=initialState , action) {
    
  switch (action.type) {
    case "SetLocation": 
   
    return {
      ...state,
      currentLocation:action.data
    }

    
    default:
      return state;
  }

}





