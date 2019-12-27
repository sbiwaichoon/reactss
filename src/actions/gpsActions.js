


export function setLocation(data){
    // alert(data.longitude);
    return{
        type:'SetLocation',
        data
    }
}

export function setGpsReady(){
    return{
        type:'SetGpsReady'     
    }
}


