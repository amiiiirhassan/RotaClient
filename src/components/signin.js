import React, {Component} from 'react';
import { Platform, Text, View,ImageBackground,Image,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signin } from './Style';

// import Toast from 'react-native-easy-toast';
// import { Actions } from 'react-native-router-flux';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { userAuthorized } from '../actions';

class Signin extends React.Component {
  constructor(props) {
      super(props);
      this.state = { text: '', disableBtn: false };
  }

  componentDidMount() {
    //  this.props.onAuthorize();
  }

  componentWillUnmount() {

  }

  doLogin() {

{
  /*
  var self = this;
    let regex = new RegExp('^[0][9][1][0-9]{8,8}$');
    if (this.state.text == "") {
        self.refs.toast.show('لطفا شماره موبایل را وارد کنید', 2000);
        return;
    } else if (!this.state.text.match(regex)) {
        self.refs.toast.show('شماره ی موبایل معتبر نیست', 2000);
        return;
    }
    self.setState({ disableBtn: true });
    //Actions.verify({mobile:this.state.text});
    fetch('http://rota.social:443/api/signin?mobile=' + parseInt(this.state.text), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json())
        .then(responseJson => {
            self.setState({ disableBtn: false });
            if (responseJson.status) {
                Actions.verify({ mobile: this.state.text });
            } else {
                self.refs.toast.show('شماره همراه را اشتباه وارد کردید', 5000);
            }
        }).catch((error) => {
            self.setState({ disableBtn: false });
            self.refs.toast.show(error, 5000);
        });
*/
}


  }


  render(){
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
                          onChangeText={(text) => this.setState({ text })}
                          value={this.state.text}
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
                onPress={() => { this.doLogin() }}
            />


          </View>
      </KeyboardAwareScrollView>

    );
  }
}



export default Signin;