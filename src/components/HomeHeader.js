'use strict';
import React, {Component} from 'react'
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    TouchableHighlight,
    ImageBackground
} from 'react-native';


const jalaali = require('jalaali-js')

import { Button } from 'react-native-elements';

import { AnimatedCircularProgress } from 'react-native-circular-progress';


const {height, width} = Dimensions.get('window');

class HomeHeader extends React.Component {

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

    goProfile(){
        Actions.profile({sag:true})
    }

    getPersianMonth(value){
        var month = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
        return month[value-1];
    }

    render() {


        let today = jalaali.toJalaali(new Date());
        //let today = new Date();
        let step = this.props.step;
        if(step && typeof step.value != "undefined"){
            if(step.value.toString().indexOf('undef')>=0)
                step.value = 0;
        }

        if(step.value.toString().indexOf('undef')>=0)
                step.value = 0;


        return (
            <View style={styles.homeHeader}>
                { (step) && 
                        <View style={styles.homeHeaderArt}>
                            <View style={styles.homeProgressContainer}>
                                <View style={styles.homeStatContainer}>  
                                    <TouchableWithoutFeedback onPress={ () => this.props.updateSteps() }>
                                    <Text style={[styles.homeStatRecordText, styles.fontCustom]}>
                                     { this.numberToPersian(parseInt(step.value)) }
                                    </Text>
                                    </TouchableWithoutFeedback>
                                    <View style={styles.homeStatSeprator}>
                                    </View>
                                    <TouchableWithoutFeedback onPress={ () => this.props.updateSteps() }>
                                        <Text style={[styles.homeStatMessageText, styles.fontCustom]}>
                                            گام‌های امروز شما
                                        </Text>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={ () => this.props.updateSteps() }>
                                        <Text  style={[styles.homeStatDateText, styles.fontCustom]}>
                                            { this.numberToPersian(today.jd) + ' ' + this.getPersianMonth(today.jm) + ' ' + this.numberToPersian(today.jy) }
                                        </Text>
                                    </TouchableWithoutFeedback>

                                </View>

                                <AnimatedCircularProgress
                                  style={styles.circleProgress}
                                  linecap="round"
                                  rotation={0}
                                  size={250}
                                  width={4}
                                  backgroundWidth={1}
                                  fill={step.value != null ? parseInt(step.value)/100 : 0 }
                                  tintColor="#eb387c"
                                  backgroundColor="#FFFFFF">
                                </AnimatedCircularProgress>
                                 <View style={styles.progressCircleDotsContainer}>

        <View style={[styles.progressDot, styles.progressDot1] }></View>
        <View style={[styles.progressDot, styles.progressDot2] }></View>
        <View style={[styles.progressDot, styles.progressDot3] }></View>
        <View style={[styles.progressDot, styles.progressDot4] }></View>
        <View style={[styles.progressDot, styles.progressDot5] }></View>
        <View style={[styles.progressDot, styles.progressDot6] }></View>
        <View style={[styles.progressDot, styles.progressDot7] }></View>
        <View style={[styles.progressDot, styles.progressDot8] }></View>
        <View style={[styles.progressDot, styles.progressDot9] }></View>
        <View style={[styles.progressDot, styles.progressDot10] }></View>
        <View style={[styles.progressDot, styles.progressDot11] }></View>
        <View style={[styles.progressDot, styles.progressDot12] }></View>
        <View style={[styles.progressDot, styles.progressDot13] }></View>
        <View style={[styles.progressDot, styles.progressDot14] }></View>
        <View style={[styles.progressDot, styles.progressDot15] }></View>
        <View style={[styles.progressDot, styles.progressDot16] }></View>
        <View style={[styles.progressDot, styles.progressDot17] }></View>
        <View style={[styles.progressDot, styles.progressDot18] }></View>
        <View style={[styles.progressDot, styles.progressDot19] }></View>
        <View style={[styles.progressDot, styles.progressDot20] }></View>
        <View style={[styles.progressDot, styles.progressDot21] }></View>
        <View style={[styles.progressDot, styles.progressDot22] }></View>
        <View style={[styles.progressDot, styles.progressDot23] }></View>
        <View style={[styles.progressDot, styles.progressDot24] }></View>
    </View>
                            </View>
                        </View>
                    }
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
    homeProgressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginTop: 25,
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
     progressCircleDotsContainer:{
        position: 'absolute',
        width:280,
        height: 280,
    },
    progressDot:{
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#6979d4',
        position: 'absolute',
        shadowColor: '#6979d4',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 7,
        shadowOpacity: 0.8
    },
    progressDot1:{
        right: 105,
        top: 5,
    },
    progressDot2:{
        right: 71,
        top: 19,
    },
    progressDot3:{
        right: 43,
        top: 40,
    },
    progressDot4:{
        right: 19,
        top: 70,
    },
    progressDot5:{
        right: 5,
        top: 105,
    },
    progressDot6:{
        right: 0,
        top: 137,
    },
    progressDot7:{
        right: 5,
        bottom: 105,
    },
    progressDot8:{
        right: 19,
        bottom: 70,
    },
    progressDot9:{
        right: 43,
        bottom: 40,
    },
    progressDot10:{
        right: 71,
        bottom: 19,
    },
    progressDot11:{
        right: 105,
        bottom: 5,
    },
    progressDot12:{
        right: 137,
        bottom: 0,
    },
    progressDot13:{
        left: 105,
        bottom: 5,
    },
    progressDot14:{
        left: 71,
        bottom: 19,
    },
    progressDot15:{
        left: 43,
        bottom: 40,
    },
    progressDot16:{
        left: 19,
        bottom: 70,
    },
    progressDot17:{
        left: 5,
        bottom: 105,
    },
    progressDot18:{
        left: 0,
        bottom: 137,
    },
    progressDot19:{
        left: 5,
        top: 105,
    },
    progressDot20:{
        left: 19,
        top: 70,
    },
    progressDot21:{
        left: 43,
        top: 40,
    },
    progressDot22:{
        left: 71,
        top: 19,
    },
    progressDot23:{
        left: 105,
        top: 5,
    },
    progressDot24:{
        right: 135,
        top: -2,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#c83991',
        shadowColor: '#c83991',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 7,
        shadowOpacity: 0.8
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
    circleProgress:{
        position: 'absolute',
        zIndex:1,        
    }

});


export default HomeHeader