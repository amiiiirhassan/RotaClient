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
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

import { Button,FormInput,FormLabel } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const {height, width} = Dimensions.get('window');

 class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputName: this.props.currentUser.fullName, avatarSource: this.props.currentUser.image,  inputNumber: this.props.currentUser.phoneNumber, inputEmail: this.props.currentUser.email, inputBirthday: this.props.currentUser.birthday, inputWeight: this.props.currentUser.weight, inputHeight: this.props.currentUser.height };
    }

    logOut(){
        Alert.alert(
          'خروج',
          'آیا برای خروج اطمینان دارید ؟',
          [
            {text: 'Ok', onPress: () => { global.storage.remove({
                key: 'userState'
            });
            Actions.login(); 
        }},
            {text: 'Cancel', onPress: () => console.log('OK Pressed'), style: 'cancel'},
          ],
          { cancelable: true }
        )
    }

    goToEditProfile = (navigate) => {
        console.log("edit profile");
      navigate('EditProfile')
    }
    backProfile(navigate){
        navigate('Home');
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.profileContainer}
            scrollEnabled={false}>

                <View style={styles.profileHeader}>
                    <View style={styles.navbarContainer}>
                        <View style={styles.navbarContainerleft}>
                            <View style={styles.navbarActionTouch}>
                            <TouchableWithoutFeedback underlayColor={'transparent'} onPress={ () => this.goToEditProfile(navigate) }>
                                    <Image style={styles.navbarActionIMG}
                                        source={require('../../assets/img/ico_edit.png')}>
                                    </Image>
                                </TouchableWithoutFeedback>

                                {

                                /*
                                  <Button
                                    onPress={() => this.goToEditProfile(navigate)}
                                    title="Press Me"
                                    color="#841584"
                                />
                                <TouchableHighlight underlayColor={'transparent'} onPress={this.goToEditProfile }>
                                    <Image style={styles.navbarActionIMG}
                                        source={require('../../assets/img/ico_edit.png')}>
                                    </Image>
                                </TouchableHighlight>
                                */
                                }


                            </View>
                        </View>
                        <View style={styles.navbarContainerRight}>
                            <View style={styles.navbarActionTouch}>
                                <TouchableWithoutFeedback underlayColor={'transparent'} onPress={ () => this.backProfile(navigate) }>
                                <Image style={styles.navbarActionIMG}
                                    source={require('../../assets/img/ico_back.png')}>
                                </Image>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <View style={styles.profileHeaderArt}>
                        <ImageBackground style={styles.profileHeaderOverlay}
                            source={require('../../assets/img/gradient.png')}>
                        </ImageBackground>
                    </View>
                </View>
                <View style={styles.profileFrom}>
                    <View style={styles.profileFormAvatar}>
                    { ( this.state.avatarSource == null || this.state.avatarSource == "" || this.state.avatarSource == 'http://rota.social:443/' ) ?
                       <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                              source={ require('../../assets/img/no-image.jpg') }                        
                            /> :

                         /* 
                        <FastImage
                            style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                            source={{
                              uri: this.state.avatarSource.toString(),
                              priority: FastImage.priority.normal,
                            }}
                          />
                          */
                         <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                            source={{uri: this.state.avatarSource.toString() }}    
                          />

                    }


                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                                returnKeyType="done"
                                editable={false}
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(inputName) => this.setState({inputName})}
                                value={this.state.inputName}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>نام و نام خانوادگی</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                            editable={false}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                keyboardType="number-pad"                                
                                style={[styles.formInput, styles.fontCustom]}
                                value={this.state.inputNumber}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>شماره همراه</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                            editable={false}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(inputEmail) => this.setState({inputEmail})}
                                value={this.state.inputEmail}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>پست الکترونیکی</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                                editable={false}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(inputBirthday) => this.setState({inputBirthday})}
                                value={this.state.inputBirthday}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>تاریخ تولد</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                                returnKeyType="done"
                                editable={false}
                                placeholderTextColor="white"
                                keyboardType="number-pad"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(inputWeight) => this.setState({inputWeight})}
                                value={this.state.inputWeight}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>وزن</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput 
                                returnKeyType="done"
                                editable={false}
                                placeholderTextColor="white"
                                keyboardType="number-pad"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(inputHeight) => this.setState({inputHeight})}
                                value={this.state.inputHeight}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>قد (CM)</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.loginAction}>

                    <Button
                      buttonStyle={styles.loginButton}
                      textStyle={[styles.loginButtonText, styles.fontCustom]}
                      title={`خروج`}
                      onPress={() => this.logOut()}
                    />                    

                </View>
            </KeyboardAwareScrollView>
        );
    }
}




const mapStateToProps = (state) => (
    state
)
const mapDispatchToProps = (dispatch) => {
    return {
    dispatch: (action) => dispatch(action),

    }
}
  export default connect (mapStateToProps,mapDispatchToProps)(Profile);

var styles = StyleSheet.create({


    navbarActionTouch: {
        top:20,

    },
    profileContainer:{
        flex: 1,
        fontFamily: 'IRANSansMobile',
        flexDirection: 'column',
        backgroundColor: '#252638'
    },
    profileHeader:{
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profileHeaderArt:{
        height: '150%',
        width: width * 2,
        borderBottomLeftRadius: width * 2,
        borderBottomRightRadius: width * 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'absolute',
        bottom: 80,
    },
    profileHeaderImage:{
        position: 'absolute',
        zIndex: 1,
    },
    profileHeaderOverlay:{
        alignItems: 'center',        
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: width,
        zIndex: 2,
    },
    navbarContainer:{
        position: 'absolute',
        zIndex: 10,
        flex: 1,
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingRight: 16,
        paddingLeft: 16,

    },
    navbarActionIMG:{
        width: 30,
        height: 25,
    },
    navbarContainerRight:{
    },
    navbarContainerLeft:{
        paddingTop: 100
    },
    profileFormAvatar:{
        alignItems: 'center',        
        justifyContent: 'center',        
    },
    profileHeaderAvatar:{
        borderRadius: 80,
        top: -200,
        position: 'absolute',
        zIndex: 3,
        borderWidth: 1,
        borderColor: 'white',
    },
    profileAvatarEdit:{
        width: 60,
        height: 60,
        borderRadius: 40,
        alignItems: 'center',        
        justifyContent: 'center',        
        backgroundColor: '#5e5ec3',
        top: -80,
        position: 'absolute',
        zIndex: 4,
    },
    fontCustom:{
        fontFamily: 'IRANSansMobile',
    },    
    profileFrom:{
        flex: 5,
        justifyContent: 'center',
    },
    formRow:{
        flexDirection: 'row',
        marginBottom: 15
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
        paddingRight: 20,
        backgroundColor: 'transparent',
        textAlign: 'right',
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
