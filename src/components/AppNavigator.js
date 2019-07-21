/**
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Signin from '../containers/Signin';
import VerifySignin from '../components/VerifySignin';
import Home from '../containers/Home';
import AuthGuard from '../components/AuthGuard';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import {createStackNavigator, createAppContainer} from 'react-navigation';
const MainNavigator = createStackNavigator({
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
