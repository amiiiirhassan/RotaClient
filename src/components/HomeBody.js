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
    TouchableHighlight,
    ImageBackground
} from 'react-native';


import { Button } from 'react-native-elements';


import { AnimatedCircularProgress } from 'react-native-circular-progress';

const {height, width} = Dimensions.get('window');

class HomeBody extends React.Component {

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

    goProfile(navigate){
        navigate('Profile');
    }

    getPersianMonth(value){
        var month = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
        return month[value-1];
    }

    render() {

        //let today = jalaali.toJalaali(new Date());
        const {navigate} = this.props.navigation;    

        let today = new Date();
        return (
            <View style={styles.homeBodyTop}>
                <View style={styles.homeActionCrc}>
                    <View style={styles.homeActionCrcBG}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={ () => Actions.history({ todaySteps: this.props.step }) }>
                            <Image style={[styles.homeActionCrcImage, { width: 40, height: 40 }]}
                                source={require('../../assets/img/ico_history.png')}                        
                            />
                        </TouchableHighlight>
                    </View>
                    <Text style={[styles.homeActionCrcText, styles.fontCustom]}>
                        تاریخچه
                    </Text>
                </View>
                <View style={styles.homeProfileCrc}>
                    <View style={styles.homeProfileCrcBG}>
                        <TouchableHighlight  underlayColor={'transparent'} onPress={ () => this.goProfile(navigate) }>
                            { ( this.props.profileImg == null || this.props.profileImg == 'http://rota.social:443/' ) ?
                                <Image style={[styles.homeProfileCrcImage, { width: 100, height: 100 }]}
                                    source={require('../../assets/img/no-image.jpg')} /> :
                               /*     
                            <FastImage
                                style={[styles.homeProfileCrcImage, { width: 100, height: 100 }]}
                                source={{
                                    uri: this.props.profileImg.toString(),
                                    priority: FastImage.priority.normal,
                                }}
                                />
                                */
                               <Image style={[styles.homeProfileCrcImage, { width: 100, height: 100 }]}
                               source={{uri: this.props.profileImg.toString()}} />


                        }
                        </TouchableHighlight>      
                    </View>
                    <Text onPress={ () => this.goProfile() }  style={[styles.homeProfileCrcText, styles.fontCustom]}>
                    { this.props.name }
                    </Text>
                </View>
                <View style={styles.homeActionCrc}>
                    <View style={styles.homeActionCrcBG}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={ () => Actions.coupon() }>

                        <Image style={[styles.homeActionCrcImage, { width: 40, height: 40 }]}
                            source={require('../../assets/img/coin-icon-w.png')}                        
                        />
                    </TouchableHighlight>
                    </View>
                    <TouchableHighlight onPress={ () => Actions.coupon() }>
                    <Text style={[styles.homeActionCrcText, styles.fontCustom]}>
                        سکه‌ها
                    </Text>
                    </TouchableHighlight>
                </View>
            </View>

            );
    }
}

var styles = StyleSheet.create({


    homeContainer:{
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden'
    },
    homeHeader:{
        flex: 6,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    homeHeaderArt:{
        height: '100%',
        width: width * 2,
        borderBottomLeftRadius: width * 2,
        borderBottomRightRadius: width * 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: '0%',
        backgroundColor: '#252638',
        paddingTop: 60,
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
    }

});


export default HomeBody