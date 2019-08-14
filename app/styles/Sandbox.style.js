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
    paddingTop:30,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white
  },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    shadowOffset:{  width: 1,  height: 1,  },
    shadowColor: Colors.shadow,
    shadowOpacity: 1.0,
    shadowRadius: 1
  },
  balance: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: Colors.white
  },
  priceText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.lightGray,
    paddingBottom:10
  },
});
