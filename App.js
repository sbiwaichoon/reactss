import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Route from './src/config/route';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from './src/screens/header'
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import rootReducer from './src/reducers/index';
const store = createStore(rootReducer);


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
      <View style={{flex:1}}>
        <Header/>
      <Route/>
      </View>
      </Provider>
    );
  }
}


