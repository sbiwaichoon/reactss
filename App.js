import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import Route from './src/config/route';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from './src/screens/header'
import { Provider } from 'react-redux'
import store from './src/reducers/index';
import LinearGradient from 'react-native-linear-gradient';


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
        <LinearGradient 
          start={{x: 0.0, y: 1}} 
          end={{x: 1, y: 0.8}}
          locations={[0,0.2,0.8,1]} 
          colors={['#667bce', '#606dcb', '#5959c7','#665aca']} 
          style={styles.linearGradient}>
          <View style={styles.TopHeader}>
            <Header/>
            <Route/> 
          </View>  
        </LinearGradient>
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  TopHeader:{
    flex:1,
    height:280,
   
  },
  linearGradient: {
    flex: 1,
  },
});

