import { Colors } from './global/colors'
import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({

  container: {
    flex: 1,
      backgroundColor: Colors.darkGrayBackground,
  },
  title: {
    textAlign: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('1%'),
    fontSize: hp('5%'),
    fontWeight: 'bold',
    color: Colors.mediumDarkGray
  },
  price: {
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.black
  }

});
