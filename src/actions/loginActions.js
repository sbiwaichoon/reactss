import axios from 'axios';
import { pubApi } from '../config/api'
import NavigationService from '../config/navigationService';
import { setpage } from './navActions';
import AsyncStorage from '@react-native-community/async-storage';
const queryString = require('query-string');
export function setNickName(nickname){
    return{
      type: "SetNickName",
      nickname:nickname
    };
  }

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