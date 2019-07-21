import React, { Component } from 'react';
import { AppRegistry, View, Text ,StyleSheet,ActivityIndicator } from 'react-native';
import {GetToken} from '../js/TokenOparition';
import {ApiUrl} from '../consts/index';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/index'
const apiUrl = ApiUrl();

class AuthGuard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true };
    }
    componentDidMount() {
        const {navigate} = this.props.navigation;
        GetToken()
        .then((_token) => {
        console.log(_token);
        return fetch(`${apiUrl}/signin`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            token: _token
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson",responseJson);
            if(responseJson.status === 200) {
               this.props.dispatch(setCurrentUser(responseJson.currentUser))
               navigate('Home');
               this.setState({isLoading:false})
               
            }
            else {
                navigate('Signin');
            }
            
            return responseJson;
        })
        .catch((err) => {
            console.log(err)
            return err
        })

        })
        .catch((err) => console.log(err))
        
    }
    render(){
        return(
            <View style={[styles.container, styles.horizontal]} >
                <ActivityIndicator size="large" color="#0000ff" />    
            </View>
        )
    }
}

  mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => dispatch(action),
  
    }
  }
  export default connect (null,mapDispatchToProps)(AuthGuard);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })