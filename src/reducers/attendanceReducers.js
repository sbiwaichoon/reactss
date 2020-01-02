const initialState = {  
    groupSetting: [],
    groupDdl:[],
    selectedGroup:'',
    currentAddress:'sbi',
    isFetching:false,
    todayPunchRecord:''
};

export default function attendanceReducers (state=initialState , action) {
    
  switch (action.type) {
    case "FETCHING_GROUP_SETTING": 
    return {
      ...state,
      isFetching:true
    }
    case "SET_GROUP_SETTING": 
    return {
      ...state,
      groupSetting:action.data
    }
    case "SET_GROUP_DDL": 
    return {
      ...state,
      groupDdl:action.data
    }
    case "SET_GROUP_DEFAULT": 
    return {
      ...state,
      selectedGroup:action.data
    }
    case "SET_CURRENT_ADDRESS": 
    return {
      ...state,
      currentAddress:action.data
    }
    case "SET_TODAY_PUNCH_RECORD": 
    return {
      ...state,
      todayPunchRecord:action.data
    }

    
    default:
      return state;
  }

}

