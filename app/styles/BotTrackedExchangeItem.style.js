import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  rowContainer: {

    flexDirection: 'row',
    backgroundColor: Colors.darkGray,
    height: hp('10%'),
    padding: 20,
    // marginRight: 60,
    // marginLeft: 60,
    marginTop: 30,
    // borderRadius: 4,
    // shadowOffset:{  width: 0,  height: 0,  },
    // shadowColor: Colors.green,
    // shadowOpacity: 1.0,
    // shadowRadius: 5
    borderWidth : 1,
    borderColor : Colors.white,
    width: wp('100%'),
  },
  title: {
    textAlign: 'center',
    // paddingTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGrayBackground,
  },
  author: {
    textAlign: 'center',
    // marginTop: 5,
    fontSize: 14,
    color: '#777'
  },
  thumbnail: {
    padding:hp('2.5%'),
    flex: 2,
    textAlign: 'center',
    justifyContent: 'center',
    // height: hp('3%'),

    color: Colors.darkGrayBackground,

    // padding: 15,
    height: hp('4%'),
    width: wp('6%'),
  },
  rowText: {
    textAlign: 'center',
    flex: 0,
    flexDirection: 'column'
  }
  });
