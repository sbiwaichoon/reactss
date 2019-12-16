import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import Route from './src/config/route';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from './src/screens/header'
import { Provider } from 'react-redux'
import store from './src/reducers/index';



EStyleSheet.build({
  $primaryBlue: '#4F6D7A',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',

  $white: '#FFFFFF',
  $lightGray: '#F0F0F0',
  $border: '#E2E2E2',
  $inputText: '#797979',
  $darkText: '#343434',
});



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
      <View style={styles.TopHeader}>
         <Header/>
          <Route/> 
      </View>  
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  TopHeader:{
    height:280,
    backgroundColor:'red'
  }
});

