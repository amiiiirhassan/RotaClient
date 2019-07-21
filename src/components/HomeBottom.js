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

import FastImage from 'react-native-fast-image'


const {height, width} = Dimensions.get('window');

class HomeBottom extends React.Component {


    render() {
        
        let today = new Date();

        return (
            <View>
            <View style={styles.homeBodyBottom}>
                <View style={[styles.homeFriendsCrc, styles.homeFriendsA]}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={()=>Actions.friends()}>
                    <View style={styles.homeFriendsCrcActionBG}>
                        <Image onPress={()=>Actions.friends()} style={[styles.homeFriendsCrcActionImage, { width: 30, height: 30 }]}
                          source={require('../../assets/img/ico_contact.png')}                        
                        />
                    </View>
                    </TouchableHighlight>
                    <View style={styles.homeFriendsCrcActionPlus}>
                        <Image  style={[styles.homeFriendsCrcActionPlusImage, { width: 8, height: 8 }]}
                          source={require('../../assets/img/plus.png')}                        
                        />
                    </View>
                </View>
                { ( typeof this.props.leaders != "undefined" ) ? 
                    this.props.leaders.data.map((leader,i) => {
                        let sty = styles.homeFriendsB;
                        if(i==1)
                            sty = styles.homeFriendsC;
                        if(i==2)
                            sty = styles.homeFriendsB;
                        if(i==3)
                            sty = styles.homeFriendsA;
                        
                        if( i<4){
                            if(typeof leader.avatar != "undefined" && leader.avatar != ''){
                                return <View style={[styles.homeFriendsCrc, sty]}>
                                     <FastImage
                                        style={[styles.homeFriendsCrcImage, { width: 50, height: 50 }]}
                                        source={{
                                          uri: 'http://rota.social:443/'+leader.avatar.toString(),
                                          priority: FastImage.priority.normal,
                                        }}
                                      />
                                </View>
                            } else {
                                return <View style={[styles.homeFriendsCrc, sty]}>
                                    <Image style={[styles.homeFriendsCrcImage, { width: 50, height: 50 }]}
                                      source={require('../../assets/img/no-image.jpg')}                        
                                    />
                                </View>
                            }
                        }
                       
                    }) : null
                }
            </View>
            <View style={styles.homeAction}>

                <Button
                  onPress={ ()=> Actions.leaderboard({leaders: this.props.leaders })}
                  buttonStyle={styles.homeButton}
                  textStyle={[styles.homeButtonText, styles.fontCustom]}
                  title={`دوستان`}
                />                    

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
        height:'200%',
        marginTop: -120,
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

export default HomeBottom
