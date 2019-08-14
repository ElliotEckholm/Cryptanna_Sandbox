import { Colors } from './global/colors'


import {
  StyleSheet,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGray,
    borderWidth : 1,
    borderColor : Colors.white,
    opacity : 0.8,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  rowText: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    flex: .25,
  },
  titleContainer: {
    flex: .75,
  }
  });
