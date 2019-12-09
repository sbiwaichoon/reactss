import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import {setpage,SetNickName } from '../actions/index';
import { SetNickName } from '../actions/loginActions';
import { setpage } from '../actions/navActions';

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      isLoading: true,
      nickname: '',
      companyid: '',
      userid: '',
      mode: '',
      isLoggedIn: '',
    }

  }

  componentDidMount() {

    console.log('page:',this.props.page);
  }

  getactivetab = () => {
    //   alert(this.props.navigation.state.routeName);
    //   alert( this.props.increment());
    alert(this.props.count);

  }
  changepage = () => {
    this.props.setpage();
  }

  goProfilePage = async () => {
    this.props.navigation.navigate('Profile');
  }


  render() {

    return (
      <SafeAreaView style={{ backgroundColor: '#5c5ac7' }}>
        {this.props.page == 'Home' ?
          <View style={styles.header}>
            {/* <Text style={styles.topMenuText}> {this.state.nickname}</Text> */}
            <Text style={styles.topMenuText}>{`Hello  ${this.props.nickname}` }</Text>
            <TouchableOpacity>
              <Image
                style={styles.profileImage}
                source={require('../components/assets/425.jpg')}
              />
            </TouchableOpacity>

            <Icon name="bell" style={{fontSize:24,color:'#ffffff'}} />
          </View>
        : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
    return {
      page: state.tabReducers.page,
      nickname:state.nicknameReducers.nickname
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({  setpage: setpage,SetNickName:SetNickName }, dispatch)
  }
  export default connect(mapStateToProps, matchDispatchToProps)(header);
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    height: 50,
    backgroundColor: '#5c5ac7',
    justifyContent: "flex-end",
    flexDirection: 'row',
    alignItems: "flex-end",
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  topMenuText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',

  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
