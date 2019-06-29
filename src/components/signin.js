//'use strict';
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


import { Button,FormInput,FormLabel } from 'react-native-elements';

import Toast, {DURATION} from 'react-native-easy-toast'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


//import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { text: '', disableBtn: false };
    }

    componentDidMount() {
       // Actions.main({mobile:this.state.text});
       // this.props.onAuthorize();

    }

    doLogin(){
        var self = this;
        if(this.state.text == ""){
            self.refs.toast.show('لطفا شماره موبایل را وارد کنید', 2000);
            return;
        }

        self.setState({ disableBtn: true });

        //Actions.verify({mobile:this.state.text});
         fetch('http://rota.social:443/api/signin?mobile='+parseInt(this.state.text), {
           method: 'GET',
           headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*'
           }
         }).then(response => response.json())
         .then(responseJson => {
            self.setState({ disableBtn: false });

           if(responseJson.status){
             Actions.verify({mobile:this.state.text});
            // NavigationActions.navigate({ routeName: 'verify' })
           } else {
            self.refs.toast.show('شماره همراه را اشتباه وارد کردید', 5000);
           }
         }).catch((error) => {
            self.setState({ disableBtn: false });

            self.refs.toast.show(error, 5000);
        }); 

    
    }

    render() {
        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.loginContainer}
                scrollEnabled={false}>
                <View style={styles.loginHeader}>
                    <View style={styles.loginHeaderArt}>
                        <ImageBackground style={styles.loginHeaderOverlay}
                            source={require('../../assets/img/gradient.png')}>
                            <Image style={[styles.loginHeaderLogo, { width: 230, height: 230 }]}
                              source={require('../../assets/img/logo_official.jpg')}                        
                            />
                            <Text style={[styles.loginHeaderText, styles.fontCustom]}>
                                برای ورود شماره خود را وارد کنید
                            </Text>
                            <Toast ref="toast" style={{zIndex:1000}} positionValue={370} position='top' opacity={0.8}
                            textStyle={{fontSize:18,fontFamily: 'IRANSansMobile',color:'#fff'}}
                             />
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
                        <View style={styles.formInputContainer}>
                            <TextInput 
                                returnKeyType="done"
                                placeholderTextColor="white"
                                placeholder=""                                
                                keyboardType="number-pad"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>شماره همراه</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.loginAction}>

                    <Button
                      buttonStyle={styles.loginButton}
                      disabled={this.state.disableBtn}
                      textStyle={[styles.loginButtonText, styles.fontCustom]}
                      title={`ورود`}
                      onPress={() => { this.doLogin() }}
                    />                    
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({


    loginContainer:{
        flex: 1,
        fontFamily: 'IRANSansMobile',
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
        borderRadius: 230/2,
    },
    loginHeaderText:{
        paddingBottom: 10,
        paddingTop: 40,
        fontSize: 15,
        backgroundColor: 'transparent',
        color: 'white'
    },
    fontCustom:{
        fontFamily: 'IRANSansMobile',
    },    
    loginHeaderSeprator:{
        width: 60,
        height: 2,
        backgroundColor: 'white',
    },
    loginFrom:{
        flex: 2,
        justifyContent: 'center',
    },
    formRow:{
        flexDirection: 'row',
    },
    formInputContainer:{
        marginRight: 5,
        backgroundColor: '#3B3C4C',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
        borderColor: 'white',
        borderLeftWidth: 0,
        borderWidth: 1
    },
    formLabelContainer:{
        marginLeft: 5,
        backgroundColor: '#3B3C4C',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: 'white',
        flex: 1,
    },
    formInput:{
        height: 40,
        textAlign: 'right',
        paddingRight: 20,
        color: 'white'
    },
    formLabel:{
        paddingLeft: 20,
        backgroundColor: 'transparent',
        textAlign: 'left',
        lineHeight: 40,
        height: 40,
        color: 'white'
    },
    loginButton:{
        backgroundColor: 'white'
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
    }

});



