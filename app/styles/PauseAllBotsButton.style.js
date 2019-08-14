import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.white,

  },
  rowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    height: hp('7%'),
    padding: hp('2%'),
    marginRight: 10,
    marginLeft: 10,
    marginTop: 100,
    width: wp('40%'),
    // paddingBottom: 100,
    borderRadius: 4,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: Colors.red,
    shadowOpacity: 1.0,
    shadowRadius: 2
  },
  title: {
    textAlign: 'center',
    paddingTop: 0,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: Colors.lightGray
  },

  rowText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

  }
  });
