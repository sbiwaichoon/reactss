import axios from 'axios';
import { pubApi,pubImageApi } from '../config/api'
import store from '../reducers/index';
import { getDistance } from 'geolib';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
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


export  function fetchPunchCard(punchStatus,dist,status,reason){
    return(dispatch) =>{
        // dispatch(punchCard())
        let data = new FormData();
        data.append('session', store.getState().nicknameReducers.session);
        data.append('punch_datetime', moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
        data.append('punch_action', punchStatus);
        data.append('punch_lng', store.getState().gpsReducers.currentLocation.latitude);
        data.append('punch_lat', store.getState().gpsReducers.currentLocation.latitude);
        data.append('punch_distance', dist);
        data.append('punch_status', status);
        data.append('punch_comment', 0);
        data.append('punch_reason', reason);
        data.append('point_name', 'SBI bay avenue');
        data.append('point_lng', 100.307);
        data.append('point_lat', 5.33695);
        data.append('time_in', 4);
        data.append('time_out', 5);
        data.append('is_next_day', 0);
        data.append('punch_out_allowance', 30);
        data.append('punch_group', 'Normal day');
        data.append('group_uid', '06d901ac-e53d-4c64-9a3d-468e3aa4a1a7');
        data.append('late_allowance', 30);
        data.append('device_id', 'token_uid');
        data.append('first_name', 'Lim');
        data.append('nickname', 'wai choon');
        data.append('address', 'sbi');
        data.append('time', 'now');
        data.append('date', 'datenow');
        data.append('pic_path', 'jjj');
        data.append('thumb_path', 'iii');
        data.append('range', 5);
        data.append('isnew', 1);
        
         return axios.post(`${pubApi}newPunchRecord`, data)
          .then(responseData => {
            //   alert('punch card success')
          })
          .catch(err => {
            alert(err);
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





