import { StyleSheet ,Dimensions } from 'react-native'
const { width } = Dimensions.get('window');

const signin = StyleSheet.create({
    
    loginContainer: {
        flex: 1,
        fontFamily: 'IRANSansMobile',
        flexDirection: 'column',
        backgroundColor: '#252638'
    },
    loginHeader: {
        flex: 7,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loginHeaderArt: {
        height: '100%',
        width: width * 2,
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden'
    },
    loginHeaderImage: {
        position: 'absolute',
        zIndex: 1,
    },
    loginHeaderOverlay: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: width,
        zIndex: 2,
    },
    loginHeaderLogo: {
        borderRadius: 230 / 2,
    },
    loginHeaderText: {
        paddingBottom: 10,
        paddingTop: 40,
        fontSize: 15,
        backgroundColor: 'transparent',
        color: 'white'
    },
    fontCustom: {
        fontFamily: 'IRANSansMobile',
    },
    loginHeaderSeprator: {
        width: 60,
        height: 2,
        backgroundColor: 'white',
    },
    loginFrom: {
        flex: 2,
        justifyContent: 'center',
    },
    formRow: {
        flexDirection: 'row',
    },
    formInputContainer: {
        marginRight: 5,
        backgroundColor: '#3B3C4C',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
        borderColor: 'white',
        borderLeftWidth: 0,
        borderWidth: 1
    },
    formLabelContainer: {
        marginLeft: 5,
        backgroundColor: '#3B3C4C',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
        borderRightWidth: 0,
        borderColor: 'white',
        flex: 1,
    },
    formInput: {
        height: 40,
        textAlign: 'center',
        paddingRight: 20,
        color: 'white'
    },
    formLabel: {
        paddingLeft: 20,
        marginRight: 20,
        backgroundColor: 'transparent',
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        color: 'white'
    },
    loginButton: {
        backgroundColor: 'white'
    },
    loginAction: {
        flex: 1,
        alignItems: 'center',
    },
    loginButton: {
        width: width,
        height: width,
        borderWidth: 0,
        borderRadius: width / 2,
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

})

const next_component = StyleSheet.create({
   primary: {
     flex: 1,
     height: 70,
     backgroundColor: 'red',
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 20,
     marginRight: 20
   }
 })





export  {signin ,next_component};