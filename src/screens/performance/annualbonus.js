import React, { Component } from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import {Button} from '../../components/Button/index'
import ImagePicker from 'react-native-image-picker';
import { Image } from 'react-native-elements';

export default class annualbonus extends Component {
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

  
  render() {
    return (
      <View style>
        <Text> annualbonus </Text>
        { this.state.fileUri ?(
          <Image
          source={{ uri: this.state.fileUri }}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
          />
        ):null
        }
        <Button text='Choose Photo' 
        onPress={() => this.chooseImage()}/>
      </View>
    );
  }
}

// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };


// ImagePicker.showImagePicker(options, (response) => {
//   console.log('Response = ', response);

//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   } else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   } else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//   } else {
//     const source = { uri: response.uri };

//     // You can also display the image using data:
//     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

//     this.setState({
//       avatarSource: source,
//     });
//   }
// });