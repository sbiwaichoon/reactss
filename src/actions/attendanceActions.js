import axios from 'axios';
import { pubApi,pubImageApi } from '../config/api'
import store from '../reducers/index';
import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';
const queryString = require('query-string');
Geocoder.init("AIzaSyCLGr7dYcyHvC5iPhh1Ue9wkZYLK2IZdXo"); 
export  function fetchGroupSetting(){
    return(dispatch) =>{
        dispatch(getGroupSetting())
        let sendData = {'session':store.getState().nicknameReducers.session};
        const headers = {
        //   'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        // alert(`${pubApi}reactLogin ${username} ${password}`);
         return axios.post(`${pubApi}getGroupSetting`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {
              
            let res = responseData.data;
            let arr = [];
            let nDist = 0;
            let selectedValue ='';
            res.forEach(function(item){
                var obj = {};
                obj["value"] = item.UID;
                obj["label"] = `${item.groupname} : ${item.company_location}` ;
                arr.push(obj);
                 let dist= getDistance(
                    { latitude: store.getState().gpsReducers.currentLocation.latitude, longitude: store.getState().gpsReducers.currentLocation.longitude },
                    { latitude: item.company_lat, longitude: item.company_lng}
                  );
                
                  if(nDist==0 || dist < nDist){                   
                    selectedValue = item;              
                    nDist = dist ;
                  }
                  
              });
              
              dispatch(setGroupDefault(selectedValue))
              dispatch(setGroupDdl(arr))
              dispatch(setGroupSetting(res));
          })
          .catch(err => {
            // alert(err);
          });
    }
}





export function getGroupSetting(){
    return{
        type:"FETCHING_GROUP_SETTING"
    }
  }

  export function setGroupSetting(data){
    return{
        type:"SET_GROUP_SETTING",
        data
    }
  }

  export function setGroupDdl(data){
    return{
        type:"SET_GROUP_DDL",
        data
    }
  }

  export function setGroupDefault(data){
    return{
        type:"SET_GROUP_DEFAULT",
        data
    }
  }


  export function setCurrentAddress(data){
    return{
        type:"SET_CURRENT_ADDRESS",
        data
    }
  }





