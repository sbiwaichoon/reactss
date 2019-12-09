import React, { Component } from 'react';
import { View,StyleSheet,AsyncStorage,ScrollView } from 'react-native';
import {Button,ButtonLink} from '../components/Button';
import {Container} from '../components/Container'
import {LabelWhiteText,LabelBlackText} from '../components/LabelText';
// import Content from './Content';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { setpage,setNickName,userLogout } from '../actions/index.js';
import { setNickName } from '../actions/loginActions';
import { setpage,userLogout } from '../actions/navActions';



class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    changepage => {
        this.props.setpage('Menu');
    }
);


  onLogOut =()=>{
    AsyncStorage.removeItem('userLoggedIn').then((result) => {
      // alert('You Logged Out');
      this.props.userLogout();



      this.props.navigation.navigate('Auth');
    })
    .then(res => {

    });
  }
  


  onPressme =()=>{
    alert(this.props.nickname);
  }

  render() {
    return (
      <Container>
          <LabelBlackText text='This is menu page' />
          <Button text='Log out' onPress={() => this.onLogOut()} />
          <Button text='Press me' onPress={() => this.onPressme()} />
      </Container>
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



