/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Signin from '../containers/Signin';
import VerifySignin from '../components/VerifySignin';
import Home from '../containers/Home';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import AuthGuard from '../components/AuthGuard';
import {createStackNavigator, createAppContainer} from 'react-navigation';
const MainNavigator = createStackNavigator({
  //Profile: {screen: ProfileScreen},
  AuthGuard: {screen: AuthGuard},
  Signin: {screen: Signin},
  VerifySignin: {screen: VerifySignin},
  Home: {screen: Home},
  Profile: {screen: Profile},
  EditProfile: {screen: EditProfile}

  
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
const AppNavigator = createAppContainer(MainNavigator);
export default AppNavigator;