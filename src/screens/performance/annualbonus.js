import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from '../../components/Button/index'

export default class annualbonus extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onAlert = ()=>{
    alert('this is allert from annual bonus')  ;
  }

  render() {
    return (
      <View style>
        <Text> annualbonus </Text>
        <Button text='Go to point' 
        onPress={() => this.onAlert()}/>
      </View>
    );
  }
}
