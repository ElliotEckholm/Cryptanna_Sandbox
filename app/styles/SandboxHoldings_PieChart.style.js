import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: Colors.darkGrayBackground,
    width: wp('80%'),
    height: hp('50%'),
    borderRadius: 20,
    // shadowOffset:{  width: 0,  height: 0,  },
    // shadowColor: Colors.black,
    // shadowOpacity: 1.0,
    // shadowRadius: 5
  },
  infoTitle: {
    textAlign: 'center',
    paddingTop: hp('0.5%'),

    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: Colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  exchangeTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 8,
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: Colors.lightGray
  },
  spinner: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
