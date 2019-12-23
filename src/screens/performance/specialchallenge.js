import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Geolocation from 'react-native-geolocation-service';
import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import {ButtonPrimary} from '../../components';
import { setLocation } from '../../actions/gpsActions';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';

 class specialchallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:'',
      longitude:'',
      isfetching:false,
      isGpsReady:false,
      isOutOfRange:false,
      distance:'0'
    };
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      isWaterMark:true,
      cameraType:'front'
    };
    // ImagePicker.launchCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,

    // }).then(image => {
    //   console.log(image);
    // });
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        // this.props.updateProfileImage(response.data)
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }


  
  componentDidMount() {
      this.onGetLocation();
      // this.onWatchLocation();
      let watchID = Geolocation.watchPosition(
        (position)=>{
          // alert(`${position.coords.latitude} ${position.coords.latitude}` );
          this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude,isGpsReady:true});
          this.props.setLocation({"latitude":position.coords.latitude,"longitude":position.coords.longitude});
          this.onCheckDistance(position.coords.latitude,position.coords.longitude)
        }, 
        (error)=>{
          
        }, 
        {enableHighAccuracy: false, timeout: 3000, maximumAge: 3000,distanceFilter:1 }
        );
        this.setState({
          watchID:watchID
        })

}

componentWillUnmount(){
  Geolocation.clearWatch(this.state.watchID);
}

onGetLocation = (highAcc = true)=>{
  this.setState({isfetching:true})
  Geolocation.getCurrentPosition(
    (position) => {
      this.setState({isfetching:false})
        console.log(position);
        this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude,isGpsReady:true});
        this.props.setLocation({"latitude":position.coords.latitude,"longitude":position.coords.longitude});
        this.onCheckDistance(position.coords.latitude,position.coords.longitude)
    },
    (error) => {
        // alert(`${error.code}  ${error.message}`)
        // console.log(error.code, error.message);
        this.onGetLocation(false);
    },
    { enableHighAccuracy: highAcc, timeout: 3000, maximumAge: 10000 }
);
}




onCheckDistance =(lat,lon)=>{
  let dist= getDistance(
    { latitude: 5.336688, longitude: 100.307648 },
    { latitude: lat, longitude: lon}
  );
  if(dist >100){
    this.setState({distance:dist,isOutOfRange:true});
  }
  else{
    this.setState({distance:dist,isOutOfRange:false});
  }
// alert(`${lat} ${lon} ${ss}`);
}

  render() {
    return (
  
      <View style={styles.mainContent}>
        {/* <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /> */}
          <Spinner
            visible={this.state.isfetching}
            textContent={'Loading ...'}
            textStyle={styles.spinnerTextStyle}
            animation={'slide'}
          />


{/* { this.state.isGpsReady ?(
  <MapView  style={styles.map} initialRegion={{
                      latitude:this.state.latitude,
                      longitude:this.state.longitude,
                      latitudeDelta: 1,
                      longitudeDelta: 1
                      }}>
                  
                      <MapView.Marker
                          coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                          title={"Your Location"}
                      />

  </MapView>):null
  } */}
        <View style={styles.mainHeader}>
          
          <View style={styles.Header}>
          {/* <ButtonPrimary text='sdsd' onPress={alert(`${this.state.latitude} ${this.state.longitude}`)}/> */}
          {/* <ButtonPrimary text='sdsd' onPress={()=>{alert(this.props.gpsDetail.currentLocation.latitude)}}/> */}
              <Text style={styles.Headertxth1}>Good Morning</Text>
              <Text style={styles.Headertxt}>Don't forget to check in</Text>
          </View>
          <View style={styles.punchborder}>
          <LinearGradient 
          start={{x: 0.0, y: 1}} 
          end={{x: 1, y: 0.8}}
          locations={[0,0.2,0.8,1]} 
          colors={this.state.isOutOfRange?['#BBD2C5','#536976']:['#667bce', '#606dcb', '#5959c7','#665aca']} 
          style={styles.punchCont}>
              <TouchableOpacity onPress={()=>{alert(this.state.isOutOfRange?'You are checked in offsite':'You are checked in')}} >
                  <Text style={styles.punchtext}>{this.state.isOutOfRange?'Offsite':'Check In'}</Text>
                  {/* <Text style={styles.punchtime}>{this.state.isOutOfRange?`${this.state.distance} meter`:new Date().toLocaleString("en-US",options)}</Text> */}
                  <Text style={styles.punchtime}>{new Date().toLocaleString("en-US",options)}</Text>
                  <Text style={styles.punchtime}>{`${this.state.distance} m`}</Text>
              </TouchableOpacity>
          </LinearGradient>
          </View>
        </View>
        <ButtonPrimary text='New Footprint' onPress={this.chooseImage}/>
        <Image
               source={{uri: this.state.fileUri}}
               style={{width: 300, height: 300}}
        />
      </View>
    
    );
  }
}

const options = {
  // timeZone:"Africa/Accra",
  hour12 : true,
  hour:  "2-digit",
  minute: "2-digit",
//  second: "2-digit"
}

function mapStateToProps(state) {
  return {
      gpsDetail: state.gpsReducers,

  };
}

function matchDispatchToProps(dispatch) {
  return {
    setLocation:(location)=>dispatch(setLocation(location))
  }
  // return bindActionCreators({  setpage: setpage, }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(specialchallenge);

const styles= StyleSheet.create({
mainContent:{
  flex:1,
  paddingHorizontal:15,
  backgroundColor:'white'
},
mainHeader:{
  paddingVertical:10,
  flexDirection:'row',
  borderRadius:10,
  backgroundColor:'white',
  paddingHorizontal:15,
  borderWidth:2
},
Header:{
  flex:3,
    justifyContent:'center',
},
Headertxth1:{
    fontSize:30,
    color:'#858587',
},
Headertxt:{
    fontSize:14,
    color:'#858587',
    paddingTop:2,
},
  punchborder:{
    borderColor:'#deddd9',
    borderWidth:2,
    borderRadius:100,
  },
  punchCont:{
      
      width:90,
      height:90,
      margin:3,
      justifyContent:'center',
      borderRadius:100/2,
      shadowColor: 'rgba(235,235,235, 1)',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.9,
      shadowRadius: 4,
  },
  punchtext:{
      fontSize:16,
      color:'white',
      textAlign:'center',
      justifyContent:'center',
      fontWeight:'bold',
  },
  punchtime:{
      fontSize:10,
      paddingTop:5,
      color:'white',
      textAlign:'center',
      justifyContent:'center',
  },
  map: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})
