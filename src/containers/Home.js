'use strict';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View,Text,Platform } from 'react-native';
import HomeBody from '../components/HomeBody';
import HomeBottom from '../components/HomeBottom';
import HomeHeader from '../components/HomeHeader';
import { connect } from 'react-redux';
import GoogleFit, { Scopes } from 'react-native-google-fit'
import {PermissionsAndroid} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import { NativeAppEventEmitter } from 'react-native';


const {height, width} = Dimensions.get('window');
const interval = null;



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: null,
            name: '',
            id: null,
            coin: 0,
            mobile: null,
            steps: 0,
            daily: 0
        }
    }
componentDidMount() {
    async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You ACCESS_FINE_LOCATION');
          } else {
            console.log('ACCESS_FINE_LOCATION denied');
          }
        } catch (err) {
          console.warn(err);
        }
    }
    if (Platform.OS === 'android') {
        requestCameraPermission()
        .then(success => {
            // The list of available scopes inside of src/scopes.js file
            const options = {
                scopes: [
                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                Scopes.FITNESS_BODY_READ_WRITE,
                ],
            }
            GoogleFit.authorize(options)
                .then(authResult => {
                if (authResult.success) {
                    console.log("AUTH_SUCCESS");
                    GoogleFit.observeSteps((callback) => {
                        console.log("start steps",callback);
                    })
                    // ...
                    // Call when authorized
                    GoogleFit.startRecording((callback) => {
                        
                        GoogleFit.observeSteps((callback) => {
                            console.log("start",callback)
                            DeviceEventEmitter.addListener(
                                'StepChangedEvent',
                                //(steps) => callback(steps)
                                (steps) => console.log('StepChangedEvent', steps)
                            );
                        })
                        // Process data from Google Fit Recording API (no google fit app needed)
                        console.log(callback)
                    });
                    const date = new Date();
                    let yesterday = new Date(date.setDate(date.getDate() - 1)).toISOString();
                    
                    const options = {
                        startDate: yesterday, // required ISO8601Timestamp
                        endDate: new Date().toISOString() // required ISO8601Timestamp
                    };
                    
                    GoogleFit.getDailyStepCountSamples(options)
                    .then((res) => {
                        console.log('Daily steps >>>',res);
                        console.log('Daily steps >>> ', res[2].steps[0].value)
                        let _steps = res[res.length - 1].steps[0].value;

                        this.setState({steps: _steps })
                    })
                    .catch((err) => {console.warn(err)})




                } else {
                    console.log("AUTH_DENIED", authResult.message);
                }
                })
                .catch(() => {
                console.log("AUTH_ERROR");
                })
        })
        .catch(err => {
            console.log("location error " + err)
        })
    }
        else {
            let options = {
                permissions: {
                read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
                write: ["Weight", "StepCount", "BodyMassIndex"]
                }
            };
            
            

            this.authorize(options);

            
        }
    }
    authorize(options) {
        return new Promise((resolve, reject) => {
            AppleHealthKit.initHealthKit(options, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results)
              console.log(results)
              AppleHealthKit.setObserver({ type: 'Walking' });
                NativeAppEventEmitter.addListener(
                    'observer',
                    (callback) => console.log("start",callback)
                );

                const date = new Date();
                let yesterday = new Date(date.setDate(date.getDate() - 1)).toISOString();
                
                const options = {
                    startDate: yesterday, // required ISO8601Timestamp
                    endDate: new Date().toISOString() // required ISO8601Timestamp
                };
                 AppleHealthKit.getDailyStepCountSamples(options, (err, res) => {
                    console.log(res)
                    if(res.length) {
                        let _steps = res[res.length - 1].steps[0].value ;
                        this.setState({steps: _steps })
                    }
                });
            }
          })
        })
    }
    updateSteps = () => {
        if (Platform.OS === 'android') {
            const date = new Date();
            let yesterday = new Date(date.setDate(date.getDate() - 1)).toISOString();
            
            const options = {
                startDate: yesterday, // required ISO8601Timestamp
                endDate: new Date().toISOString() // required ISO8601Timestamp
            };
            
            GoogleFit.getDailyStepCountSamples(options)
            .then((res) => {
                console.log('Daily steps >>> ', res[2].steps[1].value)
                let _steps = res[res.length - 1].steps[0].value;

                this.setState({steps: _steps })
            })
            .catch((err) => {console.warn(err)})
       }
       else {
        let options = {
            permissions: {
              read: ["Height", "Weight", "StepCount", "DateOfBirth", "BodyMassIndex"],
              write: ["Weight", "StepCount", "BodyMassIndex"]
            }
          };
         this.authorize(options);

       }
    }

    numberToPersian(value){

        if(typeof value != "undefined"){

            if(typeof value == 'string')
                value = parseInt(value);

            var result = '';
            var numbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']
            for(var i = 0 ; i<value.toString().length ; i++){
                result += numbers[value.toString()[i]];
            }
            return result;
        }

        return value;
    }


    getPersianMonth(value){
        var month = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
        return month[value-1];
    }

    render() {
      let today = new Date();
      let step = {value:0};
      step.value = this.state.steps;
      console.log(this.state.steps)
      if(typeof step == "undefined")
          step = {value: 0}

      if( typeof step.value == "undefined" || typeof step != "object" || step == "undefined" || step == null)
          step = {value: 0 };

      if(step.value>0)
          step.value = parseInt(step.value);

        return (
                            
            <ImageBackground style={styles.homeBodyOverlay}
                source={require('../../assets/img/gradient.png')}>
                <View style={styles.homeContainer}>
                    { (typeof step == "object") ? <HomeHeader updateSteps={this.updateSteps} step={ step } /> : null }
                    <View style={styles.homeBody}>
                        <HomeBody navigation={this.props.navigation} currentUser={this.props.currentUser} step={ step } name={this.state.name} profileImg={this.state.profileImg} />
                        <HomeBottom />
                    </View>
                </View>        
            </ImageBackground>
            

            


            );
    }
}

