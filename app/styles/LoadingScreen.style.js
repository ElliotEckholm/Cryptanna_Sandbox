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
    paddingTop: 15,
    fontSize: 45,
    fontWeight: 'bold',
    color: Colors.lightGray
  }
});
