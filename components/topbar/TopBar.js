import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class TopBar extends React.Component {
  render() {
    return (
      <View>
        <Image style={{ width: 140, height: 5, padding: 20 }} source={require('../../assets/n_logo1-1.gif')}></Image>
        {/* <Image style={{ width: 50, height: 52, padding: 20 }} source={require('../../assets/Shopping-Cart-icon.png')}></Image> */}
      </View>
    );
  }
}

export default TopBar;