import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableHighlight,ActivityIndicator } from 'react-native';
import {LabelWhiteText,LabelBlackText,Button,ButtonLink} from '../../components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setpage,userLogout } from '../../actions/navActions';
import { fetchPeopleFromAPI } from '../../actions/peopleActions';
import VideoPlayer from 'react-native-video-controls';
class point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo : false
    };
  }

    didBlurSubscription = this.props.navigation.addListener(
    'didFocus',
    changepage => {
        this.props.setpage('Point');
    }
);

loadVideo = ()=>{
   this.setState({
     showVideo:true
   })
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

        <Button text='Play Video from API' 
        onPress={() => this.loadVideo()}/>

         {/* <Video
          source={{uri: 'http://localhost:8888/react_native_api/video/video1.mp4'}} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          fullscreen = {true}
        />  */}
        {
           this.state.showVideo ?
           (<VideoPlayer
           source={{ uri: 'http://192.168.0.7:8888/react_native_api/video/video1.mp4' }}
     
            />):null
        }


      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})



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