var styles = StyleSheet.create({


    homeContainer:{
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
    },

    homeStatContainer:{
        width: 140,
        height: 140,
        zIndex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeStatRecordText:{
        fontSize: 48,
        letterSpacing: 2,
        fontWeight: '100',
        textAlign: 'center',
        color: '#51f5b2',
    },
    homeStatSeprator:{
        width: 80,
        height: 2,
        backgroundColor: '#a464ff',
        marginTop: -20,
        marginBottom: 10,
    },
    homeStatMessageText:{
        fontSize: 12,
        textAlign: 'center',
        color: '#96969d',
        letterSpacing: 1,
    },
    homeStatDateText:{
        fontSize: 18,
        textAlign: 'center',
        color: '#fefefe',

    },
    homeBody:{
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    homeBodyTop:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    homeBodyBottom:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 10,
        flexDirection: 'row',
    },
    homeBodyOverlay:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',        
        justifyContent: 'center',
    },
    homeActionCrc:{
        marginTop: -50,
        flexDirection: 'column',
        alignItems: 'center',        
    },
    homeActionCrcBG:{
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#5e5ec3',
        alignItems: 'center',        
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5

    },
    homeActionCrcImage:{
    },
    homeActionCrcText:{
        marginTop: 6,
        fontSize: 12,
        color: 'white',
        backgroundColor: 'transparent',
    },
    homeProfileCrc:{
        marginTop: -70,
        flexDirection: 'column',
        alignItems: 'center',        
        marginRight: 30,
        marginLeft: 30
    },
    homeProfileCrcBG:{
        width: 104,
        height: 104,
        borderRadius: 104,
        backgroundColor: 'white',
        alignItems: 'center',        
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    homeProfileCrcImage:{
        width: 100,
        height: 100,
        borderRadius: 50,        
    },
    homeProfileCrcText:{
        marginTop: 10,
        fontSize: 15,
        color: 'white',
        backgroundColor: 'transparent',
    },
    homeFriendsCrc:{
        width: 56,
        height: 56,
        borderRadius: 56,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'dashed',
        alignItems: 'center',        
        justifyContent: 'center',
        marginRight:2,
        marginLeft:2,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
    },
    homeFriendsCrcImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    homeFriendsCrcActionBG:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#a370f8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeFriendsCrcActionPlusImage:{
    },
    homeFriendsCrcActionPlus:{
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#ed145b',
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeFriendsA:{
        marginBottom: -30,
    },
    homeFriendsB:{
        marginBottom: -10,
    },
    homeFriendsC:{
    },
    fontCustom:{
        fontFamily: 'IRANSansMobile',
    },    
    homeButton:{
        backgroundColor: 'white'
    },
    homeAction:{
        flex: 1,
        alignItems: 'center',        
    },
    homeButton: {
        width:width,
        height:width,
        borderWidth:0,
        borderRadius: width/2,
        alignItems: 'flex-start',
        backgroundColor: '#7572fe',
        borderColor: '#7863fe',
        borderWidth: 7
    },
    homeButtonText: {
        color: '#fff',
        paddingTop: 4,
        fontSize: 15
    },

});

const mapStateToProps = (state) => (
    state
  )
  mapDispatchToProps = (dispatch) => {
    return {
      dispatch: (action) => dispatch(action),
  
    }
  }
export default connect (mapStateToProps,mapDispatchToProps)(Home);