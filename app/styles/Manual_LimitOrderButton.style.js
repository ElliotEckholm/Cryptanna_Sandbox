import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  buttons_container: {
   flex: 1,
   borderColor: Colors.white,
   borderTopWidth: 1,
   borderBottomWidth: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent:'space-around'
  },
  buyButton: {
    justifyContent:'space-around',
    backgroundColor: Colors.darkGray,
    height: 40,
    borderColor: Colors.black,
    borderWidth: 2,
    width: 100,
    borderRadius: 4,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: Colors.green,
    shadowOpacity: 1.0,
    shadowRadius: 2
  },
  amountInput: {
    flexDirection: 'row',
    backgroundColor: Colors.darkGrayBackground,
    // height: hp('6%'),
    padding: 10,
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    color: Colors.white,
    textAlign: 'center',
    width:75
  },
  priceInput: {
      flexDirection: 'row',
      backgroundColor: Colors.darkGrayBackground,
      // height: hp('6%'),
      padding: 10,
      borderBottomColor: Colors.white,
      borderBottomWidth: 1,
      color: Colors.white,
      textAlign: 'center',
      width:75
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  amountText: {
    color: Colors.white,
  },
  });
