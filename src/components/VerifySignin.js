'use strict';
import React, {Component} from 'react'
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ImageBackground
} from 'react-native';
import {ApiUrl} from '../consts/index';
const apiUrl = ApiUrl();

import { connect } from 'react-redux';

import { Button,FormInput,FormLabel } from 'react-native-elements';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Toast, {DURATION} from 'react-native-easy-toast'



import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {SaveToken} from '../js/TokenOparition'


//import LinearGradient from 'react-native-linear-gradient';


const {height, width} = Dimensions.get('window');

class VerifySignin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { disableBtn: false ,code: '', timer: null, time: 59,  fill: 0, index: 1, txt1:null ,txt2:null,txt3:null ,txt4:null,txt5:null };
    }

    componentDidMount() {
       // this.props.onAuthorize();
        this.setTimer();
    }
    resetTime() {
        this.setState({time: 59,fill: 0});
    }

    setTimer(){
        var self = this;
        self.setState({time: 59,fill: 0});
        this.state.timer = window.setInterval( () => {
            var time = self.state.time;
            var fill = self.state.fill;
            self.setState({time: time-1})
            self.setState((state)=>({
                fill: state.fill + 1.7
            }))
            if(time == 1){
                window.clearInterval(self.state.timer);
                self.setState({timer: null, fill: 100});
            }
        },1000)
    }

    doLogin(){
      //  Actions.profile({mobile:this.state.text});
    }

    convertor(number){
        var ret = number > 9 ? "" + number: "0" + number;
        var converted = ret;

        var faNumbs = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        var result = '';
        for(var i = 0 ; i < converted.length ; i++){
            result += faNumbs[converted[i]];
        }
        return result;
    }

    sendAgain(mobileNumber){
     return fetch(`${apiUrl}/signin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: mobileNumber
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson",responseJson);
        if(responseJson.status === 200) {
          this.setTimer();
          console.log("the verification code send again");
        }
        return responseJson;
      })
      .catch((err) => {
          console.log(err)
          return err
      })
    }

    doVerify(mobileNumber,navigate){
        const code = this.state.txt1+this.state.txt2+this.state.txt3+this.state.txt4+this.state.txt5;
        return fetch(`${apiUrl}/signin`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: mobileNumber,
              verifyCode: code

            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.status === 200) {
                SaveToken(responseJson.token)
                .then(()=> navigate('Home'))
                .catch((err) => console.log(err))
                

            }
            else {
                this.refs.toast.show('کد تایید اشتباه است', 2000);
            }
            return responseJson;
          })
          .catch((err) => {
              console.log(err)
              return err
          })
        /*
        var self = this;
        self.setState({ disableBtn: true });

        var code = this.state.txt1+this.state.txt2+this.state.txt3+this.state.txt4+this.state.txt5;
        fetch('http://rota.social:443/api/verify?mobile='+mobile+'&code='+code, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(response => response.json())
        .then(responseJson => {
            self.setState({ disableBtn: false });

          if(responseJson.status){
            

            global.storage.save({
                key: 'userState',   // Note: Do not use underscore("_") in key!
                data: JSON.stringify(responseJson.data2[0]),
                expires: null
            });

            global.user = responseJson.data2[0];

           // Actions.main({mobile:this.state.text});


          } else {
            self.refs.toast.show('کد تایید اشتباه است!', 5000);
          }
        }).catch(()=>{
            self.setState({ disableBtn: false });

        })
        */
    }

    changeInput(text,index){
        
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.loginContainer}
            scrollEnabled={false}>
                <View style={styles.loginHeader}>
                    <View style={styles.loginHeaderArt}>
                        <ImageBackground style={styles.loginHeaderOverlay}
                            source={require('../../assets/img/gradient.png')}>
                            <View style={styles.countdownContainer}>
                                <View style={styles.placeholderCountdown}>
                                    <Text style={[styles.textCountdown, styles.fontCustom]}>۰۰ : { this.convertor(this.state.time) }</Text>
                                </View>
                                
                                <AnimatedCircularProgress
                                  style={styles.circleCountdown}
                                  linecap="round"
                                  rotation={0}
                                  size={230}
                                  width={4}
                                  backgroundWidth={1}
                                  fill={this.state.fill}
                                  tintColor="#eb387c"
                                  backgroundColor="#FFFFFF">
                                </AnimatedCircularProgress>
                            </View>
                            <Text style={[styles.loginHeaderText, styles.fontCustom]}>
                                رمز عبور برای شماره مورد نظر ارسال شد{"\n"}
                                لطفا منتظر بمانید
                            </Text>                            
                            <Text style={[styles.loginHeaderPhoneNumber, styles.fontCustom]}>
                                { this.convertor(this.props.phoneNumber) }
                            </Text>
                            <Toast ref="toast" style={{zIndex:1000}} positionValue={390} position='top' opacity={0.8}
                             textStyle={{fontSize:18,fontFamily: 'IRANSansMobile',color:'#fff'}} />
                            <View style={styles.loginHeaderSeprator}>
                            </View>
                        </ImageBackground>
                        <Image style={styles.loginHeaderImage}
                          source={require('../../assets/img/running.jpg')}                        
                        />
                    </View>
                </View>
                <View style={styles.loginFrom}>
                    <View style={styles.formRow}>
                        <View style={styles.formPinInputContainer}>
                            <TextInput
                                style={styles.formPinInput}
                                ref="txt1"
                                id="txt1"
                                value={this.state.txt1}
                                maxLength= {1}
                                autoFocus={this.state.index == 1 ? true : false}
                                editable = {true}
                                keyboardType="numeric"
                                onChangeText={(text) => { if(text!=''){ this.refs.txt2.focus();this.setState({txt1:text}) } else { this.setState({txt1:''}) } }}
                            />
                            <TextInput
                                style={styles.formPinInput}
                                keyboardType="numeric"
                                ref="txt2"
                                id="txt2"
                                autoFocus={this.state.index == 2 ? true : false}
                                editable = {true}
                                maxLength= {1}
                                onChangeText={(text) => { if(text!=''){ this.refs.txt3.focus();this.setState({txt2:text}) } }}
                            />
                            <TextInput
                                style={styles.formPinInput}
                                keyboardType="numeric"
                                maxLength= {1}
                                editable = {true}
                                ref="txt3"
                                id="txt3"
                                autoFocus={this.state.index == 3 ? true : false}
                                onChangeText={(text) => { if(text!=''){ this.refs.txt4.focus(); this.setState({txt3:text}) } }}
                            />
                            <TextInput
                                style={styles.formPinInput}
                                keyboardType="numeric"
                                maxLength= {1}
                                ref="txt4"
                                id="txt4"
                                autoFocus={this.state.index == 4 ? true : false}
                                editable = {true}
                                onChangeText={(text) => { if(text!=''){ this.refs.txt5.focus(); this.setState({txt4:text}) } }}
                            />
                            <TextInput
                                style={styles.formPinInput}
                                keyboardType="numeric"
                                maxLength= {1}
                                ref="txt5"
                                id="txt5"
                                editable = {true}
                                autoFocus={this.state.index == 5 ? true : false}
                                onChangeText={(text) => { if(text!=''){ this.refs.txt5.blur(); this.setState({txt5:text}) } }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.loginAction}>
                    {
                        this.state.time == 0 ? 
                        <View>
                            <Text style={[styles.loginVerifyText, styles.fontCustom]}>رمز عبور را دریافت نکردید؟</Text>

                            <Button 
                              buttonStyle={styles.loginResendCode}
                              textStyle={[styles.loginResendCodeText, styles.fontCustom]}
                              onPress={() => this.sendAgain(this.props.phoneNumber)}
                              title="دریافت مجدد"
                            />
                        </View> : 
                        <Button
                          buttonStyle={styles.loginButton}
                          disabled={this.state.disableBtn}
                          textStyle={[styles.loginButtonText, styles.fontCustom]}
                          title={`ورود`}
                          onPress={() => this.doVerify(this.props.phoneNumber,navigate)}
                         // onPress={() => this.doLogin()}
                        />  
                    }
                    
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => (
    state
)
export default connect (mapStateToProps)(VerifySignin);

var styles = StyleSheet.create({


    loginContainer:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#252638'
    },
    loginHeader:{
        flex: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loginHeaderArt:{
        height: '100%',
        width: width * 2,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        justifyContent: 'flex-start',
        alignItems: 'center',        
        overflow: 'hidden'
    },
    loginHeaderImage:{
        position: 'absolute',
        zIndex: 1,
    },
    loginHeaderOverlay:{
        height: '50%',        
        alignItems: 'center',        
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: width,
        zIndex: 2,
    },
    loginHeaderLogo:{
    },
    loginHeaderText:{
        paddingBottom: 10,
        paddingTop: 30,
        fontSize: 14,
        lineHeight:16,        
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    loginHeaderPhoneNumber:{
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',

        backgroundColor: 'transparent'
    },
    loginHeaderSeprator:{
        width: 60,
        height: 2,
        backgroundColor: 'white'
    },
    loginFrom:{
        flex: 2,
        justifyContent: 'center',
    },
    formRow:{
        flexDirection: 'row',
    },
    formPinInputContainer:{
        flexDirection: 'row',        
        marginRight: 5,
        borderRadius: 10,
        width: width,
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'
    },
    formPinInput:{
        height: 54,
        width: 54,
        borderRadius: 27,
        backgroundColor:'#3b3c4c',
        borderWidth:1,
        borderColor:'#ceced2',
        textAlign: 'center',
        color: 'white',
    },
    loginResendCode:{
        backgroundColor: 'transparent',
    },
    loginResendCodeText:{
        fontSize: 17,
        color: '#ED145B'
    },
    loginVerifyText:{
        color: 'white',
        fontSize: 14,        
    },
    formLabel:{
        paddingLeft: 20,
        backgroundColor: 'transparent',
        textAlign: 'left',
        lineHeight: 40,
        height: 40,
        color: 'white'
    },
    loginAction:{
        flex: 1,
        alignItems: 'center',        
    },
    loginButton: {
        width:width,
        height:width,
        borderWidth:0,
        borderRadius: width/2,
        alignItems: 'flex-start',
        backgroundColor: '#ED145B',
        borderColor: '#891d4a',
        borderWidth: 7
    },
    loginButtonText: {
        color: '#fff',
        paddingTop: 8,
        fontSize: 17
    },
    countdownContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    textCountdown:{
        backgroundColor: 'transparent',
        color: '#eb387c',
        fontSize: 44
    },
    fontCustom:{
        fontFamily: 'IRANSansMobile',
    },    
    placeholderCountdown:{
        width: 200,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 105,
        zIndex:2,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center'

    },
    circleCountdown:{
        shadowColor: 'red',
        position: 'absolute',
        zIndex:1,
    }

});

