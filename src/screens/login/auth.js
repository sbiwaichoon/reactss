import React from 'react';
import { StyleSheet, View,TextInput,KeyboardAvoidingView,Image,ScrollView,TouchableOpacity,Keyboard,AsyncStorage,TouchableWithoutFeedback } from 'react-native';
import Register from './register';
import Forgotpass from './forgotpass';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchID from "react-native-touch-id";
import{
  Item,
  Form,
  Label,
  Text,
  Input
} from 'native-base';

import BgImage from '../../components/assets/background.png';
import Logo from '../../components/assets/logo.png';
import {Button,ButtonLink} from '../../components/Button/index';
import {LabelWhiteText,LabelBlackText} from '../../components/LabelText/index';
import {Container} from '../../components/Container'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { setpage,setNickName } from '../../actions/index';
import { setNickName } from '../../actions/loginActions';
import { setpage } from '../../actions/navActions';




class auth extends React.Component {
  constructor(props) {
    super(props);
    this.state=({
      showLogin: true,
      showRegister:false,
      showForgotPass:false,
      isAuth:false,
      isLogin: false
    });
  }

  componentDidMount(){
    AsyncStorage.getItem("userLoggedIn").then((result) => {
        if(result!=='none' && result!==null){
          this.setState({isAuth:true});
        }
        else
        {

        }
    })
    .then(res => {
        //do something else
    });
  }


  onSignIn =()=>{
    if( !this.state.username){
      alert('Please enter a username');
    }
    else if( !this.state.password){
      alert('Please enter a password')
    }
    else{
      AsyncStorage.getItem("userLoggedIn").then((result) => {
        if(result!=='none' && result!==null){
          alert(`Someone already logged on`);
        }
        else
        {
          AsyncStorage.getItem(this.state.username).then((result) => {
            if(result!==null){
              if(result!==this.state.password){
                alert('Password incorrect');
              }
              else{
            AsyncStorage.getItem(this.state.username).then((result) => {
              if(result!==null){
                if(result!==this.state.password){
                  alert('Password incorrect');
                }
                else{
                  AsyncStorage.setItem('userLoggedIn', this.state.username).then((result) => {
        
                   this.props.setNickName(this.state.username);
                    this.props.navigation.navigate('Home');
                
                 
                  })
                  .then(res => {

                  });
                }
              }
              else{
                alert(`No account for ${this.state.username}`);
              }
        })
        .then(res => {
            //do something else
        });
              }
            }
            else{
              alert(`No account for ${this.state.username}`);
            }

        })
        .then(res => {
            //do something else
        });


        }
    })
    .then(res => {
        //do something else
    });
    }
  }

  onRegister =()=>{
    this.setState({
      showLogin:false,
      showRegister:true,
      showForgotPass:false
    });
  }

  onForgotPass =()=>{
    this.setState({
      showLogin:false,
      showRegister:false,
      showForgotPass:true,
      username:'',
      password:'',
      passwordConfirm:''
    });
  }

  onCancelRegister =()=>{
    this.setState({
      showLogin:true,
      showRegister:false,
      showForgotPass:false
    });
  }

  onCreateAccount =()=>{
    if( !this.state.username){
      alert('Please enter a username')
    }
    else if(this.state.password !== this.state.passwordConfirm){
      alert('Passwords do not match');
    }
    else
    {
      AsyncStorage.getItem(this.state.username,(err,result)=>{
        if(result!==null){
          alert(`${this.state.username} already exist`);
        }
        else{
          AsyncStorage.setItem(this.state.username,this.state.password,(err,result)=>{
            alert(`${this.state.username} account created`);
            this.setState({
              showLogin:true,
              showRegister:false,
              showForgotPass:false
            });

          });
        }

      })
    }
  }

  onClearAsyncStorage=()=>{
    AsyncStorage.clear().then((result) => {
      alert('All record cleared');

    })
    .then(res => {

    });
  }

  onClearLoginSession=()=>{
    AsyncStorage.removeItem('userLoggedIn').then((result) => {
      alert('All record cleared');

    })
    .then(res => {

    });
  }

  onFingerPrint=()=>{
    TouchID.isSupported()
    .then(this.authenticate)
    .catch(error => {
      AlertIOS.alert('TouchID not supported');
    });
  }

