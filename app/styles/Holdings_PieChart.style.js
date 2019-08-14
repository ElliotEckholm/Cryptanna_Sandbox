import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {

    // flex: 0,
    // // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // marginBottom: 200,
    // margin: wp('2%'),
    // backgroundColor: Colors.c_dark_red,
    width: wp('110%'),

    height: hp(8),
    // borderRadius: 20,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: Colors.black,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    marginBottom : 10,
    borderWidth : 1,
    borderColor : Colors.white,
    opacity: 0.8,

  },

  graphContainer: {

    backgroundColor: Colors.white,
    height: 10,
  },

  textContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },

  infoTitle: {
    textAlign: 'center',
    // paddingTop: hp('0.5%'),
    fontSize: 20,//hp('3%'),
    fontWeight: 'bold',

    flexDirection: 'column',
    justifyContent: 'center',
  },
  exchangeTitle: {
    padding: 12,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // textAlign: 'center',
    marginLeft:20,
    // paddingTop: 4,
    fontSize: 30,//hp('4%'),
    fontWeight: 'bold',
    color: Colors.white
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },


});
