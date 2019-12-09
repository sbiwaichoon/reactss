const initialState = {  page: 'testingpage'};

export default function tabReducers (state=initialState , action) {
  switch (action.type) {
    case "Setpage": 
    return {
      ...state,
      page:action.pageName
  }
    default:
      return state;
  }

}


// const initialState = {  page: 'testingpage'};

// export default function tabReducers (state=initialState , action) {
//   switch (action.type) {
//     case "Setpage": 
//       return action.pageName;
//     default:
//       return state;
//   }

// }





