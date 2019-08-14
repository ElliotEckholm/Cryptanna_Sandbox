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
    alignItems:'center'
  },
  inputContainer: {
      marginBottom: 50,
  },
  inputContainerLogin: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    width: wp('100%'),
    height: hp('8%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputContainerSignUp: {
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    width: wp('100%'),
    height: hp('8%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',

  },
  rowText: {
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    fontSize: 16,
  },
});
