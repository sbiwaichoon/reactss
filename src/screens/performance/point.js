import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from '../../components/Button/index'
import {Container} from '../../components/Container'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { increment, decrement, setpage } from '../../actions/index.js';

class point extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    changepage => {
        this.props.setpage('Point');
    }
);

  onAlert = ()=>{
    alert('this is allert from point')  ;
  }

  render() {
    return (
      <Container backgroundColor={'white'} >
        <Text> point </Text>
        <Button text='Go to home' 
        onPress={() => this.onAlert()}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
      count: state.count
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({  setpage: setpage }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(point);

