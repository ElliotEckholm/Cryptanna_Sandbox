import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  rowContainer: {


        flexDirection: 'row',
        backgroundColor: Colors.darkGray,
        height: hp('12%'),
        padding: 20,
        // marginRight: 60,
        // marginLeft: 60,
        marginTop: 30,
        // borderRadius: 4,
        // shadowOffset:{  width: 0,  height: 0,  },
        // shadowColor: Colors.red,
        // shadowOpacity: 1.0,
        // shadowRadius: 5,
        borderWidth : 1,
        borderColor : Colors.white,
        width: wp('100%'),
        opacity : 0.8
  },
  title: {
    textAlign: 'center',
    //paddingTop: 5,
    fontSize: hp('3%'),
    // height: hp('5%'),
    fontWeight: 'bold',
    color: Colors.white,
  },
  author: {
    textAlign: 'center',
    paddingTop: hp('2%'),
    // height: hp('3%'),
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: Colors.lightBlue,
  },
  thumbnail: {
    flex: 1,
    // padding: 15,
    height: 20,
    width: 100,
  },
  rowText: {
    textAlign: 'center',
    flex: 3,
    flexDirection: 'column'
  }
  });