   authenticate = ()=> {
    return TouchID.authenticate()
      .then(success => {
        this.props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error)
        AlertIOS.alert(error.message);
      });
  }

  getme = () => {
    alert(this.props.page + this.props.nickname);
  }

  render() {
  return (

    <TouchableWithoutFeedback  onPress={Keyboard.dismiss} >
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding" enabled> */}
  
      {/* <View style={styles.container}> */}
      <Container>
      <Image style={styles.bgImageStyle} source={BgImage} />
      {/* { !this.state.isAuth &&
        <View><LabelText text='Loading' /></View>
      }  */}

        <View style={{alignItems:'center'}}>
                <Image style={{width:280,height:200,resizeMode:'contain'}} source={require('../../components/assets/logo.png')} />
        </View>
       
        { this.state.showLogin && 
            <View >

            
            <Form style={styles.formLoginStyle}>
                    <Item floatingLabel>
                        <Label>
                            <LabelWhiteText text='Username' />
                        </Label>
                        <Input onChangeText={(text) => this.setState({username:text})} style={styles.inputStyle}/>
                    </Item>
            </Form>

            <Form style={styles.formLoginStyle}>
                    <Item floatingLabel>
                        <Label>
                            <LabelWhiteText text='Password' />
                        </Label>
                        <Input onChangeText={(text) => this.setState({password:text})} secureTextEntry={true} style={styles.inputStyle}/>
                    </Item>
            </Form>

            <View style={{alignItems:'center', marginTop:50}}>
            <Button block info style={styles.footerBottomStyle} text='Sign In' onPress={() => this.onSignIn()}/>
            <Button text='Finger Print Login' onPress={() => this.onFingerPrint()}/>
            <Button text='Register' onPress={() => this.onRegister()}/>
            <ButtonLink text='Forgot Password' onPress={()=>this.getme()} />
            </View>

            {/* <TouchableOpacity style={{marginBottom:10,width:200}}>
                <Button title='Forgot Password' onPress={()=>this.onForgotPass()} />
            </TouchableOpacity>

            <TouchableOpacity style={{marginBottom:10,width:200}}>
                <Button title='Clear AsyncStorage' onPress={()=>this.onClearAsyncStorage()} />
            </TouchableOpacity>

            <TouchableOpacity style={{width:200}}>
                <Button title='Clear Login Session' onPress={()=>this.onClearLoginSession()} />
            </TouchableOpacity> */}

            </View>
        }
        { this.state.showRegister &&
            // <Register />
            <View >
            {/* <TextInput onChangeText={(text) => this.setState({username:text})}  style={[styles.txtInput,{ marginBottom:10, padding:5,width:200, height: 40, borderColor: 'gray', borderWidth: 1 }]} placeholder='Username' />
            <TextInput onChangeText={(text) => this.setState({password:text})}  style={[styles.txtInput,{ marginBottom:10, padding:5,width:200, height: 40, borderColor: 'gray', borderWidth: 1 }]} secureTextEntry={true}  placeholder='Password' />
            <TextInput onChangeText={(text) => this.setState({passwordConfirm:text})} style={[styles.txtInput,{ marginBottom:10, padding:5,width:200, height: 40, borderColor: 'gray', borderWidth: 1 }]} secureTextEntry={true}  placeholder='Comfirm Password' />
             */}
            <Form style={styles.formLoginStyle}>
                    <Item floatingLabel>
                        <Label>
                            <LabelWhiteText text='Username' />
                        </Label>
                        <Input onChangeText={(text) => this.setState({username:text})} style={styles.inputStyle}/>
                    </Item>
            </Form>

            <Form style={styles.formLoginStyle}>
                    <Item floatingLabel>
                        <Label>
                            <LabelWhiteText text='Password' />
                        </Label>
                        <Input onChangeText={(text) => this.setState({password:text})} secureTextEntry={true}  style={styles.inputStyle}/>
                    </Item>
            </Form>

            <Form style={styles.formLoginStyle}>
                    <Item floatingLabel>
                        <Label>
                            <LabelWhiteText text='Comfirm Password' />
                        </Label>
                        <Input onChangeText={(text) => this.setState({passwordConfirm:text})} secureTextEntry={true}  style={styles.inputStyle}/>
                    </Item>
            </Form>

            <View style={{alignItems:'center', marginTop:50}}>
            <Button text='Create' onPress={() => this.onCreateAccount()}/>
            <Button text='Cancel' onPress={() => this.onCancelRegister()}/>
            </View>
            </View>
        }
        { this.state.showForgotPass &&
            // <Forgotpass />
            <View style={styles.content}>
            <Image style={{width:200,height:150,resizeMode:'contain'}} source={require('../../components/assets/logo.png')} />
            <Text style={{marginBottom:10}}>Please enter the email address associated with your account</Text>
            <TextInput  style={[styles.txtInput,{ marginBottom:10, padding:5,width:200, height: 40, borderColor: 'gray', borderWidth: 1 }]} placeholder='Email' />

            <TouchableOpacity style={{marginBottom:10,width:100}}>
                <Button title='Send' onPress={()=>alert('Email has sended to your email.')}  />
            </TouchableOpacity>

            <TouchableOpacity style={{width:100}}>
                <Button title='Cancel' onPress={()=>this.onCancelRegister()}  />
            </TouchableOpacity>

            {/* <Button style={styles.btnStyle} title='Send' onPress={()=>alert('Email has sended to your email.')} />
            <Button style={styles.btnStyle} title='Cancel' onPress={()=>this.onCancelRegister()} /> */}
            </View>
        }
       {/* </View> */}

       <View style={styles.footerCopyRight}>
                    <Text style={styles.CopyRightStyle}>
                        Copyright © 2019 Seantech International. All rights reserved.
                    </Text>
                </View>

       </Container>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>

  )};


}
function mapStateToProps(state) {
  return {
    page: state.tabReducers.page,
    nickname:state.nicknameReducers.nickname
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({  setpage: setpage,setNickName:setNickName }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(auth);



const styles = StyleSheet.create({
  txtInput: {
    backgroundColor: "white",
    color:'black',
    borderRadius: 10 
  },

  bgImageStyle:{
    flex:1,
    resizeMode:'cover',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:'100%',
    height:'100%'
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
  footerCopyRight:{
    position:'absolute',
    bottom:40,
    alignItems: 'center',
    left: 0, 
    right: 0
},
CopyRightStyle:{
    color:'rgba(255,255,255,0.5)',
    fontSize:10
}
});
