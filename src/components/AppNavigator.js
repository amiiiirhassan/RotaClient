/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Signin from '../containers/Signin';
import VerifySignin from '../components/VerifySignin';
import {createStackNavigator, createAppContainer} from 'react-navigation';
const MainNavigator = createStackNavigator({
  //Home: {screen: HomeScreen},
  //Profile: {screen: ProfileScreen},
  Signin: {screen: Signin},
  VerifySignin: {screen: VerifySignin}
  
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
const AppNavigator = createAppContainer(MainNavigator);
export default AppNavigator;
