import { Colors } from './global/colors';

import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrayBackground,
  },
  title: {
    textAlign: 'center',
    paddingBottom: hp('3%'),
    fontSize: hp('6%'),
    fontWeight: 'bold',
    color: Colors.white
  },
  h4:{
    textAlign: 'center',
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: Colors.mediumDarkGray
  },
  imageContainer: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    paddingBottom: hp('4%'),
  },
  botTitle: {
    padding: hp('5%'),
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold'
  }
});
