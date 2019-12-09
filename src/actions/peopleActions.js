import {FETCHING_PEOPLE,FETCHING_PEOPLE_SUCCESS,FETCHING_PEOPLE_FAILURE} from '../config/constants'
import axios from 'axios';

export function fetchPeopleFromAPI(){
    return(dispatch) =>{
        dispatch(getPeople())
        // fetch('https://swapi.co/api/people/')
        //     .then(res => res.json())
        //     .then(json => dispatch(getPeopleSuccess(json.results)))
        //     .catch(err => dispatch(getPeopleFailure(err)))
            axios.get('https://swapi.co/api/people/')
                .then((response) => {
                    dispatch(getPeopleSuccess(response.data.results))
                })
                .catch((err) => {
                    dispatch(getPeopleFailure(err))
                })
    }
}

function getPeople(){
    return{
        type:FETCHING_PEOPLE
    }
}

function getPeopleSuccess(data){
    return{
        type:FETCHING_PEOPLE_SUCCESS,
        data
    }
}

function getPeopleFailure(){
    return{
        type:FETCHING_PEOPLE_FAILURE
    }
}