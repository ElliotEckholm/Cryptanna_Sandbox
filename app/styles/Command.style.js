import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
    flexDirection:'column',
    justifyContent:'space-around'
  },
  btn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkGray,
        padding: 15
    },

    btnImage:
    {
        tintColor: 'white',
        height:25,
        width:25
    },
exchangeContainer :{
  justifyContent: 'center',
  alignItems: 'center',
},
rowContainer:{
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor: Colors.darkGrayBackground,
  borderBottomColor: Colors.white,
  borderBottomWidth: 1,
  width: wp('110%'),
  marginLeft: -10,
  zIndex: 100,
},
bots_rowContainer:{
  flexDirection: 'row',
  alignItems:'center',
  justifyContent:'space-between',
  backgroundColor: Colors.darkGrayBackground,
  borderColor: Colors.white,
  borderWidth: 1,
  width: wp('110%'),
  marginLeft: -10,
  position: 'absolute' ,
  top: 440,
  left: 0,
  zIndex:20,
},


toggleText:{
  paddingRight : 0,
  marginLeft: 20,
  fontSize: 20,
  fontWeight: 'bold',
  color: Colors.white
},
toggle_ON_Text:{
  paddingLeft : 20,
  paddingRight : 0,
  fontSize: 25,
  fontWeight: 'bold',
  color: Colors.white
},
noExchanges:{
  textAlign: 'center',
  fontSize: 25,
  fontWeight: 'bold',
  color: Colors.white
},
toggleButton:{
  paddingRight : 50,
  marginRight : 10,
  fontSize: 30,
  fontWeight: 'bold',
  color: Colors.white,
},
exchangeText:{
  marginLeft : 30,
  fontSize: 30,
  fontWeight: 'bold',
  color: Colors.white,
  paddingBottom: 280,
  zIndex: 100,
},
addExchangeText:{
  marginRight: 50,
  // paddingLeft : wp('40%'),
  fontSize: 45,
  fontWeight: 'bold',
  color: Colors.white,
  // padding: 8,
},
  title: {
    textAlign: 'center',
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
    fontSize: hp('6%'),
    fontWeight: 'bold',
    color: Colors.mediumDarkGray
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    height: 40,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    // marginTop: 100,
    borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: Colors.shadow,
    shadowOpacity: 1.0,
    shadowRadius: 1
  },

  pauseToggle: {
    // flexDirection: 'row',
    // backgroundColor: Colors.lightGray,
    paddingTop: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    // marginRight: 10,
    // marginLeft: 10,

  },
  imageContainer: {
    // marginTop : 110,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: hp('35%'),
    position: 'absolute', left: 0, right: 0, top: hp('30%')
  },
  cryptannaImage: {
    zIndex: 1,
    position: 'absolute',
    top: 45
  },
  holdingsContainer: {
    // flexDirection: 'row',
    backgroundColor: Colors.darkGrayBackground,
    height: hp('30%'),
    // marginRight: 10,
    // marginTop: 100,
    // paddingTop: 150,

    // alignItems: 'center',
    // alignSelf: 'center',

    marginBottom: 0,
    // marginTop : hp('40%'),
    //  flex: 1,
    // flexDirection: 'column'
    position: 'absolute', left: -10, right: 0, bottom: 0,
    // backgroundColor: Colors.white,
    zIndex:100,

  },
  addExchange: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    fontSize: hp('4%'),
    backgroundColor: Colors.lightGray,
    height: hp('5%'),
    width: hp('5%'),
    padding: 0,

    // lineHeight:hp('7%'), //... One for top and one for bottom alignment

    // marginRight: 100,
    marginBottom: hp('2%'),
    marginLeft: wp('80%'),
    // marginTop: 100,
    borderRadius: 20,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: Colors.green,
    shadowOpacity: 1.0,
    shadowRadius: 4,

  },
  imageContainer: {
    paddingTop: hp('5%'),
    // paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('16%'),
    // paddingBottom: hp('2%'),
  },

  balanceText:{
    paddingTop : 0,
    paddingRight : 0,
    marginLeft: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.white
  },

});
