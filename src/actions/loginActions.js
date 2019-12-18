import axios from 'axios';
import { pubApi,pubImageApi } from '../config/api'
import NavigationService from '../config/navigationService';
import { setpage } from './navActions';
import AsyncStorage from '@react-native-community/async-storage';
const queryString = require('query-string');

export  function fetchLoginFromAPI(username,password){
    return(dispatch) =>{
        dispatch(getLogin())
        let sendData = {'id':username,'pass':password,'mac':'yes'};
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        axios.post(`${pubApi}reactLogin`, queryString.stringify(sendData), {
          headers: headers
          })
          .then(responseData => {
            var res = responseData.data;
            if(res[0]['result']=='false')
            {
              dispatch(getLoginFailure('Wrong password or username')) 
                // AsyncStorage.setItem('@session_key',null);
            }
            else
            {
              dispatch(setpage('Home'));
              dispatch(setNickName(res[0]['nickname']));
              dispatch(setFirstName(res[0]['first_name']));
              dispatch(setPhone(res[0]['phone']));
              dispatch(setUserId(res[0]['userId']));
              dispatch(setGender(res[0]['gender']));
              dispatch(setNric(res[0]['nric']));
              dispatch(setEmergencyContact(res[0]['emergencyContact']));
              dispatch(setAddress(res[0]['address']));
              dispatch(setJobTitle(res[0]['jobTitle']));
              dispatch(setEmail(res[0]['email']));
              let proImg ='';
              if(res[0]['profileImage'] == '')
              {
                 proImg = ''
              }
              else
              {
                proImg = pubImageApi + res[0]['profileImage'];
              }
              dispatch(setProfileImage(proImg));
              NavigationService.navigate('Home');
              AsyncStorage.setItem('userLoggedIn',res[0]['nickname']);
              dispatch(getLoginSuccess(res))
            }
          })
          .catch(err => {
            dispatch(getLoginFailure(err))
          });

            // let sendData = JSON.stringify({'id':username,'pass':password,'mac':'yes'});
            // const headers = {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json',
            // }
            // axios.post(`${pubApi}testreact2`, sendData, {
            //     headers: headers
            //   })
            //   .then((response) => {
            //     alert('success');
            //     dispatch(getLoginSuccess(response.data.results))
            //   })
            //   .catch((error) => {
            //     alert(error);
            //     dispatch(getLoginFailure(error))
            //   })


    }
}

function getLogin(){
  return{
      type:"FETCHING_LOGIN"
  }
}

export function getLoginSuccess(data){
  return{
    type: "FETCHING_LOGIN_SUCCESS",
    data
  };
}

export function getLoginFailure(err){
  return{
    type: "FETCHING_LOGIN_FAILURE"
  };
}

export function setNickName(nickname){
  return{
    type: "SetNickName",
    nickname:nickname
  };
}

export function setFirstName(firstName){
  return{
    type: "SetFirstName",
    firstName:firstName
  };
}

export function setPhone(phone){
  return{
    type: "SetPhone",
    phone:phone
  };
}

export function setUserId(userId){
  return{
    type: "SetUserId",
    userId:userId
  };
}

export function setGender(gender){
  return{
    type: "SetGender",
    gender:gender
  };
}

export function setNric(nric){
  return{
    type: "SetNric",
    nric:nric
  };
}

export function setEmergencyContact(emergencyContact){
  return{
    type: "SetEmergencyContact",
    emergencyContact:emergencyContact
  };
}

export function setAddress(address){
  return{
    type: "SetAddress",
    address:address
  };
}

export function setProfileImage(profileImage){
  return{
    type: "SetProfileImage",
    profileImage:profileImage
  };
}

export function setJobTitle(jobTitle){
  return{
    type: "SetJobTitle",
    jobTitle:jobTitle
  };
}

// export function setEmail(email){
//   return{
//     type: "SetEmail",
//     email:email
//   };
// }

// export function setEmail(email){
//   dispatch({
//     type: "SetEmail",
//     email:email
//   });
//   return Promise.resolve(getState());
// }


export const setEmail = (email) => (dispatch, getState) => {  
  dispatch ({
    type: 'SetEmail',
    email:email
  });
  return Promise.resolve(getState());}


