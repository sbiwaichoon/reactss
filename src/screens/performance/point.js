import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableHighlight,ActivityIndicator } from 'react-native';
// import {Button} from '../../components/Button/index'
import {LabelWhiteText,LabelBlackText,Button,ButtonLink} from '../../components';
import {Container} from '../../components/Container'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setpage,userLogout } from '../../actions/navActions';
import { fetchPeopleFromAPI } from '../../actions/peopleActions';



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
      <View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}} >
        <Text> People </Text>
        <Button text='Get data from API' 
        onPress={() => this.props.getPeople()}/>
        {
          this.props.people.isFetching && <ActivityIndicator size="large" color="#0000ff" />
        }
        {
        this.props.people.people.length ? (
          this.props.people.people.map((person, i) => {
            return <View key={i} >
              <Text>Name: {person.name}</Text>
              <Text>Birth Year: {person.birth_year}</Text>
            </View>
          })
        ) : null
      }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    people: state.peopleReducer
  };
}

function matchDispatchToProps(dispatch) {
  return {
    getPeople: () => dispatch(fetchPeopleFromAPI()),
    setpage:()=>dispatch(setpage())
  }
  // return bindActionCreators({  setpage: setpage, }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(point);

