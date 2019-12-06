let count = 0;
let page ='';
export default function (state = page, action) {
  switch (action.type) {
    case "Setpage": 
      page = action.pageName;
      break;
  }
  return page;
}