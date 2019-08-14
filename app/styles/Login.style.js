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
    justifyContent:'space-between',
    paddingTop:30
  },
  inputContainerLogin: {
    flexDirection: 'row',
    backgroundColor: Colors.darkGrayBackground,
    width: wp('80%'),
    height: hp('10%'),
    marginTop: hp('5%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputContainerSignUp: {
    flexDirection: 'row',
    backgroundColor: Colors.darkGrayBackground,
    width: wp('80%'),
    height: hp('10%'),
    marginTop: hp('3%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  rowTextSignUp: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: Colors.white,
    fontSize:16,
  },
  cryptannaImage: {
    marginTop : 0,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
  },
  scrollContainer: {
    paddingTop: 100,
  },
  button: {
    backgroundColor: Colors.robinHoodGreen,
    borderRadius: 5,
    width: wp('80%'),
    height: hp('8%'),
  },
  disabledButtonTitle: {
    color: Colors.lightBlue,
  },
  disabledButton: {
    width: wp('80%'),
    height: hp('8%'),
    backgroundColor: Colors.lightBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Colors.black,
    shadowOpacity: 1.0,
    shadowRadius: 1
  }
});
