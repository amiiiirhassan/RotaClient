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
    TouchableOpacity,
    ActivityIndicator,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform

} from 'react-native';
import { Button } from 'react-native';

import {GetToken} from '../js/TokenOparition';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast, {DURATION} from 'react-native-easy-toast'
import { setCurrentUser } from '../actions/index'
import { CheckBox } from 'react-native-elements'
import {ApiUrl} from '../consts/index'
const apiUrl = ApiUrl();
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

import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
      //  this.state = { showDatepicker: false, loading:false, loadData:[] ,avatarSource: null, showPicker: 'none', fullName: '', phoneNumber: '', email: '', birthday: '', weight: '', height: '' };
        this.state = { maleChecked: this.props.currentUser.sex ==="male" ? true:false,imageData: {}, token: "",showDatepicker: false,hasNewImage: false, isLoading:false, loadData:[] , showPicker: 'none', fullName: this.props.currentUser.fullName, profileImage: this.props.currentUser.profileImage,  phoneNumber: this.props.currentUser.phoneNumber, email: this.props.currentUser.email, birthday: this.props.currentUser.birthday, weight: this.props.currentUser.weight, height: this.props.currentUser.height, sex: this.props.currentUser.sex };

    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            GetToken()
            .then(token => this.setState({token}))
            .catch(err => console.error(err))
        }
    }
    componentWillUnmount() {
        this._isMounted = false;

    }

    changePhoto(){
        console.log("change photo toch")
        this.setState({hasNewImage : true})
        const options = {};
        ImagePicker.launchImageLibrary(options, response => {
            console.log("response",response);
            if(!response.didCancel) {
                const data = new FormData();
                data.append('profileImage', {
                uri : response.uri,
                type: response.type,
                name: 'avatar'
                });
                this.setState({imageData: data})
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let source = { uri: response.uri };
                this.setState({
                    profileImage: source.uri
                });
            }
        })
        
        
    }

    showPicker(){
        this.setState({ showPicker: 'flex' })
    }

    backProfile(navigate){
        this.setState({isLoading:false});
      
        navigate('Profile');
    }

    updateProfile(navigate) {
        this.setState({isLoading:true});
        console.log("toching")
        let sex = this.state.maleChecked ? "male" : "female";
        let date = "";
        if(this.state.selectedDate) {
            date = this.state.selectedDate.format("jYYYY/jMM/jDD");
            this.setState({birthday: date})
        }
        else {
             date = this.state.birthday;
        }
        console.log("updating");
        return fetch(`${apiUrl}/updateProfile`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                token: this.state.token,
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                birthday: date,
                weight: this.state.weight,
                height: this.state.height,
                sex: sex,
            }),
            
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("responseJson",responseJson);
            if(responseJson.status === 200) {
                let currentUser = {
                    fullName: this.state.fullName,
                    phoneNumber: this.state.phoneNumber,
                    email: this.state.email,
                    birthday: this.state.birthday,
                    weight: this.state.weight,
                    height: this.state.height,
                    sex: sex,
                    profileImage: this.state.profileImage
                }
               this.props.dispatch(setCurrentUser(currentUser))
               console.log(this.state.hasNewImage && this.state.imageData);
               if(this.state.hasNewImage && this.state.imageData) { 
                return fetch(`${apiUrl}/addProfileImage`, {
                    method: 'POST',
                    headers: {
                    token: this.state.token,
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    },
                    
                    body: this.state.imageData  
                })
                .then((response) => response.json())
                .then(responseJson => {
                    console.log(responseJson) 
                    currentUser.profileImage = this.state.profileImage;
                    this.props.dispatch(setCurrentUser(currentUser))
                    this.setState({isLoading:false})

                    
                    navigate('Home');
                    return responseJson
                   }
                )}
               else {
                    this.setState({isLoading:false})
                    navigate('Home');
               }
               
            }
        
            return responseJson;
          
        })
        .catch((err) => {
            console.log(err)
            return err
        })
        
      
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
        const {navigate} = this.props.navigation;

        return (
            <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.profileContainer}
            scrollEnabled={true}>

             { this.state.isLoading ? <View style={[styles.SpinnerContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#fff" />
          </View> : <Text>loading</Text> }

                <View style={styles.profileHeader}>
                    <View style={styles.navbarContainer}>
                        <View style={styles.navbarContainerleft}>
                            <View >
                                {//style={styles.navbarActionTouch}
                                }
                                <TouchableOpacity underlayColor={'transparent'} onPress={ () => this.updateProfile(navigate) }>
                                    <View pointerEvents='none'>
                                        <Image style={styles.navbarActionIMG}
                                            source={require('../../assets/img/ico_check.png')}>
                                        </Image>
                                        <TextInput editable={false} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.navbarContainerRight}>
                            <View style={styles.navbarActionTouch}>
                                <TouchableOpacity underlayColor={'transparent'} onPress={ () => this.backProfile(navigate) }>
                                    <View pointerEvents='none'>
                                        <Image style={styles.navbarActionIMG}
                                            source={require('../../assets/img/ico_back.png')}>
                                        </Image>
                                        <TextInput editable={false} />
                                    </View>
                                </TouchableOpacity>
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
                    <TouchableOpacity underlayColor={'transparent'} onPress={ () => this.changePhoto() }>
                        <View pointerEvents='none'  style={styles.profileFormAvatar}>
                           { ( this.state.profileImage == null || this.state.profileImage == "") ?
                            <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                                    source={ require('../../assets/img/no-image.jpg') }
                                    /> :
                                    <Image style={[styles.profileHeaderAvatar, { width: 160, height: 160 }]}
                                    source={{uri: this.state.profileImage.toString()}}    
                                  />
                            }
                             <View style={styles.profileAvatarEdit}>
                                <Image style={[styles.profileAction, { width: 30, height: 25 }]}
                                  source={require('../../assets/img/ico_photo.png')}
                                />
                            </View>
                            <TextInput editable={false} />
                        </View>
                    </TouchableOpacity>
                    <Toast ref="toast" style={{zIndex:1001}} positionValue={200} position='top' opacity={0.8}
                    textStyle={{fontSize:18,fontFamily: 'IRANSansMobile',color:'#fff'}} />


                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput
                                editable={true}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(fullName) => this.setState({fullName})}
                                value={this.state.fullName}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>نام و نام خانوادگی</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput
                                editable={true}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                keyboardType="number-pad"
                                style={[styles.formInput, styles.fontCustom]}
                                value={this.state.phoneNumber}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>شماره همراه</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <TextInput
                                editable={true}
                                returnKeyType="done"
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>پست الکترونیکی</Text>
                        </View>
                    </View>

                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                         {/*
                            <PersianDatePicker
                                type="Jalali"
                                yearCount={10}
                                onConfirm={date => {this.setState({ selectedDate: date }); console.log(date)}}
                                ref={ref => (this.picker = ref)}
                                minDate={ "1338/08/08" }
                                onPickerCancel={() => { }}
                            /> 
                            <TextInput
                                returnKeyType="done"
                                onFocus={() => {console.log("onFocus");this.picker.showPicker();this.setState({showDatepicker: true})}}
                                onBlur={()=>{console.log("onBlur");this.setState({showDatepicker: false})}}
                                placeholderTextColor="white"
                                style={[styles.formInput, styles.fontCustom]}
                                editable={true}
                            >
                                {this.state.selectedDate? this.state.selectedDate.format("jYYYY/jMM/jDD") :this.state.birthday}
                            </TextInput>
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
                                onChangeText={(weight) => this.setState({weight})}
                                value={this.state.weight}
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
                                onChangeText={(height) => this.setState({height})}
                                value={this.state.height}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>قد (CM)</Text>
                        </View>
                    </View>
                    <View style={styles.formRow}>
                        <View style={styles.formInputContainer}>
                            <CheckBox
                                title='مرد'
                                checked={this.state.maleChecked}
                                onPress={() => this.setState({maleChecked: !this.state.maleChecked})}
                                />
                            <CheckBox
                                title='زن'
                                checked={!this.state.maleChecked}
                                onPress={() => this.setState({maleChecked: !this.state.maleChecked})}
                            />
                        </View>
                        <View style={styles.formLabelContainer}>
                            <Text style={[styles.formLabel, styles.fontCustom]}>جنسیت</Text>
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
    navbarActionTouch: {
        top:20,
        width:30,
        height: 30
    },

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
       // top: -80,
      //  position: 'absolute',
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