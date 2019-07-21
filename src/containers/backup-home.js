'use strict';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import HomeBody from '../containers/HomeBody';
import HomeBottom from '../containers/homeBottom';
import HomeHeader from '../containers/HomeHeader';
import FitService from '../services/fitService';
var jalaali = require('jalaali-js')
var Contacts = require('react-native-contacts')
const {height, width} = Dimensions.get('window');




class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: null,
            name: '',
            id: null,
            coin: 0,
            mobile: null
        }
    }




    componentWillMount(){
      /*
      const self = this;
        this.props.onAuthorize();
        this.props.onObserveSteps();
        this.props.onGetStepsToday();
        global.storage.load({
            key: 'userState',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            var seceod = (24*60*60) - (h*60*60) - (m*60) - s;

            self.setState({ id: JSON.parse(ret)._id.toString(), coin: parseInt(JSON.parse(ret).coins),mobile: parseInt(JSON.parse(ret).mobile) });
        
           global.storage.load({ key: 'userState', id: JSON.parse(ret)._id.toString() }).then(ret2 => {
               
           }).catch((err) => {

            switch (err.name) {
                case 'NotFoundError':
                    global.storage.save({
                        key: 'userState',  // Note: Do not use underscore("_") in key!
                        id: JSON.parse(ret)._id.toString(),   // Note: Do not use underscore("_") in id!    
                        data: { saveRecord: false },
                        expires: seceod
                      });
                    global.saveRecord = false;
                    break;
                case 'ExpiredError':
                    global.storage.remove({
                        key: 'userState',  // Note: Do not use underscore("_") in key!
                        id: JSON.parse(ret)._id.toString()
                        }); 
                    global.storage.clearMapForKey('userState'); 
                    break;
            }

             
           })
            

           self.setState({name : typeof JSON.parse(ret).name != "undefined" ? JSON.parse(ret).name: ''});
           self.setState({profileImg : typeof JSON.parse(ret).avatar != "undefined" ? 'http://rota.social:443/'+JSON.parse(ret).avatar : null });
        }).catch(err => {
        })

*/
    }

    handleStepsRewards(steps){
        var self = this;
          global.storage.load({
            key: 'userState'}).then(ret => {

        
       global.storage.load({ key: 'userState', id: JSON.parse(ret)._id.toString() }).then(ret2 => {

            FitService.getTodaySteps((steps)=>{
                 
            if(!steps || steps.length == 0){
                steps = { value : 0 }
            }


            if(parseInt(steps.value) >= parseInt(global.limit_step) ){ 

                if(ret2.saveRecord == false){
                    var d = new Date();
                    var h = d.getHours();
                    var m = d.getMinutes();
                    var s = d.getSeconds();
                    var seceod = (24*60*60) - (h*60*60) - (m*60) - s;
                    
                     global.storage.save({
                        key: 'userState',  // Note: Do not use underscore("_") in key!
                        id: JSON.parse(ret)._id.toString(),   // Note: Do not use underscore("_") in id!    
                        data: { saveRecord: true },
                        expires: seceod
                    });

                    var data = new FormData();
                    data.append('coins',parseInt(self.state.coin)+global.limit_coin_perstep);
                    data.append('mobile',parseInt(self.state.mobile));

                    const config = {
                     method: 'POST',
                     body: data,
                    }

                     //update coins
                      fetch("http://rota.social:443/api/editProfile?mobile="+parseInt(self.state.mobile), config)
                      .then((responseData) => {
                            var tmp1 = JSON.parse(responseData._bodyInit).user[0];
                            var tmp2 = JSON.parse(responseData._bodyInit).data;

                            for(var i in tmp2){
                                tmp1[i] = tmp2[i]
                            }
                            global.storage.save({
                                key: 'userState',   // Note: Do not use underscore("_") in key!
                                data: JSON.stringify(tmp1),
                                expires: null
                            });

                      });
                }

                }
            });
        });
      });
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

    goProfile(){
        Actions.profile({sag:true})
    }

    getPersianMonth(value){
        var month = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
        return month[value-1];
    }

    render() {
        
      let today = jalaali.toJalaali(new Date());
      let step = this.props.step;
      if(typeof step == "undefined")
          step = {value: 0}

      if( typeof step.value == "undefined" || typeof step != "object" || step == "undefined" || step == null)
          step = {value: 0 };

      if(step.value>global.limit_step)
          step.value = parseInt(global.limit_step);


       // step['value'] = parseInt(step['value']);

        return (

            <ImageBackground style={styles.homeBodyOverlay}
                source={require('../../assets/img/gradient.png')}>
                <View style={styles.homeContainer}>
                    { (typeof step == "object") ? <HomeHeader step={ step } /> : null }
                    <View style={styles.homeBody}>
                        <HomeBody step={ step } name={this.state.name} profileImg={this.state.profileImg} />
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

BackgroundTask.define(() => {
    let otherParameters3 = {
      mobile: global.user.mobile,
      coins: 10,//parseInt(global.user.coins)+global.limit_coin_perstep,
      type: 'reward'
    };
    let data_push = [{
      mobile: global.user.mobile,
      coins: 10,//parseInt(global.user.coins)+global.limit_coin_perstep,
      type: 'reward'
    }];
    let contents = {
        'en': 'تبریک! شما رکورد روزانه را زدید.'
    }
    OneSignal.postNotification(contents, data_push, global.device, otherParameters3);

    BackgroundTask.finish();



})



