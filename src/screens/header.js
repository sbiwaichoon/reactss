import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
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
      <SafeAreaView>
        {this.props.page != 'Menu' ?
          <View style={styles.header}>
            {/* <Text style={styles.topMenuText}> {this.state.nickname}</Text> */}
            <Text style={styles.topMenuText}>{`Hello  ${this.props.loginDetail.nickname}` }</Text>
            <TouchableOpacity>
              <Image
                style={styles.profileImage}
                // source={require('../components/assets/425.jpg')}
                source={
                     this.props.loginDetail.profileImage
                    ? {uri: this.props.loginDetail.profileImage+ '?' + new Date()}
                    : require('../components/assets/default-avatar.png')
                }
              />
            </TouchableOpacity>

            <Icon name="bell" style={{fontSize:24,color:'#ffffff',paddingLeft:10}} />
          </View>
        : null}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
    return {
      page: state.tabReducers.page,
      loginDetail: state.nicknameReducers,
    };
  }
  
  function matchDispatchToProps(dispatch) {
    return bindActionCreators({  setpage: setpage,SetNickName:SetNickName }, dispatch)
  }
  export default connect(mapStateToProps, matchDispatchToProps)(header);
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    top:15,
    justifyContent: "flex-end",
    flexDirection: 'row',
    alignItems: "center",
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
