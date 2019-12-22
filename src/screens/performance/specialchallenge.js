import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Geolocation from 'react-native-geolocation-service';
import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import {ButtonPrimary} from '../../components';
import { fetchGps } from '../../actions/gpsActions';
import { connect } from 'react-redux';
 class specialchallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:'',
      longitude:'',
      isGpsReady:false
    };
  }



  componentDidMount() {
    // this.props.fetchGps;
      // Geolocation.getCurrentPosition(
      //     (position) => {
      //       // alert(position.coords.latitude);
      //         console.log(position);
      //         this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude,isGpsReady:true});
              
      //     },
      //     (error) => {
      //         // See error code charts below.
      //         alert(`${error.code}  ${error.message}`)
      //         console.log(error.code, error.message);
      //     },
      //     { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      // );

      this.onGetLocation();

  
}

onGetLocation = (highAcc = true)=>{
  Geolocation.getCurrentPosition(
    (position) => {
      alert(highAcc);
        console.log(position);
        this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude,isGpsReady:true});
        
    },
    (error) => {
        // See error code charts below.
        alert(`${error.code}  ${error.message}`)
        console.log(error.code, error.message);
        this.onGetLocation(false);
    },
    { enableHighAccuracy: highAcc, timeout: 3000, maximumAge: 10000 }
);
}


onCheckDistance =()=>{
  let ss= getDistance(
    { latitude: 5.336688, longitude: 100.307648 },
    { latitude: this.state.latitude, longitude: this.state.longitude }
);
alert(`${this.state.latitude} ${this.state.longitude} ${ss}`);
}

  render() {
    return (
  
      <View style={styles.mainContent}>

{ this.state.isGpsReady ?(
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
  }
        <View style={styles.mainHeader}>
          
          <View style={styles.Header}>
          {/* <ButtonPrimary text='sdsd' onPress={alert(this.props.gpsDetail.currentLocation)}/> */}
              <Text style={styles.Headertxth1}>Good Morning</Text>
              <Text style={styles.Headertxt}>Don't forget to check in</Text>
          </View>
          <View style={styles.punchborder}>
          <LinearGradient 
          start={{x: 0.0, y: 1}} 
          end={{x: 1, y: 0.8}}
          locations={[0,0.2,0.8,1]} 
          colors={['#667bce', '#606dcb', '#5959c7','#665aca']} 
          style={styles.punchCont}>
              <View>
                  <Text style={styles.punchtext}>Check In</Text>
                  <Text style={styles.punchtime}>08.30 AM</Text>
              </View>
          </LinearGradient>
          </View>
        </View>
      </View>
    
    );
  }
}

function mapStateToProps(state) {
  return {
      gpsDetail: state.gpsReducers,

  };
}

function matchDispatchToProps(dispatch) {
  return {
    fetchGps:()=>dispatch(fetchGps(true))
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
