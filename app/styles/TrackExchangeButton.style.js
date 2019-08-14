import { Colors } from './global/colors'

import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Colors.darkGrayBackground,
    paddingTop: 20,
    paddingBottom: 20,
  },
  rowContainer: {

    flexDirection: 'row',
    backgroundColor: Colors.darkGray,
    height: hp('6.5%'),
    padding: hp('2%'),
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    // paddingBottom: 100,
    // borderRadius: 4,
    // shadowOffset:{  width: 0,  height: 0,  },
    // shadowColor: Colors.green,
    // shadowOpacity: 1.0,
    // shadowRadius: 4
    borderWidth: 1,
    borderColor : Colors.white,
  },
  title: {
    textAlign: 'center',
    paddingTop: 0,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: Colors.green
  },

  rowText: {
    textAlign: 'center',
    flex: 4,
    flexDirection: 'column'
  }
  });
