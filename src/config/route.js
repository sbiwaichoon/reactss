import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,KeyboardAvoidingView,Image,ScrollView,TouchableOpacity,Keyboard,TouchableWithoutFeedback,SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Auth from '../screens/login/auth';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import Home from '../screens/home';
import Menu from '../screens/menu';
import Point from '../screens/performance/point';
import AnnualBonus from '../screens/performance/annualbonus';
import SpecialChallenge from '../screens/performance/specialchallenge';
import {Header,Left,Right} from 'native-base';
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationService from './navigationService';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
      const result = await AsyncStorage.getItem('userLoggedIn');
  
      if(result!=='none' && result!==null){
        this.props.navigation.navigate('Home');
      }
      else{
        this.props.navigation.navigate('Auth');
      }
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>

          <Text>Loading</Text>
        </View>
      );
    }
  }

  const SettingsStack = createMaterialTopTabNavigator({
    Home: {
      screen: Home,
      navigationOptions:{
        tabBarIcon : ({tintColor}) =>(
          <Icon name="home" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    Point: {
      screen: Point,
      navigationOptions:{
        tabBarIcon : ({tintColor}) =>(
          <Icon name="trophy" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    AnnualBonus: {
      screen: AnnualBonus,
      navigationOptions:{
        tabBarIcon : ({tintColor}) =>(
          <Icon name="file-document-edit-outline" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    SpecialChallenge: {
      screen: SpecialChallenge,
      navigationOptions:{
        tabBarIcon : ({tintColor}) =>(
          <Icon name="account-group" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions:{
        tabBarIcon : ({tintColor}) =>(
          <Icon name="menu" style={{fontSize:24,color:tintColor}} />
      )
      }
    }
    
  },
  {
    initialRouteName:'Home',
    tabBarOptions: {
        style: {
          showIcon:true,
          backgroundColor: 'transparent',
          paddingTop: 20,
          marginBottom:20
        },
        showIcon:true,
        showLabel:false
    },
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false
  
  });


  const CustomDrawerComponent = (props) =>(
    <SafeAreaView style={{flex:1}}>
      <View style={{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
        <Image source={require('../components/assets/425.jpg')} style={{height:120,width:120,borderRadius:60, }} />
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
    </SafeAreaView>
  )
  
  const AppDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: SettingsStack,
      navigationOptions: {
        drawerIcon : ({tintColor}) =>(
          <Icon name="home" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    Point:{
      screen:Point,
      navigationOptions:{
        drawerIcon : ({tintColor}) =>(
          <Icon name="trophy" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    AnnualBonus:{
      screen:AnnualBonus,
      navigationOptions:{
        drawerIcon : ({tintColor}) =>(
          <Icon name="bag-personal-outline" style={{fontSize:24,color:tintColor}} />
      )
      }
    },
    SpecialChallenge:{
      screen:SpecialChallenge,
      navigationOptions:{
        drawerIcon : ({tintColor}) =>(
          <Icon name="bag-personal" style={{fontSize:24,color:tintColor}} />
      )
      }
    }
  },{
    contentComponent: CustomDrawerComponent,
    contentOptions:{
      activeTintColor:'orange'  
    },
    initialRouteName:'Home'
  });

  const TopLevelNavigator = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: Auth,
        Home: SettingsStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));

  const AppContainer = createAppContainer(TopLevelNavigator);

  export default class route extends React.Component {
    render() {
      return (
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }

  // export default createAppContainer(createSwitchNavigator(
  //   {
  //       AuthLoading: AuthLoadingScreen,
  //       Auth: Auth,
  //       Home: SettingsStack,
  //   },
  //   {
  //     initialRouteName: 'AuthLoading',
  //   }
  // ));
  

// export default createAppContainer(AppDrawerNavigator);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content:{
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom:30
    },
    txtInput: {
      backgroundColor: "white",
      color:'black',
      borderRadius: 10 
    },
    btnStyle:{
      backgroundColor:'#0082c3',
      marginBottom:20,
      padding:10
    }
  });
  

