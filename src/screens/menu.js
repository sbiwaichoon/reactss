import React, { Component } from 'react';
import { View,StyleSheet,ScrollView,ActivityIndicator,Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button,ButtonLink} from '../components/Button';
import {Item,Form,Label,Text,Input} from 'native-base';
import {LabelWhiteText,LabelBlackText} from '../components/LabelText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setNickName } from '../actions/loginActions';
import { setpage,userLogout } from '../actions/navActions';
import { fetchUpdateEmail,fetchUpdatePhone,fetchUpdateProfileImage } from '../actions/profileActions';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-picker';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Spinner from 'react-native-loading-spinner-overlay';

const initialState = {
  isEditEmail:false,
  isEditPhone:false,
  isEditLanguage:false,
  isChangePassword:false,
  isVerifyEmail:false,
  isVerifyPhone:false
};

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
        this.props.updateProfileImage(response.data)
       

        // console.log('response', JSON.stringify(response));
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
 

  onUpateEmail =(text)=>{
    alert(text)
  }
 
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, width: '100%'}}>
          <Spinner
            visible={this.props.profileDetail.isFetching}
            // textContent={'Loading...'}
            textContent={this.props.profileDetail.fetchingProgress +'%...'}
            textStyle={styles.spinnerTextStyle}
            animation={'slide'}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderBottomColor: '#f3f3f3',
              borderBottomWidth: 4,
            }}>
            <TouchableOpacity onPress={this.chooseImage}>
              <View style={styles.imgContainer}>
                <Image
               
                  source={
                    this.state.fileUri
                      ? {uri: this.state.fileUri}
                      :  ((this.props.loginDetail.profileImage === '')
                          ? require('../components/assets/default-avatar.png')
                          : {uri: this.props.loginDetail.profileImage+ '?' + new Date()})
                      
                  }
                  style={{width: 100, height: 100}}
                />
                <View style={styles.imgCameraIcon}>
                  <Icon name="camera" style={{fontSize: 20, color: 'white'}} />
                </View>
              </View>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 15,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 15, paddingTop: 10}}>
                {this.props.loginDetail.firstName}
              </Text>
              <Text style={{fontWeight: 'bold', fontSize: 13, paddingTop: 5}}>
                {this.props.loginDetail.nickname}
              </Text>
              <Text style={{paddingTop: 5}}>Employee</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 5,
              borderBottomColor: '#f3f3f3',
              borderBottomWidth: 4,
            }}>
            <View style={{flex: 1, width: '100%', paddingVertical: 10}}>
              <View style={{flex: 1, width: '100%'}}>
                <Text style={{fontWeight: 'bold'}}>Email</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  paddingTop: 5,
                }}>
                <View style={{flex: 7, width: '100%'}}>
                  <Text>{this.props.loginDetail.email}</Text>
                </View>
                <View style={{flex: 1, width: '100%'}}>
                  <Icon
                    name="square-edit-outline"
                    onPress={() => {
                      this.setState(initialState);
                      this.setState({isEditEmail: true});
                      this._panel.show();
                    }}
                    style={{fontSize: 20, color: '#596972'}}
                  />
                </View>
                <View style={{flex: 2, width: '100%'}}>
                  <TouchableOpacity
                    style={styles.buttonlink}
                    onPress={() => {
                      this.setState(initialState);
                      this.setState({isVerifyEmail: true});
                      this._panel.show();
                    }}>
                    <Text style={{color: 'blue'}}>Verify</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{flex: 1, width: '100%', paddingVertical: 10}}>
              <View style={{flex: 1, width: '100%'}}>
                <Text style={{fontWeight: 'bold'}}>Phone</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  paddingTop: 5,
                }}>
                <View style={{flex: 7, width: '100%'}}>
                  <Text>{this.props.loginDetail.phone}</Text>
                </View>
                <View style={{flex: 1, width: '100%'}}>
                  <Icon
                    name="square-edit-outline"
                    onPress={() => {
                      this.setState(initialState);
                      this.setState({isEditPhone: true});
                      this._panel.show();
                    }}
                    style={{fontSize: 20, color: '#596972'}}
                  />
                </View>
                <View style={{flex: 2, width: '100%'}}>
                  <TouchableOpacity
                    style={styles.buttonlink}
                    onPress={() => {
                      this.setState(initialState);
                      this.setState({isVerifyPhone: true});
                      this._panel.show();
                    }}>
                    <Text style={{color: 'blue'}}>Verify</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flex: 1, width: '100%', paddingVertical: 5}}>
              <View style={{flex: 1, width: '100%'}}>
                <Text style={{fontWeight: 'bold'}}>System Language</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  width: '100%',
                  paddingTop: 10,
                }}>
                <View style={{flex: 7, width: '100%'}}>
                  <Text>English</Text>
                </View>
                <View style={{flex: 1, width: '100%'}}>
                  <Icon
                    name="square-edit-outline"
                    onPress={() => {
                      this.setState(initialState);
                      this.setState({isEditLanguage: true});
                      this._panel.show();
                    }}
                    style={{fontSize: 20, color: '#596972'}}
                  />
                </View>
                <View style={{flex: 2, width: '100%'}}>
                  {/* <TouchableOpacity style={styles.buttonlink}>
                    <Text style={{color: 'blue'}}>Verify</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Button
                text="Change Password"
                onPress={() => {
                  // alert(this.props.profileDetail.fetchingProgress);
                  this.setState(initialState);
                  this.setState({isChangePassword: true});
                  this._panel.show();
                }}
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              paddingHorizontal: 5,
              borderBottomColor: '#f3f3f3',
              borderBottomWidth: 3,
            }}>
            <View
              style={{
                width: '100%',
                borderBottomColor: '#7a8f9a',
                borderBottomWidth: 4,
                paddingVertical: 10,
              }}>
              <Text style={{fontWeight: '700', color: '#7a8f9a'}}>
                Basic Info
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>User ID</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.userId}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Friendly Name</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.nickname}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Gender</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.gender}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>NRIC</Text>
              <Text style={{paddingTop: 5}}>{this.props.loginDetail.nric}</Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Emergency Contact</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.emergencyContact}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Address</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.address}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>DISC Result</Text>
              <TouchableOpacity style={styles.buttonlink}>
                <Text style={{color: 'blue'}}>View Result</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              paddingHorizontal: 5,
              borderBottomColor: '#f3f3f3',
              borderBottomWidth: 3,
            }}>
            <View
              style={{
                width: '100%',
                borderBottomColor: '#7a8f9a',
                borderBottomWidth: 4,
                paddingVertical: 10,
              }}>
              <Text style={{fontWeight: '700', color: '#7a8f9a'}}>
                Employee Info
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Job Title</Text>
              <Text style={{paddingTop: 5}}>
                {this.props.loginDetail.jobTitle}
              </Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Ranking</Text>
              <Text style={{paddingTop: 5}}></Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Working Day</Text>
              <Text style={{paddingTop: 5}}>5.0 days 5 hours</Text>
            </View>

            <View style={{width: '100%', paddingVertical: 10}}>
              <Text style={{fontWeight: '700'}}>Rest Day</Text>
              <Text style={{paddingTop: 5}}></Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 5,
            }}>
            <Button text="Log out" onPress={() => this.onLogOut()} />
            <Text style={{fontSize: 10, textAlign: 'center'}}>
              Super System a.k.a Performance Based Super Salary & Commission
              System - Software & Apps
            </Text>
          </View>
        </ScrollView>

        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{top: 400, bottom: 0}}>
          {this.state.isEditEmail ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Update Email
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="New Email Address" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({editedEmail: text})}
                      style={{color: 'black'}}
                    />
                  </Item>
                </Form>
                <Button
                  text="Submit"
                  onPress={() =>
                    this.props
                      .updateemail(this.state.editedEmail)
                      .then(this._panel.hide())
                  }
                  // onPress={()=>{alert(this.state.editedEmail)}}
                />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}

          {this.state.isEditPhone ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Update Phone
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="New Phone" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({editedPhone: text})}
                      style={{color: 'black'}}
                    />
                  </Item>
                </Form>
                <Button
                  text="Submit"
                  onPress={() =>
                    this.props
                      .updatePhone(this.state.editedPhone)
                      .then(this._panel.hide())
                  }
                />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}

          {this.state.isEditLanguage ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Update Language
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="New Language" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({password: text})}
                      style={styles.inputStyle}
                    />
                  </Item>
                </Form>
                <Button text="Submit" onPress={() => this._panel.hide()} />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}

          {this.state.isChangePassword ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Update Password
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="New Password" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({password: text})}
                      style={styles.inputStyle}
                    />
                  </Item>
                </Form>
                <Button text="Submit" onPress={() => this._panel.hide()} />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}

          {this.state.isVerifyEmail ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Verify Email
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="Verify Email" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({password: text})}
                      style={styles.inputStyle}
                    />
                  </Item>
                </Form>
                <Button text="Submit" onPress={() => this._panel.hide()} />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}

          {this.state.isVerifyPhone ? (
            <View style={styles.sliderContainer}>
              <Text style={{fontWeight: '700', fontSize: 20}}>
                Verify Phone
              </Text>
              <View style={{paddingTop: 20, width: '100%'}}>
                <Form style={styles.formLoginStyle}>
                  <Item floatingLabel>
                    <Label>
                      <LabelBlackText text="Verify Phone" />
                    </Label>
                    <Input
                      onChangeText={text => this.setState({password: text})}
                      style={styles.inputStyle}
                    />
                  </Item>
                </Form>
                <Button text="Submit" onPress={() => this._panel.hide()} />
                <Button text="Cancel" onPress={() => this._panel.hide()} />
              </View>
            </View>
          ) : null}
        </SlidingUpPanel>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
      page: state.tabReducers.page,
      loginDetail: state.nicknameReducers,
      profileDetail: state.profileReducer
  };
}

// function matchDispatchToProps(dispatch) {
//   return bindActionCreators({  setpage: setpage,setNickName:setNickName,userLogout:userLogout }, dispatch)
// }

function matchDispatchToProps(dispatch) {
  return {
    setpage:()=>dispatch(setpage()),
    userLogout:()=>dispatch(userLogout()),
    updateemail:(email)=>dispatch(fetchUpdateEmail(email)),
    updatePhone:(phone)=>dispatch(fetchUpdatePhone(phone)),
    updateProfileImage:(profileImage)=>dispatch(fetchUpdateProfileImage(profileImage)),
  }
  // return bindActionCreators({  setpage: setpage, }, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(menu);



const styles=EStyleSheet.create({
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
    backgroundColor:'white',
    paddingTop:10,
    paddingHorizontal:10
  },
  sliderContainer:{
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'flex-start',
    backgroundColor:'white',
    padding:20
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
  },
  formLoginStyle:{
    marginTop:-5,
    paddingLeft:20,
    paddingRight:20,
    paddingRight:30
  },
  inputStyle:{
    color:'rgba(255,255,255,0.8)',
    marginBottom: 6,
    fontSize:14
  },
  spinnerTextStyle: {
    color: '#FFF'
  }
})