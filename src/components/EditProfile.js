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
    TouchableHighlight,
    ActivityIndicator,
    TouchableWithoutFeedback,

} from 'react-native';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Toast, {DURATION} from 'react-native-easy-toast'

//import PersianDatePicker from 'react-native-persian-date-picker';
//var ImagePicker = require('react-native-image-picker');
//import ImagePicker from 'react-native-image-picker';

const pickerOption = {
  title: 'Select Avatar',
  quality: 0,
  mediaType: 'photo',
  cameraType: 'front',
  allowsEditing: true,
  storageOptions: {
    skipBackup: true,
    path: 'assets'
  }
};

import {connect} from 'react-redux';


//import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
      //  this.state = { showDatepicker: false, loading:false, loadData:[] ,avatarSource: null, showPicker: 'none', inputName: '', inputNumber: '', inputEmail: '', inputBirthday: '', inputWeight: '', inputHeight: '' };
        this.state = { showDatepicker: false, loading:false, loadData:[] ,avatarSource: null, showPicker: 'none', inputName: this.props.currentUser.fullName, avatarSource: this.props.currentUser.image,  inputNumber: this.props.currentUser.phoneNumber, inputEmail: this.props.currentUser.email, inputBirthday: this.props.currentUser.birthday, inputWeight: this.props.currentUser.weight, inputHeight: this.props.currentUser.height };

    }


    changePhoto(){
        var self = this;
        ImagePicker.showImagePicker(pickerOption, (response) => {

          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            alert('ImagePicker Error: ', response.error);
          }
          else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
           // alert(response.uri)
            self.setState({
              avatarSource: response.uri
            });

          }
        });
    }

    showPicker(){
        this.setState({ showPicker: 'flex' })
    }

    backProfile(){
        Actions.profile({});
    }

    updateProfile(){

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

    render() {
        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.profileContainer}
            scrollEnabled={false}>

             { this.state.loading ? <View style={[styles.SpinnerContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View> : null }


                <View style={styles.profileHeader}>
                    <View style={styles.navbarContainer}>
                        <View style={styles.navbarContainerleft}>
                            <View style={styles.navbarActionTouch}>
                                <TouchableWithoutFeedback underlayColor={'transparent'} onPress={ () => this.updateProfile() }>
                                    <Image style={styles.navbarActionIMG}
                                        source={require('../../assets/img/ico_check.png')}>
                                    </Image>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.navbarContainerRight}>
                            <View style={styles.navbarActionTouch}>
                                <TouchableWithoutFeedback underlayColor={'transparent'} onPress={ () => this.backProfile() }>
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
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => this.changePhoto() }>
                        <View style={styles.profileFormAvatar}>
                           { ( this.state.avatarSource == null || this.state.avatarSource == ""  || this.state.avatarSource == 'http://rota.social:443/') ?
                            <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                                    source={ require('../../assets/img/no-image.jpg') }
                                    /> :
                                    <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                                    source={{uri: this.state.avatarSource.toString() }}    
                                  />
                            }
                             <View style={styles.profileAvatarEdit}>
                                <Image style={[styles.profileAction, { width: 30, height: 25 }]}
                                  source={require('../../assets/img/ico_photo.png')}
                                />
                            </View>
                        </View>
                    </TouchableHighlight>

                    <Toast ref="toast" style={{zIndex:1001}} positionValue={200} position='top' opacity={0.8}
                    textStyle={{fontSize:18,fontFamily: 'IRANSansMobile',color:'#fff'}} />


                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput
                                returnKeyType="done"
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
                        {/* {
                            this.state.showDatepicker ? <PersianDatePicker
                             style={ styles.datePicki }
                             textStyle={ styles.datePickiText }
                             minDate={ "1340/1/1" }
                             onConfirm={this.onDateChange}
                             onSelect={()=>this.setState({showDatepicker: false})}
                             onCancel={()=>this.setState({showDatepicker: false})}
                            /> :
                            <TextInput
                                returnKeyType="done"
                                onFocus={()=>this.setState({showDatepicker: true})}
                                onBlur={()=>this.setState({showDatepicker: false})}
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                editable={true}
                                value={this.state.inputBirthday}
                            />
                        }
                             */}
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>تاریخ تولد</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput
                                returnKeyType="done"
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


                </View>
            </KeyboardAwareScrollView>
        );
    }
}

var styles = StyleSheet.create({

    SpinnerContainer: {
        flex: 1,
        width:width,
        height:height,
        opacity: 0.8,
        zIndex: 20,
        backgroundColor: 'purple',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },

    profileContainer:{
        flex: 1,
        fontFamily: 'IRANSansMobile',
        flexDirection: 'column',
        backgroundColor: '#252638'
    },
    dateContainer: {
        flex: 1,
        position: 'absolute',
        zIndex: 15,
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
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
        paddingTop: 100,
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
    datePicki: {
        backgroundColor: 'transparent',
        color: '#fff',
        borderWidth: 0,
        zIndex: 10,
        paddingBottom: 0,
        marginTop: 6,
        textAlign: 'right'
    },
    datePickiText: {
        textAlign: 'right',
        color:'#fff'
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

const mapStateToProps = (state) => (
    state
)


const mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => dispatch(action),

    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);