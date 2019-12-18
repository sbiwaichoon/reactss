import axios from 'axios';
import { pubApi } from '../config/api'
import store from '../reducers/index';
import {setEmail,setPhone} from '../actions/loginActions'
const queryString = require('query-string');

export  function fetchUpdateEmail(email){
    return(dispatch) =>{
        dispatch(updateEmail())
        let sendData = {'session':store.getState().nicknameReducers.session,'email':email};
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        return axios.post(`${pubApi}updateEmail`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {
            var res = responseData.data;
            if(res[0]['result']=='false')
            {
              dispatch(updateEmailFailure('Wrong password or username')) 
            }
            else
            {
              dispatch(setEmail(email))
              dispatch(updateEmailSuccess(res))
            }
          })
          .catch(err => {
            dispatch(updateEmailFailure(err))
          });
    }
}

function updateEmail(){
  return{
      type:"FETCHING_UPDATE_EMAIL"
  }
}

export function updateEmailSuccess(data){
  return{
    type: "FETCHING_UPDATE_EMAIL_SUCCESS",
    data
  };
}

export function updateEmailFailure(err){
  return{
    type: "FETCHING_UPDATE_EMAIL_FAILURE"
  };
}


export  function fetchUpdatePhone(phone){
  return(dispatch) =>{
      dispatch(updatePhone())
      let sendData = {'session':store.getState().nicknameReducers.session,'phone':phone};
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      return axios.post(`${pubApi}updatePhone`, queryString.stringify(sendData), {
        headers: headers
        })
        .then(responseData => {
          var res = responseData.data;
          if(res[0]['result']=='false')
          {
            dispatch(updatePhoneFailure('Wrong password or username')) 
          }
          else
          {
            dispatch(setPhone(phone))
            dispatch(updatePhoneSuccess(res))
          }
        })
        .catch(err => {
          dispatch(updatePhoneFailure(err))
        });
  }
}

function updatePhone(){
return{
    type:"FETCHING_UPDATE_PHONE"
}
}

export function updatePhoneSuccess(data){
return{
  type: "FETCHING_UPDATE_PHONE_SUCCESS",
  data
};
}

export function updatePhoneFailure(err){
return{
  type: "FETCHING_UPDATE_PHONE_FAILURE"
};
}


export  function fetchUpdateProfileImage(profileImage){
  return(dispatch) =>{
      dispatch(updateProfileImage())
      let sendData = {'session':store.getState().nicknameReducers.session,'profileImage':profileImage};
      let data = new FormData();
      data.append('session', store.getState().nicknameReducers.session);
      data.append('profileImage', profileImage);

      var config = {
        // onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        onUploadProgress: function(progressEvent) {
          console.log(Math.round( (progressEvent.loaded * 100) / progressEvent.total ));
          // var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        }
      };

      axios.post(`${pubApi}updateProfileImage`, data, config)
      .then(responseData => {
        var res = responseData.data;
        if(res[0]['result']=='false')
        {
          dispatch(updateProfileImageFailure('Fail')) 
        }
        else
        {
          // dispatch(setPhone(phone))
          dispatch(updateProfileImageSuccess(res))
        }
      })
      .catch(err => {
        dispatch(updateProfileImageFailure(err))
      });

      // const headers = {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // }
      // return axios.post(`${pubApi}updateProfileImage`, queryString.stringify(sendData), {
      //   headers: headers
      //   })
        // .then(responseData => {
        //   var res = responseData.data;
        //   if(res[0]['result']=='false')
        //   {
        //     dispatch(updateProfileImageFailure('Fail')) 
        //   }
        //   else
        //   {
        //     dispatch(setPhone(phone))
        //     dispatch(updateProfileImageSuccess(res))
        //   }
        // })
        // .catch(err => {
        //   dispatch(updateProfileImageFailure(err))
        // });
  }
}

function updateProfileImage(){
return{
    type:"FETCHING_UPDATE_PROFILE_IMAGE"
}
}

export function updateProfileImageSuccess(data){
return{
  type: "FETCHING_UPDATE_PROFILE_IMAGE_SUCCESS",
  data
};
}

export function updateProfileImageFailure(err){
return{
  type: "FETCHING_UPDATE_PROFILE_IMAGE_FAILURE"
};
}