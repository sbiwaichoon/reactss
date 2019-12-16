import React, { Component } from 'react';
import { View,StyleSheet,ScrollView,ActivityIndicator,Image,TouchableOpacity,Text } from 'react-native';
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
import ImagePicker from 'react-native-image-picker';
class menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
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
  

  onClickImage =()=>{
    alert('click me')
  }
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.chooseImage}>
          <View style={styles.imgContainer}>
            <Image 
            source={this.state.fileUri?{ uri: this.state.fileUri }:require('../components/assets/default-avatar.png')}
            // defaultSource={require('../components/assets/default-avatar.png')}
            // source ={require('../components/assets/425.jpg')}
            style={{ width: 100,height: 100}}
            
            />
            <View style={styles.imgCameraIcon}>
              <Icon name="camera" style={{fontSize:20,color:'white'}} />
            </View>
          </View>

         </TouchableOpacity>

          <LabelBlackText text='Nickname' />
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
  },
  imgContainer:{
    width: 100,
     height: 100,
    borderRadius:90,
    overflow:'hidden'
  },
  imgCameraIcon:{
    backgroundColor:'black',
    opacity:0.4,
    height:20,
    position:'absolute',
    bottom:0,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
})