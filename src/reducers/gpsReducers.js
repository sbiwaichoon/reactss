const initialState = {  
    currentLocation: [],
    ifFetching:false,
    distance:'100'

};

export default function tabReducers (state=initialState , action) {
  switch (action.type) {
    case "SetLocation": 
    return {
      ...state,
      currentLocation:action.location
    }
    case "SetDistance": 
    return {
      ...state,
      distance:action.distance
    }
    case 'FETCHING_GPS':
        return {
            ...state,
            isFetching:true,
            currentLocation:[]
        }
    case 'FETCHING_GPS_SUCCESS':
        return {
            ...state,
            isFetching:false,
            currentLocation: action.location
        }
    case 'FETCHING_GPS_FAILURE':
        return{
            ...state,
            isFetching:false,
            error:true
        }
    default:
      return state;
  }

}





