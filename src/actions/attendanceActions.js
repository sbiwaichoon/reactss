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
            // alert(;
          });
    }
}

export  function fetchDailyTracking(){
    return(dispatch) =>{
        let sendData = {'session':store.getState().nicknameReducers.session};
        const headers = {
        //   'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        // alert(`${pubApi}reactLogin ${username} ${password}`);
         return axios.post(`${pubApi}getDailyTracking`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {
            let res = responseData.data;
            dispatch(setDailyTracking(res));
          })
          .catch(err => {
            // alert(;
          });
    }
}

export  function fetchPunchInfo(){
    return(dispatch) =>{
        
        let sendData = {'session':store.getState().nicknameReducers.session};
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
         return axios.post(`${pubApi}getPunchInfo`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {
         
            let res = responseData.data;
            let arr = [];
            let nDist = 0;
            let selectedValue ='';
            res.forEach(function(item){
                var obj = {};
                obj["value"] = item.uid;
                obj["label"] = `${item.name} : ${item.locationname}` ;
                arr.push(obj);
                 let dist= getDistance(
                    { latitude: store.getState().gpsReducers.currentLocation.latitude, longitude: store.getState().gpsReducers.currentLocation.longitude },
                    { latitude: item.companyLat, longitude: item.companyLng}
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
            alert(err);
          });
    }
}

export  function fetchTodayPunchRecord(){
    return(dispatch) =>{
        
        let sendData = {'session':store.getState().nicknameReducers.session};
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
         return axios.post(`${pubApi}getTodayPunchRecord`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {        
            let res = responseData.data;
            dispatch(setTodayPunchRecord(res));
          })
          .catch(err => {
            alert(err);
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
        data.append('punch_comment', 1);
        data.append('punch_reason', reason);
        data.append('point_name', store.getState().attendanceReducers.selectedGroup.locationname);
        data.append('point_lng', store.getState().attendanceReducers.selectedGroup.companyLng);
        data.append('point_lat', store.getState().attendanceReducers.selectedGroup.companyLat);
        data.append('time_in', store.getState().attendanceReducers.selectedGroup.startTime);
        data.append('time_out', store.getState().attendanceReducers.selectedGroup.endTime);
        data.append('is_next_day', store.getState().attendanceReducers.selectedGroup.is_next_day);
        data.append('punch_out_allowance', store.getState().attendanceReducers.selectedGroup.punch_out_allowance);
        data.append('punch_group', store.getState().attendanceReducers.selectedGroup.name);
        data.append('group_uid', store.getState().attendanceReducers.selectedGroup.uid);
        data.append('late_allowance', store.getState().attendanceReducers.selectedGroup.late_allowance);
        data.append('device_id', 'token_uid');
        data.append('first_name', 'Lim');
        data.append('nickname', 'wai choon');
        data.append('address', 'sbi');
        data.append('time', 'now');
        data.append('date', 'datenow');
        data.append('pic_path', 'jjj');
        data.append('thumb_path', 'iii');
        data.append('range', store.getState().attendanceReducers.selectedGroup.range);
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


export  function fetchUploadFootPrint(footPrintImage,comment,mode,punchStatus,dist,status){
    return(dispatch) =>{
        // dispatch(updateProfileImage())
        // let sendData = {'session':store.getState().nicknameReducers.session,
        //                 'address': store.getState().attendanceDetail.currentAddress,
        //                 'lat': store.getState().gpsDetail.currentLocation.latitude,
        //                 'lng': store.getState().gpsDetail.currentLocation.longitude,
        //                 'time': moment(new Date()).format("hh:mm A"),
        //                 'date': moment(new Date()).format("MMM DD, YYYY"),
        //                 'comment': comment,
        //                 'mode': mode,
        //                 'footPrintImage':footPrintImage};
        let data = new FormData();
        data.append('session', store.getState().nicknameReducers.session);
        data.append('address', store.getState().attendanceReducers.currentAddress);
        data.append('lat', store.getState().gpsReducers.currentLocation.latitude);
        data.append('lng', store.getState().gpsReducers.currentLocation.longitude);
        data.append('time', moment(new Date()).format("hh:mm"));
        data.append('date', moment(new Date()).format("MMM D, YYYY"));
        data.append('comment', comment);
        data.append('isoffsite', mode);
        data.append('footPrintImage', footPrintImage);
  
        var config = {
          // onUploadProgress: progressEvent => console.log(progressEvent.loaded)
          onUploadProgress: function(progressEvent) {
            // dispatch(updateFetchingProgress(Math.round( (progressEvent.loaded * 100) / progressEvent.total ))); 
          }
        };
  
        return axios.post(`${pubApi}uploadCheckInImage`, data, config)
        .then(responseData => {
          var res = responseData.data;
          console.log(res)
          if(res[0]['result']=='false')
          {
            // dispatch(updateProfileImageFailure('Fail')) 
          }
          else
          {
            //   alert('success');
            dispatch(fetchPunchCard(punchStatus,dist,status,comment))
            // dispatch(updateProfileImageSuccess(res))
          }
        })
        .catch(err => {
        //   dispatch(updateProfileImageFailure(err))
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

  export function setTodayPunchRecord(data){
    return{
        type:"SET_TODAY_PUNCH_RECORD",
        data
    }
  }

  export function setCurrentAddress(data){
    return{
        type:"SET_CURRENT_ADDRESS",
        data
    }
  }

  export function setDailyTracking(data){
    return{
        type:"SET_DAILY_TRACKING",
        data
    }
  }





