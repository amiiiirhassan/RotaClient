import React, {Component} from 'react';
import { Platform, Text, View,ImageBackground,Image,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from '../components/Style';
import {ApiUrl} from '../consts/index';
import { connect } from 'react-redux';
import {setCurrentUserPhoneNumber} from '../actions/index';
// import Toast from 'react-native-easy-toast';

class Signin extends React.Component {
  constructor(props) {
      super(props);
      this.state = { phoneNumber: '', disableBtn: false };
  }

  componentDidMount() {
    //  this.props.onAuthorize();
  }

  componentWillUnmount() {

  }

  doLogin(navigate) {
    this.props.dispatch(setCurrentUserPhoneNumber('09379640869'));
    navigate('VerifySignin');
    /*
    let regex = new RegExp('^[0][9][1][0-9]{8,8}$');
    if (this.state.phoneNumber == "") {
        //self.refs.toast.show('لطفا شماره موبایل را وارد کنید', 2000);
        console.log("milad");
        return;
    }  
    this.setState({ disableBtn: true });
    console.log(this.state.phoneNumber);
     return fetch(`${ApiUrl}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: this.state.phoneNumber
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status === 200) {
          this.props.dispatch(setCurrentUserPhoneNumber(this.state.phoneNumber));
          navigate('VerifySignin');
        }
        return responseJson;
      })
      .catch((err) => {
          console.log(err)
          return err
      })
      
      */

  }


  render(){
    const {navigate} = this.props.navigation;

    return(
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={signin.loginContainer}
      scrollEnabled={false}>

          <View style={signin.loginHeader}>
              <View style={signin.loginHeaderArt}>
                  <ImageBackground style={signin.loginHeaderOverlay}
                      source={require('../../assets/img/gradient.png')}>
                      <Image style={[signin.loginHeaderLogo, { width: 230, height: 230 }]}
                          source={require('../../assets/img/logo_official.jpg')}
                      />
                      <Text style={[signin.loginHeaderText, signin.fontCustom]}>
                          برای ورود شماره خود را وارد کنید
                      </Text>
                      {/*<Toast ref="toast" style={{ zIndex: 1000 }} positionValue={370} position='top' opacity={0.8}
                          textStyle={{ fontSize: 18, fontFamily: 'IRANSansMobile', color: '#fff' }}
                      />*/}
                      <View style={signin.loginHeaderSeprator}>

                      </View>
                  </ImageBackground>
                  <Image style={signin.loginHeaderImage}
                      source={require('../../assets/img/running.jpg')}
                  />
              </View>
          </View>
          <View style={signin.loginFrom}>
              <View style={signin.formRow}>
                  <View style={signin.formInputContainer}>
                      <TextInput
                          returnKeyType="done"
                          placeholderTextColor="white"
                          maxLength={11}
                          placeholder=""
                          keyboardType="number-pad"
                          style={[signin.formInput, signin.fontCustom]}
                          onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                          value={this.state.phoneNumber}
                      />
                  </View>
                  <View style={signin.formLabelContainer}>
                      <Text style={[signin.formLabel, signin.fontCustom]}>شماره همراه</Text>
                  </View>
              </View>
          </View>
          <View style={signin.loginAction}>

            <Button
                buttonStyle={signin.loginButton}
                disabled={this.state.disableBtn}
                textStyle={[signin.loginButtonText, signin.fontCustom]}
                title={`ورود`}
                onPress={() => { this.doLogin(navigate) }}
            />


          </View>
      </KeyboardAwareScrollView>

    );
  }
}

const mapStateToProps = (state) => (
  state
)
mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => dispatch(action),

  }
}
export default connect (mapStateToProps,mapDispatchToProps)(Signin);