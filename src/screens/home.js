import React, { Component } from 'react';
import { View,StyleSheet,ScrollView, Text,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import {Button,ButtonLink} from '../components/Button';
import {Container} from '../components/Container'
// import {LabelWhiteText,LabelBlackText} from '../components/LabelText';
import {LabelWhiteText,LabelBlackText,Button,ButtonLink} from '../components';
// import Content from './Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setNickName } from '../actions/loginActions';
import { setpage,userLogout } from '../actions/navActions';
import LinearGradient from 'react-native-linear-gradient';
import ElevatedView from 'react-native-elevated-view'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import * as Progress from 'react-native-progress';
import {Surface, Shape} from '@react-native-community/art';

const screenWidth = Dimensions.get("window").width;


class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    changepage => {
        this.props.setpage('Home');
    }
);


  onLogOut =()=>{
    AsyncStorage.removeItem('userLoggedIn').then((result) => {
      alert('You Logged Out');
      this.props.userLogout();



      this.props.navigation.navigate('Auth');
    })
    .then(res => {

    });
  }

  onPressme =()=>{
    alert(this.props.page)
  }


  render() {
    return (
      <Container>
        
        <ScrollView style={styles.mainContent}>
          <ElevatedView
          elevation={4}
          style={styles.mainHeader}>
            <View style={styles.Header}>
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
          </ElevatedView>
        

          <View style={styles.col12Cont}>
            <View style={styles.col6Left}>
              <ElevatedView
              elevation={4}
              style={styles.stayElevated}>

              <Text style={styles.title}>Target</Text>
              <View>
                <BarChart width={150} height={200}
              yAxisLabel={'$'} verticalLabelRotation={90}
              data={{
                
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43]
                  }
                ]
              }}
              chartConfig={{
                backgroundGradientFrom: '#667bce',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(85, 70, 226, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.4
              }}
              style={{
                justifyContent:'center',
                alignItems: 'center',
              }}
               />
              </View>
              </ElevatedView>
            </View>


            <View style={styles.col6Right}>
              <ElevatedView
                elevation={4}
                style={styles.stayElevated}>
                <Text style={styles.title}>Performance</Text>
                <View>
                <Progress.Circle size={30} indeterminate={true} />
                </View>
              </ElevatedView>
            </View>
          </View>

          <View style={styles.col12Cont}>
            <View style={styles.col6Left}>
              <ElevatedView
              elevation={4}
              style={styles.stayElevated}>
              <Text style={styles.title}>Income</Text>
              
              </ElevatedView>
            </View>


            <View style={styles.col6Right}>
              <ElevatedView
                elevation={4}
                style={styles.stayElevated}>
                <Text style={styles.title}>Task</Text>
                <View style={styles.graphCont}>
                  <Text style={{fontSize:40,fontWeight:'bold',paddingBottom:25,paddingTop:25}}>3/5</Text>
                </View>
                <View>
                  <Text style={{fontSize:12,paddingHorizontal:15,paddingBottom:5}}>Personal Requirement</Text>
                  <View style={{justifyContent: 'center',alignItems: 'center',}}>
                  <Progress.Bar progress={0.5} width={150} />
                  </View>
                  <Text style={{fontSize:12,paddingHorizontal:15,paddingTop:10,paddingBottom:5}}>Promotion for Product A</Text>
                  <View style={{justifyContent: 'center',alignItems: 'center',}}>
                  <Progress.Bar progress={0.8} width={150} />
                  </View>
                </View>
              </ElevatedView>
            </View>
          </View>



        </ScrollView>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
      page: state.tabReducers.page,
      nickname: state.nicknameReducers.session
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({  setpage: setpage,setNickName:setNickName,userLogout:userLogout }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(home);


const styles = StyleSheet.create({
  mainContent:{
    width:'100%',
    top:-80,
    paddingHorizontal:15,
  },
  mainHeader:{
    paddingVertical:10,
    width:'100%',
    flexDirection:'row',
    borderRadius:10,
    backgroundColor:'white',
    paddingHorizontal:15,
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
    flex:1,
    width:90,
    height:90,
    margin:3,
    justifyContent:'center',
    borderRadius:50,
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
col12Cont:{
  flex:1,
  flexDirection:'row',
  height:260,
  paddingTop:30,
  marginHorizontal:5,
  justifyContent: 'center',

},
col6Left:{
  flex:1,
  flexDirection:'row',
  marginRight:10,
},
col6Right:{
  flex:1,
  flexDirection:'row',
  marginLeft:10,
},
title:{
  paddingVertical:10,
  paddingHorizontal:10,
  fontSize:16,
},
stayElevated: {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
},
graphCont:{
  justifyContent:'center',
  alignItems: 'center',
},
});