import React, { Component } from 'react';
import { View,StyleSheet,ScrollView,ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button,ButtonLink} from '../components/Button';
import {Container} from '../components/Container'
import {LabelWhiteText,LabelBlackText} from '../components/LabelText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setNickName } from '../actions/loginActions';
import { setpage,userLogout } from '../actions/navActions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Image } from 'react-native-elements';

class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount(){
    // let src = require('../components/assets/425.jpg');

  }

  didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    changepage => {
        this.props.setpage('Menu');
    }
);


  onLogOut =()=>{
    AsyncStorage.removeItem('userLoggedIn').then((result) => {
      this.props.userLogout();
      this.props.navigation.navigate('Auth');
    })
    .then(res => {

    });
  }
  


 
  render() {
    return (
      <View style={styles.container}>
          <Image 
          source={{ uri: this.state.fileUri }}
          // source ={require('../components/assets/425.jpg')}
          style={{ width: 100, height: 100,borderRadius:100/2 }}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
          />

          <LabelBlackText text='This is menu page' />
          <Button text='Log out' onPress={() => this.onLogOut()} />

      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
      page: state.tabReducers.page,
      nickname: state.nicknameReducers.nickname
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({  setpage: setpage,setNickName:setNickName,userLogout:userLogout }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(menu);



const styles=EStyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
    paddingTop:10
  }
})