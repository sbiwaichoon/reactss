import React, { Component } from 'react';
import { View, Text, ScrollView,StyleSheet,TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AreaChart, Grid,StackedAreaChart,ProgressCircle } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
          <ScrollView style={styles.contentscroll}>
            <View style={styles.content}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Target")}
                style={{
                    flex:1,
                  marginRight: 20,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text style={{paddingTop:10,paddingLeft:10}}>Target</Text>
                
                <ProgressCircle
                  style={{ height: 100,paddingTop:20 }}
                  progress={0.7}
                  progressColor={"rgb(134, 65, 244)"}
                  startAngle={-Math.PI * 0.8}
                  endAngle={Math.PI * 0.8}
                />
          
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Performance")}
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text>Performance</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View
                style={{
                  flex:1,
                  paddingTop: 10,
                  paddingLeft: 10,
                  marginRight: 20,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text>Income</Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text>Task</Text>
              </View>
            </View>

            <View style={styles.content}>
              <View
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  marginRight: 20,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text>Test 1</Text>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  justifyContent: "flex-start",
                  backgroundColor: "white",
                  shadowColor: "#000000",
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  shadowOffset: { height: 1, width: 1 }
                }}
              >
                <Text>Test 2</Text>
              </View>
            </View>
          </ScrollView>
        );
    }
}


export default withNavigation(Content);


const styles = StyleSheet.create({
    contentscroll:{
        paddingTop:45,
        paddingHorizontal:10,
    },
    content:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:250,
        borderRadius: 20,
    },
    bdShadow:{
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1}
    }
});