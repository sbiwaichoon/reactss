


export function getGps(){
    return{
        type:'FETCHING_GPS'
    }
}

export function setDistance(){
    return{
        type:'SET_DISTANCE'
    }
}

export function getGpsSuccess(data){
    return{
        type:'FETCHING_GPS_SUCCESS',
        data
    }
}

export function getGpsFailure(){
    return{
        type:'FETCHING_GPS_FAILURE'
    }
}